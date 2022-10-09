// mocking Browser APIs and modules
// http://localhost:3000/location

import * as React from 'react'
import {render, screen, act, waitForElementToBeRemoved} from '@testing-library/react'
import Location from '../../examples/location'

// interessante : before all tests, define the existence of a mock function that will act as 
// the real "getCurrentPosition". The third party library will call this "getCurrentPosition"
beforeAll(() => {
  window.navigator.geolocation = {
    getCurrentPosition: jest.fn(),
  }
})

// interessante : define a promise that can resolved or rejected on demand.
function deferred() {
  let resolve, reject
  const promise = new Promise((res, rej) => {
    resolve = res
    reject = rej
  })
  return {promise, resolve, reject}
}

test('displays the users current location', async () => {

  // interessante : define a fake position to be returned by the mocked function
  const fakePosition = {
    coords: {
      latitude : 35,
      longitude : 129
    }
  }

  // interessante : get a promise and its resolver function in order to resolve it when we want
  const {promise, resolve} = deferred()

  // interessante : define the mock implementation of the "getCurrentPosition" as function.
  // This function accepts a callback as an argument and invokes it with the fakePosition data
  window.navigator.geolocation.getCurrentPosition.mockImplementation(
    callback => {
      promise.then(() => callback(fakePosition))
    }
  );

  render(<Location />);

  expect(screen.getByLabelText(/loading/i)).toBeInTheDocument();
  
  await act(async () => {
    resolve()
    await promise
  })  

  expect(screen.queryByLabelText(/loading/i)).not.toBeInTheDocument();

  expect(screen.getByText(/latitude/i)).toHaveTextContent(/35/i);
  expect(screen.getByText(/longitude/i)).toHaveTextContent(/129/i);

})

/*
eslint
  no-unused-vars: "off",
*/
