import { withAuth } from '@seventech-root/hoc'
import { AdminSettings } from '@seventech/admin'
import React from 'react'

type Props = {}

const SettingsPage = (props: Props) => {
  return (
    <div>
      <AdminSettings />
    </div>
  )
}

export default withAuth(SettingsPage)