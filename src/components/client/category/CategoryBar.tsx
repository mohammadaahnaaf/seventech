import { Dialog, Popover, Tab, Transition } from "@headlessui/react";
import { axiosRoot, classNames } from "@seventech/utils";
// import { XIcon } from "@heroicons/react/outline";
// import { ChevronDoubleRightIcon } from "@heroicons/react/solid";
// import axiosRoot from "@seventech/utils/axios-root";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { Fragment, useState } from "react";

// const topbarItems = [
//     {
//         id: 0,
//         name: 'Mouse',
//         link: '/category/mouse',
//         logo: <svg className="h-16 w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
//             <path fill="var(--ci-primary-color, currentColor)" d="M448,80a24.027,24.027,0,0,0,24-24V16H440V48H264a24.027,24.027,0,0,0-24,24v40H208.625A88.725,88.725,0,0,0,120,200.625V360.571C120,435.247,180.753,496,255.429,496h1.142C331.247,496,392,435.247,392,360.571V200.625A88.725,88.725,0,0,0,303.375,112H272V80ZM152,200.625A56.689,56.689,0,0,1,208.625,144H240v88H152ZM360,360.571A103.545,103.545,0,0,1,256.571,464h-1.142A103.545,103.545,0,0,1,152,360.571V264H360ZM303.375,144A56.689,56.689,0,0,1,360,200.625V232H272V144Z" className="h-8 w-10" />
//         </svg>
//     },
//     {
//         id: 1,
//         name: 'Keyboard',
//         link: '/category/keyboard',
//         logo: <svg className="h-16 w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
//             <path fill="var(--ci-primary-color, currentColor)" d="M448,80a24.027,24.027,0,0,0,24-24V16H440V48H264a24.027,24.027,0,0,0-24,24v40H208.625A88.725,88.725,0,0,0,120,200.625V360.571C120,435.247,180.753,496,255.429,496h1.142C331.247,496,392,435.247,392,360.571V200.625A88.725,88.725,0,0,0,303.375,112H272V80ZM152,200.625A56.689,56.689,0,0,1,208.625,144H240v88H152ZM360,360.571A103.545,103.545,0,0,1,256.571,464h-1.142A103.545,103.545,0,0,1,152,360.571V264H360ZM303.375,144A56.689,56.689,0,0,1,360,200.625V232H272V144Z" className="h-8 w-10" />
//         </svg>
//     },
//     {
//         id: 2,
//         name: 'Headset',
//         link: '/category/headset',
//         logo: <svg className="h-16 w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
//             <path fill="var(--ci-primary-color, currentColor)" d="M448,80a24.027,24.027,0,0,0,24-24V16H440V48H264a24.027,24.027,0,0,0-24,24v40H208.625A88.725,88.725,0,0,0,120,200.625V360.571C120,435.247,180.753,496,255.429,496h1.142C331.247,496,392,435.247,392,360.571V200.625A88.725,88.725,0,0,0,303.375,112H272V80ZM152,200.625A56.689,56.689,0,0,1,208.625,144H240v88H152ZM360,360.571A103.545,103.545,0,0,1,256.571,464h-1.142A103.545,103.545,0,0,1,152,360.571V264H360ZM303.375,144A56.689,56.689,0,0,1,360,200.625V232H272V144Z" className="h-8 w-10" />
//         </svg>
//     },
// ]

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
            const res = await axiosRoot.get('/categories');
            setCategories(res.data.categories)
        }
        getCategory()
    }, [router, open]);

    return (

        <div className="bg-gradient-to-t from-pink-800 to-black">
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
                            <Dialog.Panel className="relative z-40 max-w-full w-full bg-black ring-gray-300 ring-2 shadow-xl pb-12 flex flex-col overflow-y-auto">
                                <div className="px-4 pt-5 pb-2 flex">
                                    <button
                                        type="button"
                                        className="-m-2 p-2 rounded-md inline-flex items-center justify-center text-gray-100"
                                        onClick={() => setOpen(false)}
                                    >
                                        <span className="sr-only">Close menu</span>
                                        {/* <XIcon className="h-6 w-6" aria-hidden="true" /> */}
                                    </button>
                                </div>

                                {/* Links */}
                                <Tab.Group as="div" className="mt-2">
                                    <div className="border-y-2 border-red-600">
                                        <Tab.List className="grid p-4">
                                            {categories?.map((category: any, index: number) => (
                                                <Tab
                                                    key={index}
                                                    className={({ selected }) =>
                                                        classNames(
                                                            selected ? 'bg-red-600 text-white' : 'text-red-600 border-transparent',
                                                            'flex-1 text-left whitespace-nowrap rounded-md p-2 text-base font-medium'
                                                        )
                                                    }
                                                >
                                                    {index + 1}. {category.name}
                                                </Tab>
                                            ))}
                                        </Tab.List>
                                    </div>
                                    <Tab.Panels as={Fragment}>
                                        {categories.map((category: any, index: number) => (
                                            <Tab.Panel key={index} className="py-5 px-4 -z-50 space-y-5">

                                                <div>
                                                    <ul
                                                        role="list"
                                                        className="mt-2 px-4 flex flex-col space-y-6"
                                                    >
                                                        <li className="flow-root">
                                                            <button type="button" onClick={() => router.push(`/category/${category.name}`)} className="-m-3 p-2 block text-md font-semibold text-red-600">
                                                                {index + 1}. {category.name}
                                                            </button>
                                                        </li>
                                                        {category?.subCategories?.map((item: any, index: number) => (
                                                            <li key={index} className="flow-root px-4">
                                                                <button type="button" onClick={() => router.push(`/category/${item.name}`)} className="-m-3 p-2 block text-gray-200">
                                                                    {index + 1}. {item.name}
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
            <header className="relative max-h-10 lg:block hidden bg-black bg-opacity-10">

                <div area-position='fixed' aria-label="Top" className="max-w-7xl max-h-10 mx-auto px-4 sm:px-6 xl:px-8">
                    <div>
                        <div className="h-10 flex items-center">
                            <button
                                type="button"
                                className="px-2 ml-3 py-1 flex items-center ring-0 bg-black ring-gray-200 text-red-600 xl:hidden"
                                onClick={() => setOpen(true)}
                            >
                                <span className="sr-only">Open menu</span>
                                {/* <MenuIcon className="h-6 w-6" aria-hidden="true" /> */}
                                {/* <ChevronDoubleRightIcon className="h-6 w-6 mr-1" aria-hidden="true" /> */}
                                <span>Categories</span>
                            </button>

                            <Popover.Group className="hidden lg:ml-0 xl:block lg:self-stretch">
                                <div className="h-10 flex w-full gap-8">
                                    {categories.slice(0, 10).map((category, index) => (
                                        <Popover key={index} className="flex">
                                            {({ open }) => (
                                                <>
                                                    <div className="relative flex">
                                                        <Popover.Button
                                                            className={classNames(
                                                                open
                                                                    ? 'border-red-700 text-white border-b-white border-b-4'
                                                                    : 'border-transparent text-red-600 hover:border-white border-b-4 hover:text-white',
                                                                'relative z-10 flex items-center focus:outline-none focus:border-b-4 transition-colors ease-out duration-200 text-sm font-semibold -mb-px pt-px'
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
                                                        <Popover.Panel className="absolute top-full inset-x-0 text-sm text-gray-500">
                                                            <div className="absolute inset-0 top-1/2 bg-white shadow" aria-hidden="true" />

                                                            <div className="relative h-[55vh] border-b-2 border-red-600 bg-gradient-to-b from-black via-red-900 to-black z-40">
                                                                <div className="max-w-7xl mx-auto px-8">
                                                                    <div className="grid grid-cols-2 gap-y-10 gap-x-8 py-8">

                                                                        <div className="row-start-1 grid grid-cols-3 gap-y-5 gap-x-5 text-sm">

                                                                            <div>
                                                                                <Link href={`/category/${category.name}`}
                                                                                    className="font-medium text-lg text-gray-100">
                                                                                    {category.name}
                                                                                </Link>
                                                                                <ul
                                                                                    role="list"
                                                                                    className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                                                                >
                                                                                    {category.subCategories.map((item: any, index: number) => (
                                                                                        <li key={item.name} className="flex">
                                                                                            <button type="button" onClick={() => router.push(`/category/${item.name}`)} className="text-md text-white hover:text-gray-200">
                                                                                                {index + 1}. {item.name}
                                                                                            </button>
                                                                                        </li>
                                                                                    ))}
                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </Popover.Panel>
                                                    </Transition>
                                                </>
                                            )}
                                        </Popover>
                                    ))}

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