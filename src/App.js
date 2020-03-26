import React from 'react'
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'

// GraphQL関連のimport
import gql from 'graphql-tag'

// Apollo-Client関連のimport
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { ApolloClient } from 'apollo-client'
import { ApolloProvider } from 'react-apollo-hooks'

export default function App() {

  // キャッシュ
  const cache = new InMemoryCache()

  // GraphQLのエンドポイント
  const httpLink = new HttpLink({
    // uri: 'http://localhost:5000/graphl',
    uri: '',
  })

  // Apollo-Clientの設定
  const client = new ApolloClient({
    link: httpLink,
    cache,
    resolvers: {
      Mutation: {
        setLoginUserName: (_root, variables, { cache }) => {
          cache.writeQuery({
            query: gql`{loginUserName}`,
            data: {loginUserName: variables.name},
          });
        },
      }
    }
  })

  // ローカルステートの初期化
  cache.writeQuery({
    query: gql`{
      loginUserName
    }`,
    data: {
      loginUserName: '',
    },
  });
  console.log(cache.data)

  // コンポ―ネントをApolloProviderでラップする
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/home" component={Home} />
        </Switch>
        <Link to='/home'>ホーム画面へ</Link>
      </BrowserRouter>
    </ApolloProvider>
  )
}
