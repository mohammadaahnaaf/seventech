import Head from 'next/head'
import React from 'react'
import { withAuth } from '@seventech-root/hoc'
import { CategoryDetaili } from '@seventech/admin'

type Props = {}

const CategoryDetailsPage = (props: Props) => {
  return (
    <>
      <Head>
        <title>Admin | SevenTech</title>
        <meta name="seventech" content="Admin page" />
        <link rel="icon" href="/admin.ico" />
      </Head>
      <CategoryDetaili />
    </>
  )
}

export default withAuth(CategoryDetailsPage)