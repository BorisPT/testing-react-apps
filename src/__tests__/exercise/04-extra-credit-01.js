// form testing
// http://localhost:3000/login

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Login from '../../components/login'

test('submitting the form calls onSubmit with username and password', async () => {

  // interessante : define a mock function, that does nothing.
  // we just want to make sure it is called by the component when the user clicks the button.
  const handleSubmit = jest.fn();

  render(<Login onSubmit={handleSubmit}/>);

  const userNameField = screen.getByLabelText(/username/i);
  const passwordField = screen.getByLabelText(/password/i);
  const submitButton = screen.getByRole("button", {name : /submit/i});

  const testUser = "Chuck Norris";
  const testPass = "chuckypass";

  await userEvent.type(userNameField, testUser);
  await userEvent.type(passwordField, testPass);

  await userEvent.click(submitButton);

  // interessante : define the object that we are expecting to be passed to the handler.
  // This would mean the component is working correctly
  const expectedData = {
    username: testUser,
    password: testPass
  };

  expect(handleSubmit).toHaveBeenCalledTimes(1);
  expect(handleSubmit).toHaveBeenCalledWith(expectedData);
})

/*
eslint
  no-unused-vars: "off",
*/
