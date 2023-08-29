import { Terms } from '@seventech/client'
import Head from 'next/head'
import React from 'react'

type Props = {}

const TermsPage = (props: Props) => {
  return (
    <>
      <Head>
        <title>SevenTech | Terms & conditions</title>
        <meta name="seventech" content="About Us page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Terms />
    </>
  )
}

export default TermsPage;