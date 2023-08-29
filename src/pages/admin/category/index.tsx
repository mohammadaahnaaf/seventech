import { withAuth } from '@seventech-root/hoc'
import { CategoriesList } from '@seventech/admin/categories'
import Head from 'next/head'
import React from 'react'

type Props = {}

const CategoryPage = (props: Props) => {
  return (
    <>
      <Head>
        <title>Admin | SevenTech</title>
        <meta name="seventech" content="Admin page" />
        <link rel="icon" href="/admin.ico" />
      </Head>
      <CategoriesList />
    </>
  )
}

export default withAuth(CategoryPage)