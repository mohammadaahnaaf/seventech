import React, { Fragment, useEffect, useRef, useState } from 'react'
import Router, { useRouter } from 'next/router'
import Image from 'next/image'
import { useCart } from 'react-use-cart'
import { Dialog, Transition } from '@headlessui/react'
import { ErrorText, SuccessText } from '@seventech/shared'
import { axiosAPI, axiosRoot, classNames, fDateTime, isServer } from '@seventech/utils'
import { Layout } from '@seventech/layouts'
import { Relatedcard } from './Related'

export function Details() {

    const router = useRouter()
    const itemId = router.query.slug
    const myRef = useRef<any>()
    const { addItem } = useCart();

    const [product, setProduct] = useState<any>()
    const [qty, setQty] = useState(1)
    const [star, setStar] = useState(0)
    const [show, setShow] = useState('details');
    const [images, setImages] = useState<any[]>([])
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [view, setView] = useState(1)
    const [openImage, setOpenImage] = useState(false)
    const [ok, setOk] = useState(false)
    const [viewImage, setViewImage] = useState()
    const [isUser, setIsUser] = useState(false)
    const [relatedProductsId, setRelatedProductsId] = useState<any[]>([])

    // const total = (items) => items.reduce((acc, curr) => acc + curr.rating, 0);

    // const ratings = product?.reviews?.reduce((acc, curr) => acc + curr.rating, 0) / product?.reviewCount

    useEffect(() => {
        async function getProduct() {
            let token = localStorage.getItem("access_token");
            setIsUser(!!token)
            const res = await axiosRoot.get(`/products/${itemId}`);
            setProduct(res.data)
            setImages(res.data.images)
            setRelatedProductsId(res.data.relatedProducts)
        }
        itemId && getProduct()

    }, [itemId, router, success]);

    // submit review data
    const handleSubmit = async (event: any) => {

        if (isUser) {
            try {
                event.preventDefault()
                const data = new FormData(event.currentTarget);

                const reqData = {
                    comment: data.get('comment'),
                    rating: +star
                }
                await axiosAPI.post(`/products/${itemId}/review`, reqData);
                setSuccess('Your review added')
                setTimeout(() => { setSuccess('') }, 2000)

            } catch (error: any) {
                console.log(error)
                setError(error.response?.data?.message)
            }
        } else {
            Router.push('/login')
        }
    }

    function handleScroll(e: any) {
        e.preventDefault()
        setShow('reviews')
        myRef.current?.scrollIntoView()
    }

    const cartProduct = {
        id: product?._id,
        imageSrc: images[0],
        name: product?.name,
        price: product?.offerPrice || product?.onlinePrice,
        category: product?.category,
        stock: product?.quantity,
        quantity: 1
    }

    function handleViewImage(item: any) {
        setOpenImage(true)
        setViewImage(item)
    }

    function nextImage() {
        images.map((item, index) => {
            if (item === viewImage && 1 + index !== images.length) {
                setViewImage(images[index + 1])
            } else if (item === viewImage && 1 + index === images.length) {
                setViewImage(images[0])
            }
        })
    }

    function prevImage() {

        let last = images.length - 1
        images.map((item, index) => {
            if (item === viewImage && index !== 0) {
                setViewImage(images[index - 1])
            } else if (item === viewImage && index === 0) {
                setViewImage(images[last])
            }
        })
    }

    const overview = (
        <Transition appear show={openImage} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={() => setOpenImage(false)}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-50"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-xl transform overflow-hidden bg-white p-6 text-center align-middle shadow-xl transition-all">

                                <div className="flex relative gap-4 items-center justify-between mt-2 mx-auto">
                                    <button
                                        type="button"
                                        className="inline-flex absolute z-20 left-2 justify-center rounded-full border border-transparent bg-blue-100 p-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#005DAB] focus-visible:ring-offset-2"
                                        onClick={prevImage}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                                        </svg>

                                    </button>
                                    <div className='mx-auto cursor-pointer relative h-[50vh] w-full'>
                                        {viewImage && (
                                            <Image
                                                fill
                                                src={`${viewImage}`}
                                                alt='preview-images'
                                                className="mx-auto w-full h-full"
                                            />
                                        )}
                                    </div>
                                    <button
                                        type="button"
                                        className="inline-flex absolute right-2 justify-center rounded-full border border-transparent bg-blue-100 p-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#005DAB] focus-visible:ring-offset-2"
                                        onClick={nextImage}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                        </svg>
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )

    React.useEffect(() => {
        setOk(true)
    }, [])

    if (isServer()) {
        return null
    }
    return ok ? (
        <>
            {overview}
            <div className='p-4 md:p-8 grid w-full md:max-w-7xl mx-auto gap-4'>
                <div className='grid grid-cols-5 gap-4 w-full'>
                    <h2 className='col-span-5 text-xl font-semibold lg:hidden flex'>{product?.name}</h2>
                    {/* Images  */}
                    <div className='col-span-5 lg:col-span-2'>

                        <div className='grid gap-4 items-center content-between'>
                            {images?.slice(view - 1, view).map((item, index) => (
                                <div className='relative ring-2 ring-gray-200 hover:ring-0 h-[30vh] md:h-[50vh] w-full hover:scale-95 rounded-md duration-300 cursor-pointer flex items-center mx-auto' key={index}>
                                    <Image
                                        fill
                                        src={item}
                                        alt='product-images'
                                        className="mx-auto w-full h-full rounded-md"
                                    />
                                    <div className='absolute backdrop-blur-sm inset-0 z-10 rounded-md opacity-0 hover:opacity-100 duration-300 flex justify-center items-center'>
                                        <button onClick={() => handleViewImage(item)} className="bg-white text-[#005DAB] rounded-full p-4 hover:bg-black hover:text-white text-lg font-semibold">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                                            </svg>

                                        </button>
                                    </div>
                                </div>
                            ))}
                            <div className='grid grid-cols-4 gap-2 md:gap-4 items-center justify-between'>
                                {images?.map((item, index) => (
                                    <button key={index} type='button' className='ring-2 justify-center hover:scale-95 duration-300 hover:ring-black items-center flex ring-gray-200 rounded-md w-full' onClick={() => setView(index + 1)}>
                                        <Image
                                            height={120}
                                            width={120}
                                            src={`${item}`}
                                            alt='product-images'
                                            className="min-w-full h-[15vh] rounded-md"
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Side info  */}
                    <div className='col-span-5 lg:col-span-3'>
                        <div className='grid items-start h-full'>
                            <h1 className='text-md lg:text-xl font-semibold text-left'>{product?.name}</h1>

                            {/* side info table */}
                            <div className="relative">
                                <table className="w-full text-xs lg:text-sm text-left p-3">

                                    <tbody>
                                        <tr className="border-gray-100 border-b">
                                            <th scope="row" className="w-1/2 lg:w-1/4 font-medium text-gray-900 whitespace-nowrap">
                                                Regular Price:
                                            </th>
                                            <td className=" py-2">
                                                ৳ {product?.regularPrice}
                                            </td>
                                        </tr>
                                        <tr className="border-gray-100 border-b">
                                            <th scope="row" className="w-1/2 lg:w-1/4 font-medium text-gray-900 whitespace-nowrap">
                                                Product Price:
                                            </th>
                                            <td className=" py-2">
                                                ৳ {product?.onlinePrice}
                                            </td>
                                        </tr>
                                        {product?.offerPrice && (
                                            <tr className="border-gray-100 border-b">
                                                <th scope="row" className="w-1/2 lg:w-1/4 font-medium text-gray-900 whitespace-nowrap">
                                                    Offer Price:
                                                </th>
                                                <td className=" py-2">
                                                    ৳ {product?.offerPrice}
                                                </td>
                                            </tr>
                                        )}
                                        <tr className="border-gray-100 border-b">
                                            <th scope="row" className="w-1/2 lg:w-1/4 font-medium text-gray-900 whitespace-nowrap">
                                                Stock Status:
                                            </th>
                                            <td className=" py-2">
                                                {/* {product?.quantity !== 0 ? 'In Stock' : 'Stock Out'} */}
                                                {product?.inStock ? 'In Stock' : 'Stock Out'}
                                            </td>
                                        </tr>
                                        <tr className="border-gray-100 border-b">
                                            <th scope="row" className="w-1/2 lg:w-1/4 font-medium text-gray-900 whitespace-nowrap">
                                                Brand:
                                            </th>
                                            <td className=" py-2">
                                                {product?.imageAlt || 'Unknown'}
                                            </td>
                                        </tr>
                                        <tr className="border-gray-100 border-b">
                                            <th scope="row" className="w-1/2 lg:w-1/4 font-medium text-gray-900 whitespace-nowrap">
                                                Total Reviews:
                                            </th>
                                            <td className="flex py-2">
                                                {[0, 1, 2, 3, 4].map((rating) => (

                                                    // Star Icon SVG 
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                                        key={rating}
                                                        className={classNames(
                                                            product?.averageRating > rating ? 'text-[#005DAB]' : 'text-gray-200',
                                                            'h-5 w-5 flex-shrink-0'
                                                        )}>
                                                        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                                                    </svg>

                                                ))}
                                                <span className='px-2 hidden lg:block'> {product?.reviewCount}
                                                    {product?.reviewCount === 1 ? " Review" : " Reviews"}
                                                </span>
                                                <button type='button' className='hidden hover:text-[#005DAB] lg:block' onClick={handleScroll}>
                                                    | Write A Review
                                                </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            {/* short description  */}
                            <div className='grid items-center content-between h-full'>
                                <div className='grid gap-2'>
                                    <h2 className='text-md font-semibold'>Short Description:</h2>
                                    <p className='text-md'>{product?.shortDescription || "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis at ipsum et dui efficitur euismod non vitae ipsum. Aliquam erat volutpat. Sed eu lacinia lorem. Cras lobortis nisl nisl, in vulputate nibh ullamcorper feugiat. Nunc malesuada condimentum luctus. Nulla tellus mi, porttitor eu tempus vitae, viverra vitae dui. Maecenas vulputate eros ante, et venenatis tortor consequat quis. Nullam vehicula non leo et congue. In vel nisl ligula."}</p>
                                </div>

                                {/* Add to cart button  */}
                                <div className='grid grid-cols-2 w-full gap-3'>
                                    {/* Qty */}
                                    <div>
                                        <h4 className="text-sm font-medium text-gray-900">Qty</h4>
                                        <div className="relative flex flex-row w-full h-12 mt-1 bg-transparent bg-black">
                                            <button disabled={qty === 1} type='button' onClick={() => setQty(count => count - 1)} data-action="decrement" className="w-20 h-full hover:text-white bg-black hover:bg-[#005DAB] text-white cursor-pointer ">
                                                <span className="m-auto text-2xl font-semibold">−</span>
                                            </button>
                                            <p className="flex items-center justify-center w-full font-semibold text-center hover:bg-[#005DAB] bg-black text-white border-white border-x-2 text-md">{qty}</p>
                                            <button disabled={qty === cartProduct.stock} type='button' onClick={() => setQty(count => count + 1)} data-action="increment" className="w-20 h-full bg-black text-white hover:bg-[#005DAB] cursor-pointer">
                                                <span className="m-auto text-2xl font-semibold">+</span>
                                            </button>
                                        </div>
                                    </div>

                                    {/* Add to Cart  */}
                                    <div>
                                        <button
                                            type="button"
                                            disabled={!product?.inStock}
                                            onClick={() => addItem(cartProduct, qty)}
                                            className={classNames(
                                                !product?.inStock ? "cursor-not-allowed" : "",
                                                "flex items-center justify-center w-full px-8 py-3 mt-6 text-base font-medium bg-[#005DAB] hover:bg-black text-white")}
                                        >
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                {/* Specifications More info Reviews  */}
                <div className='rounded-sm w-full'>
                    <div className='w-auto col-span-12 rounded-sm'>
                        {/* <>
                            <div className="sm:hidden">
                                <label htmlFor="tabs" className="sr-only">More Information</label>
                                <select value={show || ''} onChange={(e) => setShow(e.target.value)} id="tabs" className="bg-[#005DAB] outline-none border-0 p-2 border-blue-300 text-white my-4 sm:text-sm focus:border-0 block w-full">
                                    <option value='details'>
                                        Specifications
                                    </option>
                                    <option value='info'>
                                        More Information
                                    </option>
                                    <option value='reviews'>
                                        Reviews
                                    </option>
                                </select>
                            </div>
                            <ul className="hidden text-sm font-medium text-center text-gray-700 divide-x-2 divide-[#005DAB] border-b-[#005DAB] border-b-2 focus:divide-[#005DAB] shadow sm:flex ">
                                <li className="w-full">
                                    <button
                                        onClick={() => setShow('details')}
                                        type='button'
                                        className={classNames(show === 'details' ? "!bg-[#005DAB] text-white" : "text-gray-900",
                                            "inline-block w-full py-2 bg-white active focus:outline-none text-gray-900",
                                            show === 'info' ? 'bg-gradient-to-l from-[#005DAB] to-white' : ''

                                        )}
                                    >
                                        Specifications
                                    </button>
                                </li>
                                <li className="w-full">
                                    <button
                                        onClick={() => setShow('info')}
                                        type='button'
                                        className={classNames(show === 'info' ? "!bg-[#005DAB] text-white" : "text-gray-900",
                                            "inline-block w-full py-2 text-gray-900 bg-white active focus:outline-none",
                                            show === 'reviews' ? 'bg-gradient-to-l from-[#005DAB] to-white' : '',
                                            show === 'details' ? 'bg-gradient-to-r from-[#005DAB] to-white' : '',

                                        )}
                                    >
                                        More Information
                                    </button>
                                </li>
                                <li className="w-full">
                                    <button
                                        onClick={() => setShow('reviews')}
                                        type='button'
                                        className={classNames(show === 'reviews' ? "!bg-[#005DAB] text-white" : "text-gray-900",
                                            "inline-block w-full py-2 bg-white text-gray-900 active focus:outline-none",
                                            show === 'info' ? 'bg-gradient-to-r from-[#005DAB] to-white' : ''
                                        )}
                                    >
                                        Reviews
                                    </button>
                                </li>
                            </ul>
                        </> */}

                        {/* Specifications  */}
                        {/* {(show === 'details') && ( */}
                        <div className='grid grid-cols-2 md:grid-cols-3 border-b-2 border-sky-600'>
                            <h1 className='text-center bg-sky-600 px-4 py-2 font-medium text-md text-gray-50'>Specifications</h1>
                            <div className='w-full bg-gradient-to-r from-sky-600 to-white' />
                        </div>
                        <div className='md:p-5'>
                            <table className="w-full text-sm text-left p-3">
                                <tbody>
                                    {product?.information?.map((info: any, index: number) => (

                                        <tr key={index} className="w-1/2 md:w-1/3 border-gray-100 border-b">
                                            <th scope="row" className="w-1/4 pl-4 font-medium text-gray-900 whitespace-nowrap">
                                                {info.title} :
                                            </th>
                                            <td className=" py-2">
                                                {info.description}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        {/* )} */}

                        {/* More Info */}
                        {/* {(show === 'info') && ( */}
                        <div className='grid grid-cols-2 md:grid-cols-3 border-b-2 border-black'>
                            <h1 className='text-center bg-black px-4 py-2 font-medium text-md text-gray-50'>More Informations</h1>
                            <div className='w-full bg-gradient-to-r from-black to-white' />
                        </div>
                        <div className='md:p-5'>
                            {/* <h2 className='text-xl mb-3 font-medium'>More Informations</h2> */}
                            {product?.details?.map((detail: any, index: number) => (
                                <div className='my-2' key={index}>
                                    <h2 className='pl-10 text-md font-bold text-gray-700'>{detail.title}</h2>
                                    <p className='py-1 px-16 text-sm font-normal text-gray-600'> {detail.description}</p>
                                </div>
                            ))}
                        </div>

                        {/* )} */}

                        {/* Reviews  */}
                        {/* {(show === 'reviews') && ( */}
                        <div className='grid grid-cols-2 md:grid-cols-3 border-b-2 border-sky-600'>
                            <h1 className='text-center bg-sky-600 px-4 py-2 font-medium text-md text-gray-50'>Reviews</h1>
                            <div className='w-full bg-gradient-to-r from-sky-600 to-white' />
                        </div>
                        <div className='md:p-5'>
                            <h2 className='text-xl p-2 font-medium'>Average Review</h2>
                            <div className='grid gap-5'>
                                <div className='flex px-2'>
                                    <h1 className='text-7xl text-gray-600'>{product?.averageRating?.toFixed(1) || '0.0'}</h1>
                                    <div className='grid'>
                                        <div className="flex items-center">
                                            {[0, 1, 2, 3, 4].map((rating) => (

                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                                    key={rating}
                                                    className={classNames(
                                                        product?.averageRating > rating ? 'text-[#005DAB]' : 'text-gray-300',
                                                        'h-8 w-8 flex-shrink-0'
                                                    )}>
                                                    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                                                </svg>

                                            ))}
                                        </div>
                                        <h2 className='px-2 py-1 text-gray-600'>{product?.reviewCount || '0'}
                                            <span>{product?.reviewCount === 1 ? " Review" : " Reviews"}</span>
                                        </h2>
                                    </div>
                                </div>
                                <div className='px-2 grid gap-3'>
                                    {product?.reviews?.map((review: any, index: number) => {
                                        return (
                                            <div key={index} className='border-b md:mx-5 border-gray-200 items-center pb-2 grid justify-between col-span-1 gap-3 md:flex'>
                                                <div className='grid w-1/4 gap-0'>
                                                    <p className='text-sm'>{review.name}</p>
                                                    <p className='text-xs text-gray-500'>@ {fDateTime(+review.date)}</p>
                                                </div>
                                                <div className="flex items-center">
                                                    {[0, 1, 2, 3, 4].map((rating) => (
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                                            key={rating}
                                                            className={classNames(
                                                                review.rating > rating ? 'text-blue-400' : 'text-gray-300',
                                                                'h-6 w-6 flex-shrink-0'
                                                            )}>
                                                            <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                                                        </svg>
                                                    ))}
                                                </div>
                                                <p className='flex items-center w-1/3 text-sm text-gray-500'>{review.comment}</p>
                                            </div>
                                        )
                                    })}
                                </div>

                                {/* white a review  */}
                                {success && <SuccessText success={success} />}
                                {error && <ErrorText error={error} />}

                                <form onSubmit={handleSubmit}>
                                    <div ref={myRef} className='px-2 md:px-5'>
                                        <label htmlFor="comment" className="block text-xl font-medium text-gray-700">
                                            Write a Review
                                        </label>
                                        <div className="mt-3">
                                            <textarea
                                                id="comment"
                                                name="comment"
                                                // type='string'
                                                rows={3}
                                                className="block p-2 w-full mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-[#005DAB] focus:border-[#005DAB] sm:text-sm"
                                                placeholder="Write your review"
                                                defaultValue={''}
                                            />
                                        </div>
                                        <div className="flex text-gray-800 hover:text-blue-800 items-center p-3 mt-3 hover:bg-blue-100 bg-gray-200 rounded-md">
                                            <p className='mr-3'>Do You Like It?</p>
                                            {[0, 1, 2, 3, 4].map((rating, index) => (
                                                <button key={index} type='button' onClick={() => setStar(index + 1)}>

                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                                        key={rating}
                                                        className={classNames(
                                                            star > rating ? 'text-[#005DAB]' : 'text-blue-200',
                                                            'h-6 w-6 flex-shrink-0 ring-2 hover:text-[#005DAB] ring-blue-200 rounded bg-white mx-1'
                                                        )}>
                                                        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                                                    </svg>

                                                </button>
                                            ))}
                                        </div>
                                        <button type='submit' className="flex items-center justify-center px-4 py-1 mt-3 text-base font-medium text-white bg-[#005DAB] border border-transparent rounded-md min-w-15 hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#005DAB]">
                                            Comment
                                        </button>
                                    </div>
                                </form>

                            </div>
                        </div>
                        {/* )} */}
                    </div>
                </div>

                {/* Realted Products  */}
                {relatedProductsId.length > 0 && (
                    <div className='bg-white mt-4 md:max-w-7xl mx-auto w-full'>
                        <div className='grid grid-cols-2 md:grid-cols-3 border-b-2 border-black'>
                            <h1 className='text-center bg-black px-4 py-2 font-medium text-md text-gray-50'>Related Products</h1>
                            <div className='w-full bg-gradient-to-r from-black to-white' />
                        </div>
                        <div className='grid grid-cols-12 w-full gap-2 rounded-b-md py-3'>
                            {relatedProductsId?.slice(0, 6).map((item: any, index: number) =>
                                <div key={index} className='col-span-12 lg:col-span-6'>
                                    <Relatedcard item={item} />
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </>
    ) : null
}

export function ProductDetail() {

    const [searchTerm, setSearchTerm] = React.useState('')

    return (
        <Layout setSearchTerm={setSearchTerm}>
            <Details />
        </Layout>
    )
}