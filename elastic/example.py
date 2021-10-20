import config
import lib

config = config.load()
lib.connect(config)

def load_test_data():

    body='''{
      "id": "MLU602044804",
      "site_id": "MLU",
      "title": "Apartamento - Aguada",
      "price": 17000,
      "rooms": 3,
      "toilets": 1
    }'''
    res = lib.post("/mvd-aguada-17000/_doc?pretty",body)

    body='''{
      "id": "MLU602044805",
      "site_id": "MLU",
      "title": "Apartamento - Aguada",
      "price": 17000,
      "rooms": 2,
      "toilets": 2
    }'''
    res = lib.post("/mvd-aguada-17000/_doc?pretty",body)

    body='''{
      "id": "MLU602044806",
      "site_id": "MLU",
      "title": "Apartamento - Aguada",
      "price": 17000,
      "rooms": 5,
      "toilets": 1
    }'''
    res = lib.post("/mvd-aguada-17000/_doc?pretty",body)

    body='''{
      "id": "MLU602044807",
      "site_id": "MLU",
      "title": "Apartamento - Aguada",
      "price": 17000,
      "rooms": 5,
      "toilets": 2
    }'''
    res = lib.post("/mvd-aguada-17000/_doc?pretty",body)

    body='''{
      "id": "MLU602044808",
      "site_id": "MLU",
      "title": "Apartamento - Aguada",
      "price": 17000,
      "rooms": 5,
      "toilets": 3
    }'''
    res = lib.post("/mvd-aguada-17000/_doc?pretty",body)

#The mappings is like teh definitions of the index
def get_mapping():
  res=lib.get("/mvd-aguada-17000/_mapping")
  print(res.json())


def get_in_order():

  body='''{
      "sort" : [
        { "rooms" : "desc" },
        { "toilets" : "desc" }
      ]
    }'''
  res=lib.post("/mvd-aguada-17000/_search",body)
  ts = res.json()['hits']['hits']
  print(ts[0])
  print("##################################################################################################################")
  print(ts[1])
  print("##################################################################################################################")
  print(ts[2])
  print("##################################################################################################################")
  print(ts[3])
  print("##################################################################################################################")
  print(ts[4])


load_test_data()
get_in_order()