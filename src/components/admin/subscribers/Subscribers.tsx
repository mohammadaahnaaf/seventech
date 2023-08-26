import { Dialog, Transition } from '@headlessui/react';
import Link from 'next/link';
import React, { Fragment } from 'react'
import { Pagenation, SearchBar, SuccessText } from '@seventech/shared';
import { useDebounce } from 'use-debounce';
import { axiosAPI } from '@seventech/utils';
import { AdminLayout } from '@seventech/layouts';

function Subscriber() {

    const [searchTerm, setSearchTerm] = React.useState('')
    const [selected, setSelected] = React.useState<any[]>([]);
    const [allSelected, setAllSelected] = React.useState(false)
    const [subscribers, setSubscribers] = React.useState([]);
    const [isOpen, setIsOpen] = React.useState(false)
    const [detailOpen, setDetailOpen] = React.useState(false)
    const [page, setPage] = React.useState(0)
    const [total, setTotal] = React.useState(0)
    const [pageSize, setPageSize] = React.useState(10)
    const [success, setSuccess] = React.useState('')
    const [me, setMe] = React.useState<any>()

    const [searchedName] = useDebounce(searchTerm, 400);

    //Get Data
    React.useEffect(() => {
        async function getUsers() {
            const res = await axiosAPI.get(`/user?page=${page + 1}&size=${pageSize}&searchQuery=${searchedName}`);
            setSubscribers(res.data.users)
            setTotal(res.data.count)
        }
        getUsers()
    }, [success, searchedName, pageSize, page]);

    function closeModal() {
        setIsOpen(false)
    }
    function closeDetail() {
        setDetailOpen(false)
    }
    function viewMe(data: any) {
        setDetailOpen(true)
        setMe(data)
    }

    // delete user
    function handleDelete() {
        setIsOpen(false)
        selected?.map((item) =>
            axiosAPI.delete(`/user/${item}`)
        ),
            setSuccess('User Vanished')
        setTimeout(() => { setSuccess('') })
    }

    function handleDeleteMe(id: any) {
        setDetailOpen(false)
        axiosAPI.delete(`/user/${id}`)
        setSuccess('User Vanished')
        setTimeout(() => { setSuccess('') })
    }

    function handleAllChecked(event: any) {
        if (event.target.checked) {
            const newSelecteds = subscribers.map((n: any) => n._id);
            setSelected(newSelecteds);
            setAllSelected(true)
            return;
        }
        setSelected([]);
        setAllSelected(false)
    }

    const handleChecked = (event: any, name: any) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected: React.SetStateAction<any[]> = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    };

    const isSelected = (name: any) => selected.indexOf(name) !== -1 || allSelected;

    const modal = (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={closeModal}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-25" />
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
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title
                                    as="h3"
                                    className="text-lg font-semibold leading-6 text-sky-600"
                                >
                                    Delete Category
                                </Dialog.Title>
                                <div className="mt-2">
                                    <p className="text-sm text-gray-500">
                                        Are you sure you want to deelte selected category?
                                    </p>
                                </div>

                                <div className="mt-4 flex justify-end gap-3">
                                    <button
                                        type="button"
                                        className="inline-flex justify-center rounded-md border border-transparent bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="button"
                                        className="inline-flex justify-center rounded-md border border-transparent bg-sky-100 px-4 py-2 text-sm font-medium text-sky-700 hover:bg-sky-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2"
                                        onClick={handleDelete}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )

    const viewDetails = (
        <Transition appear show={detailOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={closeDetail}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-25" />
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
                            <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title
                                    as="h3"
                                    className="text-lg text-center font-medium leading-6 text-gray-900"
                                >
                                    Customer Information
                                </Dialog.Title>
                                <div className="mt-2 p-3 bg-gray-100 rounded-lg">
                                    <table className='table-auto w-full'>
                                        <thead className='border-b bg-gray-100 border-white'>
                                            <tr>
                                                <th>Customer Info</th>
                                                <th>Details</th>
                                            </tr>
                                        </thead>
                                        <tbody className='mt-4'>
                                            <tr className='bg-white'>
                                                <td>Role: </td>
                                                <td>{me?.isAdmin ? (
                                                    <p className='flex items-center text-green-500'>
                                                        <span>Admin</span>
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="ml-1 h-4 w-4 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                                                            <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                        </svg>
                                                    </p>
                                                ) : (
                                                    <p className='flex items-center text-sky-500'>
                                                        <span>Cstomer</span>
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="ml-1 w-4 h-4 text-sky-500">
                                                            <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                                                        </svg>
                                                    </p>
                                                )}</td>
                                            </tr>
                                            <tr className='border-b bg-gray-100 border-white'>
                                                <td>Name: </td>
                                                <td>{me?.fullName}</td>
                                            </tr>
                                            <tr className=' bg-white'>
                                                <td>Phone: </td>
                                                <td>
                                                    <Link href={`tel:${me?.phoneNumber}`}
                                                        className='hover:text-blue-600'>{me?.phoneNumber}
                                                    </Link>
                                                </td>
                                            </tr>
                                            <tr className='border-b bg-gray-100 border-white'>
                                                <td>Email: </td>
                                                <td>
                                                    <Link href={`mailto:${me?.email}`}
                                                        className='hover:text-blue-600'>
                                                        {me?.email}
                                                    </Link>
                                                </td>
                                            </tr>
                                            <tr className=' bg-white'>
                                                <td>City: </td>
                                                <td>{me?.city}</td>
                                            </tr>
                                            <tr className='border-b bg-gray-100 border-white'>
                                                <td>Zone: </td>
                                                <td>{me?.zone}</td>
                                            </tr>
                                            <tr className=' bg-white'>
                                                <td>Address: </td>
                                                <td>{me?.address}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                                <div className="flex items-center justify-end gap-4 mt-4">
                                    <button
                                        type="button"
                                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                        onClick={closeDetail}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="button"
                                        className="inline-flex justify-center rounded-md border border-transparent bg-sky-100 px-4 py-2 text-sm font-medium text-sky-900 hover:bg-sky-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2"
                                        onClick={() => handleDeleteMe(me?._id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )

    return (
        <>
            {success && (<SuccessText success={success} />)}
            <div className="mx-3 mt-3 bg-sky-100 overflow-x-auto relative shadow-md sm:rounded-lg">
                <div className='flex justify-center w-full py-1 bg-sky-600'>
                    <div className='md:w-1/3 bg-white bg-opacity-50 rounded-full'>
                        <SearchBar searchButton={true} setSearchTerm={setSearchTerm} />
                    </div>
                </div>
                {modal}
                {viewDetails}
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="p-4">
                                <div className="flex items-center">
                                    <input id="checkbox-all-search" onChange={handleAllChecked} type="checkbox" className="cursor-pointer w-4 h-4 text-sky-600 bg-gray-100 rounded border-gray-300 focus:ring-sky-500 focus:ring-2" />
                                    <label htmlFor="checkbox-all-search" className="sr-only">checkbox</label>
                                </div>
                            </th>
                            <th scope="col" className="py-3 px-6">
                                User name
                            </th>
                            <th scope="col" className="py-3 px-6">
                                Phone no
                            </th>
                            <th scope="col" className="py-3 px-6">
                                Email
                            </th>
                            <th scope="col" className="py-3 px-6">
                                {selected.length !== 0 && (
                                    <div className='flex items-center justify-between'>
                                        <button type='button'>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                                                className='h-5 w-5 text-sky-600'>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                                            </svg>

                                        </button>
                                        <button onClick={() => setIsOpen(true)} type='button'>
                                            <button type='button' onClick={handleDelete}>
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                                    className='h-5 w-5 text-red-600'>
                                                    <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z" clipRule="evenodd" />
                                                </svg>
                                            </button>
                                        </button>
                                    </div>
                                )}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {subscribers?.map((item: any, index: number) => {
                            const isItemSelected = isSelected(item._id);

                            {/* .slice(0, n) is used to get a range of items from Array[] */ }
                            return (
                                <tr key={index} className="bg-white border-b">
                                    <td className="p-4 w-4">
                                        <div className="flex items-center">
                                            <input onChange={(event) => handleChecked(event, item._id)} checked={isItemSelected} id="checkbox" type="checkbox" className="cursor-pointer w-4 h-4 text-sky-600 bg-gray-100 rounded border-gray-300 focus:ring-sky-500 focus:ring-2" />
                                            <label htmlFor="checkbox" className="sr-only">checkbox</label>
                                        </div>
                                    </td>
                                    <th scope="row" className="flex gap-2 items-center py-4 px-6 font-medium text-gray-900 whitespace-nowrap">
                                        {item.isAdmin ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                            </svg>
                                        ) : (
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-sky-500">
                                                <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                                            </svg>

                                        )}   {item.fullName}
                                    </th>
                                    <td className="py-4 px-6">
                                        <Link href={`tel:${item.phoneNumber}`}>
                                            {item.phoneNumber}
                                        </Link>
                                    </td>
                                    <td className="py-4 px-6">
                                        <Link href={`mailto:${item.email}`}>
                                            {item.email}
                                        </Link>
                                    </td>
                                    <td className="py-4 px-6">
                                        <button type='button' onClick={() => viewMe(item)} className="font-medium text-gray-400 hover:text-sky-600">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                                <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
                                                <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
                                            </svg>
                                        </button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                <Pagenation total={total} page={page} setPage={setPage} pageSize={pageSize} setPageSize={setPageSize} />
            </div>
        </>
    )
}

export function Subscribers() {
    return (
        <AdminLayout>
            <Subscriber />
        </AdminLayout>
    )
}