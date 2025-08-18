import React from 'react'
import ReactDOM from 'react-dom/client'
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink, split } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { getMainDefinition } from '@apollo/client/utilities'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'

const httpLink = createHttpLink({
  uri: 'http://localhost:4001',
})

const wsLink = new GraphQLWsLink({
  url: 'ws://localhost:4001/graphql',
})

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    )
  },
  wsLink,
  httpLink
)

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('library-user-token')
  console.log('Frontend - Token from localStorage:', token ? 'exists' : 'missing')
  
  const authHeaders = {
    ...headers,
    authorization: token ? `Bearer ${token}` : '',
  }
  
  console.log('Frontend - Authorization header:', authHeaders.authorization ? 'set' : 'not set')
  
  return {
    headers: authHeaders,
  }
})

const client = new ApolloClient({
  link: authLink.concat(splitLink),
  cache: new InMemoryCache(),
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>,
)
