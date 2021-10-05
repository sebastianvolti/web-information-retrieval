
# How install

## linux

wget https://artifacts.elastic.co/downloads/elasticsearch/elasticsearch-7.15.0-linux-x86_64.tar.gz
wget https://artifacts.elastic.co/downloads/elasticsearch/elasticsearch-7.15.0-linux-x86_64.tar.gz.sha512
shasum -a 512 -c elasticsearch-7.15.0-linux-x86_64.tar.gz.sha512 
tar -xzf elasticsearch-7.15.0-linux-x86_64.tar.gz
cd elasticsearch-7.15.0/ 

## macos

wget https://artifacts.elastic.co/downloads/elasticsearch/elasticsearch-7.15.0-darwin-x86_64.tar.gz
wget https://artifacts.elastic.co/downloads/elasticsearch/elasticsearch-7.15.0-darwin-x86_64.tar.gz.sha512
shasum -a 512 -c elasticsearch-7.15.0-darwin-x86_64.tar.gz.sha512 
tar -xzf elasticsearch-7.15.0-darwin-x86_64.tar.gz
cd elasticsearch-7.15.0/ 

# RUN 
./bin/elasticsearch -d -p pid


## Checking that Elasticsearch is runningedit

curl -X GET "localhost:9200/?pretty"

