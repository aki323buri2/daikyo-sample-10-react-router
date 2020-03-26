import React from 'react'
import { withRouter } from 'react-router-dom'

// Material-UI関連のimport
import { makeStyles } from '@material-ui/core/styles'
import {
    FormControl,
    Button,
} from '@material-ui/core'

// GraphQL関連のimport
import gql from 'graphql-tag'

// Apollo-Client関連のimport
import { useMutation } from 'react-apollo-hooks'

// Material-UIのスタイル設定
const useStyles = makeStyles({
    root: {
        margin: '10px',
        minWidth: '100%',
    }
})

// ローカルステートを更新するmutation
const SET_LOGIN_USER_NAME = gql`
    mutation setLoginUserName($name: String!) {
        setLoginUserName(name: $name) @client
    }
`

const Logout = (props) => {

    const classes = useStyles()

    // useMutaion
    // 実行されたらログイン画面へ遷移する
    const [setLoginUserName] = useMutation(SET_LOGIN_USER_NAME, {
        update: (cache, response) => {
            props.history.push('/')
        }
    })

    // ボタンクリック時
    const doClickButton = () => {

        // ローカルステートの値をクリア
        setLoginUserName({
            variables: {
                'name': ''
            }
        })

    }

    return (
        <FormControl className={classes.root}>
            <Button variant="contained" color="primary" onClick={e => doClickButton()}>ログアウト</Button>
        </FormControl>
    )

}

export default withRouter(Logout)