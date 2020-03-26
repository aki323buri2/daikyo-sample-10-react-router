import React from 'react'

// コンポ―ネントのimport
import LoginInput from './LoginInput'

// Material-UI関連のimport
import {
  createMuiTheme, 
  MuiThemeProvider, 
  CssBaseline, 
  Grid,
  Typography,
} from '@material-ui/core'
import { blue } from '@material-ui/core/colors'

const Login = () => {

  // Material-UIのテーマ設定
  // primaryカラーの設定
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: blue[700]
      }
    }, 
  })
    
  return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h4">
              ログイン
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={6}><LoginInput /></Grid>
          <Grid item xs={6}></Grid>
        </Grid>
      </MuiThemeProvider>
  );
}

export default Login