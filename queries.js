const getAllProducts = "SELECT * FROM products";
const insertItem = "INSERT INTO items (name, quantity, price) VALUES (?, ?, ?)";

module.exports = {
    getAllProducts,
    insertItem,
};
