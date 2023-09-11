import React, { useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/router';
import { ErrorText, SuccessText } from '@seventech/shared';
import { axiosAPI } from '@seventech/utils';
import { AdminLayout } from '@seventech/layouts';

const Detail = () => {
    const router = useRouter()
    const itemId = router.query.slug

    const [formValues, setFormValues] = React.useState([{ id: uuidv4(), detail: "" }])
    const [status, setStatus] = React.useState('')
    const [error, setError] = React.useState('')
    const [success, setSuccess] = React.useState('')
    const [payment, setPayment] = React.useState('')
    const [products, setProducts] = React.useState([
        {
            _id: '',
            name: '',
            onlinePrice: '',
            offerPrice: '',
            productId: '',
            quantity: ''
        },
    ])

    const [order, setOrder] = React.useState({
        customer_name: '',
        customer_number: '',
        city: '',
        zone: '',
        address: '',
        status: '',
        payment_method: '',
        total: '',
        products: []
    })

    // get order data
    useEffect(() => {
        async function getOrder() {
            const res = await axiosAPI.get(`/orders/${itemId}`);
            setOrder(res.data)
            setStatus(res.data.status)
            setPayment(res.data.payment_method)
            setProducts(res.data.products)
        }

        itemId && getOrder()

    }, [router, itemId, success]);

    const handleChange = (id: any, event: any) => {
        const newInputFields = formValues.map((i: any) => {
            if (id === i.id) {
                i[event.target.name] = event.target.value
            }
            return i;
        })
        setFormValues(newInputFields);
    };

    // const addFormFields = () => {
    //     setFormValues([...formValues,
    //     {
    //         id: uuidv4(),
    //         detail: ''
    //     }])
    // };

    // const removeFormFields = id => {
    //     const values = [...formValues];
    //     values.splice(values.findIndex(value => value.id === id), 1);
    //     setFormValues(values);
    // }

    async function handleSubmit(event: any) {
        // submit edited data
        try {
            event.preventDefault()
            // const data = new FormData(event.currentTarget);

            const reqData = {
                status: status
            }
            await axiosAPI.put(`/orders/${itemId}`, reqData);
            setSuccess('Status Edited')
            setTimeout(() => {
                setSuccess('')
            }, 2000)

        } catch (error: any) {
            console.log(error)
            setError(error.response?.data?.message)
            setTimeout(() => { setError('') }, 6000)
        }
    }

    const statusOpsn = [
        {
            name: 'Pending',
            value: 'pending'
        },
        {
            name: 'Confirmed',
            value: 'confirmed'
        },
        {
            name: 'Delivered',
            value: 'delivered'
        },
        {
            name: 'Unreachable',
            value: 'unreachable'
        },
        {
            name: 'On Hold',
            value: 'hold'
        },
        {
            name: 'Paid',
            value: 'paid'
        },
        {
            name: 'Processing',
            value: 'processing'
        },
        {
            name: 'Shipped',
            value: 'shiped'
        },
        {
            name: 'Refunded',
            value: 'refunded'
        },
        {
            name: 'Canceled',
            value: 'cancelled'
        },
    ]

    return (

        <div className='grid p-5 bg-white rounded-lg grid-cols-1 gap-3 justify-around mx-3 my-3'>
            <h1 className='text-center py-3 mb-5 rounded-lg bg-gray-200 text-2xl'>Order Details</h1>
            {success && (
                <SuccessText success={success} />
            )}
            {error && (
                <ErrorText error={error} />
            )}
            <form onSubmit={handleSubmit}>
                <div className="grid gap-6 mb-6 md:grid-cols-2">

                    {/* Details  */}
                    <div className='grid grid-cols-2 gap-x-3 gap-y-1'>
                        <div className='col-span-2'>
                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Customer name</label>
                            <input value={order.customer_name || ''} type="text" id="name" name='name' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5" placeholder="Name" />
                        </div>
                        <div className='col-span-2'>
                            <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 ">Phone</label>
                            <input value={order.customer_number || ''} type="tel" id="phone" name='phone' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5" placeholder="Phone number" />
                        </div>
                        <div className='col-span-1'>
                            <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900">City</label>
                            <input value={order.city || ''} type="text" id="city" name='city' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5" placeholder="City" />
                        </div>
                        <div className='col-span-1'>
                            <label htmlFor="zone" className="block mb-2 text-sm font-medium text-gray-900 ">Zone</label>
                            <input value={order.zone || ''} type="text" id="zone" name='zone' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5" placeholder="Zone" />
                        </div>
                        <div className='col-span-2'>
                            <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900">Address</label>
                            <input value={order.address || ''} type="text" id="address" name='address' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5" placeholder="Address" />
                        </div>
                    </div>

                    {/* Payment  */}
                    <div className='grid gap-y-1'>
                        <div>
                            <label htmlFor="qty" className="block mb-2 text-sm font-medium text-gray-900">Quantity</label>
                            <input value={products.length || ''} type="number" name="qty" id="qty" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5" placeholder="" />
                        </div>
                        <div>
                            <label htmlFor="total" className="block mb-2 text-sm font-medium text-gray-900">Total</label>
                            <input value={order.total || ''} type="number" name="total" id="total" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5" placeholder="" />
                        </div>

                        <div>
                            <label htmlFor="status" className="block mb-2 text-sm font-medium text-gray-900">Status</label>
                            <select id="status" name='status' value={status || ''} onChange={(e) => setStatus(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 ">
                                {statusOpsn.map((x, index) => (
                                    <option key={index} value={x.value}>{x.name}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="payment" className="block mb-2 text-sm font-medium text-gray-900">Payment</label>
                            <select value={payment || ''} onChange={(e) => setPayment(e.target.value)} id="payment" name='payment' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5">
                                <option value='online'>BKash</option>
                                <option value="cash-on-delivery">Cash on Delivery</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Products  */}
                <div className='grid w-full items-start gap-2'>
                    <h1 className='text-start px-4 py-3 mb-5 rounded-lg bg-gray-200 text-xl'>Ordered Products List</h1>
                    <div className='grid w-full items-end gap-2'>

                        {products?.map((element: any, index: number) => (
                            <div className="grid gap-2 grid-cols-10 w-full items-center" key={index}>
                                <div className='col-span-4'>
                                    <label htmlFor="name" className="block mb-2 text-xs font-medium text-gray-900">Product Name</label>
                                    <input type="text" name="name" id="name" value={element.name || ""} onChange={(e) => handleChange(element._id, e)} className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5" placeholder="Name" />
                                </div>
                                <div className='col-span-3'>
                                    <label htmlFor="quantity" className="block mb-2 text-xs font-medium text-gray-900">Qty</label>
                                    <input type="number" name="quantity" id="quantity" value={element.quantity || ""} onChange={(e) => handleChange(element._id, e)} className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5" placeholder="qty" />
                                </div>
                                <div className='col-span-3'>
                                    <label htmlFor="onlinePrice" className="w-full mb-2 text-xs font-medium text-gray-900">Price</label>
                                    <input type="number" name="onlinePrice" id="onlinePrice" value={element?.offerPrice || element.onlinePrice} onChange={(e) => handleChange(element._id, e)} className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5" placeholder="Price" />
                                </div>
                                {/* <div className='flex'>

                                    {formValues.length != 1 && (
                                        <button type="button" className="items-end flex" onClick={() => removeFormFields(element._id)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-2 mb-2 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>
                                    )}
                                </div> */}
                            </div>
                        ))}
                        {/* <div>
                            <button className="hidden w-auto text-white bg-black hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-lg text-xs sm:w-auto px-4 py-2 text-center" type="button" onClick={addFormFields}>Add</button>
                        </div> */}
                    </div>
                </div>
                <div className='flex items-end justify-end gap-2 p-2 mt-5 bg-gray-200 rounded-lg'>
                    <button className="w-auto px-4 py-2 text-xs text-center text-white bg-red-600 rounded-lg hover:bg-black focus:ring-4 focus:outline-none focus:ring-gray-300 sm:w-auto" type='button'>Cancel</button>
                    <button className="w-auto px-4 py-2 text-xs text-center text-white bg-black rounded-lg hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-gray-300 sm:w-auto" type='submit'>Done</button>
                </div>

            </form>
        </div>
    )
}

export function OrderDetails() {
    return (
        <AdminLayout>
            <Detail />
        </AdminLayout>
    )
}