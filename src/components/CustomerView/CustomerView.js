import React from "react";
import "./CustomerView.css";
import { numberWithCommas } from '../utils.js'

const CustomerView = ({ items }) => {
  // 전체 금액 계산
  const getTotal = () => {
    return items.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  };

  const total = numberWithCommas(getTotal());
  return (
    <div>
      <h3>뷰티 화장품</h3>
      <table className="customer-view">
        <thead>
          <tr>
            <th>상품 번호</th>
            <th>상품명</th>
            <th>가격</th>
            <th>수량</th>
            <th>총 금액: {total} 원</th> {/* 이 부분을 변경했습니다 */}
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={`${item.id}_${index}`}>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>{numberWithCommas(item.price)} 원</td>
              <td>{item.quantity}</td>
              <td>{numberWithCommas(item.price * item.quantity)} 원</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerView;
