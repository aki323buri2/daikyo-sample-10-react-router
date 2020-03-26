import React from 'react'
import { Redirect } from 'react-router'
import Logout from './Logout'

// Material-UI関連のimport
import {
  createMuiTheme, 
  MuiThemeProvider, 
  CssBaseline, 
  Grid,
  Typography,
} from '@material-ui/core'
import { blue } from '@material-ui/core/colors'

// GraphQL関連のimport
import gql from 'graphql-tag'

// Apollo-Client関連のimport
import { useQuery } from 'react-apollo-hooks'


// ローカルステートを取得するクエリ
const GET_LOCAL_STATE = gql`
    query {
      loginUserName @client
    }
`


const Home = () => { 

  // Material-UIのテーマ設定
  // primaryカラーの設定
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: blue[700]
      }
    }, 
  })

  // ローカルステート取得
  const { data } = useQuery(GET_LOCAL_STATE)

  // 未ログインであれば、ログイン画面にリダイレクトする
  if (data.loginUserName === '') return <Redirect to='/' />

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h4">
            ログイン成功！！
          </Typography>
          <Typography variant="h4">
            こんにちは {data.loginUserName} さん！！
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
      <Grid item xs={6}>
          <Logout />
        </Grid>
        <Grid item xs={6}></Grid>
      </Grid>
    </MuiThemeProvider>
  )

}


export default Home