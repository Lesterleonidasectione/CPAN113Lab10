class ProductProperties {
    constructor(name, price, quantity) {
        this.name = name;
        this.price = price;
        this.quantity = quantity;
    }
    
    getTotalValue() {
        return this.price * this.quantity;
    }

    toString() {
        return `${this.name} - $${this.price} x ${this.quantity}`;
    }

    static applyDiscount(product, rate) {
        product.price = product.price * (1 - rate);
    }
}

class PerishableProductProperties extends ProductProperties {
    constructor(name, price, quantity, expirationDate) {
        super(name, price, quantity);
        this.expirationDate = expirationDate;
    }
    getTotalValue() {
        const baseValue = super.getTotalValue();
        const today = new Date();
        const expiry = new Date(this.expirationDate);

    if (expiry < today) {
            return 0;
        }
        return baseValue;
    }
    
    toString() {
        return `${super.toString()} (Expires: ${this.expirationDate})`;
    }
}

class Store {
    constructor() {
        this.inventory = [];
    }
}
