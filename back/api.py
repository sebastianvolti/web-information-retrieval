import json
import requests
import lib
import config


config = config.load()
lib.connect(config)

def generateElement(object):
    baths = None
    mode = None
    mts = None
    rooms = 0
    for atts in object['attributes']:
        price = object['price']
        if atts['id'] == 'COVERED_AREA':
            mts = atts['value_struct']['number']
        if atts['id'] == 'FULL_BATHROOMS':
            baths = atts['value_name']
        if atts['id'] == 'ROOMS':
            rooms = int(atts['value_name'])
        if atts['name'] == 'Operación':
            for iter in atts['values']:
                if iter['id'] == '242073':
                    mode = 'ALQ'
                    break
                if iter['id'] == '242075':
                    mode = 'VEN'
                    break
    if mode is None:
        if  object['currency_id'] == 'UYU':
            mode = 'ALQ'
        else:
            mode = 'VEN'
            
    if mode == 'VEN':
        price = (price * 44)
    res = {
        'title': object['title'],
        'baths': baths,
        'mts': mts,
        'price': price,
        'currency' : object['currency_id'],
        'city': object['address']['state_name'],
        'neighbourhood': object['address']['city_name'],
        'mode': mode,
        'rooms': rooms,
        'link' : object['permalink']
    }
    return res

def setProperty(property):
    rango = property['price'] - (property['price'] % 1000)
    #url = property['mode']+'-'+str(property['neighbourhood'])+'-'+str(rango)
    url = property['mode']+'-'+str(rango)
    url = str(url).lower()
    # Guardar por rango
    res = lib.post("/"+str(url)+"/_doc?pretty",json.dumps(property))
    print(res.json())
    return

def getProperty(price):
    res=lib.get("/"+str(price)+"/_search?pretty")
    ts = res.json()['hits']['hits'][0]
    return ts


def main(params):
    url = "/sites/MLU/search"
    baseURL = "https://api.mercadolibre.com"

    #params = ''
    #https://api.mercadolibre.com/sites/MLU/search?price=20000-20000&currency=pesos&q=apartamento&city=TUxVQ1BBUmU3Y2Nj
    if (params == ''):
        response = requests.get(baseURL+url)
    else:
        response = requests.get(baseURL+url+params)
    object = json.loads(response.text)
    paging = object['paging']
    max = paging['total']
    iter = 0
    
    while iter < max:
        response = requests.get(baseURL+url+params+'&offset='+str(iter))
        object = json.loads(response.text)
        for item in object['results']:
            element = generateElement(item)
            setProperty(element)
        iter = iter + 50 
    print('Fin del Proceso')
    
        

main('?currency=UYU&category=MLU1459&state=TUxVUE1PTlo2MDIy')
#main('?price=20000-20000&currency=pesos&q=apartamento&city=TUxVQ1BBUmU3Y2Nj')
#currency UYU //Pesos Uruguayos
#category MLU1459 //Inmuebles
#category MLU1473 //MLU-APARTMENTS_FOR_RENT
#state TUxVUE1PTlo2MDIy // Montevideo

