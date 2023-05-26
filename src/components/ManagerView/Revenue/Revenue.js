import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Revenue.css";
import { numberWithCommas } from "../../utils.js";
import { Link } from "react-router-dom";


const Revenue = () => {
  const [orderList, setOrderList] = useState([]);
  const [day, setDay] = useState(null);
  const [month, setMonth] = useState(null);
  const [cashTotal, setCashTotal] = useState(0);
  const [cardTotal, setCardTotal] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/orderHistory", {
        params: { day, month },
      })
      .then((res) => {
        setOrderList(res.data);

        let cash = 0;
        let card = 0;

        res.data.forEach((order) => {
          if (order.payment_type === "현금") {
            cash += order.price * order.quantity;
          } else if (order.payment_type === "카드") {
            card += order.price * order.quantity;
          }
        });

        setCashTotal(cash);
        setCardTotal(card);
        setTotal(cash + card);
      });
  }, [day, month]);

  function formatOrderTime(orderTime) {
    const orderDate = new Date(orderTime);
    const formattedDate = orderDate.toLocaleDateString("ko-KR");
    const formattedTime = orderDate.toLocaleTimeString("ko-KR", {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  
    return `${formattedDate} ${formattedTime}`;
  }
  

  return (
    <div>
        <Link to="/">
      <button className='homebutton'>홈으로</button>
      </Link>
      <h1>매출 관리/조회 페이지</h1>
      <div className="daySel">
        <label className="dayselLabel" htmlFor="month">월: </label>
        <input
          type="number"
          id="month"
          value={month || ""}
          onChange={(e) => setMonth(e.target.value)}
        />
        <label className="dayselLabel" htmlFor="day">일: </label>
        <input
          type="number"
          id="day"
          value={day || ""}
          onChange={(e) => setDay(e.target.value)}
        />
      </div>
      <div className="infoRevenue">
        <p>현금: {numberWithCommas(cashTotal)}원</p>
        <p>카드: {numberWithCommas(cardTotal)}원</p>
        <p>총합: {numberWithCommas(total)}원</p>
      </div>
      <table>
        <thead>
          <tr>
            <th>주문번호</th>
            <th>상품이름</th>
            <th>수량</th>
            <th>가격</th>
            <th>총 금액</th>
            <th>결제 방식</th>
            <th>주문 시간</th>
          </tr>
        </thead>
        <tbody>
          {orderList.map((order) => (
            <tr key={order.idx}>
              <td>{order.order_number}</td>
              <td>{order.item_name}</td>
              <td>{order.quantity}</td>
              <td>{numberWithCommas(order.price)}원</td>
              <td>{numberWithCommas(order.total_price)}원</td>
              {order.payment_type === "현금" ? (
                <td className="cash">{order.payment_type}    {numberWithCommas(order.amount_given)}</td>
              ) : (
                <td className="card">{order.payment_type}</td>
              )}
              <td>{formatOrderTime(order.order_time)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Revenue;
