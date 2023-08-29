import { withAuth } from '@seventech-root/hoc'
import { Subscribers } from '@seventech/admin/subscribers'
import Head from 'next/head'
import React from 'react'

type Props = {}

const CustomerPage = (props: Props) => {
  return (
    <>
      <Head>
        <title>Admin | SevenTech</title>
        <meta name="seventech" content="Admin page" />
        <link rel="icon" href="/admin.ico" />
      </Head>
      <Subscribers />
    </>
  )
}

export default withAuth(CustomerPage)