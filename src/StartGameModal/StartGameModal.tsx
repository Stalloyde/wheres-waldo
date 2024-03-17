import { useState } from 'react';
import './StartGameModal.css';

function StartGameModal({ setIsGameStart, characters }) {
  async function startGame() {
    setIsGameStart(true);
  }

  return (
    <div className='startGameModal'>
      <div>
        <h1>How To Play:</h1>
        Look for these three characters as quickly as possible!
      </div>
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

      <div className='leaderboard'>
        <h2>Leaderboard:</h2>
        <div>
          <ol>
            <li>1</li>
            <li>2</li>
            <li>3</li>
            <li>4</li>
            <li>5</li>
            <li>6</li>
            <li>7</li>
            <li>8</li>
            <li>9</li>
            <li>10</li>
          </ol>
        </div>
      </div>
      <button onClick={startGame}>Play</button>
    </div>
  );
}

export default StartGameModal;
