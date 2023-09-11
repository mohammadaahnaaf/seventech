import { Category } from './Category'
import React from 'react'
// import { Footers, Navbar } from '@seventech/shared'
import { isServer } from '@seventech/utils'
import { Layout } from '@seventech/layouts'


export function CategoryDetails() {

    const [searchTerm, setSearchTerm] = React.useState('')
    const [view, setView] = React.useState(false)

    React.useEffect(() => {
        setView(true)
    }, [])

    if (isServer()) {
        return null
    }
    return view ? (
        <Layout setSearchTerm={setSearchTerm}>
            <div>
                <Category term={searchTerm} />
            </div>
        </Layout>
    ) : null
}