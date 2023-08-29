import { withMeAuth } from '@seventech-root/hoc'
import { Profile } from '@seventech/client/auth/Profile'
import Head from 'next/head'
import React from 'react'

type Props = {}

const ProfilePage = (props: Props) => {
    return (
        <>
            <Head>
                <title>SevenTech | Profile</title>
                <meta name="seventech" content="My Profile" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Profile />
        </>
    )
}

export default withMeAuth(ProfilePage)