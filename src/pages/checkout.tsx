import { Checkout } from '@seventech/client'
import Head from 'next/head'
import React from 'react'

type Props = {}

const CheckoutPage = (props: Props) => {
  return (
    <>
      <Head>
        <title>SevenTech | Checkout</title>
        <meta name="seventech" content="About Us page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Checkout />
    </>
  )
}

export default CheckoutPage;