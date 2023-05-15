const getAllProducts = "SELECT * FROM products where deleteyn = 'N'";
const getAllBrand = "SELECT * FROM brand where deleteyn = 'N'";
const getAllCategory = "SELECT * FROM types where deleteyn = 'N'";
//////////////////////////////////

const insertProducts = "INSERT INTO products (바코드, 이름, 수량, 가격, 종류, 브랜드) VALUES (?, ?, ?, ?, ?, ?)";
const insertBrand = "INSERT INTO brand (브랜드) VALUES (?)";
const insertTypes = "INSERT INTO types (types) VALUES (?)";

//////////////////////////////////

const deleteProducts = "UPDATE products SET deleteyn = 'Y' WHERE idx = ?";
const deleteBrand = "UPDATE brand SET deleteyn = 'Y' WHERE idx = ?";
const deleteCategory = "UPDATE types SET deleteyn = 'Y' WHERE idx = ?";

//////////////////////////////////




module.exports = {
    getAllProducts,
    getAllBrand,
    getAllCategory,
    insertBrand,
    insertTypes
};
