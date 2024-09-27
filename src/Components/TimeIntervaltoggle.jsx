import React from 'react';
import { Dropdown } from 'react-bootstrap';

const TimeIntervaltoggle = ({ onChangeInterval }) => {
  const handleSelect = (interval) => {
    if (onChangeInterval) {
      onChangeInterval(interval); 
    }
  };

  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Select Interval
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={() => handleSelect('1m')}>1 Minute</Dropdown.Item>
        <Dropdown.Item onClick={() => handleSelect('5m')}>5 Minutes</Dropdown.Item>
        <Dropdown.Item onClick={() => handleSelect('15m')}>15 Minutes</Dropdown.Item>
        <Dropdown.Item onClick={() => handleSelect('1h')}>1 Hour</Dropdown.Item>
        <Dropdown.Item onClick={() => handleSelect('1d')}>1 Day</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default TimeIntervaltoggle;
