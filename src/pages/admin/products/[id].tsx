import { withAuth } from '@seventech-root/hoc'
import { ProductsDetails } from '@seventech/admin'
import React from 'react'

type Props = {}

const ProductDetailPage = (props: Props) => {
  return (
    <div>
        <ProductsDetails />
    </div>
  )
}

export default withAuth(ProductDetailPage)