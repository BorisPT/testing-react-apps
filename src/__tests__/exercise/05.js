// mocking HTTP requests
// http://localhost:3000/login-submission

import * as React from 'react'
// interessante : import "waitForElementToBeRemoved" so we can check for the spinner to disappear
import {render, screen, waitForElementToBeRemoved} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {build, fake} from '@jackfranklin/test-data-bot'
// interessante : you'll need to import rest from 'msw' and setupServer from msw/node
import {rest} from 'msw'
import {setupServer} from 'msw/node'

import Login from '../../components/login-submission'

const buildLoginForm = build({
  fields: {
    username: fake(f => f.internet.userName()),
    password: fake(f => f.internet.password()),
  },
})

// interessante : Define the response for the request to the specified url.
// The second argument is a function that receives the request, the response and the context
// which contains lots of utilities specific to the current request handler
const server = setupServer(
  rest.post(
    'https://auth-provider.example.com/api/login',
    async (request, response, context) => {
      if (!request.body.password) {
        return response(context.status(400), context.json({message: 'password required'}))
      }
      if (!request.body.username) {
        return response(context.status(400), context.json({message: 'username required'}))
      }
      return response(context.json({username: request.body.username}))
    }
  )
)

// interessante : before all the tests, start the server 
beforeAll(() => server.listen())

// interessante : after all the tests, close the server
afterAll(() => server.close())


test(`logging in displays the user's username`, async () => {
  render(<Login />)
  const {username, password} = buildLoginForm()

  await userEvent.type(screen.getByLabelText(/username/i), username)
  await userEvent.type(screen.getByLabelText(/password/i), password)

  // interessante : by clicking the button, we make the resquest
  await userEvent.click(screen.getByRole('button', {name: /submit/i}))

  // interessante : as soon as the user hits submit, we render a spinner to the screen. That
  // spinner has an aria-label of "loading" for accessibility purposes, so
  // wait for the loading spinner to be removed using waitForElementToBeRemoved
  // https://testing-library.com/docs/dom-testing-library/api-async#waitforelementtoberemoved
  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i))
  
  // interessante : assert that the username is on the screen,
  // which means, there is an element whose textContent is the same value as 
  // the generated username
    expect(screen.getByText(username)).toBeInTheDocument()
})
