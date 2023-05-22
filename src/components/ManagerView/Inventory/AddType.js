import React, { useState } from "react";

const AddType = ({ handleType }) => {
  const [typeName, setTypeName] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
    handleType({ name: typeName });
    setTypeName("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="typeName"
        value={typeName}
        onChange={(event) => setTypeName(event.target.value)}
        placeholder="상품 종류"
        required
      />
      <button type="submit">종류 추가하기</button>
    </form>
  );
};

export default AddType;
