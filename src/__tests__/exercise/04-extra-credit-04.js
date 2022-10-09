// form testing
// http://localhost:3000/login

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Login from '../../components/login'

import {build, fake} from '@jackfranklin/test-data-bot'

// interessante : use the library to generate a login object with 
const buildLoginForm = build({
  fields: {
    username: fake(faker => faker.internet.userName()),
    password: fake(faker => faker.internet.password()),
  },
})

test('submitting the form calls onSubmit with username and password', async () => {
  
  const handleSubmit = jest.fn();

  render(<Login onSubmit={handleSubmit}/>);

  const userNameField = screen.getByLabelText(/username/i);
  const passwordField = screen.getByLabelText(/password/i);
  const submitButton = screen.getByRole("button", {name : /submit/i});

  // interessante : Generate the random data with the library
  const {username, password} = buildLoginForm();

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
