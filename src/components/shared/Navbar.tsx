import React, { Fragment } from 'react'
import { SearchBar } from '.'
import { Disclosure, Menu, Transition } from '@headlessui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCart } from 'react-use-cart';
import { axiosAPI, isServer } from '..';
import Image from 'next/image';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

const navigation = [
  {
    name: 'Home', href: '/',
    icon:
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
        className='h-5 w-5 mr-1'>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
      </svg>

  },
  {
    name: 'Cart',
    href: '/cart',
    icon:
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
        className='h-5 w-5 mr-1'>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
      </svg>

  },
];

const userNavigation = [
  // { name: 'Profile', href: '/profile', state: true },
  { name: 'Admin', href: '/admin', state: true },
]


export function BasicNavbar() {
  
  const { pathname } = useRouter();
  const router = useRouter();

  const basicNavigation = [
    {
      name: 'Home',
      href: '/',
      state: true
    },
    {
      name: 'Your Profile',
      href: '/profile',
      state: true
    },
  ]

  const navigation = [
    {
      name: 'Home', href: '/',
      icon:
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
          className='h-5 w-5 mr-1'>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
        </svg>
    },
    {
      name: 'Cart',
      href: '/cart',
      icon:
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
          className='h-5 w-5 mr-1'>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
        </svg>
    },
  ]
  return (
    <div className="min-h-full">
      <Disclosure as="nav" className="relative bg-black bg-opacity-30 backdrop-blur-sm">
        {({ open }) => (
          <>
            <div className="max-w-7xl mx-auto px-4 lg:px-0">
              <div className="flex items-center justify-between h-16">

                <div className="flex items-center">
                  <div className="hidden md:flex items-center h-16">
                    <button onClick={() => router.push('/')}>
                      <Image src="/logo.png" alt="Home" layout="fixed" width={80} height={40} />
                    </button>
                  </div>
                </div>

                <div className="hidden md:block">
                  <div className="flex items-center">

                    {/* Login and Signup Button shall show when user != isLoggedIn */}
                    <div className='flex justify-between gap-4'>
                      <Link href='/signup'
                        className='bg-sky-500 text-sm hover:bg-white hover:text-black hover:ring-sky-500 ring-white text-white ring-0 w-20 text-center py-1 px-3'>
                        Signup
                      </Link>
                      <Link href='/login' className='bg-white hover:bg-sky-500 hover:text-white text-sm text-center ring-white text-black w-20 ring-0 py-1 px-3'>
                        Login
                      </Link>
                    </div>

                    {/* Profile dropdown */}
                    <Menu as="div" className="hidden ml-3 relative">
                      <div>
                        <Menu.Button className="max-w-xs bg-white rounded-full flex items-center text-xl">
                          <span className="sr-only">Open user menu</span>
                          {/* <UserCircleIcon className='h-8 w-8 text-black hover:text-gray-200' /> */}
                        </Menu.Button>
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
                        <Menu.Items className="origin-top-right absolute z-40 right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-gradient-to-r from-black to-red-900 ring-1 ring-black ring-opacity-20 focus:outline-none">
                          {basicNavigation.map((item) => (
                            <Menu.Item key={item.name}>
                              {({ active }) => (
                                <Link href={item.href}
                                  className={classNames(
                                    active ? 'bg-black' : '',
                                    'block px-4 py-2 text-sm text-gray-100 hover:text-white hover:bg-black'
                                  )}
                                >
                                  {item.name}

                                </Link>
                              )}
                            </Menu.Item>
                          ))}
                        </Menu.Items>
                      </Transition>
                    </Menu>

                  </div>
                </div>

                <div className="-mr-2 flex md:hidden">

                  {/* Mobile menu button */}
                  <Disclosure.Button className=" inline-flex items-center justify-center p-2 rounded-md text-black focus:ring-2 focus:ring-black">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                        className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                        className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                      </svg>
                    )}
                  </Disclosure.Button>

                </div>
              </div>
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
              <Disclosure.Panel className="md:hidden relative rounded-b-lg bg-gradient-to-b border-t-2 border-black from-black to-red-900">
                <div className="px-2 w-full pt-2 pb-3 space-y-1 sm:px-3">
                  {navigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      onClick={() => router.push(`/${item.href}`)}
                      className={classNames(
                        pathname === item.href ? 'text-white bg-red-800' : '',
                        'flex px-3 w-full text-gray-200 py-2 rounded-md text-base font-medium'
                      )}
                    // aria-current={item.current ? 'page' : undefined}
                    >
                      {item.icon} {item.name}
                    </Disclosure.Button>
                  ))}
                </div>
              </Disclosure.Panel>
            </Transition>
          </>
        )}
      </Disclosure>
    </div >
  )
}

