import { Privacy } from '@seventech/client'
import Head from 'next/head'
import React from 'react'

type Props = {}

const PrivacyPage = (props: Props) => {
  return (
    <>
      <Head>
        <title>SevenTech | Privacy Policy</title>
        <meta name="seventech" content="About Us page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Privacy />
    </>
  )
}

export default PrivacyPage