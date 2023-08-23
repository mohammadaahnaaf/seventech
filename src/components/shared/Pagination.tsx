
function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export function Pagenation(props:Props) {

    const { total, page, setPage, pageSize, setPageSize } = props

    function handleDecrement() {
        if (page !== 0) {
            setPage(page - 1)
            console.log('decrement')
        } else {
            console.log('Not decrement')
        }
    }

    function handleIncrement() {
        if (1 + page < total / pageSize) {
            setPage(page + 1)
            console.log('increment')
        } else {
            console.log('Not increment')
        }
    }

    return (
        <div className='gap-4 items-center p-2 flex justify-end'>
            <div className="hidden md:block">
                <label className='mx-2 text-sm' htmlFor='pageSize'>Page Size:</label>
                <select value={pageSize} onChange={(e) => setPageSize(e.target.value)} className='text-sm rounded-lg outline-none ring-1 ring-red-600 border-none focus:ring-red-600 focus:ring-2 focus:border-none py-1' name='pageSize' id='pageSize'>
                    <option value={8}>8</option>
                    <option value={10}>10</option>
                    <option value={15}>15</option>
                    <option value={20}>20</option>
                    <option value={30}>30</option>
                    <option value={50}>50</option>
                </select>
            </div>
            <nav className='flex items-center gap-2' aria-label="SevenTech Pagigation">
                <p className='text-sm'>Pages:</p>
                <ul className="inline-flex items-center -space-x-px">
                    <li>
                        <button type='button' onClick={handleDecrement} className="block py-2 px-3 ml-0 leading-tight text-red-600 bg-white rounded-l-md border border-red-300 hover:bg-red-600 hover:text-white ">
                            <span className="sr-only">Previous</span>
                            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                        </button>
                    </li>
                    {[0, 1, 2, 3, 4].map((pages) => {
                        return pages < total / pageSize ?
                            <li key={pages}>
                                <button onClick={() => setPage(pages)} type='button'
                                    className={classNames(
                                        pages === page ? 'bg-red-600 text-white' : 'text-red-600 bg-white',
                                        "py-2 px-3 leading-tight border border-red-300 hover:bg-red-500 hover:text-white"
                                    )}>
                                    {pages + 1}</button>
                            </li> : null
                    })}
                    {page > 4 && (
                        <li>
                            <button onClick={() => setPage(page)} type='button'
                                className={classNames(
                                    page > 4 ? 'bg-red-600 text-white' : 'text-red-600 bg-white',
                                    "py-2 px-3 leading-tight border border-red-300 hover:bg-red-500 hover:text-white"
                                )}>
                                {page + 1}</button>
                        </li>
                    )}
                    <li>
                        <button type='button' onClick={handleIncrement} className="block py-2 px-3 leading-tight text-red-600 bg-white rounded-r-md border border-red-300 hover:bg-red-600 hover:text-white">
                            <span className="sr-only">Next</span>
                            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                        </button>
                    </li>
                </ul>
            </nav>
        </div>

    )
}

type Props = {
    total: number;
    page: number;
    setPage: any;
    pageSize: number;
    setPageSize: any;
}

export function NextPage(props: Props) {
    const { total, page, setPage, pageSize, setPageSize } = props

    function handleDecrement() {
        if (page !== 0) {
            setPage(page - 1)
            console.log('decrement')
        } else {
            console.log('Not decrement')
        }
    }

    function handleIncrement() {
        if (1 + page < total / pageSize) {
            setPage(page + 1)
            console.log('increment')
        } else {
            console.log('Not increment')
        }
    }

    return (
        <div className='gap-4 items-center mt-6 bg-gray-300 p-2 flex justify-end'>
            <div className="hidden">
                <label className='mx-2 text-sm' htmlFor='pageSize'>Page Size:</label>
                <select value={pageSize} onChange={(e) => setPageSize(e.target.value)} className='text-sm bg-transparent rounded-lg outline-none ring-1 ring-red-600 border-none focus:ring-red-600 focus:ring-2 focus:border-none py-1' name='pageSize' id='pageSize'>
                    <option value={10}>10</option>
                    <option value={15}>15</option>
                    <option value={20}>20</option>
                    <option value={30}>30</option>
                    <option value={50}>50</option>
                </select>
            </div>
            <nav className='flex items-center gap-2' aria-label="SevenTech Pagigation">
                <p className='text-sm text-gray-700'>Next Pages</p>
                <ul className="inline-flex items-center ring-2 ring-gray-700 -space-x-px">
                    <li>
                        <button type='button' onClick={handleDecrement} className="block py-2 px-3 ml-0 leading-tight text-black bg-transparent hover:bg-black hover:text-white ">
                            <span className="sr-only">Previous</span>
                            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                        </button>
                    </li>
                    {[0, 1, 2, 3, 4].map((pages) => {
                        return pages < total / pageSize ?
                            <li key={pages}>
                                <button onClick={() => setPage(pages)} type='button'
                                    className={classNames(
                                        pages === page ? 'bg-black text-white' : 'text-black bg-transparent',
                                        "py-2 px-4 border-x border-white leading-tight hover:bg-black hover:text-white"
                                    )}>
                                    {pages + 1}</button>
                            </li> : null
                    })}
                    <li>
                        <button type='button' onClick={handleIncrement} className="block py-2 px-3 leading-tight text-black bg-transparent hover:bg-black hover:text-white">
                            <span className="sr-only">Next</span>
                            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                        </button>
                    </li>
                </ul>
            </nav>
        </div>

    )
}