// testing with context and a custom render method
// http://localhost:3000/easy-button

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import {ThemeProvider} from '../../components/theme'
import EasyButton from '../../components/easy-button'
import userEvent from '@testing-library/user-event'


test('renders with the dark styles for the dark theme', async () => {

  function ContextWrapper({children}) {
    // interessante : set the initial theme to "dark" mode
    return <ThemeProvider initialTheme="dark">{children}</ThemeProvider>
  }

  const {rerender} = render(<EasyButton>Easy</EasyButton>, {wrapper: ContextWrapper})

  const button = screen.getByRole('button', {name: /easy/i})

  screen.debug();

  // interessante : initial assertion about the button style  
  expect(button).toHaveStyle(`
    backgroundColor: 'black',
    color: 'white',
  `)

  // interessante : click the button
  await userEvent.click(button);

  // interessante : trigger a re-render
  rerender(<EasyButton>Easy</EasyButton>)
  
  // interessante : assert that the style has been updated  
  expect(button).toHaveStyle(`
    background-color: white;
    color: black;
  `)
})

/* eslint no-unused-vars:0 */
