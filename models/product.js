// filesystem core modülünü dahil ediyoruz
const fs = require('fs');

// path modülünü dail diyoruz
const path = require('path');

const products = [];

// Product classını oluşturuyoruz
class Product {
    constructor(title) {
        this.title = title;
    }

    // Save product
    save() {
        // Verilerin ekleneceği dosya
        const p = path.join(path.dirname(process.mainModule.filename), 'data', 'products.json');

        // Dosyayı okuyoruz
        fs.readFile(p, (err, fileContent) => {
            let products = [];

            if(!err) {
                // Öncelikle dosyadaki verileri alıyoruz
                products = JSON.parse(fileContent);
            }

            // Form'dan gelen veriyi products dizisine ekliyoruz
            products.push(this);

            // Dosyaya son verileri yazıdıryoruz
            fs.writeFile(p, JSON.stringify(products), (err) => {
                if (err) {
                    console.log('Hata: ', err);
                }
            });
        });
    }

    // Get all products
    static fetchAll(cb) {
        // Verilerin ekleneceği dosya
        const p = path.join(path.dirname(process.mainModule.filename), 'data', 'products.json');

        fs.readFile(p, (err, fileContent) => {
            if(err) {
                cb(err);
            }

            return cb(JSON.parse(fileContent));
        });
    }
};

module.exports = Product;