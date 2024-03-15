import { useState } from 'react';
import './ClickMenu.css';

function ClickMenu({
  click,
  setClick,
  mousePosition,
  characters,
  setCharacters,
  wrongCharacterModal,
  setWrongCharacterModal,
}) {
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
      }

      const responseData = await response.json();
      if (!responseData.name) {
        setWrongCharacterModal(!wrongCharacterModal);
      }

      const updatedCharacters = characters.map((prevState) => {
        if (prevState.name === responseData.name)
          return {
            name: prevState.name,
            found: true,
            src: prevState.src,
            alt: prevState.alt,
          };
        return prevState;
      });
      setCharacters(updatedCharacters);
    } catch (err) {
      console.error(err);
    } finally {
      setClick(!click);
    }
  }

  return (
    <>
      <ul style={clickMenuStyle}>
        Who's this?
        {characters.map((character) => {
          if (!character.found)
            return (
              <li key={character.name}>
                <button onClick={handleClick} name='targetCharacterName'>
                  {character.name}
                </button>
              </li>
            );
        })}
      </ul>
    </>
  );
}

export default ClickMenu;
