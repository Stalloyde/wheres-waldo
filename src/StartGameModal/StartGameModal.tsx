import { useState } from 'react';
import './StartGameModal.css';

function StartGameModal({ setIsGameStart, characters }) {
  function startGame() {
    setIsGameStart(true);
  }

  return (
    <div className='startGameModal'>
      <div>
        <h1>How To Play:</h1>
        Look for these three characters as quickly as possible!
      </div>
      <div>
        <div className='startGameModalImgContainer'>
          {characters.map((character) => {
            return (
              <div key={character.name}>
                <img
                  src={character.src}
                  alt={character.alt}
                  className='startGameModalImg'
                />
                {character.name}
              </div>
            );
          })}
        </div>
      </div>

      <button onClick={startGame}>Play</button>
    </div>
  );
}

export default StartGameModal;
