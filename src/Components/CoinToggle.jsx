import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { FaEthereum, FaBtc, FaDotCircle } from 'react-icons/fa'; // Importing icons

const CoinToggle = ({ onChangeCoin }) => {
  return (
    <Dropdown className="my-2">
      <Dropdown.Toggle
        variant="success"
        id="dropdown-basic"
        className="w-100 shadow-sm"
      >
        Select Cryptocurrency
      </Dropdown.Toggle>

      <Dropdown.Menu className="w-100 shadow">
        <Dropdown.Item
          onClick={() => onChangeCoin('ETHUSDT')}
          className="d-flex align-items-center"
        >
          <FaEthereum className="me-2" /> ETH/USDT
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => onChangeCoin('BNBUSDT')}
          className="d-flex align-items-center"
        >
          <FaBtc className="me-2" /> BNB/USDT
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => onChangeCoin('DOTUSDT')}
          className="d-flex align-items-center"
        >
          <FaDotCircle className="me-2" /> DOT/USDT
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default CoinToggle;
