import React, { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import Image from 'next/image'
import Router, { useRouter } from 'next/router'
import Link from 'next/link'
import { axiosAPI } from '../utils'


const navigation = [
    {
        name: 'Home',
        href: '/',
        icon:
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                className='h-4 w-4 mr-1'>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>

    },
    {
        name: 'Dashboard',
        href: '/admin',
        icon: <svg aria-hidden="true" className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z">
            </path>
        </svg>
    },
    {
        name: 'Products', href: '/admin/products',
        icon: <svg aria-hidden="true" className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd"></path></svg>
    },
    {
        name: 'Categories', href: '/admin/category',
        icon:
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                className="w-4 h-4 mr-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
            </svg>

    },
    {
        name: 'Add Product', href: '/admin/products/add',
        icon: <svg xmlns="http://www.w3.org/2000/svg" className="mr-1 w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
        </svg>
    },
    {
        name: 'Orders', href: '/admin/orders',
        icon: <svg aria-hidden="true" className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
    },
    {
        name: 'Customers', href: 'admin/subscribers',
        icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
        </svg>
    },
    {
        name: 'Admins', href: 'admin/subscribers',
        icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
        </svg>

    },
    {
        name: 'Settings', href: '/admin/settings',
        icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
    },
]
const userNavigation = [
    { name: 'Home', href: '/', state: true },
]



function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

type Props = {}

export const AdminNav = (props: Props) => {

    const [useri, setUseri] = React.useState(true);
    const { pathname } = useRouter();
    const router = useRouter()
    // console.log(pathname);

    async function handleLogout(e: any) {

        e.preventDefault()
        await axiosAPI.delete('/auth/logout');
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        setUseri(false);
        Router.push('/login')
    }

    return (
        <div className="min-h-full">
            <Disclosure as="nav" className="bg-black bg-opacity-10">
                {({ open }) => (
                    <>
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="flex items-center justify-between h-16">
                                <div className="flex items-center">
                                    <div className="hidden md:block h-8">
                                        <Link href='/' className='h-20 w-full'>
                                            <Image src="/logo.png" alt="Home" layout="fixed" width={80} height={40} />
                                        </Link>
                                    </div>
                                </div>
                                <div className="hidden md:block">
                                    <div className="ml-4 flex items-center md:ml-6">

                                        {!useri && (
                                            <div className='flex justify-between gap-2 ml-3'>
                                                <Link href='/signin' className='bg-red-600 hover:bg-white text-white ring-0 focus:ring-2 ring-white hover:ring-red-600 hover:text-black py-1 px-3 rounded-md'>
                                                    Signup
                                                </Link>
                                                <Link href='/login' className='bg-white hover:bg-red-600 ring-0 focus:ring-2 ring-red-600 hover:ring-white hover:text-white py-1 px-3 rounded-md'>
                                                    Login
                                                </Link>
                                            </div>
                                        )}


                                        {/* Profile dropdown */}
                                        <Menu as="div" className="ml-3 relative">
                                            <div>
                                                {useri && (
                                                    <Menu.Button className="text-sky-600 hover:bg-red-600 hover:bg-opacity-25 bg-sky-600 focus:bg-opacity-25 bg-opacity-30 flex p-[8px] rounded-full relative hover:text-red-600">
                                                        <span className="sr-only">Open user menu</span>
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                                                            <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                        </svg>
                                                    </Menu.Button>
                                                )}
                                            </div>
                                            <Transition
                                                as={Fragment}
                                                enter="transition ease-out duration-100"
                                                enterFrom="transform opacity-0 scale-95"
                                                enterTo="transform opacity-100 scale-100"
                                                leave="transition ease-in duration-75"
                                                leaveFrom="transform opacity-100 scale-100"
                                                leaveTo="transform opacity-0 scale-95"
                                            >
                                                <Menu.Items className="origin-top-right absolute z-40 right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-gradient-to-r from-black to-red-900 ring-1 ring-red-600 ring-opacity-20 focus:outline-none">
                                                    {userNavigation.map((item) => (
                                                        <Menu.Item key={item.name}>
                                                            {({ active }) => (
                                                                <Link
                                                                    className={classNames(
                                                                        active ? 'bg-red-600' : '',
                                                                        'block px-4 py-2 text-sm text-gray-100 hover:bg-red-600 hover:text-white'
                                                                    )}
                                                                    href={item.href}
                                                                // onClick={() => setUseri(item.state)}
                                                                >
                                                                    {item.name}
                                                                </Link>
                                                            )}
                                                        </Menu.Item>
                                                    ))}
                                                    <Menu.Item>
                                                        {({ active }) => (
                                                            <button
                                                                onClick={handleLogout}
                                                                className={classNames(
                                                                    active ? 'bg-red-600' : '',
                                                                    'block w-full text-left px-4 py-2 text-sm text-gray-100 hover:bg-red-600 hover:text-white'
                                                                )}
                                                            >
                                                                Sign out
                                                            </button>
                                                        )}
                                                    </Menu.Item>
                                                </Menu.Items>
                                            </Transition>
                                        </Menu>
                                    </div>
                                </div>
                                <div className="-mr-2 flex md:hidden">

                                    {/* Mobile menu button */}
                                    <Disclosure.Button className="focus:bg-opacity-20 bg-opacity-10 bg-red-600 inline-flex items-center justify-center p-2 rounded-md text-gray-100">
                                        <span className="sr-only">Open main menu</span>
                                        {open ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                                                className="block h-6 w-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        ) : (
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                                                className="block h-6 w-6" >
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                            </svg>
                                        )}
                                    </Disclosure.Button>
                                </div>
                            </div>
                        </div>
                        <Transition.Child
                            as={Fragment}
                            enter="transition ease-in-out duration-500 transform"
                            enterFrom="-translate-x-full"
                            enterTo="translate-x-0"
                            leave="transition ease-in-out duration-300 transform"
                            leaveFrom="translate-x-0"
                            leaveTo="-translate-x-full"
                        >
                            <Disclosure.Panel className="md:hidden bg-black">
                                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                                    {navigation.map((item) => (
                                        <Disclosure.Button
                                            key={item.name}
                                            onClick={() => router.push(`/${item.href}`)} className={classNames(
                                                pathname === item.href ? 'bg-red-600 bg-opacity-10 text-white' : '',
                                                'flex items-center text-left w-full px-3 py-2 text-gray-100 rounded-md text-base font-medium'
                                            )}
                                            aria-current={pathname === item.href ? 'page' : undefined}
                                        >
                                            {item.icon} {item.name}
                                        </Disclosure.Button>
                                    ))}
                                    <Disclosure.Button
                                        as="button"
                                        onClick={handleLogout}
                                        className={classNames(
                                            pathname === null ? 'bg-red-600 bg-opacity-10 text-white' : '',
                                            'flex items-center w-full text-left px-3 py-2 text-gray-100 rounded-md text-base font-medium'
                                        )}
                                        aria-current={pathname === null ? 'page' : undefined}
                                    >{<svg aria-hidden="true" className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd"></path></svg>
                                        }
                                        Sign out
                                    </Disclosure.Button>
                                </div>
                            </Disclosure.Panel>
                        </Transition.Child>
                    </>
                )}
            </Disclosure>
        </div >
    )
}