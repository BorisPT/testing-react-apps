// simple test with ReactDOM
// http://localhost:3000/counter

import * as React from 'react'
import {act} from 'react-dom/test-utils'
import {createRoot} from 'react-dom/client'
import Counter from '../../components/counter'

// NOTE: this is a new requirement in React 18
// https://reactjs.org/blog/2022/03/08/react-18-upgrade-guide.html#configuring-your-testing-environment
// Luckily, it's handled for you by React Testing Library :)
global.IS_REACT_ACT_ENVIRONMENT = true

// interessante : clean the inner html before adding the components
beforeEach(() => {
  document.body.innerHTML = ''
})

test('counter increments and decrements when the buttons are clicked', () => {

  // interessante : create a div that will host our components.
    const divForComponents = document.createElement("div");

  // interessante : append the newly created div to the document body
  document.body.append(divForComponents)

  // interessante : use createRoot to render the <Counter /> to the div
  const root = createRoot(divForComponents);

  act(() => root.render(<Counter />));

  // interessante : get a reference to the increment and decrement buttons:
  const buttonArray = divForComponents.querySelectorAll("button");
  const decrementButton = buttonArray[0];
  const incrementButton = buttonArray[1];

  // interessante : get a reference to the message div:
  const messageDiv = divForComponents.firstChild.querySelector("div");
  
  // interessante : expect the message.textContent toBe 'Current count: 0'
  expect(messageDiv.textContent).toBe('Current count: 0')

  // interessante : click the increment button (💰 act(() => increment.click()))
  act(() => incrementButton.click())

  // interessante : assert the message.textContent
  expect(messageDiv.textContent).toBe('Current count: 1')

  // interessante : click the decrement button (💰 act(() => decrement.click()))
  act(() => decrementButton.click())

  // interessante :  assert the message.textContent  
  expect(messageDiv.textContent).toBe('Current count: 0')

  // interessante :  cleanup by removing the div from the page 
  divForComponents.remove();
  
  // interessante : If you don't cleanup, then it could impact other tests and/or cause a memory leak
})

/* eslint no-unused-vars:0 */
