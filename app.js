const express = require('express');
let Product = require("./Product.js");
let Mongo = require("./Mongo.js");
const {MongoClient} = require("mongodb");

const app = express();
const uri = "mongodb://admin:password@localhost:27017/admin";

app.get('/', (req, res) => {
    let product1 = new Product("Product 1");
    let product2= new Product("Product 2");
    let product3 = new Product("Product 3");
    var products = [];
    products.push(product1, product2, product3);

    let str = JSON.stringify(products);

    Connect();

    res.send(str);
});

// Listen to the App Engine-specified port, or 8080 otherwise
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});


async function Connect(){
    /**
     * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
     * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
     */
    const client = new MongoClient(uri);

    try {
        // Connect to the MongoDB cluster
        await client.connect();

        // Make the appropriate DB calls
        await  listDatabases(client);

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




