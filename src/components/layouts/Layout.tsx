import React from 'react'
import { AdminNav, Footers } from '@seventech/shared'

type Props = {
    children: any;
    setSearchTerm: any
}
export function Layout(props: Props) {
    const { children, setSearchTerm } = props

    const [open, setOpen] = React.useState(false)

    return (
        <>
            <AdminNav />
            <div>
                {children}
            </div>
            <Footers />
        </>
    )
}