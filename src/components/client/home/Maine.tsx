import { Layout } from '@seventech/layouts'
import React from 'react'
import { Banner } from './Banner'

type Props = {}

export const Maine = (props: Props) => {
    const [searchTerm, setSearchTerm] = React.useState<string>('')
    return (
        <Layout setSearchTerm={setSearchTerm}>
            <Banner />
            SevenTech
        </Layout>
    )
}