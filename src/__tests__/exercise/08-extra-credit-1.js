// testing custom hooks
// http://localhost:3000/counter-hook

import * as React from 'react'
import {render, act} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import useCounter from '../../components/use-counter'


test('Testing with a fake component', async () => {

  // interessante : save the result of the custom hook invocation
  // for future assertions
  let hookResult;

  // interessante : define a fake component that will not render anything,
  // but will only invoke the custom hook
  const FakeComponent = () => {  
    hookResult = useCounter();
    return null;
   };  

  // interessante : Render the fake component
  render(<FakeComponent />)

  // interessante : we can't access any UI elements, because the component
  // does not retur anything. But we can assert on the hook result.
  expect(hookResult.count).toBe(0);

  // interessante : because this causes a state change, 
  // we need to wrap it in "act"
  act(() => hookResult.increment());
  expect(hookResult.count).toBe(1);

  act(() => hookResult.decrement());
  expect(hookResult.count).toBe(0);
})

/* eslint no-unused-vars:0 */
