import { useState } from 'react';
import gameImage from './assets/whereswaldo.jpg';
import wizardImage from './assets/wizard.gif';
import wallyImage from './assets/wally-standing.png';
import odlawImage from './assets/odlaw.gif';
import ClickMenu from './ClickMenu';
import target from './assets/icons8-target-32.png';
import './App.css';

function App() {
  const [click, setClick] = useState(false);
  const [mousePosition, setMousePosition] = useState({});

  function handleClick(e) {
    setClick(true);
    setMousePosition({
      x: e.clientX + 10,
      y: e.clientY + 10,
    });
  }

  const targetStyle = {
    position: 'absolute',
    top: mousePosition.y - 20,
    left: mousePosition.x - 20,
  };

  return (
    <>
      <section>
        <h2>Find These Characters:</h2>
        <div>
          <img src={wizardImage} alt='wizard' />
          Wizard
        </div>
        <div>
          <img src={wallyImage} alt='wally' />
          Wally
        </div>
        <div>
          <img src={odlawImage} alt='odlaw' />
          Odlow
        </div>
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
              <ClickMenu setClick={setClick} mousePosition={mousePosition} />
            </>
          )}
        </div>
      </main>
    </>
  );
}

export default App;
