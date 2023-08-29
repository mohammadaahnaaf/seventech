import { withAuth } from '@seventech-root/hoc'
import { AdminSettings } from '@seventech/admin'
import Head from 'next/head'
import React from 'react'

type Props = {}

const SettingsPage = (props: Props) => {
  return (
    <>
     <Head>
        <title>Admin | SevenTech</title>
        <meta name="seventech" content="Admin page" />
        <link rel="icon" href="/admin.ico" />
      </Head>
      <AdminSettings />
    </>
  )
}

export default withAuth(SettingsPage)