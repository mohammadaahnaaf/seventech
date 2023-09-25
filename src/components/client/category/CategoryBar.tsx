import { Dialog, Popover, Tab, Transition } from "@headlessui/react";
import { axiosRoot, classNames } from "@seventech/utils";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import React, { Fragment, useState } from "react";

type Props = {
    open: boolean;
    setOpen: any
}

export function CategoryBar(props: Props) {
    const { open, setOpen } = props
    const router = useRouter()
    const [categories, setCategories] = React.useState<any[]>([])

    // Get Data
    React.useEffect(() => {
        async function getCategory() {
            try {
                const res = await axiosRoot.get('/categories');
                setCategories(res?.data.categories)
            } catch (err: any) {
                console.log(err)
            }
        }
        getCategory()
    }, [router, open]);

    function handleClick(y: any, z: any) {

        Router.push({
            pathname: `/category/${z}`,
            query: { y, z },
        })

    }


    const sortedCats = (x: any[]) => x.slice().sort((a: any, b: any) => a.name.localeCompare(b.name));

    return (
        <div>
            {/* Mobile menu */}
            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="transition-opacity ease-linear duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity ease-linear duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 flex">
                        <Transition.Child
                            as={Fragment}
                            enter="transition ease-in-out duration-300 transform"
                            enterFrom="-translate-x-full"
                            enterTo="translate-x-0"
                            leave="transition ease-in-out duration-300 transform"
                            leaveFrom="translate-x-0"
                            leaveTo="-translate-x-full"
                        >
                            <Dialog.Panel className="relative z-40 max-w-full w-full bg-white ring-gray-300 ring-2 shadow-xl pb-12 flex flex-col overflow-y-auto">
                                <div className="px-4 pt-5 pb-2 flex">
                                    <button
                                        type="button"
                                        className="-m-2 p-2 rounded-md inline-flex items-center justify-center text-gray-600"
                                        onClick={() => setOpen(false)}
                                    >
                                        <span className="sr-only">Close menu</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                                            className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                        </svg>

                                    </button>
                                </div>

                                {/* Links */}
                                <Tab.Group as="div" className="mt-2">
                                    <div className="bg-gray-100 border-t border-b border-gray-300">
                                        <Tab.List className="grid p-4">
                                            {sortedCats(categories).map((category: any, index: number) => (
                                                <Tab
                                                    key={index}
                                                    className={({ selected }) =>
                                                        classNames(
                                                            selected ? 'bg-sky-600 bg-opacity-20' : 'border-transparent',
                                                            'flex-1 text-left whitespace-nowrap rounded-md text-black p-2 text-base font-medium'
                                                        )
                                                    }
                                                >
                                                    {category.name}
                                                </Tab>
                                            ))}
                                        </Tab.List>
                                    </div>
                                    <Tab.Panels as={Fragment}>
                                        {sortedCats(categories).map((category: any, index: number) => (
                                            <Tab.Panel key={index} className="py-5 px-4 -z-50 space-y-5">

                                                <div>
                                                    <ul
                                                        role="list"
                                                        className="mt-2 px-4 flex flex-col space-y-6"
                                                    >
                                                        <li className="flow-root">
                                                            <button type="button" onClick={() => router.push(`/category/${category.name}`)} className="-m-3 p-2 block text-md font-semibold text-black">
                                                                {category.name}
                                                            </button>
                                                        </li>
                                                        {sortedCats(category?.subCategories).map((item: any, index: number) => (
                                                            <li key={index} className="flow-root px-4">
                                                                <button type="button"
                                                                    onClick={() => handleClick(category.name, item.name)}
                                                                    // onClick={() => router.push(`/category/${category.name}/${item.name}`)} 
                                                                    className="-m-3 p-2 block text-gray-800">
                                                                    {item.name}
                                                                </button>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>

                                            </Tab.Panel>
                                        ))}
                                    </Tab.Panels>
                                </Tab.Group>


                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>

            {/* PC menu view  */}
            <header className="relative max-h-10 md:block hidden bg-gray-500">
                <div area-position='fixed' aria-label="Top" className="max-w-7xl px-4 lg:px-0 max-h-10 mx-auto">
                    <div>
                        <div className="h-10 flex items-center">
                            {/* <button
                                type="button"
                                className="px-2 ml-3 py-1 flex items-center ring-0 bg-black ring-gray-200 text-red-600 xl:hidden"
                                onClick={() => setOpen(true)}
                            >
                                <span className="sr-only">Open menu</span>
                                <span>Categories</span>
                            </button> */}

                            <Popover.Group className="hidden lg:ml-0 md:block lg:self-stretch">
                                <div className="h-10 flex flex-wrap w-full gap-4 lg:gap-8">

                                    {sortedCats(categories).map((category: any, index: number) => {
                                        return category.show ? (

                                            <Popover key={index} className="flex">
                                                {({ open }) => (
                                                    <>
                                                        <div className="relative flex">
                                                            <Popover.Button
                                                                className={classNames(
                                                                    open
                                                                        ? 'border-b-sky-500 text-white border-b-4'
                                                                        : 'border-transparent text-white hover:border-white border-b-4',
                                                                    'relative z-10 flex items-center focus:outline-none focus:border-b-4 transition-colors ease-out duration-200 text-sm font-semibold'
                                                                )}
                                                            >
                                                                {category.name}
                                                            </Popover.Button>
                                                        </div>

                                                        <Transition
                                                            as={Fragment}
                                                            enter="transition ease-out duration-200"
                                                            enterFrom="opacity-0"
                                                            enterTo="opacity-100"
                                                            leave="transition ease-in duration-150"
                                                            leaveFrom="opacity-100"
                                                            leaveTo="opacity-0"
                                                        >
                                                            <Popover.Panel className="absolute top-full z-40 bg-white backdrop-blur-lg bg-opacity-80 border-b border-black inset-x-0 text-sm text-gray-500">
                                                                <div className="absolute inset-0 top-1/2 bg-white shadow" aria-hidden="true" />

                                                                <div className="relative min-h-[55vh] max-w-7xl mx-auto grid">
                                                                    <div className="w-full">
                                                                        <div className="grid py-4">
                                                                            <div className="justify-start grid gap-5 text-sm w-full">
                                                                                <Link href={`/category/${category.name}`}
                                                                                    className="font-medium text-lg text-black">
                                                                                    {category.name}
                                                                                </Link>
                                                                                <ul
                                                                                    role="list"
                                                                                    className="mt-2 gap-4 grid w-full"
                                                                                >
                                                                                    {sortedCats(category?.subCategories).map((x: any, index: number) => (
                                                                                        <li key={index} className="flex w-full">
                                                                                            <button type="button"
                                                                                                onClick={() => handleClick(category.name, x.name)}
                                                                                                className="text-md w-full font-semibold text-black flex hover:text-sky-500"
                                                                                            >
                                                                                                {x.name}
                                                                                            </button>
                                                                                        </li>
                                                                                    ))}
                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </Popover.Panel>
                                                        </Transition>
                                                    </>
                                                )}
                                            </Popover>

                                        ) : null
                                    })}

                                </div>
                            </Popover.Group>

                        </div>
                    </div>
                </div>
            </header>
        </div>
    )
}

export function NewCatBar() {

    const [isOpen, setIsOpen] = React.useState(false)
    const [subOpen, setSubOpen] = React.useState(false)
    const [categories, setCategories] = useState<any[]>([])
    const [subCategories, setSubCategories] = useState([])
    const router = useRouter()

    //get Data
    React.useEffect(() => {
        async function getCategory() {
            try {
                const res = await axiosRoot.get('/categories');
                setCategories(res.data.categories)
            } catch (err) {
                console.log(err)
            }
        }
        getCategory()
    }, [router]);

    function closeModal() {
        setIsOpen(false)
        setSubOpen(false)
    }

    function openModal() {
        isOpen === false ?
            setIsOpen(true) : setIsOpen(false)
    }

    function handleCategory(item: any) {
        setSubCategories(item)
        setTimeout(() => { setSubOpen(true) })
    }

    const sortedCategories = categories?.slice().sort((a, b) => a.name.localeCompare(b.name));
    const sortedSubCategories = subCategories?.slice().sort((a: any, b: any) => a.name.localeCompare(b.name));

    return (
        <div className="relative grid z-10">
            <header
                // className="bg-gray-400"
                className="bg-[#005DAB]"
            >
                <div className="max-w-7xl flex items-center justify-between w-full mx-auto px-4 sm:px-6 xl:px-8">
                    <button
                        type="button"
                        onClick={openModal}
                        onMouseEnter={e => {
                            setTimeout(() => { setIsOpen(true) }, 200)
                        }}
                        className='text-white font-normal text-md py-2 hover:text-black'
                    >
                        Products
                    </button>
                    <button
                        type="button"
                        onClick={() => router.push('/about')}
                        className='text-white text-md p-2 hover:text-black'
                    >
                        About us
                    </button>
                    <button
                        type="button"
                        onClick={() => router.push('https://goo.gl/maps/7nBfZRWCmJXRNqdX8')}
                        className='text-white text-md p-2 hover:text-black'
                    >
                        Find us
                    </button>
                    <button
                        type="button"
                        onClick={() => router.push('tel:+8801911444466')}
                        className='text-white text-md p-2 hover:text-black'
                    >
                        Contact us
                    </button>
                </div>
            </header>


            <div className="flex fixed top-0 mt-24 w-full"
                onMouseLeave={(e) => {
                    setSubOpen(false)
                    setIsOpen(false)
                }}>

                {isOpen && (
                    <div className="grid gap-1 py-2 text-white items-start bg-[#005DAB] z-50 w-full px-4 sm:px-6 xl:px-8">
                        {sortedCategories?.map((item, index) => (
                            <button className="hover:bg-black hover:text-white px-4 py-1 text-left border-none outline-none ring-0" type='button' key={index}
                                onClick={() => router.push(`/category/${item.name}`)}
                                onMouseEnter={e => {
                                    setTimeout(() => { handleCategory(item.subCategories) }, 200)
                                }}>
                                • {item.name}
                            </button>
                        ))}
                    </div>
                )}

                {subOpen ? (
                    <div className="grid gap-1 py-2 text-white items-start bg-[#005DAB] z-50  w-full px-4 sm:px-6 xl:px-8"
                        onMouseLeave={(e) => {
                            setSubOpen(false)
                        }}>

                        {sortedSubCategories?.map((item: any, index: number) => (
                            <button className="hover:bg-black hover:text-white px-4 py-1 text-left border-none outline-none ring-0" type='button'
                                key={index} onClick={() => router.push(`/category/${item.name}`)}>
                                • {item.name}
                            </button>
                        ))}
                    </div>
                ) :
                    <div className="grid text-white items-start bg-[#005DAB] z-50 w-full px-4 sm:px-6 xl:px-8" />
                }
            </div>


            {/* <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-200"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed left-32 top-26 w-full max-w-lg overflow-y-auto">
                        <div className="flex min-h-full items-start w-full text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel
                                    onMouseLeave={(e) => {
                                        setIsOpen(false)
                                    }}
                                    className="w-full py-5 border-t-2 border-black px-5 transform overflow-hidden bg-white shadow-xl transition-all"
                                >
                                    <div className="grid gap-2 items-start max-w-7xl w-full mx-auto px-4 sm:px-6 xl:px-8">
                                       
                                        {sortedCategories?.map((item, index) => (
                                            <button className="hover:bg-black hover:text-white px-4 py-1 text-left border-none outline-none ring-0" type='button' key={index} onClick={() => router.push(`/category/${item.name}`)}>
                                                • {item.name}
                                            </button>
                                        ))}
                                    </div>

                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition> */}
        </div>
    )
}