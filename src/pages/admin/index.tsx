import { withAuth } from '@seventech-root/hoc'
import { Dashboard } from '@seventech/admin'
import React from 'react'

type Props = {}

const Admin = (props: Props) => {
  return (
    <div>
      <Dashboard />
    </div>
  )
}

export default withAuth(Admin)