// testing custom hooks
// http://localhost:3000/counter-hook

import * as React from 'react'
import {render, renderHook, act} from '@testing-library/react'
import useCounter from '../../components/use-counter'


function setup({initialProps} = {}) {
  
  // interessante : define the initial result object.
  const hookResult = {};

  const FakeComponent = () => {  

    // interessante : copy the hook output into the result object.
    // this way it can be referenced from outside the function
    Object.assign(hookResult, useCounter(initialProps));
    return null;
   };
   
   render(<FakeComponent />)

   return hookResult;
}


test('Fake component, normal initial count and step', async () => {

  const hookResult = setup();

  expect(hookResult.count).toBe(0);

  act(() => hookResult.increment());
  expect(hookResult.count).toBe(1);

  act(() => hookResult.decrement());
  expect(hookResult.count).toBe(0);
})

test('Fake component, configure initial count', async () => {
  
  const hookResult = setup({initialProps : {initialCount : 5}})

  expect(hookResult.count).toBe(5);

  act(() => hookResult.increment());
  expect(hookResult.count).toBe(6);

  act(() => hookResult.decrement());
  expect(hookResult.count).toBe(5);
})

test('Fake component, configure step', async () => {
  
  const hookResult = setup({initialProps : {step : 9}})

  expect(hookResult.count).toBe(0);

  act(() => hookResult.increment());
  expect(hookResult.count).toBe(9);

  act(() => hookResult.decrement());
  expect(hookResult.count).toBe(0);
})

test('Fake component, configure initial count and step', async () => {
  
  const hookResult = setup({initialProps : {initialCount : 2, step : 9}})

  expect(hookResult.count).toBe(2);

  act(() => hookResult.increment());
  expect(hookResult.count).toBe(11);

  act(() => hookResult.decrement());
  expect(hookResult.count).toBe(2);
})

/* eslint no-unused-vars:0 */
