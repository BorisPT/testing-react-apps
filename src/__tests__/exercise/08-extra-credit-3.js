// testing custom hooks
// http://localhost:3000/counter-hook

import * as React from 'react'

// interessante : Import the "renderHook" function which allows us to 
// invoke a custom hook much like our own "setup" function did
import {renderHook, act} from '@testing-library/react'
import useCounter from '../../components/use-counter'

test('Fake component, normal initial count and step', async () => {

  const hookResult = renderHook();

  expect(hookResult.count).toBe(0);

  act(() => hookResult.increment());
  expect(hookResult.count).toBe(1);

  act(() => hookResult.decrement());
  expect(hookResult.count).toBe(0);
})

test('Fake component, configure initial count', async () => {
  
  const hookResult = renderHook({initialProps : {initialCount : 5}})

  expect(hookResult.count).toBe(5);

  act(() => hookResult.increment());
  expect(hookResult.count).toBe(6);

  act(() => hookResult.decrement());
  expect(hookResult.count).toBe(5);
})

test('Fake component, configure step', async () => {
  
  const hookResult = renderHook({initialProps : {step : 9}})

  expect(hookResult.count).toBe(0);

  act(() => hookResult.increment());
  expect(hookResult.count).toBe(9);

  act(() => hookResult.decrement());
  expect(hookResult.count).toBe(0);
})

test('Fake component, configure initial count and step', async () => {
  
  const hookResult = renderHook({initialProps : {initialCount : 2, step : 9}})

  expect(hookResult.count).toBe(2);

  act(() => hookResult.increment());
  expect(hookResult.count).toBe(11);

  act(() => hookResult.decrement());
  expect(hookResult.count).toBe(2);
})

/* eslint no-unused-vars:0 */
