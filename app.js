const express = require('express');
var Product = require("./Product.js");

const app = express();

app.get('/', (req, res) => {
    let product1 = new Product("Product 1");
    let product2= new Product("Product 2");
    let product3 = new Product("Product 3");
    var products = [];
    products.push(product1, product2, product3);

    let str = JSON.stringify(products);
    res.send(str);
});

// Listen to the App Engine-specified port, or 8080 otherwise
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});





