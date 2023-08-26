import { withAuth } from '@seventech-root/hoc'
import { CategoriesList } from '@seventech/admin/categories'
import React from 'react'

type Props = {}

const CategoryPage = (props: Props) => {
  return (
    <div>
        <CategoriesList />
    </div>
  )
}

export default withAuth(CategoryPage)