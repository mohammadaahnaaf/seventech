import { Forgot } from '@seventech/client'
import Head from 'next/head'
import React from 'react'

type Props = {}

const ForgotPassPage = (props: Props) => {
  return (
    <>
       <Head>
        <title>SevenTech | Forgwt Password</title>
        <meta name="seventech" content="About Us page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Forgot />
    </>
  )
}

export default ForgotPassPage;