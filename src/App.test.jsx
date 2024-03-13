import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import App from './App';
import userEvent from '@testing-library/user-event';
import gameImage from './assets/whereswaldo.jpg';
import { act } from 'react-dom/test-utils';
import wizardImage from './assets/wizard.gif';
import waldoImage from './assets/waldo-standing.png';
import odlawImage from './assets/odlaw.gif';
import ClickMenu from './ClickMenu';

describe('App', () => {
  it('renders page', () => {
    const app = render(<App />);
    expect(app).toMatchSnapshot();
  });
});

describe('Click on game image', () => {
  it('handleClick detects mousePosition correctly', async () => {
    const setClick = vi.fn();
    const setMousePosition = vi.fn();
    const handleClickMock = vi.fn();
    const user = userEvent.setup();

    vi.spyOn(React, 'useState').mockImplementationOnce((initState) => [
      initState,
      setMousePosition,
    ]);

    vi.spyOn(React, 'useState').mockImplementationOnce((initState) => [
      initState,
      setClick,
    ]);

    handleClickMock.mockImplementation((xArg, yArg) => {
      setMousePosition({
        x: xArg + 10,
        y: yArg + 10,
      });
      setClick(true);
    });

    render(
      <img
        src={gameImage}
        alt='wheres-waldo'
        id='whereswaldo'
        onClick={() => handleClickMock(23, 42)}></img>,
    );

    const image = screen.getByRole('img');
    await act(async () => user.click(image));
    expect(setMousePosition).toHaveBeenCalledWith({ x: 33, y: 52 });
    expect(setClick).toHaveBeenCalledWith(true);
  });

  it('Clicking on image click toggles ClickMenu', async () => {
    const user = userEvent.setup();
    render(<App />);

    const gameImage = screen.getByAltText('wheres-waldo');
    await act(async () => user.click(gameImage));
    expect(screen.getByText(`Who's this?`)).toBeInTheDocument();
    expect(screen.getByAltText(`target`)).toBeInTheDocument();

    await act(async () => user.click(gameImage));
    expect(screen.queryByText(`Who's this?`)).not.toBeInTheDocument();
    expect(screen.queryByAltText(`target`)).not.toBeInTheDocument();
  });
});

describe('Picking wrong characters unrenders ClickMenu and renders wrongCharacterModal ', () => {
  beforeEach(async () => {
    const user = userEvent.setup();
    render(<App />);
    const gameImage = screen.getByAltText('wheres-waldo');
    await act(async () => user.click(gameImage));
  });

  it('Wizard ', async () => {
    const user = userEvent.setup();
    const button = screen.getByRole('button', { name: 'Wizard' });
    await act(async () => user.click(button));

    await waitFor(() => {
      expect(screen.queryByText(`Who's this?`)).not.toBeInTheDocument();
      expect(screen.queryByAltText(`target`)).not.toBeInTheDocument();
      expect(
        screen.getByText(`Wrong Character... Try again.`),
      ).toBeInTheDocument();
    });
  });

  it('Waldo', async () => {
    const user = userEvent.setup();
    const button = screen.getByRole('button', { name: 'Waldo' });
    await act(async () => user.click(button));

    await waitFor(() => {
      expect(screen.queryByText(`Who's this?`)).not.toBeInTheDocument();
      expect(screen.queryByAltText(`target`)).not.toBeInTheDocument();
      expect(
        screen.getByText(`Wrong Character... Try again.`),
      ).toBeInTheDocument();
    });
  });

  it('Odlaw', async () => {
    const user = userEvent.setup();
    const button = screen.getByRole('button', { name: 'Odlaw' });
    await act(async () => user.click(button));

    await waitFor(() => {
      expect(screen.queryByText(`Who's this?`)).not.toBeInTheDocument();
      expect(screen.queryByAltText(`target`)).not.toBeInTheDocument();
      expect(
        screen.getByText(`Wrong Character... Try again.`),
      ).toBeInTheDocument();
    });
  });
});

describe('wrongCharacterModal closes', () => {
  it('modal closes when clicking on gameImage', async () => {
    const user = userEvent.setup();
    render(<App />);

    const gameImage = screen.getByAltText('wheres-waldo');
    await act(async () => user.click(gameImage));

    const button = screen.getByRole('button', { name: 'Odlaw' });
    await act(async () => user.click(button));
    await waitFor(() => {
      expect(
        screen.queryByText(`Wrong Character... Try again.`),
      ).toBeInTheDocument();
    });

    await act(async () => user.click(gameImage));
    await waitFor(() => {
      expect(
        screen.queryByText(`Wrong Character... Try again.`),
      ).not.toBeInTheDocument();
    });
  });
});

