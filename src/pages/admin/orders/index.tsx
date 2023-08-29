import { withAuth } from '@seventech-root/hoc'
import { OrderList } from '@seventech/admin/orders'
import Head from 'next/head'
import React from 'react'

type Props = {}

const OrdersPage = (props: Props) => {
  return (
    <>
      <Head>
        <title>Admin | SevenTech</title>
        <meta name="seventech" content="Admin page" />
        <link rel="icon" href="/admin.ico" />
      </Head>
      <OrderList />
    </>
  )
}

export default withAuth(OrdersPage)