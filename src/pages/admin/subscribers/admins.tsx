import { withAuth } from '@seventech-root/hoc'
import { Admins } from '@seventech/admin'
import Head from 'next/head'
import React from 'react'

type Props = {}

const AdminListPage = (props: Props) => {
  return (
    <>
      <Head>
        <title>Admin | SevenTech</title>
        <meta name="seventech" content="Admin page" />
        <link rel="icon" href="/admin.ico" />
      </Head>
      <Admins/>
    </>
  )
}

export default withAuth(AdminListPage)