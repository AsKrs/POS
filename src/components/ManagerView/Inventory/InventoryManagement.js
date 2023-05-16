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
        return <AddProduct handleProduct={handleInventory} />;
      case 'addBrand':
        return <AddBrand handleBrand={handleInventory} />;
      default:
        return <AddProduct handleProduct={handleInventory} />;
    }
  }

  return (
    <div className="inventory-management">
      <Link to="/">
      <button className='homebutton'>홈으로</button>
      </Link>
      <h1>재고 관리</h1>

      {/* 버튼 클릭 이벤트에 맞춰 react state 값을 바꾸어 보여주는 form을 동적으로 구성한다. */}
      <div className="buttonHandler">
        {/* 기존의 buttons 클래스 안에 있는 내용을 삭제하고 새로 생성된 버튼들을 추가합니다. */}
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
