const fs = require('fs');
const path = require('path');

// Datalar data klasörü altındaki cart.json dosyasına yazılacaktır
const p = path.join(path.dirname(process.mainModule.filename), 'data', 'cart.json');

// Cart model sınıfını oluşturuyoruz
module.exports = class Cart {
    static addProduct(id, productPrice) {
        // dataları dosyadan okuyoruz
        fs.readFile(p, (err, fileContent) => {
            // Default data
            let cart = { products: [], totalPrice: 0 };

            if (!err) {
                cart = JSON.parse(fileContent);
            }

            // Analyze the cart => Find existing product
            const existingProductIndex = cart.products.findIndex(item => item.id === id);

            const existingProduct = cart.products[existingProductIndex];

            let updatedProduct;

            // Add new product/ increase quantity
            if (existingProduct) {
                updatedProduct = { ...existingProduct };
                updatedProduct.qty = updatedProduct.qty + 1;
                cart.products = [...cart.products];
                cart.products[existingProductIndex] = updatedProduct;
            } else {
                updatedProduct = { id: id, qty: 1 };
                cart.products = [...cart.products, updatedProduct];
            }

            cart.totalPrice = cart.totalPrice + +productPrice;
            
            fs.writeFile(p, JSON.stringify(cart), err => {
                console.log(err);
            });
        });
    }
}