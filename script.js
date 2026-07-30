/**
 * CPAN113 Lab 10 – Object-Oriented Inventory System
 *
 * This program models a simple store inventory using classes:
 * - ProductProperties: Base product with name, price, quantity
 * - PerishableProductProperties: Extends base class with expiration date
 * - Store: Manages inventory, product lookup, and total value
 *
 * The script:
 * 1. Creates multiple products (including perishable)
 * 2. Adds them to a store
 * 3. Prints inventory value before and after a 15% discount
 * 4. Finds and prints a product by name
 */

// -----------------------------------------------------
// Part 1: Base Class – ProductProperties
// -----------------------------------------------------
class ProductProperties {
    constructor(name, price, quantity) {
        this.name = name;
        this.price = price;
        this.quantity = quantity;
    }

    // Returns total value of product in stock
    getTotalValue() {
        return this.price * this.quantity;
    }

    // String representation of the product
    toString() {
        return `Product: ${this.name}, Price: $${this.price}, Quantity: ${this.quantity}`;
    }

    /**
     * Static method: Applies a discount to an array of products
     * @param {Array} products - Array of Product or PerishableProduct objects
     * @param {number} discount - Discount percentage (e.g., 0.15 for 15%)
     */
    static applyDiscount(products, discount) {
        products.forEach(product => {
            product.price = product.price * (1 - discount);
        });
    }
}

// -----------------------------------------------------
// Part 2: Subclass – PerishableProductProperties
// -----------------------------------------------------
class PerishableProductProperties extends ProductProperties {
    constructor(name, price, quantity, expirationDate) {
        super(name, price, quantity);
        this.expirationDate = expirationDate;
    }

    // Extends parent toString() using super
    toString() {
        return `${super.toString()}, Expiration Date: ${this.expirationDate}`;
    }
}

// -----------------------------------------------------
// Part 4: Store Class
// -----------------------------------------------------
class Store {
    constructor() {
        this.inventory = [];
    }

    // Adds a product to the inventory
    addProduct(product) {
        this.inventory.push(product);
    }

    // Calculates total inventory value
    getInventoryValue() {
        return this.inventory.reduce((total, product) => {
            return total + product.getTotalValue();
        }, 0);
    }

    // Finds a product by name
    findProductByName(name) {
        return this.inventory.find(product => product.name === name) || null;
    }
}

// -----------------------------------------------------
// Part 5: Testing the System
// -----------------------------------------------------

// Create store
const store = new Store();

// Create at least 5 products (including 2 perishable)
const laptop = new ProductProperties("Laptop", 1200, 2);
const headphones = new ProductProperties("Headphones", 150, 4);
const keyboard = new ProductProperties("Keyboard", 80, 3);
const milk = new PerishableProductProperties("Milk", 4, 5, "2026-08-01");
const yogurt = new PerishableProductProperties("Yogurt", 6, 10, "2026-07-15");

// Add products to store
store.addProduct(laptop);
store.addProduct(headphones);
store.addProduct(keyboard);
store.addProduct(milk);
store.addProduct(yogurt);

// Print inventory value BEFORE discount
console.log("Total Inventory Value (Before 15% Discount):", store.getInventoryValue());

// Apply 15% discount to ALL products
ProductProperties.applyDiscount(store.inventory, 0.15);

// Print inventory value AFTER discount
console.log("Total Inventory Value (After 15% Discount):", store.getInventoryValue());

// Find and print a specific product by name
const searchName = "Yogurt";
const foundProduct = store.findProductByName(searchName);

if (foundProduct) {
    console.log("Product Found:", foundProduct.toString());
} else {
    console.log(`Product "${searchName}" not found.`);
}