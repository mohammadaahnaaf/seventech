import { withAuth } from '@seventech-root/hoc'
import { Subscribers } from '@seventech/admin/subscribers'
import React from 'react'

type Props = {}

const CustomerPage = (props: Props) => {
  return (
    <div>
        <Subscribers />
    </div>
  )
}

export default withAuth(CustomerPage)