var express = require("express");
var fs = require("fs");
var bodyParser = require("body-parser")

var app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static('public'));

Web3 = require('web3')
web3 = new Web3(new Web3.providers.HttpProvider("http://10.161.93.178/api/concord/eth", 0, "admin@blockchain.local", "Athena!23"));

contractABI = fs.readFileSync("BeerWars.abi", "utf-8");
contractAddress = '0x45d2a03ec927c394803f31e4a46fb2385b0863fb';
fromAddress = '0xfa1a4c33aa682d34eda15bf772f672edddac13aa';

// creation of contract object
var MyContract = web3.eth.contract(JSON.parse(contractABI));
// initiate contract for an address
var myContractInstance = MyContract.at('0x45d2a03ec927c394803f31e4a46fb2385b0863fb');


app.get('/index', function(request, response) {
    response.writeHead(200, {"Content-Type":"text/html"});
    fs.readFile("html/index.html", "utf-8", function(e, data){
        response.write(data);
        response.end();
    });
});

app.post('/index/buyBeer', function(request, response){
   var username = request.body.username;
   var result = myContractInstance.buyBeer(username, {from: fromAddress});
   console.log(result);
   response.end(result);
});

app.post('/index/drinkBeer', function(request, response){
   var username = request.body.username;
   var result = myContractInstance.drinkBeer(username, {from: fromAddress});
   console.log(result);
   response.end(result);
});

app.post('/index/getNumberOfBeers', function(request, response){
   var username = request.body.username;
   //var result = myContractInstance.getNumberOfBeers(username, {from: fromAddress});
   var result = myContractInstance.getNumberOfBeers(username);
   console.log(result);
   response.end(result.toString());
});

app.post('/index/transferBeer', function(request, response){
   var fromName = request.body.fromname;
   var toName = request.body.toname;
   var result = myContractInstance.transferBeer(fromName, toName,{from: fromAddress});
   console.log(result);
   response.end(result);
});

app.post('/index/addName', function(request, response){
   var username = request.body.username;
   var result = myContractInstance.addName(username, {from: fromAddress});
   console.log(result);
   response.end(result);
});

app.post('/index/removeName', function(request, response){
   var username = request.body.username;
   var result = myContractInstance.removeName(username, {from: fromAddress});
   console.log(result);
   response.end(result);
});

console.log("Listening on port 8080");
app.listen(8080);
