// form testing
// http://localhost:3000/login

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Login from '../../components/login'

// interessante : import the faker library to generate random usernames and passwords
import faker from 'faker'

// interessante : create a function that generates a random username and password to be used in the test.
function buildLoginData() {
  return {
    username : faker.internet.userName(),
    password : faker.internet.password()
  }
}

test('submitting the form calls onSubmit with username and password', async () => {
  
  const handleSubmit = jest.fn();

  render(<Login onSubmit={handleSubmit}/>);

  const userNameField = screen.getByLabelText(/username/i);
  const passwordField = screen.getByLabelText(/password/i);
  const submitButton = screen.getByRole("button", {name : /submit/i});

  // interessante : get the generated username/password
  const {username, password} = buildLoginData();

  await userEvent.type(userNameField, username);
  await userEvent.type(passwordField, password);

  await userEvent.click(submitButton);

  // interessante : define the expected parameters to be passed into the submit handler
  const expectedData = {
    username,
    password
  };

  expect(handleSubmit).toHaveBeenCalledTimes(1);
  expect(handleSubmit).toHaveBeenCalledWith(expectedData);
})

/*
eslint
  no-unused-vars: "off",
*/
