// InventoryTable.js
import React from "react";
import "./InventoryTable.css";
import axios from "axios";
import { useEffect, useState } from "react";

const InventoryTable = ({ handleUpdate, handleDelete }) => {
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
          <tr key={index} onClick={() => handleUpdate(index)}>
            <td>{product.idx}</td>
            <td>{product.바코드}</td>
            <td>{product.이름}</td>
            <td>{product.수량}</td>
            <td>{product.가격}</td>
            <td>{product.종류}</td>
            <td>{product.브랜드}</td>
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
