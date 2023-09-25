import { Signup } from '@seventech/client'
import Head from 'next/head'
import React from 'react'

type Props = {}

const SignupPage = (props: Props) => {
    return (
        <>
            <Head>
                <title>SevenTech | Signup</title>
                <meta name="seventech" content="Signup page" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Signup />
        </>
    )
}

export default SignupPage;