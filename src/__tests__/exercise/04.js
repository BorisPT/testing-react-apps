// form testing
// http://localhost:3000/login

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Login from '../../components/login'

test('submitting the form calls onSubmit with username and password', async () => {

  // interessante : define a variable to store the submitted data.
  let submittedData = null;

  // interessante : define an onSubmit prop to pass to the component
  const handleSubmit = function (formData){
    submittedData = formData;
  }

  // interessante : render the component, with the specified prop
  render(<Login onSubmit={handleSubmit}/>);

  // interessante : get the relevante html elements
  const userNameField = screen.getByLabelText(/username/i);
  const passwordField = screen.getByLabelText(/password/i);
  const submitButton = screen.getByRole("button", {name : /submit/i});

  // interessante : Set teste values for the username and password
  const testUser = "Chuck Norris";
  const testPass = "chuckypass";

  // interessante : type the values into the fields
  await userEvent.type(userNameField, testUser);
  await userEvent.type(passwordField, testPass);

  // interessante : create a "click" userEvent on the submit button
  await userEvent.click(submitButton);

  const expectedData = {
    username: testUser,
    password: testPass
  };

  // interessante : assert that the values were correctly retrieved from the html elements
  expect(submittedData).toEqual(expectedData);
})

/*
eslint
  no-unused-vars: "off",
*/
