import React from 'react';
import { useRouter } from 'next/router';
import { useCart } from 'react-use-cart'
import Link from 'next/link';
import { Layout } from '@seventech/layouts';
import Image from 'next/image';
import { isServer } from '@seventech/utils';

export function Cart() {

    const router = useRouter()
    const { removeItem, items, totalUniqueItems, updateItem } = useCart()
    const [searchTerm, setSearchTerm] = React.useState('')
    const [view, setView] = React.useState(false);

    const countSubtotal = (i: any) => i.reduce((acc: number, curr: any) => acc + curr.quantity * curr.price, 0);
    const subtotal = countSubtotal(items)

    function handleIncrement(id: any, count: any) {
        let qty = count + 1
        // setQty(count => count + 1)
        updateItem(id, {
            quantity: qty,
        });
    }
    function handleDecrement(id: any, count: any) {
        let qty = count - 1
        // setQty(count => count - 1)
        updateItem(id, {
            quantity: qty,
        });
    }


    React.useEffect(() => {
        setView(true)
    }, [])

    if (isServer()) {
        return null
    }
    return view ? (
        <Layout setSearchTerm={setSearchTerm}>
            <div className="min-h-screen py-6 sm:px-6 lg:px-8">
                {/* container begains from here */}
                <div className="max-w-5xl bg-gray-300 bg-opacity-20 mx-auto mt-5 flex max-h-screen flex-col overflow-y-auto rounded-lg shadow-xl">
                    <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                        <h2 className="text-xl lg:text-4xl text-center w-full font-large text-black"> Shopping Cart </h2>
                        <div className="mt-8">
                            <div className="flow-root">
                                {totalUniqueItems === 0 &&
                                    <div className='pb-5'>
                                        <h2 className="text-xl lg:text-2xl text-center w-full font-large text-black">
                                            Your cart is empty.{' '}
                                            <span>Please add few products</span>
                                        </h2>
                                    </div>
                                }
                                <ul role="list" className="-my-6 divide-y divide-red-200">
                                    {items.map((product) => (
                                        <li key={product.id} className="flex py-6">
                                            <div className="h-24 relative w-24 flex-shrink-0 rounded-md border border-gray-200">
                                                <Image
                                                    fill
                                                    alt='product image'
                                                    src={product.imageSrc}
                                                    className="h-full w-full object-cover object-center"
                                                />
                                            </div>

                                            <div className="ml-4 flex flex-1 flex-col">
                                                <div>
                                                    <div className="flex justify-between text-base font-medium text-black hover:text-red-600">
                                                        <button type='button' onClick={() => router.push(`/product/${product.id}`)}>
                                                            {product.name}
                                                        </button>
                                                        <p className="ml-4 text-green-500">৳ {product.price}</p>
                                                    </div>
                                                    <Link href={`/category/${product.category}`}
                                                        className="mt-1 hover:text-white text-sm text-red-600">
                                                        {product.category}
                                                    </Link>
                                                </div>
                                                <div className="flex flex-1 items-end justify-between text-sm">

                                                    <div className='flex gap-2 items-center'>
                                                        <h4 className="text-sm font-medium text-black">Qty: </h4>
                                                        <div className="flex h-5 w-full mt-1 bg-transparent ring-black ring-2">
                                                            <button disabled={product.quantity === 1} type='button' onClick={() => handleDecrement(product.id, product.quantity)} data-action="decrement" className="w-full font-bold text-md h-full px-2 hover:bg-black hover:text-white text-black cursor-pointer">
                                                                −
                                                            </button>
                                                            <p className="flex items-center justify-center w-full font-semibold text-center text-black border-black px-2 border-x-2 text-sm">{product.quantity}</p>
                                                            <button disabled={product.quantity === product.stock} type='button' onClick={() => handleIncrement(product.id, product.quantity)} data-action="increment" className="font-bold text-md w-full px-2 h-full hover:bg-black hover:text-white text-black cursor-pointer">
                                                                +
                                                            </button>
                                                        </div>
                                                    </div>

                                                    {/* <p className="text-red-500">Qty {product.quantity}</p> */}

                                                    <div className="flex">
                                                        <button
                                                            type="button"
                                                            onClick={() => removeItem(product.id)}
                                                            className="font-medium"
                                                        >
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                                                                className="h-6 w-6 text-red-600 hover:text-red-300">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-red-200 py-6 px-4 sm:px-6">
                        {totalUniqueItems !== 0 && (
                            <>
                                <div className="flex items-end justify-between text-base font-medium text-green-800">
                                    <p>Subtotal :</p>
                                    <p>৳ {subtotal}</p>
                                </div>
                                <p className="mt-0.5 text-sm text-green-600">Shipping cost shall be calculated at checkout.</p>
                                <div className="mt-6">
                                    <Link href="/checkout"
                                        className="flex items-center justify-center bg-white py-3 text-base font-medium text-black hover:text-white shadow-sm hover:bg-black">
                                        Checkout
                                    </Link>
                                </div>
                            </>
                        )}
                        <div className="my-3 flex justify-center text-center text-md text-black hover:text-red-600">

                            <button
                                type="button"
                                className="font-medium"
                                onClick={() => router.push('/')}

                            >
                                Continue Shopping<span aria-hidden="true"> &rarr;</span>
                            </button>

                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    ) : null
}