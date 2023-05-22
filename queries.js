const getAllProducts = "SELECT * FROM products where deleteyn = 'N'";
const getAllBrand = "SELECT * FROM brand where deleteyn = 'N'";
const getAllCategory = "SELECT * FROM types where deleteyn = 'N'";
//////////////////////////////////

const inventoryAdd = "INSERT INTO products (바코드, 이름, 수량, 가격, 종류, 브랜드) VALUES (?, ?, ?, ?, ?, ?)";
const insertBrand = "INSERT INTO brand (브랜드) VALUES (?)";
const insertTypes = "INSERT INTO types (types) VALUES (?)";

//////////////////////////////////

const deleteProducts = "UPDATE products SET deleteyn = 'Y' WHERE idx = ?";
const deleteBrand = "UPDATE brand SET deleteyn = 'Y' WHERE idx = ?";
const deleteTypes = "UPDATE types SET deleteyn = 'Y' WHERE idx = ?";

//////////////////////////////////

const editableFields = {
    "상품 번호": "idx",
    "바코드": "바코드",
    "상품명": "이름",
    "수량": "수량",
    "가격": "가격",
    "종류": "종류",
    "브랜드": "브랜드",
  };
  
  const updateProductField = (productIdx, field, value) => {
    const columnName = editableFields[field];
    return `
          UPDATE products 
          SET ${columnName} = '${value}'
          WHERE idx = ${productIdx};
      `;
  };

const orderSuccess = "INSERT INTO orders (주문번호, 상품번호, 상품이름, 수량, 가격, 결제 방법, 받은 금액, 거스름 돈, 브랜드, 종류) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?) ";


module.exports = {
    getAllProducts,
    getAllBrand,
    getAllCategory,
    insertBrand,
    insertTypes,
    inventoryAdd,
    deleteBrand,
    deleteProducts,
    deleteTypes,
    orderSuccess,
    updateProductField,
};
