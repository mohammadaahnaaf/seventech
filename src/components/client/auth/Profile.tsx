import React, { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react';
import { useRouter } from 'next/router';
import { axiosAPI } from '@seventech/utils';
import { SuccessText } from '@seventech/shared';
import { Layout } from '@seventech/layouts';

export function Setting() {

    const router = useRouter()
    const [success, setSuccess] = React.useState("")
    let [isOpen, setIsOpen] = React.useState(false)
    const [me, setMe] = React.useState({
        _id: '',
        isAdmin: null,
        fullName: "",
        email: "",
        phoneNumber: "",
        address: "",
        city: "",
        zone: ""
    })

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    // get me
    React.useEffect(() => {
        async function getProfile() {
            try {
                const res = await axiosAPI.get('/auth/get-me');
                setMe(res.data);
            } catch (err) {
                console.log(err);
            }
        }
        getProfile()
    }, [success]);

    //submit edit data
    async function handleSubmit(e: any) {
        e.preventDefault()
        try {
            const reqData = {
                isAdmin: true,
                fullName: "string",
                email: "string",
                phoneNumber: "string",
                address: "string",
                city: "string",
                zone: "string"
            }
            await axiosAPI.put(`/user/${me._id}`, me)
            setSuccess('Profile Edited')
            setTimeout(() => { setSuccess('') }, 2000)
        } catch (error) {
            console.log(error)
        }
    }


    // edit profile 
    function handleChange(event: any) {
        const { name, value } = event.target;
        setMe((prevState) => {
            return {
                ...prevState,
                [name]: value,
            };
        });
    };

    async function handleDelete() {
        await axiosAPI.delete(`/user/${me._id}`)
        setIsOpen(false)
        router.push('/')
    }

    const sureDelete = (
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
                                    className="text-lg font-medium leading-6 text-gray-900"
                                >
                                    Delete Profile
                                </Dialog.Title>
                                <div className="mt-2">
                                    <p className="text-sm text-gray-500">
                                        Are you sure you want to delete your profile? Remember! There is no return if you have deleted once.
                                    </p>
                                </div>

                                <div className="flex items-center justify-end gap-4 mt-4">
                                    <button
                                        type="button"
                                        className="inline-flex justify-center rounded-md border border-transparent bg-gray-100 px-4 py-2 text-sm font-medium text-black hover:bg-black focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
                                        onClick={closeModal}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="button"
                                        className="inline-flex justify-center rounded-md border border-transparent bg-gray-100 px-4 py-2 text-sm font-medium text-black hover:bg-black focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
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

    return (
        <div className="py-6 sm:px-6 lg:px-8">
            {success && (
                <SuccessText success={success} />
            )}
            <div className="max-w-5xl mx-auto bg-gray-100 rounded-lg md:grid md:grid-cols-1 md:gap-6">
                {sureDelete}
                <form onSubmit={e => handleSubmit(e)}>
                    <div className="shadow overflow-hidden rounded-b-lg">
                        <div className="px-4 py-5 sm:p-6 border-b border-gray-300">
                            <div className="grid grid-cols-6 gap-6">

                                <div className="col-span-6 mx-auto rounded-full justify-center block">
                                    <label className="block text-md font-medium text-center text-black" />
                                    <div className="mt-1 grid gap-2 justify-items-center items-center">
                                        <div className="inline-block ring-2 ring-gray-300 h-24 w-24 overflow-hidden">

                                            <button
                                                disabled
                                                type="button">
                                                <svg className="h-full cursor-not-allowed w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                                                </svg>
                                            </button>

                                        </div>
                                    </div>
                                </div>

                                <div className="relative col-span-6">
                                    <label htmlFor="fullName"
                                        className="block text-sm font-medium text-black pb-1"                                    >
                                        Your name
                                    </label>
                                    <input
                                        type="text"
                                        name="fullName"
                                        id="fullName"
                                        placeholder='Your name'
                                        value={me.fullName || ''}
                                        onChange={(event) => handleChange(event)}
                                        className="peer block min-h-[auto] placeholder:text-gray-500 w-full rounded focus:outline-none border-2 border-gray-400 focus:border-gray-600 bg-transparent px-3 py-1.5 outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none"
                                    />
                                </div>

                                <div className="col-span-6 sm:col-span-3 relative">
                                    <label htmlFor="email" className="block text-sm font-medium text-black pb-1">
                                        Email address
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        placeholder='Your email'
                                        value={me.email || ''}
                                        onChange={(event) => handleChange(event)}
                                        className="peer block min-h-[auto] placeholder:text-gray-500 w-full rounded focus:outline-none border-2 border-gray-400 focus:border-gray-600 bg-transparent px-3 py-1.5 outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none"
                                    />
                                </div>
                                <div className="col-span-6 sm:col-span-3 relative">
                                    <label htmlFor="phoneNumber" className="block text-sm font-medium text-black pb-1">
                                        Phone number
                                    </label>
                                    <input
                                        type="number"
                                        name="phoneNumber"
                                        id="phoneNumber"
                                        placeholder='Phone number'
                                        value={me.phoneNumber || ''}
                                        onChange={(event) => handleChange(event)}
                                        className="peer block min-h-[auto] placeholder:text-gray-500 w-full rounded focus:outline-none border-2 border-gray-400 focus:border-gray-600 bg-transparent px-3 py-1.5 outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none"
                                    />
                                </div>

                                <div className="col-span-6 relative sm:col-span-6 lg:col-span-3">
                                    <label htmlFor="city" className="block text-sm font-medium text-black pb-1">
                                        City
                                    </label>
                                    <input
                                        type="text"
                                        name="city"
                                        id="city"
                                        placeholder='Your city'
                                        value={me.city || ''}
                                        onChange={(event) => handleChange(event)}
                                        className="peer block min-h-[auto] placeholder:text-gray-500 w-full rounded focus:outline-none border-2 border-gray-400 focus:border-gray-600 bg-transparent px-3 py-1.5 outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none"
                                    />
                                </div>

                                <div className="col-span-6 sm:col-span-6 lg:col-span-3 relative">
                                    <label htmlFor="zone" className="block text-sm font-medium text-black pb-1">
                                        Zone
                                    </label>
                                    <input
                                        type="text"
                                        name="zone"
                                        id="zone"
                                        placeholder='zone / area'
                                        value={me.zone || ''}
                                        onChange={(event) => handleChange(event)}
                                        className="peer block min-h-[auto] placeholder:text-gray-500 w-full rounded focus:outline-none border-2 border-gray-400 focus:border-gray-600 bg-transparent px-3 py-1.5 outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none"
                                    />
                                </div>

                                <div className="col-span-6 relative">
                                    <label htmlFor="about" className="block text-sm font-medium text-black pb-1">
                                        Address
                                    </label>
                                    <div className="mt-1">
                                        <textarea
                                            id="address"
                                            name="address"
                                            rows={4}
                                            placeholder="Write details of your address"
                                            value={me.address || ''}
                                            onChange={(event) => handleChange(event)}
                                            className="peer block min-h-[auto] placeholder:text-gray-500 w-full rounded focus:outline-none border-2 border-gray-400 focus:border-gray-600 bg-transparent px-3 py-1.5 outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-4 flex gap-4 justify-end items-center rounded-b-lg text-right">
                            <button
                                type="button"
                                onClick={openModal}
                                className="inline-flex w-30 bg-red-600 justify-center py-1 px-4 border border-transparent shadow-sm text-sm font-medium text-white hover:bg-white hover:text-red-600 hover:ring-red-600 focus:outline-none ring-2 ring-red-600"
                            >
                                Delete Profile
                            </button>
                            <button
                                type="submit"
                                className="inline-flex w-30 bg-sky-500 justify-center py-1 px-4 border border-transparent shadow-sm text-sm font-medium hover:bg-black text-black hover:text-white hover:ring-black ring-2 ring-sky-500 focus:outline-none"
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </form>

            </div>
        </div>
    )
}

export function Profile() {

    const [searchTerm, setSearchTerm] = React.useState('')

    return (
        <Layout open setOpen setSearchTerm={setSearchTerm}>
            <Setting />
        </Layout>
    )
}