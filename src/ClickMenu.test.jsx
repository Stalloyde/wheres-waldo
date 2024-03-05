import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import ClickMenu from './ClickMenu';

describe('HandleClick function works', () => {
  it('Wizard', async () => {
    const setClick = vi.fn();
    const handleClickMock = vi.fn();
    const user = userEvent.setup();

    vi.spyOn(React, 'useState').mockImplementationOnce((initState) => [
      initState,
      setClick,
    ]);

    handleClickMock.mockImplementation(() => {
      setClick(false);
    });

    render(<button onClick={handleClickMock}>Wizard</button>);

    await act(async () => user.click(screen.getByRole('button')));
    expect(setClick).toHaveBeenCalledWith(false);
  });

  it('Wally', async () => {
    const setClick = vi.fn();
    const handleClickMock = vi.fn();
    const user = userEvent.setup();

    vi.spyOn(React, 'useState').mockImplementationOnce((initState) => [
      initState,
      setClick,
    ]);

    handleClickMock.mockImplementation(() => {
      setClick(false);
    });

    render(<button onClick={handleClickMock}>Wally</button>);

    await act(async () => user.click(screen.getByRole('button')));
    expect(setClick).toHaveBeenCalledWith(false);
  });

  it('Odlaw', async () => {
    const setClick = vi.fn();
    const handleClickMock = vi.fn();
    const user = userEvent.setup();

    vi.spyOn(React, 'useState').mockImplementationOnce((initState) => [
      initState,
      setClick,
    ]);

    handleClickMock.mockImplementation(() => {
      setClick(false);
    });

    render(<button onClick={handleClickMock}>Odlaw</button>);

    await act(async () => user.click(screen.getByRole('button')));
    expect(setClick).toHaveBeenCalledWith(false);
  });
});
