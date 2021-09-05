const products = [];

// Product classını oluşturuyoruz
class Product {
    constructor(title) {
        this.title = title;
    }

    // Save product
    save() {
        products.push(this);
    }

    // Get all products
    static fetchAll() {
        return products;
    }
};

module.exports = Product;