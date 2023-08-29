import { Login } from '@seventech/client/auth/Login'
import Head from 'next/head'
import React from 'react'

type Props = {}

const LoginPage = (props: Props) => {
  return (
    <>
      <Head>
        <title>SevenTech | Login</title>
        <meta name="seventech" content="Login" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Login />
    </>
  )
}

export default LoginPage;