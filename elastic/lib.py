import json
import requests

def connect(conf):
    global config
    config = conf

def get(api):
    return requests.get(config["elastic"]["url"]+api)

def post(api,body):
    headers = {'content-type': 'application/json'}
    return requests.post(config["elastic"]["url"]+api,
                        data = body,
                        headers = headers
                        )
def delete(api,body):
    headers = {'content-type': 'application/json'}
    return requests.delete(config["elastic"]["url"]+"/"+api,
                        data = body,
                        headers = headers
                        )

