import { Category } from './Category'
import React from 'react'
// import { Footers, Navbar } from '@seventech/shared'
import { isServer } from '@seventech/utils'
import { Layout } from '@seventech/layouts'


export function CategoryDetails() {

    const [searchTerm, setSearchTerm] = React.useState('')
    const [open, setOpen] = React.useState(false)
    const [view, setView] = React.useState(false)

    React.useEffect(() => {
        setView(true)
    }, [])

    if (isServer()) {
        return null
    }
    return view ? (
        <Layout open setOpen setSearchTerm={setSearchTerm}>
            <div className='border-t-2 border-red-600'>
                <Category term={searchTerm} />
            </div>
        </Layout>
    ) : null
}