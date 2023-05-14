// Modal.js
import React from "react";
import "./Modal.css";
import { Link } from "react-router-dom";

const Modal = ({ handleClose, handleInventory, handleRevenue }) => (
  <div className="modal" onClick={handleClose}>
    <div
      className="modal-content"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <Link to="/inventory">
      <div className="modal-button" onClick={handleInventory}>
        재고 관리/조회
      </div>
      </Link>
      <div className="modal-button" onClick={handleRevenue}>
        매출 관리/조회
      </div>
    </div>
  </div>
);

export default Modal;
