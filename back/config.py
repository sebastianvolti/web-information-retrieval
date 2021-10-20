import yaml


def load(configfile = "config.yml"):
    
    with open(configfile, 'r') as stream:
        try:
            return yaml.safe_load(stream)
        except yaml.YAMLError as exc:
            print(exc)