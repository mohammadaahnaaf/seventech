import { useState } from 'react'
import Router from 'next/router'
import { axiosRoot } from '@seventech/utils'
import { BasicNavbar, ErrorText, Footer } from '@seventech/shared'

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
        <>
            <BasicNavbar />
            <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
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
                                        {/* {showPass === 'password' ? (
                                            <EyeIcon className="h-5 w-5 text-gray-700 hover:text-black" aria-hidden="true" />
                                        ) : (
                                            <EyeOffIcon className="h-5 w-5 text-gray-700 hover:text-black" aria-hidden="true" />
                                        )} */}
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
                                        )} */}
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
                            </div> */}
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
            </div>
            <Footer />
        </>
    )
}