import { useEffect, useState } from 'react';
import usePreventZoom from './preventZoom';
import wizardImage from './assets/wizard.gif';
import waldoImage from './assets/waldo-standing.png';
import odlawImage from './assets/odlaw.gif';
import EndGameModal from './EndGameModal/EndGameModal';
import StartGameModal from './StartGameModal/StartGameModal';
import Game from './Game/Game';

function App() {
  const [isGameOver, setIsGameOver] = useState(false);
  const [isGameStart, setIsGameStart] = useState(false);
  const [characters, setCharacters] = useState([
    {
      name: 'Wizard',
      found: false,
      src: wizardImage,
      alt: 'Wizard',
    },
    {
      name: 'Waldo',
      found: false,
      src: waldoImage,
      alt: 'Waldo',
    },
    {
      name: 'Odlaw',
      found: false,
      src: odlawImage,
      alt: 'Odlaw',
    },
  ]);

  usePreventZoom();

  return (
    <>
      {isGameOver ? (
        <EndGameModal
          setGameOver={setIsGameOver}
          setCharacters={setCharacters}
          characters={characters}
        />
      ) : !isGameStart ? (
        <StartGameModal
          setIsGameStart={setIsGameStart}
          characters={characters}
        />
      ) : (
        isGameStart && (
          <Game
            isGameStart={isGameStart}
            setIsGameStart={setIsGameStart}
            isGameOver={isGameOver}
            setIsGameOver={setIsGameOver}
            setCharacters={setCharacters}
            characters={characters}
          />
        )
      )}
    </>
  );
}

export default App;
