import { withAuth } from '@seventech-root/hoc'
import { AddProduct } from '@seventech/admin'
import React from 'react'

type Props = {}

const AddProductPage = (props: Props) => {
  return (
    <div>
        <AddProduct />
    </div>
  )
}

export default withAuth(AddProductPage)