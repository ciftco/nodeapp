const express = require('express');
let Product = require("./Product.js");
const bp = require('body-parser')
//let Mongo = require("./Mongo.js");
const {MongoClient} = require("mongodb");

const app = express();

app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

const uri = "mongodb://admin:password@localhost:27017/admin";

var products = [];

app.get('/addall',  (req, res) => {
    let product1 = new Product( "1", "Product 1");
    let product2 = new Product("2" , "Product 2");
    let product3 = new Product("3", "Product 3");

    products.push(product1, product2, product3);
    //console.log("Response sended");
    res.send("ok");
});

app.get('/all',  (req, res) => {
    let str = JSON.stringify(products);
    res.send(str);
});

app.post('/product',  (req, res) => {
    let id = req.body.id;
    let name = req.body.name;

    let product1 = new Product(id, name);
    products.push(product1);

    let str = JSON.stringify(products);
    res.send(str);
});



// Listen to the App Engine-specified port, or 8080 otherwise
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});




async function connect(){

    const client = new MongoClient(uri);

    try {
        // Connect to the MongoDB cluster
        await client.connect();
        console.log("Client connected");
        // Make the appropriate DB calls
        await listDatabases(client);

    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}


async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();

    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};




