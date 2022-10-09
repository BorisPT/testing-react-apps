// form testing
// http://localhost:3000/login

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Login from '../../components/login'

test('submitting the form calls onSubmit with username and password', async () => {

  let submittedData = null;

  const handleSubmit = function (formData){
    submittedData = formData;
  }

  render(<Login onSubmit={handleSubmit}/>);

  const userNameField = screen.getByLabelText(/username/i);
  const passwordField = screen.getByLabelText(/password/i);
  const submitButton = screen.getByRole("button", {name : /submit/i});

  const testUser = "Chuck Norris";
  const testPass = "chuckypass";

  await userEvent.type(userNameField, testUser);
  await userEvent.type(passwordField, testPass);

  await userEvent.click(submitButton);

  const expectedData = {
    username: testUser,
    password: testPass
  };

  expect(submittedData).toEqual(expectedData);
})

/*
eslint
  no-unused-vars: "off",
*/
