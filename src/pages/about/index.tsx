import { About } from '@seventech/client'
import Head from 'next/head'
import React from 'react'

type Props = {}

const AboutPage = (props: Props) => {
  return (
    <>
      <Head>
        <title>SevenTech | About us</title>
        <meta name="seventech" content="About Us page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <About />
    </>
  )
}

export default AboutPage;