describe('Picking a correct character updates its found status correctly', () => {
  const mockCharactersNotFound = [
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
  ];

  const setCharacters = vi.fn();
  const handleClickMock = vi.fn();
  const setMousePosition = vi.fn();

  vi.spyOn(React, 'useState').mockImplementationOnce((initState) => [
    initState,
    setCharacters,
  ]);

  vi.spyOn(React, 'useState').mockImplementationOnce((initState) => [
    initState,
    setMousePosition,
  ]);

  beforeEach(() => {
    handleClickMock.mockImplementationOnce((characterName) => {
      const updatedCharacters = mockCharactersNotFound.map((prevState) => {
        if (prevState.name === characterName)
          return {
            name: prevState.name,
            found: true,
            src: prevState.src,
            alt: prevState.alt,
          };

        return prevState;
      });
      setCharacters(updatedCharacters);
    });
  });

  it('Wizard', async () => {
    const user = userEvent.setup();

    render(
      <>
        <ul>
          Who's this?
          {mockCharactersNotFound.map((character) => {
            if (!character.found)
              return (
                <li key={character.name}>
                  <button onClick={() => handleClickMock(character.name)}>
                    {character.name}
                  </button>
                </li>
              );
          })}
        </ul>
      </>,
    );
    const button = screen.getByRole('button', { name: 'Wizard' });
    await act(async () => user.click(button));

    await waitFor(() => {
      expect(setCharacters).toHaveBeenCalledWith([
        {
          name: 'Wizard',
          found: true,
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
    });
  });

  it('Waldo', async () => {
    const user = userEvent.setup();

    render(
      <>
        <ul>
          Who's this?
          {mockCharactersNotFound.map((character) => {
            if (!character.found)
              return (
                <li key={character.name}>
                  <button onClick={() => handleClickMock(character.name)}>
                    {character.name}
                  </button>
                </li>
              );
          })}
        </ul>
      </>,
    );

    const button = screen.getByRole('button', { name: 'Waldo' });
    await act(async () => user.click(button));

    await waitFor(() => {
      expect(setCharacters).toHaveBeenCalledWith([
        {
          name: 'Wizard',
          found: false,
          src: wizardImage,
          alt: 'Wizard',
        },
        {
          name: 'Waldo',
          found: true,
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
    });
  });

  it('Odlaw', async () => {
    const user = userEvent.setup();

    render(
      <>
        <ul>
          Who's this?
          {mockCharactersNotFound.map((character) => {
            if (!character.found)
              return (
                <li key={character.name}>
                  <button onClick={() => handleClickMock(character.name)}>
                    {character.name}
                  </button>
                </li>
              );
          })}
        </ul>
      </>,
    );

    const button = screen.getByRole('button', { name: 'Odlaw' });
    await act(async () => user.click(button));

    await waitFor(() => {
      expect(setCharacters).toHaveBeenCalledWith([
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
          found: true,
          src: odlawImage,
          alt: 'Odlaw',
        },
      ]);
    });
  });
});

describe('Picking a correct character prevent its button from rendering in ClickMenu', () => {
  const mockCharactersFound = [
    {
      name: 'Wizard',
      found: true,
      src: wizardImage,
      alt: 'Wizard',
    },
    {
      name: 'Waldo',
      found: true,
      src: waldoImage,
      alt: 'Waldo',
    },
    {
      name: 'Odlaw',
      found: true,
      src: odlawImage,
      alt: 'Odlaw',
    },
  ];

  it('No buttons are rendered', async () => {
    render(
      <>
        <ul>
          Who's this?
          {mockCharactersFound.map((character) => {
            if (!character.found)
              return (
                <li key={character.name}>
                  <button onClick={() => handleClickMock(character.name)}>
                    {character.name}
                  </button>
                </li>
              );
          })}
        </ul>
      </>,
    );
    expect(
      screen.queryByRole('button', { name: 'Wizard' }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: 'Waldo' }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: 'Odlaw' }),
    ).not.toBeInTheDocument();
  });
});
