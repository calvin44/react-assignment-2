import React from 'react'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from
} from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import Continent from './Continent'
import styles from 'styled-components'

const errorLink = onError(({ graphqlErrors, networkError }) => {
  if (graphqlErrors) {
    graphqlErrors.forEach(({ message, location, path }) => {
      alert(`Graphql error ${message}`)
    })
  }
})

const link = from([
  errorLink,
  new HttpLink({ uri: "https://countries.trevorblades.com/" })
])

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link
})

function App() {
  return (
    <ApolloProvider client={ client }>
      <AppContainer>
        <Continent />
      </AppContainer>
    </ApolloProvider>
  );
}

const AppContainer = styles.div`
  max-width: 80vw;
  margin: 3rem auto;
`
export default App;
