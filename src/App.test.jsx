import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, test } from 'vitest';
import App from './App';
import ClickMenu from './ClickMenu';
import userEvent from '@testing-library/user-event';
import gameImage from './assets/whereswaldo.jpg';
import { act } from 'react-dom/test-utils';

describe('App', () => {
  it('renders page', () => {
    const app = render(<App />);
    expect(app).toMatchSnapshot();
  });
});

describe('Click on game image', () => {
  it('Sets mousePosition', async () => {
    const setMousePosition = vi.fn();
    const handleClickMock = vi.fn();
    const user = userEvent.setup();

    vi.spyOn(React, 'useState').mockImplementationOnce((initState) => [
      initState,
      setMousePosition,
    ]);

    handleClickMock.mockImplementation((xArg, yArg) => {
      setMousePosition({
        x: xArg + 10,
        y: yArg + 10,
      });
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
  });

  it('Sets click state', async () => {
    const setClick = vi.fn();
    const handleClickMock = vi.fn();
    const user = userEvent.setup();

    vi.spyOn(React, 'useState').mockImplementationOnce((initState) => [
      initState,
      setClick,
    ]);

    handleClickMock.mockImplementation(() => {
      setClick(true);
    });

    render(
      <img
        src={gameImage}
        alt='wheres-waldo'
        id='whereswaldo'
        onClick={() => handleClickMock()}></img>,
    );

    const image = screen.getByRole('img');
    await act(async () => user.click(image));
    expect(setClick).toHaveBeenCalledWith(true);
  });

  it('Renders ClickMenu on image click', async () => {
    const user = userEvent.setup();
    render(<App />);

    const gameImage = screen.getByAltText('wheres-waldo');
    await act(async () => user.click(gameImage));
    expect(screen.getByText(`Who's this?`)).toBeInTheDocument();
    expect(screen.getByAltText(`target`)).toBeInTheDocument();
  });
});
