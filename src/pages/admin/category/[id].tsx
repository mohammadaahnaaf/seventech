import { withAuth } from '@seventech-root/hoc'
import { CategoryDetaili } from '@seventech/admin/categories'
import React from 'react'

type Props = {}

const CategoryDetailsPage = (props: Props) => {
  return (
    <div>
        <CategoryDetaili />
    </div>
  )
}

export default withAuth(CategoryDetailsPage)