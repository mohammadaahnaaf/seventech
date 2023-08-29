import { ProductDetail } from '@seventech/client'
import Head from 'next/head'
import React from 'react'

type Props = {}

const ProductDetailsPage = (props: Props) => {
    return (
        <>
            <Head>
                <title>SevenTech | Product</title>
                <meta name="seventech" content="Product page" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <ProductDetail />
        </>
    )
}

export default ProductDetailsPage;