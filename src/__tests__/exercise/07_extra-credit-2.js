// testing with context and a custom render method
// http://localhost:3000/easy-button

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import {ThemeProvider} from '../../components/theme'
import EasyButton from '../../components/easy-button'


// interessante : encapsulate the wrapper function to be used by the render 
// into a custom render method. This way, we don't have to specify the wrapper
// each time.
function customRender(ui, {theme = 'light', ...options} = {}) {

  function ContextWrapper({children}) {
    return <ThemeProvider initialTheme={theme}>{children}</ThemeProvider>
  }

  return render(ui, {wrapper: ContextWrapper, ...options})
}

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
