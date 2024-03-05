import './ClickMenu.css';

function ClickMenu({ setClick, mousePosition }) {
  const clickMenuStyle = {
    position: 'absolute',
    top: `${mousePosition.y + 0.5}%`,
    left: `${mousePosition.x + 0.5}%`,
  };

  function handleClick() {
    setClick(false);
  }
  return (
    <>
      <ul style={clickMenuStyle}>
        Who's this?
        <li>
          <button onClick={handleClick}>Wizard</button>
        </li>
        <li>
          <button onClick={handleClick}>Wally</button>
        </li>
        <li>
          <button onClick={handleClick}>Odlaw</button>
        </li>
      </ul>
    </>
  );
}

export default ClickMenu;
