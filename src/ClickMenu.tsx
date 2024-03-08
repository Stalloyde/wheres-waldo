import { useState } from 'react';
import './ClickMenu.css';

function ClickMenu({ setClick, mousePosition }) {
  const clickMenuStyle = {
    position: 'absolute',
    top: `${mousePosition.y + 0.5}%`,
    left: `${mousePosition.x + 0.5}%`,
  };

  async function handleClick(e) {
    e.preventDefault();
    const formData = new FormData();
    const targetCharacterName = e.target.textContent.trim();
    formData.append('targetCharacterName', targetCharacterName);
    formData.append('xCoordinate', mousePosition.x);
    formData.append('yCoordinate', mousePosition.y);

    try {
      const response = await fetch(`http://localhost:3000/`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        console.error('Error');
      } else {
        const responseData = await response.json();
        console.log(responseData);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setClick(false);
    }
  }

  return (
    <>
      <ul style={clickMenuStyle}>
        Who's this?
        <li>
          <button onClick={handleClick} name='targetCharacterName'>
            Wizard
          </button>
        </li>
        <li>
          <button onClick={handleClick} name='targetCharacterName'>
            Wally
          </button>
        </li>
        <li>
          <button onClick={handleClick} name='targetCharacterName'>
            Odlaw
          </button>
        </li>
      </ul>
    </>
  );
}

export default ClickMenu;
