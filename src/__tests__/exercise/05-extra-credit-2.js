// mocking HTTP requests
// http://localhost:3000/login-submission

import * as React from 'react'
import {render, screen, waitForElementToBeRemoved} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {build, fake} from '@jackfranklin/test-data-bot'
import {setupServer} from 'msw/node'

import {handlers} from "../../test/server-handlers";

import Login from '../../components/login-submission'

const buildLoginForm = build({
  fields: {
    username: fake(f => f.internet.userName()),
    password: fake(f => f.internet.password()),
  },
})

const server = setupServer(...handlers);

beforeAll(() => server.listen())
afterAll(() => server.close())

test(`logging in displays the user's username`, async () => {
  render(<Login />)
  const {username, password} = buildLoginForm()

  await userEvent.type(screen.getByLabelText(/username/i), username)
  await userEvent.type(screen.getByLabelText(/password/i), password)

  await userEvent.click(screen.getByRole('button', {name: /submit/i}))
  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i))
  expect(screen.getByText(username)).toBeInTheDocument()
})

// interessante : test the unhappy path

test(`No username means computer says no`, async () => {
  render(<Login />)
  const {password} = buildLoginForm()

  // Do not type username
  await userEvent.type(screen.getByLabelText(/password/i), password)

  await userEvent.click(screen.getByRole('button', {name: /submit/i}))
  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i))
  
  expect(screen.getByText(/username required/i)).toBeInTheDocument()
  // interessante : expect to have an "alert" role with a specific text content
  // expect(screen.getByRole('alert')).toHaveTextContent('username required')
})

test(`No password means computer says no`, async () => {
  render(<Login />)
  const {username} = buildLoginForm()

  await userEvent.type(screen.getByLabelText(/username/i), username)
  // Do not type password

  await userEvent.click(screen.getByRole('button', {name: /submit/i}))
  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i))
  
  expect(screen.getByText(/password required/i)).toBeInTheDocument();
  // interessante : expect to have an "alert" role with a specific text content
  // expect(screen.getByRole('alert')).toHaveTextContent('password required');
})