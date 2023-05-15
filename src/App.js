import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CustomerView from "./components/CustomerView/CustomerView";
import ManagerView from "./components/ManagerView/ManagerView.js";
import InventoryManagement from "./components/ManagerView/Inventory/InventoryManagement.js";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    socket.on("setItems", (items) => {
      setItems(items);
    });

    socket.on("updatedItems", (updatedItems) => {
      setItems(updatedItems);
    });

    return () => {
      socket.removeListener("setItems");
      socket.removeListener("updatedItems");
    };
  }, []);

  const addItem = (newItem) => {
    // 기존 상품 찾아보기
    const existingItem = items.find((item) => item.name === newItem.name);
  
    if (existingItem) {
      // 기존 상품이 있는 경우 수량만 증가시키기
      socket.emit("incrementQuantity", newItem.name, newItem.quantity);
    } else {
      // 새 상품인 경우 추가하기
      socket.emit("addItem", newItem);
    }
  };
  
  const removeItem = (name) => {
    console.log(name);
    socket.emit("removeItem", name);
  };

  const minus = (name) => {
    socket.emit("decrementQuantity", name);
  };

  const plus = (name) => {
    socket.emit("incrementQuantity", name);
  };


  return (
    <Router>
      <Routes>
        <Route path="/Customer" element={<CustomerView items={items} />} />
        <Route
          index
          path="/"
          element={
            <ManagerView
              addItem={addItem}
              items={items}
              removeItem={removeItem}
              onMinus={minus}
              onPlus={plus}
            />
          }
        />
        <Route path="/Inventory" element={<InventoryManagement/>}/>
      </Routes>
    </Router>
  );
}

export default App;
