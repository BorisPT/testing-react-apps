// form testing
// http://localhost:3000/login

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Login from '../../components/login'

import faker from 'faker'

function buildLoginData(formData) {
  return {
    username : formData?.username || faker.internet.userName(),
    password : formData?.password || faker.internet.password()
  }
}

test('submitting the form calls onSubmit with username and password', async () => {
  
  const handleSubmit = jest.fn();

  render(<Login onSubmit={handleSubmit}/>);

  const userNameField = screen.getByLabelText(/username/i);
  const passwordField = screen.getByLabelText(/password/i);
  const submitButton = screen.getByRole("button", {name : /submit/i});

  const data = {
    //username : "Chuck Norris",
    password : "$#enforcedPassword123"
  }
  const {username, password} = buildLoginData(data);

  // console.log({username, password});

  await userEvent.type(userNameField, username);
  await userEvent.type(passwordField, password);

  await userEvent.click(submitButton);

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
