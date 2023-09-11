import { useState } from 'react'
import Router from 'next/router'
import { axiosRoot } from '@seventech/utils'
import { BasicNavbar, ErrorText, Footer } from '@seventech/shared'
import Link from 'next/link'

export function Signup() {


    const [error, setError] = useState("")
    const [showPass, setShowPass] = useState("password")

    function handleShowPass() {
        if (showPass === "password") {
            setShowPass('text')
        } else {
            setShowPass('password')
        }
    }
    const handleSubmit = async (event: any) => {
        try {
            event.preventDefault();

            const data = new FormData(event.currentTarget);

            const reqData = {
                fullName: data.get('fullName'),
                email: data.get('email'),
                phoneNumber: data.get('phone'),
                password: data.get('password')
            }

            if (data.get('password') === data.get('confirm-password')) {

                const res = await axiosRoot.post('/auth/signup', reqData);

                const { access_token, refresh_token } = res.data;
                localStorage.setItem('access_token', access_token);
                localStorage.setItem('refresh_token', refresh_token);
                Router.push('/')

            } else {
                setError("Password didn't match.")
            }
        } catch (error: any) {
            console.log(error.response);
            setError(error.response?.data?.message)
            // Router.push('/login')
        }
    };


    return (
        <div className='bg-[url("/bg1.jpg")] object-cover bg-cover'>
            <BasicNavbar />

            <div className="grid grid-cols-3 h-[100vh] w-full">
                <div className='col-span-3 lg:col-span-2 xl:col-span-1 h-full w-full content-center bg-white p-3 md:p-6'>
                    <form onSubmit={handleSubmit} className='grid gap-4 h-full content-center'>

                        <h1 className='text-center text-2xl md:text-3xl pb-4 font-semibold'>Create an account</h1>
                        <h1 className='text-center text-md pb-4'>
                            <span>
                                Already have an account?{' '}
                            </span>
                            <Link className='hover:text-sky-500 text-blue-600' href='/login'>
                                Login
                            </Link>
                        </h1>

                        <div className="relative">
                            <input
                                type="text"
                                autoComplete="off"
                                className="peer block min-h-[auto] placeholder:text-gray-500 w-full rounded focus:outline-none border-2 border-gray-400 focus:border-gray-600 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none"
                                id="fullName"
                                name="fullName"
                                placeholder="Your name"
                                required
                            />
                            <label
                                htmlFor="fullName"
                                className="pointer-events-none absolute peer-focus:bg-white px-2 left-3 top-0 mt-1 max-w-[90%] origin-[0_0] truncate leading-[2.15] text-transparent transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-gray-700 peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none "
                            >Full name
                            </label>
                        </div>

                        <div className="relative" >
                            <input
                                type="text"
                                autoComplete="off"
                                className="peer block min-h-[auto] placeholder:text-gray-500 w-full rounded focus:outline-none border-2 border-gray-400 focus:border-gray-600 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none"
                                id="email"
                                name="email"
                                placeholder="Email address"
                                required
                            />
                            <label
                                htmlFor="email"
                                className="pointer-events-none absolute peer-focus:bg-white px-2 left-3 top-0 mt-1 max-w-[90%] origin-[0_0] truncate leading-[2.15] text-transparent transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-gray-700 peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none "
                            >Email address
                            </label>
                        </div>
                        <div className="relative" >
                            <input
                                type="tel"
                                required
                                autoComplete="off"
                                className="peer block min-h-[auto] placeholder:text-gray-500 w-full rounded focus:outline-none border-2 border-gray-400 focus:border-gray-600 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none"
                                id="phone"
                                name="phone"
                                placeholder="Phone number"
                            />
                            <label
                                htmlFor="phone"
                                className="pointer-events-none absolute peer-focus:bg-white px-2 left-3 top-0 mt-1 max-w-[90%] origin-[0_0] truncate leading-[2.15] text-transparent transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-gray-700 peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none "
                            >Phone number
                            </label>
                        </div>

                        <div className="relative">
                            <input
                                type={showPass}
                                autoComplete="off"
                                className="peer block min-h-[auto] placeholder:text-gray-500 w-full rounded focus:outline-none border-2 border-gray-400 focus:border-gray-600 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none"
                                id="password"
                                name="password"
                                placeholder="Password"
                                required
                            />
                            <label
                                htmlFor="password"
                                className="pointer-events-none absolute peer-focus:bg-white px-2 left-3 top-0 mt-1 max-w-[90%] origin-[0_0] truncate leading-[2.15] text-transparent transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-gray-700 peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none "
                            >Password
                            </label>

                            <span className="absolute px-2 right-0 inset-y-0 flex items-center pl-3">
                                <button type='button' onClick={handleShowPass} className=''>
                                    {showPass === 'password' ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                                            className="h-5 w-5 text-gray-700 hover:text-black">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>

                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                                            className="h-5 w-5 text-gray-700 hover:text-black">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                                        </svg>
                                    )}
                                </button>
                            </span>

                        </div>
                        <div className="relative">
                            <input
                                type={showPass}
                                autoComplete="off"
                                className="peer block min-h-[auto] placeholder:text-gray-500 w-full rounded focus:outline-none border-2 border-gray-400 focus:border-gray-600 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none"
                                id="confirm-password"
                                name="confirm-password"
                                placeholder="Confirm password"
                                required
                            />
                            <label
                                htmlFor="confirm-password"
                                className="pointer-events-none absolute peer-focus:bg-white px-2 left-3 top-0 mt-1 max-w-[90%] origin-[0_0] truncate leading-[2.15] text-transparent transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-gray-700 peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none "
                            >Confirm password
                            </label>

                            <span className="absolute px-2 right-0 inset-y-0 flex items-center pl-3">
                                <button type='button' onClick={handleShowPass} className=''>
                                    {showPass === 'password' ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                                            className="h-5 w-5 text-gray-700 hover:text-black">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>

                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                                            className="h-5 w-5 text-gray-700 hover:text-black">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                                        </svg>
                                    )}
                                </button>
                            </span>

                        </div>

                        <button type='submit' className="py-2 mb-10 rounded-md hover:text-white hover:bg-black bg-sky-500">
                            Signup
                        </button>

                        {/* <Link href='/forgotpassword' className='text-right text-sm hover:text-sky-500'>Forget password?</Link> */}
                    </form>
                </div>

                {/* <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8 bg-black bg-opacity-20 rounded-lg p-3">
                    <div>
                        <img
                            className="mx-auto h-16 w-auto"
                            src="/logo.png"
                            alt="seven tech"
                        />
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-black">Sign Up Here</h2>
                        <p className="mt-2 text-center text-sm text-black">
                            Already have an account?{' '}
                            <a href="login" className="font-medium text-gray-500 hover:text-black">
                                Login
                            </a>
                        </p>
                    </div>

                    {error && <ErrorText error={error} />}

                    <form className="mt-5 space-y-6" onSubmit={handleSubmit}>
                        <input type="hidden" name="remember" defaultValue="true" />
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div>
                                <label htmlFor="fullName" className="sr-only">
                                    Full name
                                </label>
                                <input
                                    id="fullName"
                                    name="fullName"
                                    type="text"
                                    // autoComplete="fullName"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-black focus:border-black focus:z-10 sm:text-sm"
                                    placeholder="Full name"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="sr-only">
                                    Phone number
                                </label>
                                <input
                                    id="phone"
                                    name="phone"
                                    type="tel"
                                    // autoComplete="phone"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-black focus:border-black focus:z-10 sm:text-sm"
                                    placeholder="Phone number"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="sr-only">
                                    Email address
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    // autoComplete="email"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-black focus:border-black focus:z-10 sm:text-sm"
                                    placeholder="Email address"
                                />
                            </div>
                            <div className='relative'>
                                <label htmlFor="password" className="sr-only">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type='text'
                                    // type={showPass}
                                    // autoComplete="current-password"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Password"
                                />
                                <span className="absolute px-2 right-0 inset-y-0 flex items-center pl-3">
                                    <button type='button' onClick={handleShowPass} className=''>
                                        {showPass === 'password' ? (
                                            <EyeIcon className="h-5 w-5 text-gray-700 hover:text-black" aria-hidden="true" />
                                        ) : (
                                            <EyeOffIcon className="h-5 w-5 text-gray-700 hover:text-black" aria-hidden="true" />
                                        )} 
                                    </button>
                                </span>
                            </div>
                            <div className='relative'>
                                <label htmlFor="confirm-password" className="sr-only">
                                    Confirm password
                                </label>
                                <input
                                    id="confirm-password"
                                    name="confirm-password"
                                    type={showPass}
                                    // autoComplete="current-password"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Confirm password"
                                />
                                <span className="absolute px-2 right-0 inset-y-0 flex items-center pl-3">
                                    <button type='button' onClick={handleShowPass} className=''>
                                        {/* {showPass === 'password' ? (
                                            <EyeIcon className="h-5 w-5 text-gray-700 hover:text-black" aria-hidden="true" />
                                        ) : (
                                            <EyeOffIcon className="h-5 w-5 text-gray-700 hover:text-black" aria-hidden="true" />
                                        )} 
                                    </button>
                                </span>
                            </div>
                        </div>

                        <div className="flex items-center justify-end">
                            <div className="hidden items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 text-red-400 focus:ring-black border-gray-300 rounded"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                    Remember me
                                </label>
                            </div>

                            {/* <div className="text-sm">
                                <a href="#" className="font-medium text-red-400 hover:text-black">
                                    Forgot your password?
                                </a>
                            </div> 
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-500 hover:bg-black focus:bg-black focus:outline-none"
                            >
                                Signup
                            </button>
                        </div>
                    </form>
                </div>
            </div> */}
            </div>
            <Footer />
        </div>
    )
}