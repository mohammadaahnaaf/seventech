import { Layout } from '@seventech/layouts';
import React from 'react'
import { Banner } from './Banner';
import { axiosRoot, isServer } from '@seventech/utils';
import { Shop } from './Shop';
import { CategoryBar } from '..';

export function Maine() {

    const [searchTerm, setSearchTerm] = React.useState('')
    const [home, setHome] = React.useState([]);
    const [view, setView] = React.useState(false);
    const [open, setOpen] = React.useState(false);

    // get featured products data
    React.useEffect(() => {
        async function getProducts() {
            const res = await axiosRoot.get('/products/featured-on-home');
            setHome(res.data)
        }
        getProducts()
    }, []);

    // const mapArrayByIndex = home?.sort((a, b) => a.index - b.index).map(item => item.name);

    React.useEffect(() => {
        setView(true)
    }, [])

    if (isServer()) {
        return null
    }
    return view ? (
        <>
            {home.length === 0 ? (
                <Layout open setOpen setSearchTerm={setSearchTerm}>
                    <div className='h-screen w-full bg-white' />
                </Layout>
            ) : (
                <Layout open={open} setOpen={setOpen} setSearchTerm={setSearchTerm}>
                    <CategoryBar open={open} setOpen={setOpen} />
                    <Banner />
                    <div className='pb-4 min-h-screen bg-white'>
                        {home?.map((item: any, index: number) => (
                            <Shop key={index} items={item.products.slice(0, 12)} title={item.tagline} />
                        ))}
                    </div>
                </Layout>
            )}
        </>
    ) : null
} 