import React from 'react'
import { useCart } from 'react-use-cart';
import Router from 'next/router'

type Props = {
    order: any
}

export function Success(props: Props) {
    const { order } = props

    const { emptyCart, cartTotal, totalUniqueItems } = useCart();

    function handleSuccess() {
        const { pathname } = Router
        emptyCart()
        if (pathname === '/checkout') {
            Router.push('/')
        }
    }

    let currentTime = new Date();
    const orderId = `#ST${currentTime.getTime()}`;

    return (
        <div className='min-h-screen py-6 bg-white'>
            <div className='bg-black mx-auto rounded-lg bg-opacity-10 max-w-5xl h-full p-2 md:p-6'>
                <div className='grid gap-2 items-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"
                        className='bg-green-600 justify-self-center text-white p-2 rounded-full h-20 w-20' >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>

                    <h1 className='text-green-600 text-4xl text-center'>Thank You</h1>
                    <h1 className='text-gray-800 text-sm py-2 text-center'>Your order has been recived</h1>

                </div>

                <div className='grid gap-4 items-center grid-cols-2 p-4 lg:grid-cols-5'>
                    <div className='cols-span-1 text-center text-black bg-green-500 bg-opacity-20 items-center grid rounded-lg p-3'>
                        <h2>Order ID</h2>
                        <h2>{orderId}</h2>
                    </div>
                    <div className='cols-span-1 text-center text-black  bg-green-500 bg-opacity-20 items-center grid rounded-lg p-3'>
                        <h2>Total Price</h2>
                        <h2>TK {cartTotal}</h2>
                    </div>
                    <div className='cols-span-1 text-center text-black  bg-green-500 bg-opacity-20 items-center grid rounded-lg p-3'>
                        <h2>Ordered At</h2>
                        <h2>Just Now</h2>
                    </div>
                    <div className='cols-span-1 text-center text-black  bg-green-500 bg-opacity-20 items-center grid rounded-lg p-3'>
                        <h2>Order Status</h2>
                        <h2>Pending</h2>
                    </div>
                    <div className='cols-span-1 text-center text-black  bg-green-500 bg-opacity-20 items-center grid rounded-lg p-3'>
                        <h2>Total Products</h2>
                        <h2>{totalUniqueItems}</h2>
                    </div>
                </div>

                {order && <ProductsViews order={order} />}

                <div className='p-4 mx-4 flex items-center justify-center bg-green-400 bg-opacity-20'>
                    <button className='text-sm hover:text-red-600 text-center text-black' type='button' onClick={handleSuccess}>Back to home</button>
                </div>
            </div>
        </div>
    )
}

function ProductsViews(props: Props) {
    const { order } = props
    const { items, cartTotal, totalItems } = useCart()
    const [ship, setShip] = React.useState(0)

    React.useEffect(() => {
        if (order.city === 'Dhaka') {
            setShip(60)
        } else {
            setShip(120)
        }
    }, [order])

    // let shipping = items.length * ship
    // let total = (shipping + cartTotal)

    return (
        <div className="overflow-y-auto relative p-4">
            <table className="w-full text-sm text-left text-black">
                <thead className="text-xs text-black uppercase bg-green-500 bg-opacity-20">
                    <tr>
                        <th scope="col" className="py-3 px-6">
                            Product name
                        </th>
                        <th scope="col" className="py-3 px-6">
                            Qty
                        </th>
                        <th scope="col" className="py-3 px-6">
                            Price
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item, index) => (
                        <tr key={index} className="border-b">
                            <th scope="row" className="py-4 px-6 font-medium text-black  whitespace-nowrap">
                                {index + 1}{'.  '} {item.name}
                            </th>
                            <td className="py-4 px-6">
                                {item.quantity}
                            </td>
                            <td className="py-4 px-6">
                                ৳ {item.price}
                            </td>
                        </tr>
                    ))}
                    <tr className=' bg-green-400 text-black bg-opacity-10 border-b'>
                        <th className='py-4 px-6 font-medium whitespace-nowrap'>Subtotal:</th>
                        <td className="py-4 px-6">{totalItems}</td>
                        <td className="py-4 px-6">৳ {cartTotal}</td>
                    </tr>
                    <tr>
                        <th className='py-4 px-6 font-medium text-gray-800 '>Total: (with shipping cost)</th>
                        <td className="text-black py-4 px-6">{''}</td>
                        <td className="text-black py-4 px-6">৳ {+cartTotal + ship}</td>
                    </tr>
                </tbody>
            </table>
        </div>

    )
}