import { Dialog, Popover, Tab, Transition } from "@headlessui/react";
import { axiosRoot, classNames } from "@seventech/utils";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { Fragment, useState } from "react";


type Props = {
    open: boolean;
    setOpen: any
}

export function CategoryBar(props: Props) {
    const { open, setOpen } = props
    const router = useRouter()
    const [categories, setCategories] = React.useState<any[]>([])
    const [bu, setBu] = React.useState('')

    // Get Data
    React.useEffect(() => {
        async function getCategory() {
            const res = await axiosRoot.get('/categories');
            setCategories(res.data.categories)
        }
        getCategory()
    }, [router, open]);

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
                                        {/* <XIcon className="h-6 w-6" aria-hidden="true" /> */}
                                    </button>
                                </div>

                                {/* Links */}
                                <Tab.Group as="div" className="mt-2">
                                    <div className="border-y-2 border-sky-600">
                                        <Tab.List className="grid p-4">
                                            {categories?.map((category: any, index: number) => (
                                                <Tab
                                                    key={index}
                                                    className={({ selected }) =>
                                                        classNames(
                                                            selected ? 'bg-sky-600 text-white' : 'text-black border-transparent',
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
                                                            <button type="button" onClick={() => router.push(`/category/${category.name}`)} className="-m-3 p-2 block text-md font-semibold text-black">
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
            <header className="relative max-h-10 lg:block hidden bg-gray-500">
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
                                    {categories?.slice(0, 10).map((category: any, index: number) => (
                                        <Popover key={index} className="flex">
                                            {({ open }) => (
                                                <>
                                                    <div className="relative flex">
                                                        <Popover.Button
                                                            onMouseEnter={e => {
                                                                setTimeout(() => { setBu(category.name) }, 200)
                                                            }}
                                                            className={classNames(
                                                                bu === category.name
                                                                    ? 'border-b-sky-500 text-white border-b-4'
                                                                    : 'border-transparent text-white hover:border-white border-b-4',
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
                                                            <div className="absolute inset-0 top-1/2 bg-white shadow" aria-hidden="false" />

                                                            <div className="relative min-h-[55vh] bg-white">
                                                                <div className="max-w-7xl mx-auto w-full">
                                                                    <div className="grid grid-cols-2 gap-y-5 gap-x-4 py-4">

                                                                        <div className="row-start-1 grid grid-cols-3 gap-y-5 gap-x-5 text-sm">

                                                                            <div>
                                                                                <Link href={`/category/${category.name}`}
                                                                                    className="font-medium text-lg text-black">
                                                                                    {category.name}
                                                                                </Link>
                                                                                <ul
                                                                                    role="list"
                                                                                    className="mt-4 gap-4 sm:mt-4 sm:space-y-4"
                                                                                >
                                                                                    {category?.subCategories?.map((item: any, index: number) => (
                                                                                        <li key={item.name} className="flex">
                                                                                            <button type="button" onClick={() => router.push(`/category/${item.name}`)} className="text-md text-black hover:text-sky-500">
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