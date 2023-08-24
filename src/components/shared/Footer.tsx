import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export function Footer() {
  return (
    <footer className='flex gap-2 align-bottom justify-center text-lg bg-gray-200 py-2'>
      <div className='flex text-sm gap-2 justify-center'>
        <h1 className='text-blue-600'>
          Copyright © SevenTech 2022.
        </h1>
      </div>
    </footer>
  )
}

export function Footers() {
  return (

    <footer className="bg-gray-200 font-normal bg-center bg-cover">
      <div className='p-6'>
        <div className="md:flex md:justify-between">
          <div className="md:hidden block mb-6">
            <Link href="/" className="grid gap-2 items-center justify-items-center">
              <Image height={90} width={100} src="/logo.png" alt="Logo" />
              <span className="self-center text-lg font-medium whitespace-nowrap text-black hover:text-red-600">SevenTech Engineering LTD.</span>

            </Link>
          </div>
          <div className="hidden md:grid items-center">
            <Link href="/" className="grid gap-2 items-center justify-items-center">
              <Image height={100} width={150} src="/logo.png" alt="Logo" />
              <span className="self-center text-lg font-medium whitespace-nowrap text-blue-600 hover:text-red-600">SevenTech Engineering Ltd.</span>

            </Link>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div>

              <h2 className="mb-3 text-sm font-semibold uppercase text-black">Call Us</h2>
              <ul className="text-black">
                <li className="mb-2 hover:text-red-600 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  <Link href='tel:+8801911444466' className="font-normal">
                    +8801911444466
                  </Link>
                </li>
                <li className="flex hover:text-red-600 items-center">
                  <svg
                    className="h-4 w-4 mr-1"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                  </svg>
                  <Link href='tel:+8801911444466' className="font-normal">
                    +8801911444466
                  </Link>
                </li>
              </ul>
            </div>


            <div>
              <h2 className="mb-3 text-sm font-semibold uppercase text-black">About</h2>
              <ul className="text-black">
                <li className="mb-2">
                  <Link href="/about" className="hover:text-red-600">
                    About us
                  </Link>
                </li>
                <li className="mb-2">
                  <Link href="/about/terms" className="hover:text-red-600">
                    Terms &amp; Conditions
                  </Link>
                </li>
                <li className="mb-2">
                  <Link href="/about/privacy" className="hover:text-red-600">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-3 text-sm font-semibold uppercase text-black">Contact</h2>
              <ul className="text-black">
                <li className="mb-2">
                  <Link href="https://www.facebook.com/rdragonbd/" className="flex items-center hover:text-red-600">

                    {/* <svg
                      className="h-4 w-4 mr-2"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24">
                      <path
                        d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                    </svg> */}

                    <svg version="1.1" height="24" width="20" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2"
                      viewBox="0 0 256 256" >
                      <metadata> Svg Vector Icons : http://www.onlinewebfonts.com/icon </metadata>
                      <g><g><path fill="currentColor" d="M147.7,88.7V65.3c0-10.6,2.3-15.9,18.7-15.9H187V10h-34.4c-42.1,0-56,19.3-56,52.4v26.2H69V128h27.6v118h51V128h34.7l4.7-39.3H147.7z M173.6,118.2h-25.3h-10.5v9.5v108.5h-31.4V127.7v-9.5h-9.2H78.8V98.5h18.5h9.2V88.3V62.4c0-15.1,3.3-25.3,9.5-31.8c6.9-7.4,19.1-10.8,36.6-10.8h24.5v19.7h-10.8c-7.4,0-16.9,0.7-22.8,7.2c-5,5.5-5.8,12.4-5.8,18.5v23.1v10.2h10.5h27.6L173.6,118.2z" /></g></g>
                    </svg>

                    <span> Facebook </span>

                  </Link>
                </li>
                <li className="mb-2">
                  <Link href="https://twitter.com/redragonusa" className="hover:text-red-600 flex items-center">
                    {/* <svg
                      className="h-4 w-4 mr-2"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24">
                      <path
                        d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                    </svg> */}
                    <svg viewBox="0 0 1200 1227" height="20" width="20" fill="currentColor" className="hover:text-red-600 flex items-center mr-2"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z"
                        fill="currentColor" />
                    </svg>
                    <span> Twitter </span>

                  </Link>
                </li>
                <li>
                  <Link href="https://www.instagram.com/redragon_usa" className="hover:text-red-600 flex items-center">

                    <svg
                      className="h-5 w-5 mr-2"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24">
                      <path
                        d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                    <span>Instagram</span>

                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-3 text-sm font-semibold text-black uppercase">Find us</h2>
              <ul className="text-black">
                <li className="mb-2">
                  <Link href='https://goo.gl/maps/7nBfZRWCmJXRNqdX8' className='cursor-pointer hover:text-red-600'>
                    <p className='flex items-center mb-2'>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      Level-5/39, Kazi Bhaban,
                    </p>
                    <p className='mb-2 ml-5'>New Elephant Road,</p>
                    <p className='ml-5'>Dhaka-1205, Bangladesh.</p>
                  </Link>
                </li>
                <li>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-3 border-gray-300 sm:mx-auto lg:my-6" />
        <div className="sm:flex sm:items-center sm:justify-center">
          <span className="text-sm text-blue-600 text-center">© 2023{' '}
            <Link href="https://www.seventech.com.bd" className="hover:text-red-600">
              SevenTech™{' '}
            </Link>
            All rights reserved.
          </span>
        </div>
      </div>
    </footer>

  )
}