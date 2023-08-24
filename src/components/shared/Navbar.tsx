import React, { Fragment } from 'react'
import { SearchBar } from '.'
import { Menu, Transition } from '@headlessui/react';
import Link from 'next/link';
import { Router, useRouter } from 'next/router';
import { useCart } from 'react-use-cart';
import { axiosAPI } from '..';
import Image from 'next/image';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

type Props = {
  setSearchTerm: any;
  setOpen: any
}

export const Navbar = (props: Props) => {

  const { setSearchTerm, setOpen } = props
  const router = useRouter()
  const { totalUniqueItems } = useCart()

  const [useri, setUseri] = React.useState(false);
  const [amAdmin, setAmAdmin] = React.useState(false);


  // logout function 
  async function handleLogout(e: { preventDefault: () => void }) {

    e.preventDefault()
    await axiosAPI.delete('/auth/logout');
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setUseri(false);
    router.push('/login')
  }

  return (
    <header className='flex justify-between py-2 items-center max-w-7xl mx-auto w-full'>
      <div className="hidden md:block h-8">
        <Link href='/' className='h-20 w-full'>
          <Image src="/logo.png" alt="Home" width={80} height={40} />
        </Link>
      </div>
      {/* Search Bar  */}
      <div className='hidden md:block w-full lg:w-1/3 justify-center'>
        <SearchBar setSearchTerm={setSearchTerm} searchButton={false} />
      </div>

      <div className="hidden md:block">
        <div className="flex items-center">

          {/* Cart  */}
          <button
            type='button'
            onClick={() => router.push('/cart')}
            className="text-black bg-black bg-opacity-10 flex p-[8px] rounded-full relative hover:text-gray-200 focus:ring-0"
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

          {/* Profile dropdown */}
          <Menu as="div" className="ml-3 relative">
            <div>
              <Menu.Button className="text-black bg-black bg-opacity-10 flex p-[8px] rounded-full relative hover:text-gray-200 focus:ring-0">
                <span className="sr-only">Open user menu</span>
                <svg className="h-6 w-6 rounded-full" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
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


                {amAdmin && (

                  <Menu.Item>
                    {({ active }) => (
                      <Link href='/admin'
                        className={classNames(
                          active ? 'bg-black' : '',
                          'block px-4 py-2 text-sm text-gray-100 hover:text-white hover:bg-black'
                        )}>
                        Admin
                      </Link>
                    )}
                  </Menu.Item>
                )}

                <Menu.Item>
                  {({ active }) => (
                    <Link className={classNames(
                      active ? 'bg-black' : '',
                      'block px-4 py-2 text-sm text-gray-100 hover:text-white hover:bg-black'
                    )} href='/profile'>

                      Your Profile
                    </Link>
                  )}
                </Menu.Item>

                <Menu.Item>
                  {({ active }) => {
                    return useri ? (
                      <button
                        type='button'
                        onClick={handleLogout}
                        className={classNames(
                          active ? 'bg-black' : '',
                          'w-full text-left block px-4 py-2 text-sm text-gray-100 hover:text-white hover:bg-black'
                        )}
                      >
                        Signout
                      </button>
                    ) : (
                      <Link href='/login' className={classNames(
                        active ? 'bg-black' : '',
                        'w-full text-left block px-4 py-2 text-sm text-gray-100 hover:text-white hover:bg-black'
                      )}>
                        Login
                      </Link>
                    )
                  }
                  }
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
    </header>
  )
}