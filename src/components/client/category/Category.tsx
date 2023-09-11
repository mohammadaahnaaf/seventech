import React, { Fragment, useState } from 'react'
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react'

import { useRouter } from 'next/router'
import { useDebounce } from 'use-debounce'
import { NextPage } from '@seventech/shared'
import { axiosRoot, classNames } from '@seventech/utils'
import { ProductCards } from '..'
import { RangeSlider } from './Ranger'

const sortOptions = [
    { name: 'Price: High to Low', bol: true, current: false },
    { name: 'Price: Low to High', bol: false, current: false }
]

const filters = [
    {
        id: 'price',
        name: 'Price',
        options: [
            { value: 'low', label: 'Low to High', checked: false },
            { value: 'high', label: 'High to Low', checked: false },
        ],
    },
    {
        id: 'color',
        name: 'Color',
        options: [
            { value: 'white', label: 'White', checked: false },
            { value: 'black', label: 'Black', checked: true },
            { value: 'red', label: 'Red', checked: false },
        ],
    },
    {
        id: 'brand',
        name: 'Brand',
        options: [
            { value: 'redragon', label: 'ReDragon', checked: true },
        ],
    }
]

const brands = [
    'ReDragon', 'Asus', 'Dell', 'HP', 'Gigabyte', 'LG', 'Samsung', 'Pixel', 'Oppo'
]
type Props = {
    term: string;
}
export function Category(props: Props) {

    const { term } = props
    const router = useRouter()
    let jinish: any = router.query.slug
    let fy: any = router.query.y
    let fz: any = router.query.z

    // console.log(fcat, fscat)

    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
    const [items, setItems] = useState<any[]>([])
    const [categories, setCategories] = useState([])
    const [cats, setCats] = useState<string>('')
    const [searchSubCats, setSearchSubCats] = React.useState<string>('')
    const [total, setTotal] = React.useState(0)
    const [pageSize, setPageSize] = React.useState(8)
    const [page, setPage] = React.useState(0)
    const [name, setName] = React.useState<string>('')

    const [minValue, setMinValue] = useState(1);
    const [priceHL, setPriceHL] = useState(true);
    const [maxValue, setMaxValue] = useState(8000);

    const [searchedName] = useDebounce(name, 400);
    const [searchedNamed] = useDebounce(term, 400);
    const [maxPrice] = useDebounce(maxValue, 400);
    const [minPrice] = useDebounce(minValue, 400);

    React.useEffect(() => {
        function slugify() {
            if (!fy) {
                setTimeout(() => { setName(jinish) }, 500)
            } else if (!!fy) {
                setTimeout(() => { setSearchSubCats(fz) }, 500)
                setTimeout(() => { setCats(fy) }, 500)
            }
        }
        slugify()
    }, [jinish, fz, fy]);

    //get Data
    React.useEffect(() => {
        async function getCategory() {
            try {
                const res = await axiosRoot.get('/categories');
                setCategories(res.data.categories)
            } catch (err) {
                console.log(err)
            }
        }
        getCategory()
    }, [jinish, term]);

    // getProduct
    React.useEffect(() => {
        async function getProducts() {
            try {
                const res = await axiosRoot.get(`/products?page=${page + 1}&size=${pageSize}&category=${cats}&subCategory=${searchSubCats}&lowerPrice=${minPrice}&higherPrice=${maxPrice}&highFirst=${priceHL}&searchQuery=${searchedNamed || searchedName}`);
                setItems(res.data.products)
                setTotal(res.data.count)
            } catch (err) {
                console.log(err)
            }
        }
        getProducts()
    }, [searchSubCats, maxPrice, priceHL, minPrice, cats, searchedName, searchedNamed, page, pageSize])


    function handleCategoryFilter(nam: string) {
        setSearchSubCats('')
        setName('')
        setCats(nam)
        setMaxValue(50000)
        // setMobileFiltersOpen(false)
    }

    function hadlePrice(bol: any) {
        setName('')
        priceHL !== bol &&
            setPriceHL(bol)
    }

    function handleFilterOpen() {
        setMobileFiltersOpen(true)
    }

    function handleTo(link: string) {
        router.push(`/category/${link}`)
        setMobileFiltersOpen(false)
        // setTimeout(() => { setMobileFiltersOpen(false) }, 500)
    }

    const sortedCategories = categories.slice().sort((a: any, b: any) => a.name.localeCompare(b.name));
    const sortedSubCats = (x: any[]) => x.slice().sort((a: any, b: any) => a.name.localeCompare(b.name));

    return (
        <div>
            {/* Mobile view filter dialog */}
            <Transition.Root show={mobileFiltersOpen} as={Fragment}>
                <Dialog as="div" className="relative z-40 lg:hidden" onClose={setMobileFiltersOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="transition-opacity ease-linear duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity ease-linear duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-40 flex">
                        <Transition.Child
                            as={Fragment}
                            enter="transition ease-in-out duration-300 transform"
                            enterFrom="translate-x-full"
                            enterTo="translate-x-0"
                            leave="transition ease-in-out duration-300 transform"
                            leaveFrom="translate-x-0"
                            leaveTo="translate-x-full"
                        >
                            <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-sm flex-col overflow-y-auto bg-white shadow-xl">
                                <div className="flex items-center py-4 justify-between px-4 bg-sky-600">
                                    <h2 className="text-lg font-semibold text-black">Categories</h2>
                                    <button
                                        type="button"
                                        className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md p-2 text-black"
                                        onClick={() => setMobileFiltersOpen(false)}
                                    >
                                        <span className="sr-only">Close menu</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                                            className="h-6 w-6" >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                        </svg>

                                    </button>
                                </div>

                                {/* Category List */}
                                <div>
                                    <h3 className="sr-only">Categories</h3>
                                    <ul role="list" className="px-4 text-md grid gap-2 py-3 font-semibold text-black">
                                        {sortedCategories?.map((category: any, index: number) => (
                                            <li key={index}>
                                                <button type='button' onClick={() => handleTo(category.name)}>
                                                    {`${index + 1}. `}{category.name}
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                    <div className='p-4'>
                                        <div className='w-full bg-opacity-10 px-4 bg-sky-600 rounded-lg '>
                                            <RangeSlider
                                                minValue={minValue}
                                                setMinValue={setMinValue}
                                                maxValue={maxValue}
                                                setMaxValue={setMaxValue}
                                                min={1}
                                                max={10000}
                                                step={1}
                                                priceCap={1000}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>

            {/* PC view */}
            <main className="mx-auto">
                <div className='bg-gradient-to-r from-blue-600 to-sky-500'>
                    <div className="flex items-baseline px-4 sm:px-6 lg:px-8 justify-between py-3 lg:py-6">
                        {/* Upper Top section */}
                        <h1 className="text-lg md:text-2xl hidden lg:block font-normal tracking-tight text-white">Categories</h1>
                        <div className="flex items-center justify-between w-full flex-row-reverse lg:w-auto">

                            <Menu as="div" className="relative inline-block text-left">
                                <div>
                                    <Menu.Button className="group inline-flex items-end justify-center text-sm md:text-md font-medium hover:text-white text-black">
                                        Sort by
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                            className="-mr-1 ml-1 h-4 w-4 flex-shrink-0 group-hover:text-white text-black">
                                            <path fillRule="evenodd" d="M12.53 16.28a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 14.69l6.97-6.97a.75.75 0 111.06 1.06l-7.5 7.5z" clipRule="evenodd" />
                                        </svg>

                                    </Menu.Button>
                                </div>

                                <Transition
                                    as={Fragment}
                                    enter="transition ease-out duration-100"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95"
                                >
                                    <Menu.Items className="absolute right-0 z-40 mt-2 w-40 origin-top-right rounded-md bg-white ring-black shadow-2xl ring-1 ring-opacity-20 focus:outline-none">
                                        <div className="py-1">
                                            {sortOptions.map((option:any) => (
                                                <Menu.Item key={option.name}>
                                                    {({ active }) => (
                                                        <button
                                                            type='button'
                                                            onClick={() => hadlePrice(option.bol)}
                                                            className={classNames(
                                                                option.bol === priceHL ? 'font-medium text-white bg-sky-500' : 'text-black',
                                                                active ? 'bg-black text-white' : '',
                                                                'block px-4 py-2 font-semibold text-sm w-full text-left'
                                                            )}
                                                        >
                                                            {option.name}
                                                        </button>
                                                    )}
                                                </Menu.Item>
                                            ))}
                                        </div>
                                    </Menu.Items>
                                </Transition>
                            </Menu>

                            {/* Mobile filter button  */}
                            <button
                                type="button"
                                className="-m-2 ml-4 p-2 flex text-white hover:text-sky-300 sm:ml-6 lg:hidden"
                                onClick={() => handleFilterOpen()}
                            >
                                <span className="sr-only">Filters</span>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                                    className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <section className="py-6 px-4 sm:px-6 lg:px-8">
                    <h2 id="products-heading" className="sr-only">
                        Categories
                    </h2>
                    {/* SideBar */}
                    <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-12">
                        <div className="hidden lg:block lg:col-span-3 xl:col-span-2">
                            <h3 className="sr-only">Categories</h3>

                            {/* All Categories */}
                            <ul role="list" className="space-y-4 border-b border-gray-600 pb-6 text-md font-medium">
                                {sortedCategories?.map((category: any, index: number) => (
                                    <li key={index}>
                                        <Disclosure>
                                            {({ open }) => (
                                                <>
                                                    <Disclosure.Button className="flex hover:text-gray-500 focus:text-gray-400 w-full justify-between text-left text-md font-medium text-black focus:outline-none focus:ring-0">
                                                        <button onClick={() => handleCategoryFilter(category.name)} type='button'>
                                                            {category.name}
                                                        </button>
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                                            className={`${!open ? 'rotate-180 transform' : 'text-gray-700'} h-5 w-5 text-black`}>
                                                            <path fillRule="evenodd" d="M11.47 7.72a.75.75 0 011.06 0l7.5 7.5a.75.75 0 11-1.06 1.06L12 9.31l-6.97 6.97a.75.75 0 01-1.06-1.06l7.5-7.5z" clipRule="evenodd" />
                                                        </svg>

                                                    </Disclosure.Button>
                                                    <Disclosure.Panel className="p-2 gap-2 grid text-md text-gray-700">
                                                        {sortedSubCats(category?.subCategories).map((sub: any, index: number) => (
                                                            <button key={index} className='flex w-full items-center hover:text-green-600' type='button' onClick={() => setSearchSubCats(sub.name)}>{index + 1}. {sub.name}</button>
                                                        ))}
                                                    </Disclosure.Panel>
                                                </>
                                            )}
                                        </Disclosure>
                                    </li>
                                )
                                )}
                            </ul>

                            {/* Filter Brands  */}
                            <ul role="list" className="space-y-4 border-b py-4 border-gray-600 text-md font-medium">

                                <li>
                                    <Disclosure>
                                        {({ open }) => (
                                            <>
                                                <Disclosure.Button className="flex py-2 hover:text-gray-500 focus:text-gray-400 w-full justify-between text-left text-md font-medium text-black focus:outline-none focus:ring-0">
                                                    <button type='button'>
                                                        Brands
                                                    </button>
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                                        className={`${!open ? 'rotate-180 transform' : 'text-gray-700'} h-5 w-5 text-black`}>
                                                        <path fillRule="evenodd" d="M11.47 7.72a.75.75 0 011.06 0l7.5 7.5a.75.75 0 11-1.06 1.06L12 9.31l-6.97 6.97a.75.75 0 01-1.06-1.06l7.5-7.5z" clipRule="evenodd" />
                                                    </svg>
                                                </Disclosure.Button>
                                                <div className='grid gap-1'>
                                                    {brands?.map((brand, index) => (
                                                        <Disclosure.Panel key={index} className="flex hover:text-gray-500 focus:text-gray-400 w-full justify-between text-left text-md font-medium text-black focus:outline-none focus:ring-0">
                                                            <button onClick={() => router.push(`/category/${brand}`)} type='button'>
                                                                {brand}
                                                            </button>
                                                        </Disclosure.Panel>
                                                    ))}
                                                </div>
                                            </>
                                        )}
                                    </Disclosure>
                                </li>

                            </ul>
                            {/* Price Range */}
                            <div className='lg:col-span-3 xl:col-span-2'>
                                <RangeSlider
                                    minValue={minValue}
                                    setMinValue={setMinValue}
                                    maxValue={maxValue}
                                    setMaxValue={setMaxValue}
                                    min={1}
                                    max={10000}
                                    step={1}
                                    priceCap={1000}
                                />
                            </div>

                            {/* Filters SideBar */}
                            <div className='hidden'>
                                {filters.map((section) => (
                                    <Disclosure as="div" key={section.id} className="border-b border-gray-200 py-6">
                                        {({ open }) => (
                                            <>
                                                <h3 className="-my-3 flow-root">
                                                    <Disclosure.Button className="flex w-full items-center justify-between bg-red-600 rounded-sm p-3 text-sm text-gray-200 hover:text-gray-300">
                                                        <span className="font-medium text-gray-100">{section.name}</span>
                                                        <span className="ml-6 flex items-center">
                                                            {open ? (
                                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                                                    <path fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10zm0 5.25a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75a.75.75 0 01-.75-.75z" clipRule="evenodd" />
                                                                </svg>

                                                            ) : (
                                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                                                    <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                                                                </svg>

                                                            )}
                                                        </span>
                                                    </Disclosure.Button>
                                                </h3>
                                                <Disclosure.Panel className="pt-6">
                                                    <div className="space-y-4">
                                                        {section.options.map((option, optionIdx) => (
                                                            <div key={option.value} className="flex items-center">
                                                                <input
                                                                    id={`filter-${section.id}-${optionIdx}`}
                                                                    name={`${section.id}[]`}
                                                                    defaultValue={option.value}
                                                                    type="checkbox"
                                                                    defaultChecked={option.checked}
                                                                    className="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-500"
                                                                />
                                                                <label
                                                                    htmlFor={`filter-${section.id}-${optionIdx}`}
                                                                    className="ml-3 text-sm text-gray-400"
                                                                >
                                                                    {option.label}
                                                                </label>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </Disclosure.Panel>
                                            </>
                                        )}
                                    </Disclosure>
                                ))}
                            </div>

                        </div>

                        {/* Null Product Loading */}
                        {items.length === 0 ? (
                            <div className='w-full lg:col-span-9 xl:col-span-10 h-screen'>
                            </div>
                        ) : null}

                        {/* Product List */}
                        <div className="lg:col-span-9 xl:col-span-10">
                            <div className='items-center justify-start mx-auto gap-2 md:gap-4 grid grid-cols-2 lg:grid-cols-2 xl:grid-cols-4'>

                                {items?.map((product, index) => {
                                    return (
                                        <ProductCards key={index} product={product} />
                                    )
                                })}
                            </div>
                            {total / pageSize > 1 && (
                                <NextPage total={total} page={page} setPage={setPage} pageSize={pageSize} setPageSize={setPageSize} />
                            )}
                        </div>
                    </div>
                </section>
            </main>
        </div>
    )
}