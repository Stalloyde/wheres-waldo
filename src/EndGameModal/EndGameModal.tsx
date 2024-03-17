import { useState } from 'react';
import './EndGameModal.css';

function EndGameModal({
  setGameOver,
  setCharacters,
  characters,
  elapsedTime,
  setElapsedTime,
}) {
  const [username, setUsername] = useState();

  function restartGame(e) {
    e.preventDefault();
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
    setElapsedTime(0);
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
        <div>{elapsedTime}</div>
      </div>

      <form method='post'>
        <div className='inputContainer'>
          <label for='username'>Submit your time to the Leaderboard:</label>
          <input name='username' id='username' value={username}></input>
        </div>

        <div className='buttonContainer'>
          <button>Submit</button>
          <button onClick={restartGame} id='cancelBtn'>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default EndGameModal;
