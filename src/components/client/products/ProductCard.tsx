import { classNames } from '@seventech/utils';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { useCart } from 'react-use-cart';


interface Props {
    product: any
}

export function ProductCards(props: Props) {

    const { product } = props
    const { addItem } = useCart();

    const cartProduct = {
        id: product?._id,
        imageSrc: product.images[0],
        name: product?.name,
        price: product?.offerPrice || product?.onlinePrice,
        category: product?.category,
        stock: product?.quantity,
        quantity: 1
    }

    return (
        <div className="group ring-gray-400 ring-2 hover:scale-95 duration-300 bg-white relative">
            <div className="absolute z-40 grid items-center justify-items-center top-0 right-0 p-1 text-white hover:bg-gray-600 bg-gray-400">
                <button
                    type='button'
                    disabled={!product.inStock || product.quantity === 0}
                    onClick={() => addItem(cartProduct)}
                    className={classNames(
                        !product.inStock ? "cursor-not-allowed" : "",
                        "hover:text-gray-50"
                    )}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                        className='lg:h-7 lg:w-7 h-5 w-5' >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                    </svg>

                </button>
            </div>
            <div>
                {product.images.slice(0, 1).map((item: any, index: number) => (
                    <div key={index} className="min-h-80 bg-white aspect-w-1 aspect-h-1 w-full overflow-hidden group-hover:opacity-75 lg:aspect-none lg:h-80">

                        <Image
                            height={512}
                            width={512}
                            src={item}
                            alt='product-images'
                            className="mx-auto w-full h-full"
                        />
                    </div>
                ))}
            </div>
            <div className="grid w-full p-2 border-t-2 border-gray-400">
                <div className='h-20 hidden md:grid content-between'>
                    <Link href={`/product/${product?._id}`} className="w-full font-normal truncate text-sm text-black">
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product?.name}
                    </Link>
                    <p className="mt-1 w-full flex justify-end items-center text-end text-sm gap-2 text-[green]">
                        <span className='text-[red] line-through'> ৳ {product.regularPrice}</span> ৳ {product?.offerPrice || product?.onlinePrice}
                    </p>
                </div>
                <div className='h-20 grid md:hidden content-between'>
                    <Link href={`/product/${product?._id}`} className="text-xs w-full truncate font-normal text-black">
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product?.name}
                    </Link>
                    <div className='flex items-center justify-between'>
                        <button
                            type='button'
                            disabled={!product.inStock || product.quantity === 0}
                            onClick={() => addItem(cartProduct)}
                            className={classNames(
                                !product.inStock ? "cursor-not-allowed" : "",
                                "hover:text-gray-600 text-black block 2xl:hidden"
                            )}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                                className='h-5 w-5' >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                            </svg>
                        </button>

                        <p className="mt-1 w-full flex justify-end items-center text-end text-xs gap-2 text-green-500">
                            <span className='text-gray-500 line-through'> ৳ {product?.regularPrice}</span> ৳ {product?.offerPrice || product?.onlinePrice}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}