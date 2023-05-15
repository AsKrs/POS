import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AddBrand.css";

const AddBrand = ({ handleBrand, handleType }) => {
  const [brandNameAdd, setBrandNameAdd] = useState(); // brandNameAdd = [{}]
  const [typeNameAdd, setTypeNameAdd] = useState(); // typeNameAdd = [{}]
  const [brandName, setBrandName] = useState([]);
  const [typeName, setTypeName] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/brands").then((res) => {
      setBrandName(res.data);
      console.log(res.data);
    });
    axios.get("http://localhost:5000/api/types").then((res) => {
      setTypeName(res.data);
      console.log(res.data);
    });
  }, []);

  const handlerBrandNameAdd = (event) => {
    setBrandNameAdd(event.target.value);
  };

  const handlerTypeNameAdd = (event) => {
    setTypeNameAdd(event.target.value);
  };

  const handleSubmitBrand = (event) => {
    // 중복 여부 검사
    const exists = brandName.some((brand) => brand.브랜드 === brandNameAdd);
    if (exists) {
      alert("이미 등록된 브랜드입니다.");
    } else {
      axios.post("http://localhost:5000/api/brandsAdd", { name: brandNameAdd }).then(() => {
        axios.get("http://localhost:5000/api/brands").then((res) => {
          setBrandName(res.data);
          console.log(res.data);
        });
      });
    }
    event.preventDefault();
  };

  const handleSubmitType = (event) => {
    // 중복 여부 검사
    const exists = typeName.some((type) => type.types === typeNameAdd);
    if (exists) {
      alert("이미 등록된 종류입니다.");
    } else {
      axios.post("http://localhost:5000/api/typesAdd", { name: typeNameAdd }).then(() => {
        axios.get("http://localhost:5000/api/types").then((res) => {
          setTypeName(res.data);
          console.log(res.data);
        });
      });
    }
    event.preventDefault();
  };

  const handleUpdate = (index) => {
    // 추가 기능 생략
  };

  const handleDelete = (index) => {
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      const updatedList = brandName.filter((_, i) => i !== index);
      setBrandName(updatedList);
      handleBrand(updatedList);
    }
  };

  return (
    <>
      <div className="btform">
        <div className="brandform">
          <form onSubmit={handleSubmitBrand}>
            <input
              type="text"
              name="brandName"
              value={brandNameAdd}
              onChange={handlerBrandNameAdd}
              placeholder="브랜드명"
              required
            />
            <button type="submit">브랜드 추가하기</button>
          </form>
          <table className="BrandTable">
            <thead>
              <tr>
                <th>브랜드명</th>
                <th>삭제</th>
              </tr>
            </thead>
            <tbody>
              {brandName.map((brand, index) => (
                <tr key={index} onClick={() => handleUpdate(index)}>
                  <td>{brand.브랜드}</td>
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
        </div>
        <div className="typeform">
          <form onSubmit={handleSubmitType}>
            <input
              type="text"
              name="typeName"
              value={typeNameAdd}
              onChange={handlerTypeNameAdd}
              placeholder="종류명"
              required
            />
            <button type="submit">종류 추가하기</button>
          </form>
          <table className ="BrandTable">
            <thead>
              <tr>
                <th>종류명</th>
                <th>삭제</th>
              </tr>
            </thead>
            <tbody>
              {typeName.map((type, index) => (
                <tr key={index} onClick={() => handleUpdate(index)}>
                  <td>{type.types}</td>
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
        </div>
      </div>
    </>
  );
};

export default AddBrand;
