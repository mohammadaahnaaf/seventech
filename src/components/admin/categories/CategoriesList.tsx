import React, { Fragment } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router';
import { useDebounce } from 'use-debounce';
import { Dialog, Transition } from '@headlessui/react';
import { Pagenation, SearchBar, SuccessText } from '@seventech/shared';
import { axiosAPI, axiosRoot, fDate } from '@seventech/utils';
import { AdminLayout } from '@seventech/layouts';

function Categories() {

    const router = useRouter()
    const [searchTerm, setSearchTerm] = React.useState('')
    const [selected, setSelected] = React.useState<any[]>([]);
    const [allSelected, setAllSelected] = React.useState(false)
    const [rows, setRows] = React.useState([]);
    const [isOpen, setIsOpen] = React.useState(false)
    const [success, setSuccess] = React.useState('')
    const [pageSize, setPageSize] = React.useState(10)
    const [page, setPage] = React.useState(0)
    const [total, setTotal] = React.useState(0)

    const [searchedName] = useDebounce(searchTerm, 400);

    function closeModal() {
        setIsOpen(false)
    }

    //Get Data
    React.useEffect(() => {
        async function getCategory() {
            const res = await axiosRoot.get(`/categories?page=${page + 1}&size=${pageSize}&searchQuery=${searchedName}`);
            setRows(res.data.categories)
            setTotal(res.data.count)
        }
        getCategory()
    }, [success, page, pageSize, searchedName]);

    // delete category 
    function handleDelete(e: any) {
        e.preventDefault()
        setIsOpen(false)
        selected.map((item) =>
            axiosAPI.delete(`/categories/${item}`)
        )
        setSuccess('Category Deleted')
        setTimeout(() => {
            setSuccess('')
        }, 2000)
    }


    function handleAllChecked(event: any) {
        if (event.target.checked) {
            const newSelecteds = rows?.map((n: any) => n._id);
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
                    enter="ease-out duration-200"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black backdrop-blur-sm bg-opacity-40" />
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
                                        Are you sure you want to delete selected category?
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

    // const slugs = ['name', 'subCategories', 'createdAt']

    // const search = (data) => {
    //     return data.filter((item) =>
    //         slugs.some((key) => (typeof item[key] === 'string' ? item[key].toLowerCase() : '').includes(searchTerm))
    //     )
    // }

    return (
        <>
            {modal}
            {success && (<SuccessText success={success} />)}
            {/* <ErrorText error={error} /> */}

            <div className="mx-3 mt-3 relative overflow-x-auto bg-gray-100 shadow-md sm:rounded-lg">
                <div className='flex justify-center w-full py-1 bg-sky-600'>
                    <div className='md:w-1/3 bg-white bg-opacity-50 rounded-full'>
                        <SearchBar searchButton={true} setSearchTerm={setSearchTerm} />
                    </div>
                    <Link href='/admin/category/add'
                        className='hover:bg-white ml-4 text-sm font-medium hover:text-sky-600 ring-1 ring-white hover:ring-1 hover:ring-sky-600 bg-sky-600 text-white flex items-center my-1 px-3 rounded-full'>
                        Add Category
                    </Link>
                </div>
                <table className="w-full text-sm text-left text-sky-600">
                    <thead className="text-xs text-black uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="p-4">
                                <div className="flex items-center">
                                    <input id="checkbox-all-search" onChange={handleAllChecked} type="checkbox" className="cursor-pointer w-4 h-4 text-sky-600 bg-sky-100 rounded border-sky-300 focus:ring-sky-500 focus:ring-2" />
                                    <label htmlFor="checkbox-all-search" className="sr-only">checkbox</label>
                                </div>
                            </th>
                            <th scope="col" className="py-3 px-6">
                                Category Name
                            </th>
                            <th scope="col" className="py-3 px-6">
                                Subcategories
                            </th>
                            <th scope="col" className="py-3 px-6">
                                Created At
                            </th>
                            <th scope="col" className="py-3 px-6">
                                {selected.length !== 0 && (
                                    <>
                                        <button type='button' onClick={() => setIsOpen(true)}>
                                            Delete
                                            {/* <TrashIcon className='h-5 w-5 text-sky-600' /> */}
                                        </button>
                                    </>
                                )}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows?.map((item: any, index: number) => {
                            const isItemSelected = isSelected(item._id);
                            return (
                                <tr key={index} className="bg-white border-b">
                                    <td className="p-4 w-4">
                                        <div className="flex items-center">
                                            <input onChange={(event) => handleChecked(event, item._id)} checked={isItemSelected} id="checkbox" type="checkbox" className="cursor-pointer w-4 h-4 text-sky-600 bg-sky-100 rounded border-sky-300 focus:ring-sky-500 focus:ring-2" />
                                            <label htmlFor="checkbox" className="sr-only">checkbox</label>
                                        </div>
                                    </td>
                                    <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">
                                        {item.name}
                                    </th>
                                    <td className="py-4 px-6">
                                        {item.subCategories.length}
                                    </td>
                                    <td className="py-4 px-6">
                                        {fDate(item.createdAt)}
                                    </td>
                                    <td className="py-4 px-6">
                                        <button type='button' onClick={() => router.push('/admin/category/' + item._id)}>
                                            <p className="font-medium text-gray-400 hover:text-sky-600">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                                    <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
                                                    <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
                                                </svg>                                            </p>
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

export function CategoriesList() {
    return (
        <AdminLayout>
            <Categories />
        </AdminLayout>
    )
}