// testing with context and a custom render method
// http://localhost:3000/easy-button

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import {ThemeProvider} from '../../components/theme'
import EasyButton from '../../components/easy-button'
import userEvent from '@testing-library/user-event'

// interessante : define a wrapper function that will encapsulate 
// the component we want to test with all the contexts it needs
function ContextWrapper({children}) {
  return <ThemeProvider>{children}</ThemeProvider>
}

test('renders with the light styles for the light theme', async () => {

  // interessante : provide a wrapper function to be applied to the component.
  // This will inject all the contexts that the component needs to render.
  // Also, we destructure a "rerender" function to be called after pressing the button
  const {rerender} = render(<EasyButton>Easy</EasyButton>, {wrapper: ContextWrapper})

  const button = screen.getByRole('button', {name: /easy/i})

  // interessante : initial assertion about the button style
  expect(button).toHaveStyle(`
    background-color: white;
    color: black;
  `)

  // interessante : click the button
  await userEvent.click(button);

  // interessante : trigger a re-render
  rerender(<EasyButton>Easy</EasyButton>)

  // interessante : assert that the style has been updated
  expect(button).toHaveStyle(`
  backgroundColor: 'black',
  color: 'white',
`)

})

/* eslint no-unused-vars:0 */
