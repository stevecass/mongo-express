## Simple demo mongo/node/express api with angular front end

### Summary

The kids are all about the mean these days.

The file server.js implements a minimal rest-style API for storing Product objects in a mongodb database. It runs under node and uses express. It uses the mongoose library to manage storing data in mongo.

### Getting started
You will need to have node and npm on your machine

0. Make sure you have mongodb installed and that it's running. On a mac do brew install mongodb and follow the instructions
1. Clone this repo and cd into the directory created
2. Run npm install to install the node modules
3. On the command line do node server.js to start the server. It will listen on port 3000
4. Point browser at http://localhost:3000

### Sending some test commands to just the api
You can use curl to send commands.

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
There is no security whatsoever here. Also invalid data will cause 500s. This is only intended to be a simple demo.