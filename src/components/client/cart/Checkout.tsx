/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { useCart } from 'react-use-cart'
import Router, { useRouter } from 'next/router'
import Image from 'next/image'
import { axiosAPI, axiosRoot, isServer } from '@seventech/utils'
import { ErrorText } from '@seventech/shared'
import { cities } from '@seventech-root/data'
import { Layout } from '@seventech/layouts'
import { Success } from './Success'

interface Props {
    setSuccess: any;
    setOrder: any
}

export function Checkouts(props: Props) {

    const { setSuccess, setOrder } = props
    const router = useRouter()

    const [view, setView] = React.useState(false);
    const [me, setMe] = React.useState<any>({
        fullName: "",
        phoneNumber: null,
        city: "",
        zone: "",
        address: ""
    })

    const [city, setCity] = React.useState('Dhaka')
    const [zone, setZone] = React.useState('')
    const [zones, setZones] = React.useState([])
    const [error, setError] = React.useState('')
    const [shipment, setShipment] = React.useState(0)


    let { items, cartTotal, removeItem, totalUniqueItems } = useCart()

    let total = (+ shipment + cartTotal)

    React.useEffect(() => {
        if (totalUniqueItems === 0) {
            Router.push('/cart')
        }

        cities.map((x: any) => {
            if (x.name === city) {
                setZones(x.zone)
            }
        });

        if (city === 'Dhaka') {
            setShipment(60)
        } else {
            setShipment(120)
        }
    }, [city, total])


    // get me
    React.useEffect(() => {
        async function getProfile() {
            try {
                const res = await axiosAPI.get('/auth/get-me');
                setMe(res.data);
            } catch (error) {
                console.log(error)
            }
        }
        getProfile()
    }, []);

    // post data 
    const handleSubmit = async (event: any) => {

        try {
            event.preventDefault()

            const data = new FormData(event.currentTarget);
            const reqData = {
                customer_name: data.get('name'),
                customer_number: data.get('phone'),
                city: data.get('city'),
                zone: data.get('zone'),
                address: data.get('address'),
                payment_method: data.get('payment'),

                products: items.map(value => (
                    {
                        productId: value.id,
                        quantity: value.quantity
                    }
                ))
            }
            const res = await axiosRoot.post('/orders', reqData);
            setSuccess(true)
            setOrder(res.data)

        } catch (error: any) {
            console.log(error)
            setError(error.response?.data?.message)
        }
    }

    function handleCity(e: any) {
        setCity(e.target.value)
    }
    function handleRemove(id: any) {
        removeItem(id)

        if (totalUniqueItems === 0) {
            Router.push('/cart')
        }
    }

    // const countSubtotal = (items) => items.reduce((acc, curr) => acc + curr.quantity * curr.price, 0);
    // const subtotal = countSubtotal(items)
    // const cartTotal = countSubtotal(products)

    React.useEffect(() => {
        setView(true)
    }, [])

    if (isServer()) {
        return null
    }
    return view ? (
        <>
            {error && <ErrorText error={error} />}
            <div className='max-w-7xl relative lg:min-h-[72vh] mx-auto px-4 lg:px-0 py-5 grid grid-cols-3 justify-center gap-5'>

                <div className="order-2 lg:order-1 col-span-3 lg:col-span-2 h-full w-full rounded-md">
                    <form className='grid content-between shadow rounded-md' onSubmit={handleSubmit}>
                        {/* Account and delevary details */}
                        <div className="lg:p-4">
                            <div className="grid grid-cols-6 gap-2 lg:gap-6">
                                <h2 className='text-center col-span-6 text-black font-medium text-2xl'>Checkout</h2>
                                <div className="col-span-6">
                                    <label htmlFor="name" className="block text-sm font-medium text-black">
                                        Your name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder='Name'
                                        id="name"
                                        defaultValue={me.fullName || ''}
                                        autoComplete="given-name"
                                        className="peer block min-h-[auto] placeholder:text-gray-500 w-full rounded focus:outline-none border-2 border-gray-400 focus:border-gray-600 bg-transparent px-3 py-1.5 outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none"
                                    />
                                </div>
                                <div className="col-span-6 sm:col-span-6">
                                    <label htmlFor="phone" className="block text-sm font-medium text-black">
                                        Phone number
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        placeholder='Phone Number'
                                        id="phone"
                                        required
                                        defaultValue={me.phoneNumber || ''}
                                        autoComplete="phone"
                                        className="peer block min-h-[auto] placeholder:text-gray-500 w-full rounded focus:outline-none border-2 border-gray-400 focus:border-gray-600 bg-transparent px-3 py-1.5 outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none"
                                    />
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="city" className="block text-sm font-medium text-black">
                                        City
                                    </label>
                                    <select
                                        id="city"
                                        name="city"
                                        // value={city || ''}
                                        defaultValue={me.city}
                                        onChange={(e) => handleCity(e)}
                                        className="peer block min-h-[auto] placeholder:text-gray-500 w-full rounded focus:outline-none border-2 border-gray-400 focus:border-gray-600 bg-transparent px-3 py-1.5 outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none"
                                    >
                                        {cities?.map((city: any, index: number) => (
                                            <option key={index} value={city.name}>{city.name}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="city" className="block text-sm font-medium text-black">
                                        Zone
                                    </label>
                                    <select
                                        id="zone"
                                        name="zone"
                                        defaultValue={me.zone || ''}
                                        value={zone || ''}
                                        onChange={(e) => setZone(e.target.value)}
                                        className="peer block min-h-[auto] placeholder:text-gray-500 w-full rounded focus:outline-none border-2 border-gray-400 focus:border-gray-600 bg-transparent px-3 py-1.5 outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none"
                                    >
                                        {zones.map((item, index) => (
                                            <option key={index} value={item}>{item}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="col-span-6">
                                    <label htmlFor="payment" className="block text-sm font-medium text-black">
                                        Payment Method
                                    </label>
                                    <select
                                        id="payment"
                                        name="payment"
                                        className="peer block min-h-[auto] placeholder:text-gray-500 w-full rounded focus:outline-none border-2 border-gray-400 focus:border-gray-600 bg-transparent px-3 py-1.5 outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none"
                                    >
                                        <option value='cash-on-delivery'>Cash on Delivery</option>
                                        <option value='online'>BKash</option>
                                    </select>
                                </div>

                                <div className="col-span-6">
                                    <label htmlFor="address" className="block text-sm font-medium text-black">
                                        Street address
                                    </label>
                                    <textarea
                                        id="address"
                                        name="address"
                                        defaultValue={me.address || ''}
                                        rows={3}
                                        className="peer block min-h-[auto] placeholder:text-gray-500 w-full rounded focus:outline-none border-2 border-gray-400 focus:border-gray-600 bg-transparent px-3 py-1.5 outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none"
                                        placeholder="Address"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="px-4 mt-4 rounded-b-md lg:mt-0 py-4 bg-black bg-opacity-10 text-right">
                            <button
                                type="submit"
                                className="inline-flex rounded-sm justify-center py-1 hover:text-white px-4 border border-transparent shadow-sm text-sm font-medium text-black hover:bg-black focus:outline-none ring-2 hover:ring-white ring-black"
                            >
                                Confirm Order
                            </button>
                        </div>
                    </form>
                </div>

                {/* Cart Products details */}
                <div className='w-full order-1 lg:order-2 shadow col-span-3 h-full lg:col-span-1 ring-gray-300'>
                    <div className='overflow-y-scroll h-full py-4'>
                        <div className="h-auto px-2">
                            <h1 className='text-center text-2xl font-semibold'>Cart Products</h1>

                            <div className="flow-root">
                                <ul role="list" className=" divide-y divide-gray-200">
                                    {items?.map((product: any, index: number) => (
                                        <li key={index} className="flex py-6">
                                            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                <div className='relative h-24 w-24 '>
                                                    <Image
                                                        src={product.imageSrc}
                                                        alt={product.id}
                                                        fill
                                                        className="h-full w-full object-cover object-center"
                                                    />
                                                </div>
                                            </div>

                                            <div className="ml-4 flex flex-1 flex-col">
                                                <div>
                                                    <div className="flex justify-between text-base font-medium hover:text-gray-600 text-black">
                                                        <button type='button' onClick={() => router.push(`/product/${product.id}`)}>
                                                            <h3 className='text-left'> {product.name} </h3>
                                                        </button>
                                                        <button
                                                            type="button"
                                                            className="font-medium h-10 hover:bg-opacity-100 bg-opacity-10 hover:text-white text-[red] w-8 m-1 bg-[red] rounded-md py-0.5 px-1"
                                                            onClick={() => handleRemove(product.id)}
                                                        >
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                                                                className="h-6 w-6">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                            </svg>

                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="flex items-end flex-1 justify-between">
                                                    <p className="text-black text-md">Qty: {product.quantity}</p>
                                                    <p className="mx-2 text-md text-vlack">৳{product.price}</p>

                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                        </div>
                        <div className="border-t border-gray-300 p-2">
                            <div className="flex py-1 justify-between text-base font-medium text-black">
                                <p>Subtotal :</p>
                                <p className='text-green-700'>৳ {cartTotal}</p>
                            </div>
                            <div className="flex py-1 justify-between text-base font-medium text-black">
                                <p>Shipping :</p>
                                <p className='text-green-700'>৳ {shipment}</p>
                            </div>

                            <div className="flex mt-2 border-gray-400 border-t py-1 justify-between text-base font-medium text-black">
                                <p>Total :</p>
                                <p className='text-green-700'>৳ {total}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    ) : null
}

export function Checkout() {

    const [success, setSuccess] = React.useState(false)
    const [order, setOrder] = React.useState<any>(null)
    const [searchTerm, setSearchTerm] = React.useState('')
    const [view, setView] = React.useState(false);

    React.useEffect(() => {
        setView(true)
    }, [])

    if (isServer()) {
        return null
    }
    return view ? (
        <>
            {success ?
                <Layout setSearchTerm={setSearchTerm}>
                    <Checkouts setOrder={setOrder} setSuccess={setSuccess} />
                </Layout>
                :
                <Layout setSearchTerm={setSearchTerm}>
                    <Success order={order} />
                </Layout>
            }
        </>
    ) : null
}