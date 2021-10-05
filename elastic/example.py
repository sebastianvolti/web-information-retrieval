import config
import lib

config = config.load()
lib.connect(config)

body='''{
  "id": "MLU602044805",
  "site_id": "MLU",
  "title": "Apartamento - Aguada",
  "price": 17000
}'''

res = lib.post("/aguada/_doc?pretty",body)
print(res.json())

res=lib.get("/aguada/_search?pretty")
ts = res.json()['hits']['hits'][0]
print(ts)
