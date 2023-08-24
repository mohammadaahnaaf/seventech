import React from 'react'
import { useRouter } from 'next/router'

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

type Props = {
    setSearchTerm: any;
    searchButton: any
}

export function SearchBar(props: Props) {

    const { setSearchTerm, searchButton } = props
    const router = useRouter()

    // redirect to category on search 
    const handleSubmit = (e: any) => {
        e.preventDefault()
        setSearchTerm('')
        const data = new FormData(e.currentTarget);
        const slug = {
            name: data.get('search')
        }
        router.push(`/category/${slug.name}`)
    }

    function handleSearch(e: any) {
        setSearchTerm(e.target.value)
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <div className="mx-2 flex items-baseline">
                    <label htmlFor="search" className="mb-2 text-sm font-medium sr-only">Search</label>
                    <div className="relative w-full">
                        <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                                className='w-5 h-5 text-gray-200 text-opacity-70'>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                            </svg>
                        </div>
                        <input
                            type="search"
                            id="search"
                            name="search"
                            onChange={handleSearch}
                            className="block p-3 pl-10 w-full placeholder-gray-200 placeholder-opacity-70 outline-none focus:border-0 focus:ring-0 !focus:outline-none border-0 ring-0 bg-gray-600 focus:bg-opacity-20 hover:bg-opacity-20 rounded-full bg-opacity-40 text-black shadow-sm sm:text-sm"
                            placeholder="Find here..."
                            required
                        />
                        <button disabled={searchButton || false} type="submit" className={classNames(searchButton ? "cursor-not-allowed" : "",
                            "px-4 flex absolute inset-y-2 right-2 items-center font-medium rounded-full text-sm bg-white text-black hover:bg-black hover:text-white")}
                        >
                            Search
                        </button>
                    </div>
                </div>

            </div>
        </form>
    )
}