import React, { useState } from 'react';
import './InventoryManagement.css';
import AddProduct from './AddProduct';
import AddBrand from './AddBrand';
import InventoryTable from './InventoryTable';
import { Link } from 'react-router-dom';

const InventoryManagement = ({ handleInventory }) => {
  const [viewMode, setViewMode] = useState('addProduct');

  function renderForm() {
    switch (viewMode) {
      case 'addProduct':
        return <AddProduct  />;
      case 'addBrand':
        return <AddBrand  />;
      default:
        return <AddProduct  />;
    }
  }

  return (
    <div className="inventory-management">
      <Link to="/">
      <button className='homebutton'>홈으로</button>
      </Link>
      <h1>재고 관리</h1>

      <div className="buttonHandler">
        <div className="buttons">
          <button
            className={`productButton${viewMode === 'addProduct' ? ' active' : ''}`}
            onClick={() => setViewMode('addProduct')}
          >
            상품 추가하기
          </button>
          <button
            className={`brandButton${viewMode === 'addBrand' ? ' active' : ''}`}
            onClick={() => setViewMode('addBrand')}
          >
            브랜드 / 종류 수정
          </button>
          
        </div>
      </div>
      {/* 별도의 폼 컴포넌트를 렌더링합니다. */}
      {renderForm()}
      <div>
      {viewMode === 'addProduct' && <InventoryTable handleInventory={handleInventory} />}

      </div>
    </div>
  );
};

export default InventoryManagement;
