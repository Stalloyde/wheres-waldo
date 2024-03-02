import { useState } from 'react';
import React from 'react';
import target from './assets/icons8-target-32.png';
import './ClickMenu.css';

function ClickMenu({ setClick, mousePosition }) {
  const clickMenuStyle = {
    position: 'absolute',
    top: mousePosition.y,
    left: mousePosition.x,
  };

  function handleClick() {
    setClick(false);
  }
  return (
    <>
      <ul style={clickMenuStyle}>
        Who's this?
        <li>
          <button onClick={handleClick}>Wizard</button>
        </li>
        <li>
          <button onClick={handleClick}>Wally</button>
        </li>
        <li>
          <button onClick={handleClick}>Odlaw</button>
        </li>
      </ul>
    </>
  );
}

export default ClickMenu;