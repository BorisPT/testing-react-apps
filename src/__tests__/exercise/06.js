// mocking Browser APIs and modules
// http://localhost:3000/location

import * as React from 'react'
import {render, screen, act, waitForElementToBeRemoved} from '@testing-library/react'
import Location from '../../examples/location'

// interessante : before all tests, define the existence of a mock function that will act as 
// the real "getCurrentPosition". The "react-use-geolocation" library will call this "getCurrentPosition"
beforeAll(() => {
  window.navigator.geolocation = {
    getCurrentPosition: jest.fn(),
  }
})

test('displays the users current location', async () => {

  // interessante : define a fake position to be returned by the mocked function
  const fakePosition = {
    coords: {
      latitude : 35,
      longitude : 129
    }
  }

  // interessante : define the mock implementation of the "getCurrentPosition" as function.
  // This function accepts a callback as an argument and invokes it with the fakePosition data,
  // when the timeout expires. This will give us time to simulate the loading screen
  window.navigator.geolocation.getCurrentPosition.mockImplementation(
    function (callback) {
      setTimeout(() => {
        callback(fakePosition)        
      }, 200);      
    }    
  );

  render(<Location />);

  expect(screen.getByLabelText(/loading/i)).toBeInTheDocument();

  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i))

  expect(screen.getByText(/latitude/i)).toHaveTextContent(/35/i);
  expect(screen.getByText(/longitude/i)).toHaveTextContent(/129/i);

})

/*
eslint
  no-unused-vars: "off",
*/
