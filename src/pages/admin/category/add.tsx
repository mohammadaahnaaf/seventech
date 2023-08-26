import { withAuth } from '@seventech-root/hoc'
import { AddCategory } from '@seventech/admin/categories'
import React from 'react'

type Props = {}

const AddCategoryPage = (props: Props) => {
  return (
    <div>
        <AddCategory />
    </div>
  )
}

export default withAuth(AddCategoryPage)