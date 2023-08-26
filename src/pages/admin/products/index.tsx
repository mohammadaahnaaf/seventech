import { withAuth } from '@seventech-root/hoc'
import { ProductList } from '@seventech/admin'
import React from 'react'

type Props = {}

const ProductListPage = (props: Props) => {
  return (
    <div>
        <ProductList />
    </div>
  )
}

export default withAuth(ProductListPage)