import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'

// Material-UI関連のimport
import { makeStyles } from '@material-ui/core/styles'
import {
    FormControl,
    TextField,
    Button,
    Typography,
} from '@material-ui/core'

// GraphQL関連のimport
import gql from 'graphql-tag'

// Apollo-Client関連のimport
import { useMutation } from 'react-apollo-hooks'

// ローカルステートを更新するmutation
const SET_LOGIN_USER_NAME = gql`
    mutation setLoginUserName($name: String!) {
        setLoginUserName(name: $name) @client
    }
`

// Material-UIのスタイル設定
const useStyles = makeStyles({
    root: {
        margin: '10px',
        minWidth: '100%',
    },
    root2: {
        margin: '10px',
        minWidth: '50%',
    },
})


const LoginInput = (props) => {

    const classes = useStyles()

    // useMutaion
    // 実行されたらホームへ遷移する
    const [setLoginUserName] = useMutation(SET_LOGIN_USER_NAME, {
        update: (cache, response) => {
            props.history.push('/home')
        }
    })

    // 初期値
    const [loginId, setloginId] = useState("")
    const [loginPw, setloginPw] = useState("")
    const [ErrLoginId, setErrLoginId] = useState(false)
    const [ErrLoginPw, setErrLoginPw] = useState(false)
    const [HelperTextLoginId, setHelperTextLoginId] = useState("")
    const [HelperTextLoginPw, setHelperTextLoginPw] = useState("")

    // テキスト変更時
    const doChangeLoginId = (e) => {
        setloginId(e.target.value)
    }
    const doChangeLoginPw = (e) => {
        setloginPw(e.target.value)
    }

    // ボタンクリック時
    const doClickButton = () => {

        // 一旦エラー状態を解除
        setErrLoginId(false)
        setErrLoginPw(false)
        setHelperTextLoginId('')
        setHelperTextLoginPw('')

        // 入力チェック
        if (loginId === '') {
            setErrLoginId(true)
            setHelperTextLoginId('入力してください')
        }
        if (loginPw === '') {
            setErrLoginPw(true)
            setHelperTextLoginPw('入力してください')
        }

        // ログインチェック
        // ★本来はAPIで実施
        if ((loginId !== '') && (loginPw !== '')) {
            if ((loginId === 'daikyo') && (loginPw === 'daikyo')) {

                // ログイン成功

                // ローカルステートに値をセット
                setLoginUserName({
                    variables: {
                        'name': '大京太郎'
                    }
                })

            } else {
                setErrLoginId(true)
                setErrLoginPw(true)
                setHelperTextLoginId('ログインIDまたはパスワードが違います')
                setHelperTextLoginPw('ログインIDまたはパスワードが違います')
            }
        }

    }

    return (
        <>
        <FormControl className={classes.root}>
            <TextField required error={ErrLoginId} helperText={HelperTextLoginId} id="login-id" label="ログインID" value={loginId} onChange={e => doChangeLoginId(e)} /><br />
            <TextField required error={ErrLoginPw} helperText={HelperTextLoginPw} id="login-pw" label="パスワード" value={loginPw} onChange={e => doChangeLoginPw(e)} type="password"　/>
        </FormControl>
        <br />
        <FormControl className={classes.root2}>
            <Button variant="contained" color="primary" onClick={e => doClickButton()}>ログイン</Button>
        </FormControl>
        <br />
        <Typography>
            ※ログインID、パスワード共に「daikyo」でログインできます
        </Typography>
        </>
    )

}

export default withRouter(LoginInput)