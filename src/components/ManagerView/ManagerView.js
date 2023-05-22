import React, { useEffect, useState } from "react";
import ManagerViewTable from "./ManagerViewTable";
import "./ManagerView.css";
import Modal from "./Modal";
import { numberWithCommas } from "../utils.js";

const ManagerView = ({ addItem, items, removeItem, onMinus, onPlus }) => {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [barcode, setBarcode] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [total, setTotal] = useState(0);
  const [paymentType, setPaymentType] = useState("cash");
  const [amountGiven, setAmountGiven] = useState(0);
  const [change, setChange] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const handleBarcodeChange = (e) => {
    setBarcode(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      console.log(barcode);
      setBarcode("");
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

    setName("");
    setQuantity("");
    setPrice("");
    setBarcode("");
  };

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

  const handlePayment = () => {
    if (paymentType === "cash" && change < 0) {
      alert("받은 금액이 부족합니다.");
      return;
    }

    console.log("결제 정보를 데이터베이스에 저장하십시오.");

    setPaymentType(null);
    setAmountGiven(0);
    setChange(0);
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
                      onClick={() => handlePaymentType("cash")}
                    >
                      현금 결제
                    </button>
                    <button
                      className="cardbutton"
                      onClick={() => handlePaymentType("card")}
                    >
                      카드 결제
                    </button>
                  </div>
                </div>
                {paymentType === "cash" && (
                  <div>
                    <div>받은 금액: {numberWithCommas(amountGiven)}원</div>
                    <br />
                    <div>결제 금액: {numberWithCommas(totalPrice)}원</div>
                    <br />
                    <div>거스름돈: {numberWithCommas(change)}원</div>
                  </div>
                )}
                {paymentType === "card" && (
                  <div>
                    <div>결제 금액: {totalPrice}원</div>
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
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <label>
            <input
              className="textIn"
              type="text"
              value={name}
              placeholder="상품명"
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label>
            <input
              className="numberIn"
              type="number"
              placeholder="수량"
              onChange={(e) => setQuantity(e.target.value)}
            />
          </label>
          <label>
            <input
              className="numberIn"
              type="number"
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
