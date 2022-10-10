// testing with context and a custom render method
// http://localhost:3000/easy-button

import * as React from 'react'

// interessante : import the custom render function and the screen
// function from react testing library
import {render as customRender, screen} from '../../test/test-utils'

import EasyButton from '../../components/easy-button'

test('renders with the dark styles for the dark theme', async () => {

  // interessante : use the custom render method, specifying the 
  // initial theme for the ThemeProvider
  customRender(<EasyButton>Easy</EasyButton>, {theme: "dark"})

  const button = screen.getByRole('button', {name: /easy/i})

  // interessante : initial assertion about the button style  
  expect(button).toHaveStyle(`
    backgroundColor: 'black',
    color: 'white',
  `)

})

test('renders with the light styles for the light theme', async () => {

  // interessante : use the custom render method, specifying the 
  // initial theme for the ThemeProvider
  customRender(<EasyButton>Easy</EasyButton>, {theme: "light"})

  const button = screen.getByRole('button', {name: /easy/i})

  // interessante : initial assertion about the button style  
  expect(button).toHaveStyle(`
    backgroundColor: 'white',
    color: 'black',
  `)

})

/* eslint no-unused-vars:0 */
