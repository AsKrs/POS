import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AddProduct.css";


const AddProduct = () => {
  const [barcode, setBarcode] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [type, setType] = useState("");
  const [brand, setBrand] = useState("");
  const [brandList, setBrandList] = useState([]);
  const [typeList, setTypeList] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/brands").then((res) => {
      setBrandList(res.data);
    });
  }, []);

  useEffect(() => {
    axios.get("http://localhost:5000/api/types").then((res) => {
      setTypeList(res.data);
    });
  }, []);

  const handleSubmit = () => {
    if (!barcode || !name || !price || !quantity || !type || !brand) {
      alert("모든 필드를 입력해주세요.");
      return;
    } else if (isNaN(price) || isNaN(quantity)) {
      alert("가격과 수량은 숫자로 입력해주세요.");
      return;
    } else if (price < 0 || quantity < 0) {
      alert("가격과 수량은 0 이상으로 입력해주세요.");
      return;
    }
    const newInventory = {
      barcode: barcode,
      name: name,
      price: price,
      quantity: quantity,
      type: type,
      brand: brand,
    };

    axios
      .post("http://localhost:5000/api/inventoryAdd", newInventory)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    alert("상품이 추가되었습니다.");

    setBarcode("");
    setName("");
    setPrice("");
    setQuantity("");
    setType("");
    setBrand("");
  };

  return (
    <div className="addProduct">
    <form onSubmit={handleSubmit}>
      <input className="addProduct__input"
        type="text"
        value={barcode}
        onChange={(event) => setBarcode(event.target.value)}
        placeholder="바코드"
        autoFocus
        onKeyDown={(event) => {
          if (event.keyCode === 13) {
            event.preventDefault();
            document.querySelector("input[name=name]").focus();
          }
        }}
      />
      <input className="addProduct__input"
        name="name"
        type="text"
        value={name}
        onChange={(event) => setName(event.target.value)}
        placeholder="제품명"
      />

<input className="addProduct__input"
        type="text"
        value={price}
        onChange={(event) => setPrice(event.target.value)}
        placeholder="가격"
      />
      <input className="addProduct__input"
        type="text"
        value={quantity}
        onChange={(event) => setQuantity(event.target.value)}
        placeholder="수량"
      />

      <select className="addProduct__select" value={type} onChange={(event) => setType(event.target.value)}>
        <option value="">종류 선택</option>
        {typeList.map((t) => (
          <option key={t.id} value={t.types}>
            {t.types}
          </option>
        ))}
      </select>

      <select className="addProduct__select" value={brand} onChange={(event) => setBrand(event.target.value)}>
        <option value="">브랜드 선택</option>
        {brandList.map((b) => (
          <option key={b.id} value={b.브랜드}>
            {b.브랜드}
          </option>
        ))}
      </select>
      <button className="addProduct__button"type="submit">추가</button>
    </form>
    </div>
  );
};

export default AddProduct;
