import { useState } from 'react';
import './EndGameModal.css';

function EndGameModal({ setGameOver, setCharacters, characters }) {
  function restartGame() {
    setGameOver(false);

    const updatedCharacters = characters.map((prevState) => {
      return {
        name: prevState.name,
        found: false,
        src: prevState.src,
        alt: prevState.alt,
      };
    });
    setCharacters(updatedCharacters);
  }

  return (
    <div className='endGameModal'>
      <div>
        <h1>You Found Them!</h1>
        <div className='found2-container'>
          {characters.map((character) => {
            return (
              <div key={character.name} className='found2'>
                <img src={character.src} alt={character.alt} />
              </div>
            );
          })}
        </div>
      </div>

      <div className='time'>
        <h2>Your Time:</h2>
        <div>5:02:30</div>
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

      <div>
        <button onClick={restartGame}>Play Again</button>
      </div>
    </div>
  );
}

export default EndGameModal;
