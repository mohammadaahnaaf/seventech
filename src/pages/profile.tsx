import { withMeAuth } from '@seventech-root/hoc'
import { Profile } from '@seventech/client/auth/Profile'
import React from 'react'

type Props = {}

const ProfilePage = (props: Props) => {
    return (
        <div>
            <Profile />
        </div>
    )
}

export default withMeAuth(ProfilePage)