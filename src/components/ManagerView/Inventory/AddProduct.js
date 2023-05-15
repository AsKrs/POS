import React, { useState } from "react";

const AddProduct = ({ handleProduct }) => {
const [barcode, setBarcode] = useState("");
const [name, setName] = useState("");
const [price, setPrice] = useState("");
const [quantity, setQuantity] = useState("");
const [type, setType] = useState("");
const [brand, setBrand] = useState("");


const handleSubmit = (event) => {
event.preventDefault();
const newInventory = {
barcode: barcode,
name: name,
price: price,
quantity: quantity,
type: type,
brand: brand,
};
handleProduct(newInventory);
setBarcode("");
setName("");
setPrice("");
setQuantity("");
setType("");
setBrand("");
};

const brandList = [
    { id: 1, name: 'Branding' },
    { id: 2, name: 'New Brand' },
    // ...
    ]
    
    
    const typeList = [
    { id: 1, name: 'Digital' },
    { id: 2, name: 'Physical' },
    // ...
    ]


  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={barcode}
        onChange={(event) => setBarcode(event.target.value)}
        placeholder="바코드"
      />
      <input
        type="text"
        value={name}
        onChange={(event) => setName(event.target.value)}
        placeholder="이름"
      />
      <input
        type="text"
        value={price}
        onChange={(event) => setPrice(event.target.value)}
        placeholder="가격"
      />
      <input
        type="text"
        value={quantity}
        onChange={(event) => setQuantity(event.target.value)}
        placeholder="수량"
      />
      <select value={type} onChange={(event) => setType(event.target.value)}>
        <option value="">종류 선택</option>
        {typeList.map((t) => (
          <option key={t.id} value={t.name}>
            {t.name}
          </option>
        ))}
      </select>

      <select value={brand} onChange={(event) => setBrand(event.target.value)}>
        <option value="">브랜드 선택</option>
        {brandList.map((b) => (
          <option key={b.id} value={b.name}>
            {b.name}
          </option>
        ))}
      </select>
      <button type="submit">추가</button>
    </form>
  );
};

export default AddProduct;