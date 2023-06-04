import React, { useEffect, useState } from "react";
import ManagerViewTable from "./ManagerViewTable";
import "./ManagerView.css";
import Modal from "./Modal";
import { numberWithCommas } from "../utils.js";
import axios from "axios";

const ManagerView = ({ addItem, items, removeItem, onMinus, onPlus }) => {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [barcode, setBarcode] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [total, setTotal] = useState(0);
  const [paymentType, setPaymentType] = useState("현금");
  const [amountGiven, setAmountGiven] = useState(0);
  const [change, setChange] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [activeModal, setActiveModal] = useState(null);

  const predefinedItems = [
    { name: "네일", quantity: 1, price: 10000 },
    { name: "기초", quantity: 1, price: 20000 },
    { name: "헤어", quantity: 1, price: 30000 },
    { name: "향수", quantity: 1, price: 40000 },
    { name: "기타", quantity: 1, price: 50000 },
  ];
  const handleItemClick = (item) => {
    setName(item.name);
    setQuantity(item.quantity);
    setPrice(item.price);
    addItem(item);
    setActiveModal(null); // 모달창 닫기
  };
  const handleCloseModal2 = () => {
    setActiveModal(null);
  };

  const handleBarcodeChange = (e) => {
    setBarcode(e.target.value);
  };

  const handleKeyPress = async (e) => {
    if (e.key === "Enter") {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/items/${barcode}`
        );
        const data = response.data;
        if (data && data.이름 && data.가격) {
          addItem({
            barcode: barcode,
            name: data.이름,
            quantity: 1,
            price: data.가격,
          });
        } else {
          alert("등록되지 않은 바코드입니다.");
        }

        setBarcode("");
      } catch (e) {
        console.error(e);
        alert("상품 검색에 실패하였습니다.");
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !quantity || !price) {
      alert("모든 필드를 채워주세요!");
      return;
    }

    addItem({
      id: barcode ? barcode : Math.random().toString(36).substr(2, 9),
      name: name.trim(),
      quantity: Number(quantity),
      price: Number(price),
    });

    setBarcode("");
    setName("");
    setQuantity("");
    setPrice("");
  };

  function generateOrderNumber() {
    const now = new Date();
    const year = now.getFullYear().toString().substr(-2);
    const month = now.getMonth() + 1;
    const day = now.getDate();
    const randomNum = Math.floor(Math.random() * 10000);

    return `W${year}${month}${day}${randomNum}`;
  }
  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const handleCloseModal = () => {
    setMenuOpen(false);
  };

  const handlePaymentType = (type) => {
    setPaymentType(type);
  };

  const handleInputAmount = (value) => {
    setAmountGiven(value);
    setChange(value - total);
  };
  const removeAllItems = () => {
    items.forEach((item) => {
      removeItem(item.name);
    });
  };
  const handlePayment = () => {
    if (paymentType === "현금" && change < 0) {
      alert("받은 금액이 부족합니다.");
      return;
    } else {
      const orderNumber = generateOrderNumber(); // 주문번호 생성
      // 주문 정보를 서버에 보낼 데이터 형식으로 변경
      const requestData = items.map((item) => ({
        orderNumber: orderNumber,
        itemName: item.name,
        quantity: item.quantity,
        price: item.price,
        paymentType,
        amountGiven,
        totalPrice: total,
        change,
      }));

      console.log(requestData);
      axios
        .post("http://localhost:5000/api/orderSuccess", requestData)
        .then((res) => {
          console.log(res.data);
          removeAllItems();
        })
        .catch((err) => {
          console.log(err);
        });
    }
    console.log(items);
    console.log("결제 정보를 데이터베이스에 저장하십시오.");

    setPaymentType("현금");
    setAmountGiven(0);
    setChange(0);
    alert("결제가 완료되었습니다.");
    setShowModal(false);
  };

  const renderNumberPad = () => {
    return (
      <div className="numberpad">
        <button onClick={() => handleInputAmount(amountGiven * 10 + 1)}>
          1
        </button>
        <button onClick={() => handleInputAmount(amountGiven * 10 + 2)}>
          2
        </button>
        <button onClick={() => handleInputAmount(amountGiven * 10 + 3)}>
          3
        </button>
        <button onClick={() => handleInputAmount(amountGiven * 10 + 4)}>
          4
        </button>
        <button onClick={() => handleInputAmount(amountGiven * 10 + 5)}>
          5
        </button>
        <button onClick={() => handleInputAmount(amountGiven * 10 + 6)}>
          6
        </button>
        <button onClick={() => handleInputAmount(amountGiven * 10 + 7)}>
          7
        </button>
        <button onClick={() => handleInputAmount(amountGiven * 10 + 8)}>
          8
        </button>
        <button onClick={() => handleInputAmount(amountGiven * 10 + 9)}>
          9
        </button>
        <button onClick={() => handleInputAmount(Math.floor(amountGiven / 10))}>
          {"<"}
        </button>
        <button onClick={() => handleInputAmount(amountGiven * 10)}>0</button>
        <button onClick={() => handleInputAmount(Math.floor(amountGiven / 10))}>
          {"<"}
        </button>
      </div>
    );
  };

  const totalPrice = items.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);

  useEffect(() => {
    setTotal(totalPrice);
  }, [totalPrice]);

  return (
    <div>
      <h3>뷰티 화장품</h3>
      <button className="paybutton" onClick={() => setShowModal(true)}>
        결제
      </button>
      {showModal && (
        <div className="modal22">
          <div className="modal-content22">
            <div className="modal-columns">
              <div className="modal-left">
                <div className="buttonspay">
                  <button onClick={() => setShowModal(false)}>닫기</button>

                  <div className="paymentType">
                    <button
                      className="cashbutton"
                      onClick={() => handlePaymentType("현금")}
                    >
                      현금 결제
                    </button>
                    <button
                      className="cardbutton"
                      onClick={() => handlePaymentType("카드")}
                    >
                      카드 결제
                    </button>
                  </div>
                </div>
                {paymentType === "현금" && (
                  <div>
                    <div>받은 금액: {numberWithCommas(amountGiven)}원</div>
                    <br />
                    <div>결제 금액: {numberWithCommas(totalPrice)}원</div>
                    <br />
                    <div>거스름돈: {numberWithCommas(change)}원</div>
                  </div>
                )}
                {paymentType === "카드" && (
                  <div>
                    <div>결제 금액: {numberWithCommas(totalPrice)}원</div>
                  </div>
                )}
                <button className="confirm" onClick={handlePayment}>
                  결제
                </button>
              </div>
              <div className="modal-right">{renderNumberPad()}</div>
            </div>
          </div>
        </div>
      )}
      <button className="menuButton" onClick={handleMenuToggle}>
        관리
      </button>
      {menuOpen && <Modal handleClose={handleCloseModal} />}
      {activeModal === "itemSelection" && (
        <div className="item-selection-modal"
        handleClose={handleCloseModal2}>
          <div className="modal-content">
            <div className="item-buttons">
              {predefinedItems.map((item) => (
                <button key={item.name} onClick={() => handleItemClick(item)}>
                  {item.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <label>
            <input
              className="textIn"
              type="text"
              value={name}
              placeholder="상품명"
              //onClick={() => setActiveModal("itemSelection")}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label>
            <input
              className="numberIn"
              type="number"
              value={quantity}
              placeholder="수량"
              onChange={(e) => setQuantity(e.target.value)}
            />
          </label>
          <label>
            <input
              className="numberIn"
              type="number"
              value={price}
              placeholder="가격"
              onChange={(e) => setPrice(e.target.value)}
            />
          </label>
          <button className="buttonIn" onClick={handleSubmit}>
            추가하기
          </button>
        </form>
      </div>
      <div className="barcodeDiv">
        <input
          className="barcode"
          value={barcode}
          type="number"
          placeholder="바코드 입력"
          onChange={handleBarcodeChange}
          onKeyDown={handleKeyPress}
          autoFocus
        />
        <button className="barcodeBu">추가하기</button>
      </div>
      <ManagerViewTable
        items={items}
        removeItem={removeItem}
        onMinus={onMinus}
        onPlus={onPlus}
        showDeleteButton={true}
        total={total}
      />
    </div>
  );
};

export default ManagerView;
