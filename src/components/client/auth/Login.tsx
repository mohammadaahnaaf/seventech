import { useState } from 'react';
import Router from 'next/router'
import Link from 'next/link';
import { axiosAPI, axiosRoot } from '@seventech/utils';
import Image from 'next/image';
import { BasicNavbar, ErrorText, Footer } from '@seventech/shared';

export function Logins() {

    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
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
        <div className="min-h-screen px-1 md:px-0 flex items-center justify-center my-auto">
            <div className="bg-black bg-opacity-10 p-4 rounded-lg max-w-md w-full">
                <div className='grid gap-2'>
                    <div className='relative h-16 w-32 mx-auto mt-2'>
                        <Image
                            fill
                            className="mx-auto h-16 w-20"
                            src="/logo.png"
                            alt="seventech logo"
                        />
                    </div>
                    <h2 className="text-center text-xl md:text-3xl font-semibold text-black">Login Here</h2>
                    <p className="text-center text-sm text-black">
                        Don&apos;t have an account?{' '}
                        <Link href="signup" className="font-medium text-gray-500 hover:text-black">
                            Sign Up
                        </Link>
                    </p>
                </div>

                {error && (
                    <ErrorText error={error} />
                )}

                <form className="space-y-6" onSubmit={handleSubmit}>
                    <input type="hidden" name="remember" defaultValue="true" />
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="email-address" className="sr-only">
                                Email address
                            </label>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="appearance-none bg-black rounded-none relative block w-full px-3 py-2 border border-red-300 placeholder-black text-red-900 rounded-t-md focus:outline-none focus:ring-gray-500 focus:border-gray-500 focus:z-10 sm:text-sm"
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
                                type={showPass}
                                autoComplete="current-password"
                                required
                                className="appearance-none bg-black rounded-none relative block w-full px-3 py-2 border border-red-300 placeholder-black text-red-900 rounded-b-md focus:outline-none focus:ring-black focus:border-black focus:z-10 sm:text-sm"
                                placeholder="Password"
                            />
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
                    </div>

                    <div className='grid gap-1'>
                        <div className="text-sm text-center py-2 md:text-right">
                            <Link href='/forgotpassword' className="font-medium text-gray-500 hover:text-black">
                                Forgot your password?
                            </Link>
                        </div>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-500 hover:bg-black focus:bg-black focus:outline-none"
                        >
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export function Login() {
    return (
        <>
            <BasicNavbar />
            <Logins />
            <Footer />
        </>
    )
}