/* 
=============================================
CPAN113 – Lab 10
Inventory Management System
Author: Lester Leonida
Date: July 30 2026
Description:
This script implements a simple inventory 
management system using JavaScript classes, 
inheritance, static methods, and store logic.
=============================================
*/


// =============================================
// Part 1: ProductProperties Class
// =============================================

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
        return `Product: ${this.name}, Price: $${this.price.toFixed(2)}, Quantity: ${this.quantity}`;
    }

    // Static method to apply discount to an array of products
    static applyDiscount(products, discount) {
        products.forEach(product => {
            product.price -= product.price * discount;
        });
    }
}

// =============================================
// Part 2: PerishableProductProperties Subclass
// =============================================

class PerishableProductProperties extends ProductProperties {
    constructor(name, price, quantity, expirationDate) {
        super(name, price, quantity); // inherit name, price, quantity
        this.expirationDate = expirationDate; // new property
    }

    // Override toString to include expiration date
    toString() {
        return `Product: ${this.name}, Price: $${this.price.toFixed(2)}, Quantity: ${this.quantity}, Expiration Date: ${this.expirationDate}`;
    }
}


// =============================================
// Part 4: Store Class
// =============================================

class Store {
    constructor() {
        this.inventory = [];
    }

    // Add product to inventory
    addProduct(product) {
        this.inventory.push(product);
    }

    // Calculate total inventory value
    getInventoryValue() {
        return this.inventory.reduce((total, product) => {
            return total + product.getTotalValue();
        }, 0);
    }

    // Find product by name
    findProductByName(name) {
        // Defensive check: ensure name is a valid string
        if (typeof name !== "string" || name.trim() === "") {
            console.log("Invalid product name provided.");
            return null;
        }
        
        return this.inventory.find(product => product.name === name) || null;
    }

    // Return number of products in inventory
    getProductCount() {
        return this.inventory.length;
    }

    // Check if inventory is empty
    isEmpty() {
        return this.inventory.length === 0;
    }

    // Return an array of all product names
    getProductNames() {
        return this.inventory.map(product => product.name);
    }
}

// =============================================
// Part 5: Testing the System
// =============================================

// Create regular products
const apple = new ProductProperties("Apple", 2.50, 50);
const bread = new ProductProperties("Bread", 3.00, 20);
const cereal = new ProductProperties("Cereal", 4.50, 30);

// Create perishable products
const milk = new PerishableProductProperties("Milk", 1.50, 10, "2024-12-31");
const yogurt = new PerishableProductProperties("Yogurt", 2.00, 15, "2024-11-15");

// Create store instance
const myStore = new Store();

// Add products to store inventory
myStore.addProduct(apple);
myStore.addProduct(bread);
myStore.addProduct(cereal);
myStore.addProduct(milk);
myStore.addProduct(yogurt);

// Display inventory value BEFORE discount
console.log("=============================================");
console.log("Inventory Value Before Discount");
console.log("=============================================");
console.log("Total Inventory Value (Before Discount): $" + myStore.getInventoryValue().toFixed(2));

console.log(""); // Add a blank line for better readability

// Apply 15% discount to all products in inventory
console.log("=============================================");
console.log("Applying 15% Discount...");
console.log("=============================================");
const DISCOUNT_RATE = 0.15; // 15% discount
ProductProperties.applyDiscount(myStore.inventory, DISCOUNT_RATE);

console.log(""); // Add a blank line for better readability

// Display inventory value AFTER discount
console.log("=============================================");
console.log("Inventory Value After Discount");
console.log("=============================================");
console.log("Total Inventory Value (After 15% Discount): $" + myStore.getInventoryValue().toFixed(2));

console.log(""); // Add a blank line for better readability

// Search a specific product
const searchName = "Milk";

console.log("=============================================");
console.log("Searching for Product: " + searchName);
console.log("=============================================");

// Perform search
const foundProduct = myStore.findProductByName(searchName);

// Display search result
if (foundProduct) {
    console.log("Product Found:", foundProduct.toString());
} else {
    console.log("Product not found.");
}

console.log("");
console.log("=============================================");
console.log("Final Store Summary");
console.log("=============================================");

console.log("Total Products:", myStore.getProductCount());
console.log("Product Names:", myStore.getProductNames().join(", "));
console.log("Inventory Empty?:", myStore.isEmpty() ? "Yes" : "No");

// ---------------------------------------------
// ProductProperties Class
// Represents a basic product with name, price, and quantity
// ---------------------------------------------

// Base Class: ProductProperties
class ProductProperties {
    constructor(name, price, quantity) {
        // Initialize product properties
        this.name = name;
        this.price = price;
        this.quantity = quantity;
    }

    // Calculate total value of this product in stock
    getTotalValue() {
        return this.price * this.quantity;
    }

    // Return a readable string describing the product
    toString() {
        return `Product: ${this.name}, Price: $${this.price.toFixed(2)}, Quantity: ${this.quantity}`;
    }

    // Apply a discount to all products in an array
    static applyDiscount(products, discount) {
        products.forEach(product => {
            product.price -= product.price * discount;
        });
    }
}

// ---------------------------------------------
// PerishableProductProperties Class
// Extends ProductProperties by adding expiration date
// ---------------------------------------------

class PerishableProductProperties extends ProductProperties {
    constructor(name, price, quantity, expirationDate) {
        super(name, price, quantity); // inherit base properties
        this.expirationDate = expirationDate; // new property
    }

    // Override toString to include expiration date
    toString() {
        return `Product: ${this.name}, Price: $${this.price.toFixed(2)}, Quantity: ${this.quantity}, Expiration Date: ${this.expirationDate}`;
    }
}

// ---------------------------------------------
// Store Class
// Manages inventory of products
// ---------------------------------------------

class Store {
    constructor() {
        // Inventory array to store products
        this.inventory = [];
    }

    // Add a product to the inventory
    addProduct(product) {
        this.inventory.push(product);
    }

    // Calculate total value of all products in inventory
    getInventoryValue() {
        return this.inventory.reduce((total, product) => {
            return total + product.getTotalValue();
        }, 0);
    }

    // Find a product by its name
    findProductByName(name) {
        return this.inventory.find(product => product.name === name) || null;
    }
}
