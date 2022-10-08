// simple test with React Testing Library
// http://localhost:3000/counter

import * as React from 'react'

// interessante : import the `render` and `fireEvent` utilities from '@testing-library/react'
import {render , fireEvent} from "@testing-library/react"
import Counter from '../../components/counter'

// NOTE: this is a new requirement in React 18
// https://reactjs.org/blog/2022/03/08/react-18-upgrade-guide.html#configuring-your-testing-environment
// Luckily, it's handled for you by React Testing Library :)

test('counter increments and decrements when the buttons are clicked', () => {

  // interessante : the render function the from the react testing library returns an object
  // with lots of useful information, but in this case, we just want the container, which is
  // the div that contains our component. We just need to pass the component we need to render.
  const {container} = render(<Counter />);

  // interessante : instead of `div` here we'll want to use the `container` we get back
  // from React Testing Library
  const [decrementButton, incrementButton] = container.querySelectorAll('button')
  const message = container.firstChild.querySelector('div')

  expect(message.textContent).toBe('Current count: 0')

  // interessante : invoke the click event on the increment button, using 
  // React Testing Library's fireEvent function
  fireEvent.click(incrementButton);
  
  expect(message.textContent).toBe('Current count: 1')

  fireEvent.click(decrementButton);

  expect(message.textContent).toBe('Current count: 0')
})
