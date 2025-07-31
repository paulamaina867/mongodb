// MongoDB Assignment

/* ---------------------- INSERTIONS ---------------------- */

// 1. Insert into teachers collection
db.teachers.insertMany([
  { name: "John Mwangi", subject: "Math", class: "Form 1", NoOfSession: 5 },
  { name: "Grace Wambui", subject: "English", class: "Form 2", NoOfSession: 4 },
  { name: "Paul Kamau", subject: "Biology", class: "Form 3", NoOfSession: 6 },
  { name: "Susan Njeri", subject: "Chemistry", class: "Form 4", NoOfSession: 3 },
  { name: "David Otieno", subject: "Geography", class: "Form 1", NoOfSession: 5 },
  { name: "Alice Atieno", subject: "Kiswahili", class: "Form 2", NoOfSession: 4 },
  { name: "Daniel Kiptoo", subject: "Physics", class: "Form 3", NoOfSession: 5 }
]);

// 2. Insert into staff collection
db.staff.insertMany([
  { name: "James Kariuki", AreaAssigned: "Gate", Duty: "Monday-Friday", address: "Thika" },
  { name: "Beatrice Wanjiku", AreaAssigned: "Kitchen", Duty: "Monday-Saturday", address: "Nakuru" },
  { name: "Peter Otieno", AreaAssigned: "Library", Duty: "Monday-Friday", address: "Kisumu" },
  { name: "Lucy Ndungu", AreaAssigned: "Lab", Duty: "Monday-Friday", address: "Nyeri" },
  { name: "Simon Kipkorir", AreaAssigned: "Grounds", Duty: "Monday-Saturday", address: "Eldoret" },
  { name: "Ann Chebet", AreaAssigned: "Office", Duty: "Monday-Friday", address: "Kericho" },
  { name: "Tom Muli", AreaAssigned: "Store", Duty: "Monday-Friday", address: "Machakos" }
]);

// 3. Create ecommerce database and insert into customers and products
use ecommerce;

// a) customers
db.customers.insertMany([
  { name: "Mary Njeri", email: "mary@example.com", address: { city: "Nairobi", zip: 00100 }, created_at: ISODate() },
  { name: "George Ochieng", email: "george@example.com", address: { city: "Kisumu", zip: 40100 }, created_at: ISODate() },
  { name: "Esther Muthoni", email: "esther@example.com", address: { city: "Nakuru", zip: 20100 }, created_at: ISODate() },
  { name: "Kevin Otieno", email: "kevin@example.com", address: { city: "Mombasa", zip: 80100 }, created_at: ISODate() },
  { name: "Cynthia Wambua", email: "cynthia@example.com", address: { city: "Machakos", zip: 90100 }, created_at: ISODate() },
  { name: "Brian Kipkoech", email: "brian@example.com", address: { city: "Eldoret", zip: 30100 }, created_at: ISODate() },
  { name: "Joy Wangari", email: "joy@example.com", address: { city: "Thika", zip: 01000 }, created_at: ISODate() }
]);

// b) products
db.products.insertMany([
  { name: "Laptop", category: "Electronics", price: 60000, stock: 12, rating: [5, 4, 4] },
  { name: "Phone", category: "Electronics", price: 30000, stock: 20, rating: [4, 5, 3] },
  { name: "Shoes", category: "Fashion", price: 2000, stock: 50, rating: [3, 3, 4] },
  { name: "Fridge", category: "Appliances", price: 40000, stock: 5, rating: [4, 4, 5] },
  { name: "Book", category: "Stationery", price: 300, stock: 100, rating: [5, 5, 4] },
  { name: "Backpack", category: "Fashion", price: 1200, stock: 30, rating: [3, 4, 4] },
  { name: "TV", category: "Electronics", price: 45000, stock: 8, rating: [5, 4, 5] }
]);

// Sample orders for aggregation
db.orders.insertMany([
  { customer_id: 1, product_id: 1, quantity: 2 },
  { customer_id: 2, product_id: 2, quantity: 3 },
  { customer_id: 3, product_id: 3, quantity: 1 },
  { customer_id: 4, product_id: 1, quantity: 1 },
  { customer_id: 5, product_id: 4, quantity: 1 },
  { customer_id: 6, product_id: 5, quantity: 5 },
  { customer_id: 7, product_id: 2, quantity: 1 }
]);

/* ---------------------- FIND FUNCTIONS ---------------------- */

// View all staff
db.staff.find().pretty();

// View all teachers
db.teachers.find().pretty();

// View all customers
db.customers.find().pretty();

// View all products
db.products.find().pretty();

/* ---------------------- AGGREGATION QUERIES ---------------------- */

// 1. Order items with product info
db.orders.aggregate([
  {
    $lookup: {
      from: "products",
      localField: "product_id",
      foreignField: "_id",
      as: "product_info"
    }
  },
  { $unwind: "$product_info" }
]);

// 2. Top-selling product
db.orders.aggregate([
  {
    $group: {
      _id: "$product_id",
      totalSold: { $sum: "$quantity" }
    }
  },
  { $sort: { totalSold: -1 } },
  { $limit: 1 },
  {
    $lookup: {
      from: "products",
      localField: "_id",
      foreignField: "_id",
      as: "product_info"
    }
  },
  { $unwind: "$product_info" }
]);

// 3. Least-selling product
db.orders.aggregate([
  {
    $group: {
      _id: "$product_id",
      totalSold: { $sum: "$quantity" }
    }
  },
  { $sort: { totalSold: 1 } },
  { $limit: 1 },
  {
    $lookup: {
      from: "products",
      localField: "_id",
      foreignField: "_id",
      as: "product_info"
    }
  },
  { $unwind: "$product_info" }
]);
