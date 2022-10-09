// mocking Browser APIs and modules
// http://localhost:3000/location

import * as React from 'react'
import {render, screen, act} from '@testing-library/react'
import Location from '../../examples/location'

// interessante : import the hook, which in reality will be a jest mock
import {useCurrentPosition} from "react-use-geolocation";

// interessante : this will turn every exported function 
// of this module into a jest mock
jest.mock("react-use-geolocation");

test('displays the users current location', async () => {

  // interessante : define a fake position to be returned by the mocked function
  const fakePosition = {
    coords: {
      latitude : 50,
      longitude : 93
    }
  }

  let setState = null;

  function useMockCurrentPosition() {
    // interessante : the starting state is an array because the real
    // hook returns an array containing the position of the user
    // and an eventual error message
    const state = React.useState([]);
    // save the setter function
    setState = state[1];
    // return the actual state
    return state[0]; 
  }

  useCurrentPosition.mockImplementation(useMockCurrentPosition);

  render(<Location />);

  expect(screen.getByLabelText(/loading/i)).toBeInTheDocument();
  
  // interessante : since we are calling a state updater function, we have to wrap it
  // in an "act" function so React can properly handle all the side effects it triggers
  act(() => setState([fakePosition]));

  expect(screen.queryByLabelText(/loading/i)).not.toBeInTheDocument();

  expect(screen.getByText(/latitude/i)).toHaveTextContent(/50/i);
  expect(screen.getByText(/longitude/i)).toHaveTextContent(/93/i);

})

/*
eslint
  no-unused-vars: "off",
*/
