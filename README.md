# MongoDB Assignment

## Overview
This project demonstrates the use of MongoDB shell commands including data insertion, data querying using `find()`, and aggregation using `lookup`, `group`, and sorting operations.

---

## Collections and Their Purpose

### 1. Teachers
- Stores data about teaching staff.
- Fields: name, subject, class, NoOfSession

### 2. Staff
- Stores data about non-teaching staff and their duties.
- Fields: name, AreaAssigned, Duty, address

### 3. Customers (ecommerce DB)
- Simulates an ecommerce site's customers.
- Fields: name, email, address (city, zip), created_at

### 4. Products (ecommerce DB)
- Products available for sale.
- Fields: name, category, price, stock, rating (array of numbers)

### 5. Orders (ecommerce DB)
- Sample sales transactions showing what was bought and in what quantity.
- Fields: customer_id, product_id, quantity

---

## Functional Sections

### INSERTIONS
- Uses `insertMany()` to populate each collection with 7 records.

### FIND FUNCTIONS
- Uses `find().pretty()` to view records in each collection.

### AGGREGATION QUERIES
- Joins `orders` with `products` using `$lookup`
- Groups orders to find:
  - Top-selling product (`$sort: -1`)
  - Least-selling product (`$sort: 1`)

---

## Usage
Run this code in a MongoDB shell (`mongosh`) after switching to the correct database:
```sh
use school        # for teachers and staff
use ecommerce     # for ecommerce data
```

Make sure your product and order documents have matching `_id` fields for accurate aggregation results.

