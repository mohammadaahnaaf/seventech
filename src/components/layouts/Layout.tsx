import React from 'react'
import { Footers, NewNavBar } from '@seventech/shared'
import { CategoryBar } from '@seventech/client';

type Props = {
    children: any;
    setOpen: any;
    open: any;
    setSearchTerm: any
}
export function Layout(props: Props) {
    const { children, setSearchTerm, open, setOpen } = props

    // const [open, setOpen] = React.useState<boolean>(false)

    return (
        <>
            <NewNavBar setSearchTerm={setSearchTerm} setOpen={setOpen} />
            {/* <CategoryBar open={open} setOpen={setOpen} /> */}
            <div>
                {children}
            </div>
            <Footers />
        </>
    )
}