type IProps = {
  setSearchTerm: any;
  setOpen: any
}

export function NewNavBar(props: IProps) {

  const { setSearchTerm, setOpen } = props
  const [useri, setUseri] = React.useState(true);
  const [me, setMe] = React.useState<any>({});
  const [view, setView] = React.useState(false);
  const { totalUniqueItems } = useCart()
  const router = useRouter()
  const { pathname } = useRouter();

  async function handleLogout(e: any) {

    e.preventDefault()
    await axiosAPI.delete('/auth/logout');
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setUseri(false);
    router.push('/login')
  }

  React.useEffect(() => {
    async function getMe() {
      try {
        const res = await axiosAPI.get('auth/get-me')
        setMe(res?.data)
      } catch (err: any) {
        setUseri(false)
        console.log(err)
      }
    }
    getMe()
  }, [])

  React.useEffect(() => {
    setView(true)
  }, [])

  if (isServer()) {
    return null
  }
  return view ? (
    <div className="min-h-full">
      <Disclosure as="nav" className="bg-white">
        {({ open }) => (
          <>
            <div className="max-w-7xl mx-auto px-4 w-full lg:px-0">
              <div className="flex items-center justify-between gap-4 h-16">
                <div className="flex items-center">
                  <div className="hidden md:block h-8">
                    <Link href='/' className='h-20 w-full'>
                      <Image src="/logo.png" alt="Home" width={80} height={40} />
                    </Link>
                  </div>
                </div>

                {/* Search Bar  */}
                <div className='hidden md:block w-full lg:w-1/3 justify-center rounded-full bg-gray-200'>
                  <SearchBar setSearchTerm={setSearchTerm} searchButton={false} />
                </div>

                <div className="hidden md:block">
                  <div className="flex items-center">


                    {/* Cart  */}
                    <div>
                      <button
                        type='button'
                        onClick={() => router.push('/cart')}
                        className="text-sky-600 bg-black bg-opacity-10 flex p-[8px] rounded-full relative hover:text-sky-600 focus:ring-0"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                          className="relative z-10 h-6 w-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                        </svg>

                        <span className="flex absolute h-5 w-5 -right-1 -top-1 rounded-full bg-[red] justify-center">
                          <span className="animate-ping absolute inline-flex h-5 w-5 rounded-full bg-[red] bg-opacity-50"></span>
                          <p className=" inline-flex items-center text-white text-xs">{totalUniqueItems}</p>
                        </span>
                      </button>
                    </div>

                    {!useri && (
                      <div className='flex justify-between gap-2 ml-3'>
                        <Link href='/signup' className='bg-sky-600 hover:bg-white text-white hover:text-sky-600 ring-1 focus:ring-2 ring-sky-600 py-1 px-3 rounded-sm'>
                          Signup
                        </Link>
                        <Link href='/login' className='bg-white hover:bg-sky-600 ring-sky-600 ring-1 text-sky-600 hover:text-white py-1 px-3 rounded-sm'>
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
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
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
                        <Menu.Items className="origin-top-right absolute z-40 right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-gray-100 ring-1 ring-gray-500 ring-opacity-20 focus:outline-none">
                          {userNavigation.map((item, index) => {
                            return me?.isAdmin ? (
                              <Menu.Item key={index}>
                                {({ active }) => (
                                  <Link
                                    className={classNames(
                                      active ? 'bg-red-600' : '',
                                      'block px-4 py-2 text-sm text-gray-800 hover:bg-sky-600 hover:text-white'
                                    )}
                                    href={item.href}
                                  // onClick={() => setUseri(item.state)}
                                  >
                                    {item.name}
                                  </Link>
                                )}
                              </Menu.Item>
                            ) : null
                          })}
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                className={classNames(
                                  active ? 'bg-red-600' : '',
                                  'block px-4 py-2 text-sm text-gray-800 hover:bg-sky-600 hover:text-white'
                                )}
                                href="/profile"
                              >
                                Profile
                              </Link>
                            )}
                          </Menu.Item>

                          <Menu.Item>
                            {({ active }) => (
                              <button
                                onClick={handleLogout}
                                className={classNames(
                                  active ? 'bg-red-600' : '',
                                  'block w-full text-left px-4 py-2 text-sm text-gray-800 hover:bg-sky-600 hover:text-white'
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
                  <Disclosure.Button className="focus:bg-opacity-20 bg-opacity-10 bg-sky-600 inline-flex items-center justify-center p-2 rounded-md text-gray-600">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                        className="block h-8 w-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                        className="block h-8 w-8" >
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
              <Disclosure.Panel className="md:hidden bg-gray-200">
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">

                  {me?.isAdmin && (
                    <Disclosure.Button
                      onClick={() => router.push('/admin')} className={classNames(
                        pathname === "/admin" ? 'bg-sky-600 bg-opacity-10 text-gray-500' : '',
                        'flex items-center text-left w-full px-3 py-2 text-gray-800 rounded-md text-base font-medium'
                      )}
                    // aria-current={pathname === item.href ? 'page' : undefined}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                      </svg>
                      Admin
                    </Disclosure.Button>
                  )}

                  {navigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      onClick={() => router.push(`/${item.href}`)} className={classNames(
                        pathname === item.href ? 'bg-sky-600 bg-opacity-10 text-gray-500' : '',
                        'flex items-center text-left w-full px-3 py-2 text-gray-800 rounded-md text-base font-medium'
                      )}
                      aria-current={pathname === item.href ? 'page' : undefined}
                    >
                      {item.icon} {item.name}
                    </Disclosure.Button>
                  ))}


                  <Disclosure.Button
                    as="button"
                    onClick={() => setOpen(true)}
                    className={classNames(
                      pathname === null ? 'bg-sky-600 bg-opacity-10 text-gray-500' : '',
                      'flex items-center w-full text-left px-3 py-2 text-gray-800 rounded-md text-base font-medium'
                    )}
                    aria-current={pathname === null ? 'page' : undefined}
                  >
                    {
                      <svg aria-hidden="true" className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
                    }
                    Category
                  </Disclosure.Button>
                  {useri && (
                    <Disclosure.Button
                      onClick={() => router.push('/profile')} className={classNames(
                        pathname === "/profile" ? 'bg-sky-600 bg-opacity-10 text-gray-500' : '',
                        'flex items-center text-left w-full px-3 py-2 text-gray-800 rounded-md text-base font-medium'
                      )}
                    // aria-current={pathname === item.href ? 'page' : undefined}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                      </svg>

                      Profile
                    </Disclosure.Button>
                  )}
                  <Disclosure.Button
                    as="button"
                    onClick={handleLogout}
                    className={classNames(
                      pathname === null ? 'bg-sky-600 bg-opacity-10 text-gray-500' : '',
                      'flex items-center w-full text-left px-3 py-2 text-gray-800 rounded-md text-base font-medium'
                    )}
                    aria-current={pathname === null ? 'page' : undefined}
                  >
                    {
                      <svg aria-hidden="true" className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd"></path></svg>
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
  ) : null
}

