import React, { useState } from "react";
import ManagerViewTable from "./ManagerViewTable";
import "./ManagerView.css";

const ManagerView = ({ addItem, items, removeItem, onMinus, onPlus }) => {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [barcode, setBarcode] = useState("");

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
      name: name.trim(),
      quantity: Number(quantity),
      price: Number(price)
    });

    setName("");
    setQuantity(0);
    setPrice(0);
  };

  return (
    <div>
      <h3>뷰티 화장품</h3>
      <form onSubmit={handleSubmit}>
        <label>
          <span>상품명 : </span>
          <input className="textIn" type="text" value={name} placeholder="상품명" onChange={(e) => setName(e.target.value)} />
        </label>
        <label>
          <span>수량</span>
          <input className="numberIn" type="number" value={""} placeholder="수량" onChange={(e) => setQuantity(e.target.value)} />
        </label>
        <label>
          <span>가격</span>
          <input className="numberIn" type="number" value={""} placeholder="가격" onChange={(e) => setPrice(e.target.value)} />
        </label>
        <button className="buttonIn" onClick={handleSubmit}>추가하기</button>
      </form>
      <div className="barcodeDiv">
      <input className="barcode" value = {barcode} type="number" placeholder="바코드 입력" onChange={handleBarcodeChange} onKeyDown={handleKeyPress} autoFocus/> 
      <button className="barcodeBu" >추가하기</button>
      </div>
      <ManagerViewTable
        items={items}
        removeItem={removeItem}
        onMinus={onMinus}
        onPlus={onPlus}
        showDeleteButton={true}
      />
    </div>
  );
};

export default ManagerView;
