import { useState } from 'react'
import { axiosRoot } from '@seventech/utils'
import { BasicNavbar, SuccessText, Footer, ErrorText } from '@seventech/shared'
import Link from 'next/link'

export function Forgot() {


    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
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
                email: data.get('email'),
            }

            const res = await axiosRoot.post('/auth/forget-password', reqData);
            // const { access_token, refresh_token } = res.data;
            console.log(res.data)
            setSuccess(`An E-mail is sent to ${reqData.email}`)
            setTimeout(() => { setSuccess('') }, 2000)

        } catch (error: any) {
            if (error.response) {
                console.log(error.response.data);
                setError(error.response?.data?.message)
                setTimeout(() => { setError('') }, 3000)
            }
        }

    };


    return (
        <div className='bg-[url("/bg1.jpg")] object-cover bg-cover'>
            <BasicNavbar />

            <div className="grid grid-cols-3 h-[100vh] w-full">
                <div className='col-span-1 h-full w-full content-center bg-white p-6'>
                    <form onSubmit={handleSubmit} className='grid gap-4 h-full content-center'>

                        <h1 className='text-center text-3xl pb-4 font-semibold'>Forget Password?</h1>
                        <h1 className='text-center text-md pb-4'>Don&apos;t have an account?{' '}
                            <span className='hover:text-sky-500'>
                                <Link href='/signup'>
                                    Signup
                                </Link>
                            </span>
                        </h1>
                        
                        {success && <SuccessText success={success} />}
                        {error && <ErrorText error={error} />}

                        <div className="relative" >
                            <input
                                type="email"
                                autoComplete="off"
                                className="peer block min-h-[auto] w-full rounded focus:outline-none border-2 border-gray-400 focus:border-gray-600 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                                id="email"
                                name="email"
                                placeholder="Email address"
                                required
                            />
                            <label
                                htmlFor="email"
                                className="pointer-events-none absolute peer-focus:bg-white px-2 left-3 top-0 mt-1 max-w-[90%] origin-[0_0] truncate leading-[2.15] text-gray-600 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none "
                            >Email address
                            </label>
                        </div>

                        <button type='submit' className="py-2 mb-10 rounded-md hover:text-white hover:bg-black bg-sky-500">
                            Get Password
                        </button>

                        {/* <Link href='/forgotpassword' className='text-right text-sm hover:text-sky-500'>Forget password?</Link> */}
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    )
}