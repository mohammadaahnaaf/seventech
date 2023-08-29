import { CategoryDetails } from '@seventech/client'
import Head from 'next/head'
import React from 'react'

type Props = {}

const CategoryDetailsPage = (props: Props) => {
  return (
    <>
       <Head>
        <title>SevenTech | Products</title>
        <meta name="seventech" content="All Products page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CategoryDetails />
    </>
  )
}

export default CategoryDetailsPage;