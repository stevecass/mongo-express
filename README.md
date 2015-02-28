# Sample mongo/node/express api

### Summary

The file server.js implements a minimal rest-style API for storing Product objects in a mongodb database. It runs under node and uses express. It uses the mongoose library to manage storing data in mongo.

### Getting started
You will need to have node and npm on your machine

1. Clone this repo and cd into the directory created
2. Run npm install to install the node modules
3. On the command line do node server.js to start the server. It will listen on port 3000

### Sending some test commands
You can use curl to send commands. O

#### list products
curl -i http://localhost:3000/api/products

#### create a product
curl -i -d '{ "name": "new product", "price":"123.45" }' -H "Content-Type: application/json" http://localhost:3000/api/products

#### read a product
curl  -i localhost:3000/api/products/54f12ab3383e431c6e9213a1

#### update a product
curl -X PUT -i -d '{ "name": "updated product", "price":"123.45" }' -H "Content-Type: application/json" http://localhost:3000/api/products/54f12ab3383e431c6e9213a1

#### delete a product
curl -X DELETE -i http://localhost:3000/api/products/54f12ab3383e431c6e9213a1


### Notes
