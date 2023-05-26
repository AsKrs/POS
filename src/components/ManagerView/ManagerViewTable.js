import React from "react";
import "./ManagerViewTable.css";
import { numberWithCommas } from "../utils.js";

const ManagerViewTable = ({
  items,
  removeItem,
  showDeleteButton,
  onMinus,
  onPlus,
}) => {



  return (
    <table className="manager-view-table">
      <thead>
        <tr>
          <th>바코드</th>
          <th>상품번호</th>
          <th>상품명</th>
          <th>낱개 가격</th>
          <th>수량</th>
          <th>가격</th>
          <th>삭제</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item, index) => (
          <tr key={`${item.id}_${index}`}>
            <td>{item.barcode}</td>
            <td>{index + 1}</td>
            <td>{item.name}</td>
            <td>{numberWithCommas(item.price)}원</td>
            <td>
              <button
                className="minus"
                onClick={() => onMinus(item.name)}
              ></button>
              {item.quantity}
              <button className="plus" onClick={() => onPlus(item.name)}></button>
            </td>
            <td>{numberWithCommas(item.price*item.quantity)}원</td>
            <td>
              {showDeleteButton && (
                <button className="delete" onClick={() => removeItem(item.name)}>
                  삭제
                </button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ManagerViewTable;