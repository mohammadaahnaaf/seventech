import { classNames } from '@seventech/utils';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { useCart } from 'react-use-cart';

type Props = {
    item: any
}

export function Relatedcard(props: Props) {

    const { item } = props
    const { addItem } = useCart();

    let cartProduct = {
        id: item?._id,
        imageSrc: item.images[0],
        name: item.name,
        price: item.onlinePrice,
        category: item.category,
        stock: item.quantity,
        quantity: 1
    }

    return (
        <div className='flex h-28 gap-2 justify-start items-center p-2 rounded-md bg-gray-100 hover:bg-blue-100 shadow'>
            {item?.images?.slice(0, 1).map((image: any, index: number) => (
                <div key={index} className="flex items-center rounded-md group-hover:opacity-75">
                    <Image
                        src={image}
                        // layout='fill'
                        width={120}
                        height={120}
                        alt='product image'
                        className="h-20 w-full z-20 object-cover rounded-md object-center lg:h-full lg:w-full"
                    />
                </div>
            ))}
            <div className='grid h-full w-full content-between'>
                <Link href={`/product/${item?._id}`} className='text-sm font-normal hover:text-gray-700'>
                    {item.name}
                </Link>
                <div className='flex items-center justify-between gap-2'>

                    <div className='flex gap-2 justify-end items-center'>
                        <p className="mt-1 text-end text-sm line-through text-[red]">৳ {item.regularPrice}</p>
                        <p className="mt-1 text-end text-sm text-green-600">৳ {item.offerPrice || item.onlinePrice}</p>
                    </div>
                    <div className="flex items-center">
                        {[0, 1, 2, 3, 4].map((rating) => (
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                key={rating}
                                className={classNames(
                                    item.averageRating > rating ? 'text-black' : 'text-gray-300',
                                    'h-5 w-5 flex-shrink-0'
                                )}>
                                <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                            </svg>
                        ))}
                        <span className='px-2'> {item.reviewCount} Reviews</span>
                    </div>
                    <button
                        className='p-1 flex items-center justify-center bg-red-600 bg-opacity-10 rounded-md text-red-600 hover:text-black'
                        type='button'
                        disabled={item.stock === 0}
                        onClick={() => addItem(cartProduct)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                            className="h-6 w-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    )
}