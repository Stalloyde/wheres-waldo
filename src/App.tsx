import { useState } from 'react';
import usePreventZoom from './preventZoom';
import gameImage from './assets/whereswaldo.jpg';
import wizardImage from './assets/wizard.gif';
import waldoImage from './assets/waldo-standing.png';
import odlawImage from './assets/odlaw.gif';
import ClickMenu from './ClickMenu';
import target from './assets/icons8-target-32.png';
import './App.css';

function App() {
  const [click, setClick] = useState(false);
  const [mousePosition, setMousePosition] = useState({});
  const [wrongCharacterModal, setWrongCharacterModal] = useState(false);
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

  characters.map((char) => console.log(char));
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

        <div id='timer'>00:00:00</div>
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

export default App;
