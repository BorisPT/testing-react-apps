// testing custom hooks
// http://localhost:3000/counter-hook

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import useCounter from '../../components/use-counter'


// interessante : define a simple component that uses the useCounter hook
const SimpleComponent = () => { 

  const {count, increment, decrement} = useCounter();

  return (
    // interessante : expose some UI elements and buttons to change them
    <div>      
      <div >Counter: {count}</div>
      <button onClick={() => increment()}>Inc</button>
      <button onClick={() => decrement()}>Dec</button>
    </div>
  )
 };

test('exposes the count and increment/decrement functions', async () => {

  // interessante : render the component
  render(<SimpleComponent />)

  // interessante : select the elements for interaction
  const counterDiv = screen.getByText(/counter/i)
  const incButton = screen.getByRole("button", {name : /inc/i})
  const decButton = screen.getByRole("button", {name : /dec/i})

  // initial assertion
  expect(counterDiv).toHaveTextContent(/0/i)

  await userEvent.click(incButton)
  expect(counterDiv).toHaveTextContent(/1/i)

  await userEvent.click(decButton) 
  expect(counterDiv).toHaveTextContent(/0/i)
})

/* eslint no-unused-vars:0 */
