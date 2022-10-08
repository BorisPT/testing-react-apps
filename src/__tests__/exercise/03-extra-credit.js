// Avoid implementation details
// http://localhost:3000/counter

import * as React from 'react'
// interessante : import the "screen" object so we can use it like the dom object 
import {render, fireEvent, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Counter from '../../components/counter'

test('counter increments and decrements when the buttons are clicked', async () => {
  render(<Counter />)

  // interessante : select the elements we wish to manipulate using the screen object
  // and specific queries.
  // More details in: 
  // https://testing-library.com/docs/queries/about/#screen
  // https://testing-library.com/docs/queries/about/
  // https://testing-library.com/docs/queries/bytext/
  const incrementButton = screen.getByText("Increment")  
  
  // interessante : the "name" property in the accessibility tree
  const decrementButton = screen.getByRole("button", {name : "Decrement"})
  
  const message = screen.getByText(/Current count/)

  expect(message).toHaveTextContent('Current count: 0')
  await userEvent.click(incrementButton)
  expect(message).toHaveTextContent('Current count: 1')
  await userEvent.click(decrementButton)
  expect(message).toHaveTextContent('Current count: 0')
})
