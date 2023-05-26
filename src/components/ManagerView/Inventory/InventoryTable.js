// InventoryTable.js
import React from "react";
import "./InventoryTable.css";
import axios from "axios";
import { useEffect, useState } from "react";

const InventoryTable = ({ handleUpdate }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((res) => {
        setProducts(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleDelete = (index) => {
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      axios
        .post("http://localhost:5000/api/inventoryDelete", {
          idx: products[index].idx,
        })
        .then(() => {
          axios.get("http://localhost:5000/api/products").then((res) => {
            setProducts(res.data);
          });
        });
    }
  };

  const handleUpdateClick = async (e, productIdx, fieldName) => {
    e.stopPropagation();
    const fieldValue = e.target.textContent;
    const newValue = prompt(`새로운 ${fieldName} 값 (${fieldValue}):`, fieldValue);
    
    if (newValue !== null && newValue !== fieldValue) {
      try {
        await axios.post(`http://localhost:5000/api/inventoryUpdate`, {
          idx: productIdx,
          field: fieldName,
          value: newValue,
        });
  
        axios.get("http://localhost:5000/api/products").then((res) => {
          setProducts(res.data);
        });
  
      } catch (err) {
        console.error(err);
      }
    }
  };
  
  return (
    <table className="inventoryTable">
      <thead>
        <tr>
          <th>상품 번호</th>
          <th>바코드</th>
          <th>상품명</th>
          <th>수량</th>
          <th>가격</th>
          <th>종류</th>
          <th>브랜드</th>
          <th>삭제</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product, index) => (
          <tr key={index}>
            <td onClick={(e) => handleUpdateClick(e, product.idx, "상품 번호")}>{product.idx}</td>
            <td onClick={(e) => handleUpdateClick(e, product.idx, "바코드")}>{product.barcode}</td>
            <td onClick={(e) => handleUpdateClick(e, product.idx, "상품명")}>{product.이름}</td>
            <td onClick={(e) => handleUpdateClick(e, product.idx, "수량")}>{product.수량}</td>
            <td onClick={(e) => handleUpdateClick(e, product.idx, "가격")}>{product.가격}</td>
            <td onClick={(e) => handleUpdateClick(e, product.idx, "종류")}>{product.종류}</td>
            <td onClick={(e) => handleUpdateClick(e, product.idx, "브랜드")}>{product.브랜드}</td>
            <td>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(index);
                }}
              >
                삭제
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default InventoryTable;
