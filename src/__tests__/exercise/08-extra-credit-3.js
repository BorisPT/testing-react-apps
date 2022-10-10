// testing custom hooks
// http://localhost:3000/counter-hook

import * as React from 'react'

// interessante : Import the "renderHook" function which allows us to 
// invoke a custom hook, much like our own "setup" function did
import {renderHook, act} from '@testing-library/react'
import useCounter from '../../components/use-counter'

test('Fake component, normal initial count and step', async () => {

  // interessante : invoke the custom hook and destructure
  // the "result" field. 
  const {result} = renderHook(useCounter);
  
  // interessante : access the "current" property where the output
  // of the custom hook will be stored
  expect(result.current.count).toBe(0);

  act(() => result.current.increment());
  expect(result.current.count).toBe(1);

  act(() => result.current.decrement());
  expect(result.current.count).toBe(0);
})

test('Fake component, configure initial count', async () => {
  
  const {result} = renderHook(useCounter, {initialProps : {initialCount : 5}})

  expect(result.current.count).toBe(5);

  act(() => result.current.increment());
  expect(result.current.count).toBe(6);

  act(() => result.current.decrement());
  expect(result.current.count).toBe(5);
})

test('Fake component, configure step', async () => {
  
  const {result} = renderHook(useCounter, {initialProps : {step : 9}})

  expect(result.current.count).toBe(0);

  act(() => result.current.increment());
  expect(result.current.count).toBe(9);

  act(() => result.current.decrement());
  expect(result.current.count).toBe(0);
})

test('Fake component, configure initial count and step', async () => {
  
  const {result} = renderHook(useCounter, {initialProps : {initialCount : 2, step : 9}})

  expect(result.current.count).toBe(2);

  act(() => result.current.increment());
  expect(result.current.count).toBe(11);

  act(() => result.current.decrement());
  expect(result.current.count).toBe(2);
})

/* eslint no-unused-vars:0 */
