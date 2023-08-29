import { Cart } from '@seventech/client/cart/Cart'
import Head from 'next/head'
import React from 'react'

type Props = {}

const CartPage = (props: Props) => {
  return (
    <>
      <Head>
        <title>SevenTech | Cart</title>
        <meta name="seventech" content="Cart" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Cart />
    </>
  )
}

export default CartPage;