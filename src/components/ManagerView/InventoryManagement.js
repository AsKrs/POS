import React, { useState, useEffect } from "react";
import Modal from "./Modal";

const InventoryManagement = () => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // API 호출을 통해 아이템 데이터를 가져와 items 상태를 설정합니다.
    // 예시: fetchItems().then(setItems);
  }, []);

  const handleInventory = () => {
    // 재고 수량 추가 및 수정 로직 작성
  };

  const handleRevenue = () => {
    // 매출 관리 및 조회 로직 작성
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  return (
    <div className="inventory-management">
      <h1>재고 관리/조회</h1>
      <button onClick={handleOpenModal}>관리 목록</button>
      {showModal && (
        <Modal
          handleClose={handleCloseModal}
          handleInventory={handleInventory}
          handleRevenue={handleRevenue}
        />
      )}
    </div>
  );
};

export default InventoryManagement;
