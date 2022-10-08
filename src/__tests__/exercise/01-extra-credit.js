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

    const divForComponents = document.createElement("div");

  document.body.append(divForComponents)

  const root = createRoot(divForComponents);

  act(() => root.render(<Counter />));

  const buttonArray = divForComponents.querySelectorAll("button");
  const decrementButton = buttonArray[0];
  const incrementButton = buttonArray[1];

  const messageDiv = divForComponents.firstChild.querySelector("div");
  
  expect(messageDiv.textContent).toBe('Current count: 0')

  // interessante : define a click event
  const mouseEventClick = new MouseEvent('click', {
    bubbles: true,
    cancelable: true,
    button: 0,
  });

  // interessante : invoke an event on the event target to simulate the click
  act(() => incrementButton.dispatchEvent(mouseEventClick))

  expect(messageDiv.textContent).toBe('Current count: 1')
  
  act(() => decrementButton.click())

  expect(messageDiv.textContent).toBe('Current count: 0')

  divForComponents.remove();
    
})

/* eslint no-unused-vars:0 */
