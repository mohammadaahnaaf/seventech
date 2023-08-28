import React from 'react'
import Link from 'next/link'
import Router from 'next/router'
import { axiosAPI } from '..'
import { AdminNav } from '@seventech/shared'

const Sidebar = () => {

    async function handleLogout(e: any) {

        e.preventDefault()
        await axiosAPI.delete('/auth/logout');
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        Router.push('/login')
    }

    return (
        <aside className="w-64 md:block hidden" aria-label="Sidebar">
            <div className="overflow-y-auto h-full py-4 px-3 border-t-2 border-gray-200 bg-white">
                <ul className="space-y-2">
                    <li>
                        <Link href="/admin" className="flex items-center p-2 text-base font-normal text-black rounded-lg hover:text-white hover:bg-gray-600">
                            <svg aria-hidden="true" className="w-6 h-6 transition duration-75   group-hover:text-gray-600   " fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path></svg>
                            <span className="ml-3">Dashboard</span>

                        </Link>
                    </li>
                    <li>
                        <Link href="/admin/orders"
                            className="flex items-center p-2 text-base font-normal text-black rounded-lg hover:text-white hover:bg-gray-600">

                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                className="flex-shrink-0 w-6 h-6 transition duration-75   group-hover:text-gray-600">
                                <path d="M9.375 3a1.875 1.875 0 000 3.75h1.875v4.5H3.375A1.875 1.875 0 011.5 9.375v-.75c0-1.036.84-1.875 1.875-1.875h3.193A3.375 3.375 0 0112 2.753a3.375 3.375 0 015.432 3.997h3.943c1.035 0 1.875.84 1.875 1.875v.75c0 1.036-.84 1.875-1.875 1.875H12.75v-4.5h1.875a1.875 1.875 0 10-1.875-1.875V6.75h-1.5V4.875C11.25 3.839 10.41 3 9.375 3zM11.25 12.75H3v6.75a2.25 2.25 0 002.25 2.25h6v-9zM12.75 12.75v9h6.75a2.25 2.25 0 002.25-2.25v-6.75h-9z" />
                            </svg>

                            <span className="flex-1 ml-3 whitespace-nowrap">Orders</span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/admin/category"
                            className="flex items-center p-2 text-base font-normal text-black rounded-lg hover:text-white hover:bg-gray-600  ">
                            <svg aria-hidden="true" className="flex-shrink-0 w-6 h-6 transition duration-75 group-hover:text-gray-600   " fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
                            <span className="flex-1 ml-3 whitespace-nowrap">Category</span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/admin/products"
                            className="flex items-center p-2 text-base font-normal text-black rounded-lg hover:text-white hover:bg-gray-600  ">
                            <svg aria-hidden="true" className="flex-shrink-0 w-6 h-6 transition duration-75   group-hover:text-gray-600   " fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd"></path></svg>
                            <span className="flex-1 ml-3 whitespace-nowrap">Products</span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/admin/products/add"
                            className="flex items-center p-2 text-base font-normal text-black rounded-lg hover:text-white hover:bg-gray-600  ">
                            <svg xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 w-6 h-6 transition duration-75   group-hover:text-gray-600   " viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                            </svg>
                            <span className="flex-1 ml-3 whitespace-nowrap">Add Product</span>
                        </Link>
                    </li>

                    <li>
                        <Link href="/admin/subscribers"
                            className="flex items-center p-2 text-base font-normal text-black rounded-lg hover:text-white hover:bg-gray-600  ">
                            <svg aria-hidden="true" className="flex-shrink-0 w-6 h-6 transition duration-75   group-hover:text-gray-600   " fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
                            <span className="flex-1 ml-3 whitespace-nowrap">Customers</span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/admin/subscribers"
                            className="flex items-center p-2 text-base font-normal text-blue-600 rounded-lg hover:text-white hover:bg-gray-600  ">
                            <svg xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 w-6 h-6 transition duration-75 group-hover:text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span className="flex-1 ml-3 whitespace-nowrap">Admins</span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/admin/settings"
                            className="flex items-center p-2 text-base font-normal text-black rounded-lg hover:text-white hover:bg-gray-600">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="flex-shrink-0 w-6 h-6 transition duration-75   group-hover:text-gray-600   ">
                                <path fillRule="evenodd" d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 00-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 00-2.282.819l-.922 1.597a1.875 1.875 0 00.432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 000 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 00-.432 2.385l.922 1.597a1.875 1.875 0 002.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 002.28-.819l.923-1.597a1.875 1.875 0 00-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 000-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 00-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 00-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 00-1.85-1.567h-1.843zM12 15.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z" clipRule="evenodd" />
                            </svg>

                            <span className="flex-1 ml-3 whitespace-nowrap">Settings</span>
                        </Link>
                    </li>
                    <li>
                        <button onClick={handleLogout} className="flex w-full text-left items-center p-2 text-base font-normal text-black rounded-lg hover:text-white hover:bg-gray-600  ">
                            <svg aria-hidden="true" className="flex-shrink-0 w-6 h-6 transition duration-75   group-hover:text-gray-600   " fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd"></path></svg>
                            <span className="flex-1 ml-3 whitespace-nowrap">Sign Out</span>
                        </button>
                    </li>

                </ul>
            </div>
        </aside >
    )
}


export function AdminLayout(props: { children: any }) {
    return (
        <>
            <AdminNav />
            <div className='flex min-h-screen'>
                <Sidebar />
                <div className='w-full bg-gray-200'>
                    {props.children}
                </div>
            </div>
        </>
    )
}