import { useEffect, useState } from 'react';
import usePreventZoom from '../preventZoom';
import gameImage from '../assets/whereswaldo.jpg';
import target from '../assets/icons8-target-32.png';
import ClickMenu from '../ClickMenu/ClickMenu';
import './Game.css';

function Game({
  isGameStart,
  setIsGameStart,
  setIsGameOver,
  characters,
  setCharacters,
  setElapsedTime,
}) {
  const [click, setClick] = useState(false);
  const [mousePosition, setMousePosition] = useState({});
  const [wrongCharacterModal, setWrongCharacterModal] = useState(false);

  usePreventZoom();

  useEffect(() => {
    async function startTimer() {
      try {
        const response = await fetch(`http://localhost:3000/`);

        if (!response.ok) {
          console.error('Error');
        }

        const responseData = await response.json();
        console.log(responseData);
      } catch (err) {
        console.error(err);
      }
    }
    startTimer();
  }, [isGameStart]);

  function handleClick(e) {
    const xPercentage = (e.pageX / window.innerWidth) * 100;
    const yPercentage = (e.pageY / window.innerHeight) * 100;

    if (wrongCharacterModal) {
      setClick(false);
      setWrongCharacterModal(false);
    } else {
      setClick(!click);
      setWrongCharacterModal(false);
    }

    setMousePosition({
      x: xPercentage,
      y: yPercentage,
    });
  }

  function closeModal() {
    setWrongCharacterModal(!wrongCharacterModal);
  }

  const targetStyle = {
    position: 'absolute',
    top: `${mousePosition.y - 1.5}%`,
    left: `${mousePosition.x - 0.2}%`,
  };

  async function checkGameOver() {
    const filterFound = characters.filter((char) => {
      if (char.found === true) {
        return char;
      }
    });

    if (filterFound.length === 3) {
      try {
        const response = await fetch(`http://localhost:3000/gameover`);

        if (!response.ok) {
          console.error('Error');
        }

        const responseData = await response.json();
        setElapsedTime(responseData);
      } catch (err) {
        console.error(err);
      } finally {
        setIsGameOver(true);
        setIsGameStart(false);
      }
    }
  }

  useEffect(() => {
    checkGameOver();
  }, [characters]);

  return (
    <>
      <section>
        <h2>Find These Characters:</h2>

        {characters.map((character) => {
          if (!character.found) {
            return (
              <div key={character.name}>
                <img src={character.src} alt={character.alt} />
                {character.name}
              </div>
            );
          } else {
            return (
              <div key={character.name} className='found'>
                <img src={character.src} alt={character.alt} />
                {character.name}
              </div>
            );
          }
        })}
      </section>

      <main>
        <div>
          <img
            src={gameImage}
            alt='wheres-waldo'
            id='whereswaldo'
            onClick={(e) => handleClick(e)}></img>
          {click && (
            <>
              <img style={targetStyle} src={target} alt='target' id='target' />
              <ClickMenu
                click={click}
                onClick={closeModal}
                setClick={setClick}
                mousePosition={mousePosition}
                characters={characters}
                setCharacters={setCharacters}
                wrongCharacterModal={wrongCharacterModal}
                setWrongCharacterModal={setWrongCharacterModal}
                checkGameOver={checkGameOver}
              />
            </>
          )}
        </div>
        {wrongCharacterModal && (
          <div className='wrongCharacterModal' style={targetStyle}>
            Wrong Character... Try again.
          </div>
        )}
      </main>
    </>
  );
}

export default Game;
