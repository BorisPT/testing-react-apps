// testing custom hooks
// http://localhost:3000/counter-hook

import * as React from 'react'
import {render, act} from '@testing-library/react'
import useCounter from '../../components/use-counter'


function setup({initialCount = 0, step = 1} = {}) {
  let hookResult = {};

  const FakeComponent = ({initialCount, step}) => {  
    Object.assign(hookResult, useCounter({initialCount, step}));
    return null;
   };
   
   render(<FakeComponent initialCount={initialCount} step={step} />)

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
  
  const hookResult = setup({initialCount : 5})

  expect(hookResult.count).toBe(5);

  act(() => hookResult.increment());
  expect(hookResult.count).toBe(6);

  act(() => hookResult.decrement());
  expect(hookResult.count).toBe(5);
})

test('Fake component, configure step', async () => {
  
  const hookResult = setup({step : 9})

  expect(hookResult.count).toBe(0);

  act(() => hookResult.increment());
  expect(hookResult.count).toBe(9);

  act(() => hookResult.decrement());
  expect(hookResult.count).toBe(0);
})

test('Fake component, configure initial count and step', async () => {
  
  const hookResult = setup({initialCount : 2, step : 9})

  expect(hookResult.count).toBe(2);

  act(() => hookResult.increment());
  expect(hookResult.count).toBe(11);

  act(() => hookResult.decrement());
  expect(hookResult.count).toBe(2);
})

/* eslint no-unused-vars:0 */
