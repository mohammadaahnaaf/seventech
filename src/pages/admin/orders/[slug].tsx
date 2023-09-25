import React from 'react'
import Head from 'next/head'
import { withAuth } from '@seventech-root/hoc'
import { OrderDetails } from '@seventech/admin'

type Props = {}

const OrderDetailsPage = (props: Props) => {
  return (
    <>
      <Head>
        <title>Admin | SevenTech</title>
        <meta name="seventech" content="Admin page" />
        <link rel="icon" href="/admin.ico" />
      </Head>
      <OrderDetails />
    </>
  )
}

export default withAuth(OrderDetailsPage)