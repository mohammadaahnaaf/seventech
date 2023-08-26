import React from 'react'
import { AdminNav, Footers, Navbar, NewNavBar } from '@seventech/shared'

type Props = {
    children: any;
    setSearchTerm: any
}
export function Layout(props: Props) {
    const { children, setSearchTerm } = props

    const [open, setOpen] = React.useState<boolean>(false)

    return (
        <>
            {/* <Navbar setOpen={setOpen} setSearchTerm={setSearchTerm} /> */}
            <NewNavBar setSearchTerm={setSearchTerm} />
            <div>
                {children}
            </div>
            <Footers />
        </>
    )
}