// testing custom hooks
// http://localhost:3000/counter-hook

import * as React from 'react'
import {render, act} from '@testing-library/react'
import useCounter from '../../components/use-counter'


function setup({initialCount = 0, step = 1} = {}) {

  // interessante : we create a normal and constant object 
  const hookResult  = {};

  const FakeComponent = ({initialCount, step}) => { 

    // interessante : assign the result to a new object property we create on-the-fly.
    // this property will be accessible outside the function
    hookResult.myStoringProperty = useCounter({initialCount, step});    
    return null;
   };
   
   render(<FakeComponent initialCount={initialCount} step={step} />)

   return hookResult;
}


test('Fake component, normal initial count and step', async () => {

  const hookResult = setup();

  // interessante : outside the setup function, access the newly created property
  expect(hookResult.myStoringProperty.count).toBe(0);

  act(() => hookResult.myStoringProperty.increment());
  expect(hookResult.myStoringProperty.count).toBe(1);

  act(() => hookResult.myStoringProperty.decrement());
  expect(hookResult.myStoringProperty.count).toBe(0);
})

test('Fake component, configure initial count', async () => {
  
  const hookResult = setup({initialCount : 5})

  expect(hookResult.myStoringProperty.count).toBe(5);

  act(() => hookResult.myStoringProperty.increment());
  expect(hookResult.myStoringProperty.count).toBe(6);

  act(() => hookResult.myStoringProperty.decrement());
  expect(hookResult.myStoringProperty.count).toBe(5);
})

test('Fake component, configure step', async () => {
  
  const hookResult = setup({step : 9})

  expect(hookResult.myStoringProperty.count).toBe(0);

  act(() => hookResult.myStoringProperty.increment());
  expect(hookResult.myStoringProperty.count).toBe(9);

  act(() => hookResult.myStoringProperty.decrement());
  expect(hookResult.myStoringProperty.count).toBe(0);
})

test('Fake component, configure initial count and step', async () => {
  
  const hookResult = setup({initialCount : 2, step : 9})

  expect(hookResult.myStoringProperty.count).toBe(2);

  act(() => hookResult.myStoringProperty.increment());
  expect(hookResult.myStoringProperty.count).toBe(11);

  act(() => hookResult.myStoringProperty.decrement());
  expect(hookResult.myStoringProperty.count).toBe(2);
})

/* eslint no-unused-vars:0 */
