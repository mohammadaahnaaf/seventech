import { Layout } from '@seventech/layouts'
import { axiosRoot } from '@seventech/utils'
import React from 'react'

type Props = {}

export const Privacy = (props: Props) => {

    const [privacy, setPrivacy] = React.useState<any[]>([])

    //Get Data
    React.useEffect(() => {
        async function getContent() {
            const res = await axiosRoot.get('/content/privacy');
            setPrivacy(res.data)
        }
        getContent()
    }, []);

    return (
        <Layout setSearchTerm>
            <div>
            <div className='min-h-screen text-black bg-white'>
                <div className='max-w-7xl mx-auto grid'>
                    <h2 className='text-xl md:text-2xl font-semibold text-center py-4'>
                        Privacy Policy
                    </h2>
                    <div className='grid items-start justify-start gap-5 md:gap-10 px-8 py-5'>
                        {privacy.map((item, index) => (
                            <div key={index} className='grid gap-1'>
                                <h4 className='text-sm font-medium md:text-lg'>{index + 1}. {item.title}</h4>
                                <p className='text-xs font-normal pl-3 md:pl-5 md:text-md'>{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            </div>
        </Layout>
    )
}