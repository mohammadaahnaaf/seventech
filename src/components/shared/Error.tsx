import Link from 'next/link';
import React from 'react'

export function Error() {
  return (
    <div className="flex items-center justify-center w-screen h-screen bg-gradient-to-r from-[red] to-pink-600">
      <div className="px-40 py-20 bg-white rounded-md shadow-xl">
        <div className="flex flex-col items-center">
          <h1 className="font-bold text-[red] text-9xl">404</h1>

          <h6 className="mb-2 text-2xl font-bold text-center text-gray-800 md:text-3xl">
            <span className="text-[red]">Oops!</span> Page not found
          </h6>

          <p className="mb-8 text-center text-gray-500 md:text-lg">
            The page you’re looking for doesn’t exist.
          </p>

          <Link href="/" className="px-6 py-2 text-sm font-semibold text-black bg-gray-200">Back to home</Link>
        </div>
      </div>
    </div>
  )
}
