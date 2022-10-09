// mocking HTTP requests
// http://localhost:3000/login-submission

import * as React from 'react'
import {render, screen, waitForElementToBeRemoved} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {build, fake} from '@jackfranklin/test-data-bot'
import {setupServer} from 'msw/node'

import {handlers} from '../../test/server-handlers'

import Login from '../../components/login-submission'

// interessante : we need to re-import the "rest" object so we can define the one-off handlers.
import {rest} from 'msw'

const buildLoginForm = build({
  fields: {
    username: fake(f => f.internet.userName()),
    password: fake(f => f.internet.password()),
  },
})

const server = setupServer(...handlers)

beforeAll(() => server.listen())
afterAll(() => server.close())

// interessante : after each individual test, reset all the one-off handlers that might have been defined.
afterEach(() => server.resetHandlers())


test(`Server is not responding properly`, async () => {

  const errorMessage = "Unknown server error";

  // interessante : define a test-specific server handler that will override the
  // main one, for this test only. We must not forget, however, to reset these
  // one-off handlers after the test execution
  server.use(
    rest.post(
      // interessante : note that it's the same URL as our app-wide handler
      // so this will override the other.
      'https://auth-provider.example.com/api/login',
      async (req, res, ctx) => {
        return res(ctx.status(500), ctx.json({message: errorMessage}))
      },
    ),
  )

  render(<Login />)
  const {username, password} = buildLoginForm()

  await userEvent.type(screen.getByLabelText(/username/i), username)
  await userEvent.type(screen.getByLabelText(/password/i), password)

  await userEvent.click(screen.getByRole('button', {name: /submit/i}))

  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i))

  // interessante : define an inline snapshot to compare with the text content of the "alert" div
  expect(screen.getByRole('alert')).toHaveTextContent(errorMessage);

})

test(`logging in displays the user's username`, async () => {
  render(<Login />)
  const {username, password} = buildLoginForm()

  await userEvent.type(screen.getByLabelText(/username/i), username)
  await userEvent.type(screen.getByLabelText(/password/i), password)

  await userEvent.click(screen.getByRole('button', {name: /submit/i}))
  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i))
  expect(screen.getByText(username)).toBeInTheDocument()
})

test(`No username means computer says no`, async () => {
  render(<Login />)
  const {password} = buildLoginForm()

  // Do not type username
  await userEvent.type(screen.getByLabelText(/password/i), password)

  await userEvent.click(screen.getByRole('button', {name: /submit/i}))
  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i))

  // interessante : inline shapshot
  // In the first execution, with no parameters, Jest will fill in the assertion.
  // In subsequent executions, if the test fails, Jest will offer to update
  // the assertion
  expect(screen.getByRole('alert').textContent).toMatchInlineSnapshot(
    `"username required"`,
  )
})

test(`No password means computer says no`, async () => {
  render(<Login />)
  const {username} = buildLoginForm()

  await userEvent.type(screen.getByLabelText(/username/i), username)
  // Do not type password

  await userEvent.click(screen.getByRole('button', {name: /submit/i}))
  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i))

  expect(screen.getByRole('alert').textContent).toMatchInlineSnapshot(
    `"password required"`,
  )
})


