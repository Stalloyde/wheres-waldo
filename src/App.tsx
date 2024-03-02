import { useState } from 'react';
import gameImage from './assets/whereswaldo.jpg';
import wizardImage from './assets/wizard.gif';
import wallyImage from './assets/wally-standing.png';
import odlawImage from './assets/odlaw.gif';
import './App.css';

function App() {
  return (
    <body>
      <section>
        <h2>Characters</h2>
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
      </section>

      <main>
        <div>
          *Insert timer here*
          <img src={gameImage} alt='wheres-waldo'></img>
        </div>
      </main>
    </body>
  );
}

export default App;
