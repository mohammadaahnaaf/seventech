import { useState } from 'react';
import Router from 'next/router'
import Link from 'next/link';
import { axiosAPI, axiosRoot } from '@seventech/utils';
import Image from 'next/image';
import { BasicNavbar, ErrorText, Footer } from '@seventech/shared';

export function Logins() {

    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPass, setShowPass] = useState("password")
    const [isAdmin, setIsAdmin] = useState(false)

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
                email: data.get('email'),
                password: data.get('password')
            }

            const res = await axiosRoot.post('/auth/login', reqData);
            const { access_token, refresh_token } = res.data;
            console.log(res.data)
            localStorage.setItem('access_token', access_token);
            localStorage.setItem('refresh_token', refresh_token);
            setSuccess('Login Done')

            if (!isAdmin) {
                axiosAPI
                    .get('/auth/get-me')
                    .then(res => {
                        setIsAdmin(!!res.data.isAdmin);
                        !res.data.isAdmin ? Router.push('/') : Router.push('/admin')
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
        } catch (error: any) {
            if (error.response) {
                console.log(error.response.data);
                setError(error.response?.data?.message)
            }
        }

    };

    return (
        <div className="grid grid-cols-3 h-[100vh] w-full">
            <div className='col-span-3 lg:col-span-2 xl:col-span-1 h-full w-full content-center bg-white p-3 md:p-6'>
                <form onSubmit={handleSubmit} className='grid gap-4 h-full content-center'>

                    <h1 className='text-center text-2xl md:text-3xl pb-4 font-semibold'>Login Here</h1>
                    <h1 className='text-center text-md pb-4'>Don&apos;t have an account?{' '}
                        <span className='hover:text-sky-500'>
                            <Link href='/signup'>
                                Signup
                            </Link>
                        </span>
                    </h1>

                    <div className="relative">
                        <input
                            type="text"
                            autoComplete="off"
                            className="peer block min-h-[auto] placeholder:text-gray-500 w-full rounded focus:outline-none border-2 border-gray-400 focus:border-gray-600 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none"
                            id="email"
                            name="email"
                            placeholder="Email address" />
                        <label
                            htmlFor="email"
                            className="pointer-events-none absolute peer-focus:bg-white px-2 left-3 top-0 mt-1 max-w-[90%] origin-[0_0] truncate leading-[2.15] text-transparent transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-gray-700 peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none "
                        >Email address
                        </label>
                    </div>

                    <div className="relative">
                        <input
                            type={showPass}
                            autoComplete="off"
                            className="peer block min-h-[auto] placeholder:text-gray-500 w-full rounded focus:outline-none border-2 border-gray-400 focus:border-gray-600 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none"
                            id="password"
                            name="password"
                            placeholder="Password" />
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

                    <button type='submit' className="py-2 rounded-md hover:text-white hover:bg-black bg-sky-500">Login</button>
                    <div className='flex justify-end'>
                        <Link href='/forgotpassword' className='text-right w-auto text-md hover:text-sky-500'>Forget password?</Link>
                    </div>
                </form>
            </div>
        </div >
    )
}

export function Login() {
    return (
        <div className='bg-[url("/bg1.jpg")] object-cover bg-cover'>
            <section>
                <BasicNavbar />
                <Logins />
                <Footer />
            </section>
        </div>
    )
}