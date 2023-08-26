import { Dialog, Switch, Transition } from '@headlessui/react';
import { AdminLayout } from '@seventech/layouts';
import { ErrorText, Pagenation, SearchBar } from '@seventech/shared';
import { axiosAPI, axiosRoot, classNames } from '@seventech/utils';
import Image from 'next/image';
import Link from 'next/link';
import Router, { useRouter } from 'next/router';
import React, { Fragment, useState } from 'react';
import { TagsInput } from "react-tag-input-component";
import { useDebounce } from 'use-debounce';
import { v4 as uuidv4 } from 'uuid';


function Add() {

    const router = useRouter()

    const [formValues, setFormValues] = React.useState<any[]>(
        [{ id: uuidv4(), title: "", specification: "" }]
    )
    const [moreInfos, setMoreInfo] = React.useState<any[]>(
        [{ id: uuidv4(), title: '', description: "" }]
    )
    const [featured, setFeatured] = React.useState(false)
    const [active, setActive] = React.useState(false)
    const [error, setError] = React.useState('')
    const [tags, setTags] = useState<string[]>([]);
    const [cats, setCats] = React.useState([]);
    const [subCats, setSubCats] = React.useState([]);
    const [category, setCategory] = React.useState('');
    const [files, setFiles] = useState<any[]>([]);
    const [products, setProducts] = useState([])
    const [enabled, setEnabled] = useState(false)
    const [relatedProducts, setRelatedProducts] = useState<any[]>([])
    const [pageSize, setPageSize] = React.useState(10)
    const [page, setPage] = React.useState(0)
    const [total, setTotal] = React.useState(0);
    const [searchTerm, setSearchTerm] = useState('')

    const [searchedName] = useDebounce(searchTerm, 400);

    // select images 
    const handleSelectImage = (e: any) => {

        let file = e.target.files;
        const selectedFilesArray = Array.from(file);

        const imagesArray: any[] = selectedFilesArray.map((file: any) => {
            return file;
        });
        setFiles((previousImages) => previousImages.concat(imagesArray));
    };

    // remove selected images 
    const removeImage = (i: any) => {
        setFiles(files.filter(x => x.name !== i));
    }

    // submit form data
    const handleSubmit = async (event: any) => {

        try {
            event.preventDefault()
            const data = new FormData(event.currentTarget);

            data.delete('bordered-checkbox')
            data.delete('file-upload')
            data.delete('specification')
            data.delete('detail')
            data.delete('title')
            data.delete('description')
            data.set('tags', JSON.stringify(tags))
            data.set('relatedProducts', JSON.stringify(relatedProducts))
            data.set('isFeatured', String(featured))
            data.set('inStock', String(active))
            data.set('details', JSON.stringify(formValues.map((value: any) => (
                {
                    title: value.title,
                    description: value.specification
                }
            ))))
            data.set('information', JSON.stringify(moreInfos.map((info: any) => (
                {
                    title: info.title,
                    description: info.description
                }
            ))))

            Array.from(files).forEach(file => {
                data.append('images', file)
            })

            await axiosAPI.post('/products', data);
            Router.push('/admin/products')
        } catch (error: any) {

            console.log(error)
            setError(error.response?.data?.message)
        }
    }

    // Details 
    const handleChange = (id: any, event: any) => {
        const newInputFields = formValues.map((i: any) => {
            if (id === i.id) {
                i[event.target.name] = event.target.value
            }
            return i;
        })

        setFormValues(newInputFields);
    };

    const addFormFields = () => {
        setFormValues([...formValues,
        {
            id: uuidv4(),
            detail: ''
        }])
    };

    const removeFormFields = (id: any) => {
        const values = [...formValues];
        values.splice(values.findIndex(value => value.id === id), 1);
        setFormValues(values);
    }

    // More Information 
    const handleMoreinfo = (id: any, event: any) => {
        const newInputFields = moreInfos.map(i => {
            if (id === i.id) {
                i[event.target.name] = event.target.value
            }
            return i;
        })

        setMoreInfo(newInputFields);
    };

    const addMoreinfo = () => {
        setMoreInfo([...moreInfos,
        {
            id: uuidv4(),
            info: ''
        }])
    };

    const removeMoreinfo = (id: any) => {
        const values = [...moreInfos];
        values.splice(values.findIndex(value => value.id === id), 1);
        setMoreInfo(values);
    }

    // Featured? 
    const handleFeature = () => {
        if (featured === false) {
            setFeatured(true)
        } else {
            setFeatured(false)
        }
    }

    React.useEffect(() => {
        function setSubCategory() {
            cats.map((x: any) => {
                if (x.name === category) {
                    setSubCats(x.subCategories)
                }
            });
        }
        category && setSubCategory()
    }, [cats, category])

    // get category
    React.useEffect(() => {
        async function getCategory() {
            const res = await axiosRoot.get('/categories');
            setCats(res.data.categories)
            setCategory(res?.data.categories[0].name)

        }
        getCategory()

    }, []);

    // preview images 
    // const onChanges = (e) => {

    //     for (const file of e.target.files) {
    //         const save = new FileReader();
    //         save.readAsDataURL(file);
    //         save.onload = () => {
    //             setImgSrc((files) => [...files, save.result]);
    //         };
    //         save.onerror = () => {
    //             console.log(save.error);
    //         };
    //     }
    // };


    function closeModal() {
        setEnabled(false)
    }

    // get product data 
    React.useEffect(() => {
        async function getProducts() {
            const res = await axiosRoot.get(`/products?page=${page + 1}&size=${pageSize}&searchQuery=${searchedName}`);
            setProducts(res.data.products)
            setTotal(res.data.count)
        }
        getProducts()
    }, [router, searchedName, page, pageSize]);

    // handle related products 
    function handleAdd(product: any) {
        const selectedIndex: any = relatedProducts.indexOf(product._id);
        let newSelected: any[] | ((prevState: never[]) => never[]) = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(relatedProducts, product._id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(relatedProducts.slice(1));
        } else if (selectedIndex === relatedProducts.length - 1) {
            newSelected = newSelected.concat(relatedProducts.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                relatedProducts.slice(0, selectedIndex),
                relatedProducts.slice(selectedIndex + 1),
            );
        }

        setRelatedProducts(newSelected);
        // console.log(relatedProducts)
    }

    const isSelected = (name: any) => relatedProducts.indexOf(name) !== -1

    // const slugs = ['code', 'name', 'category']
    // const search = (data) => {
    //     return data.filter((item) =>
    //         slugs.some((key) => (typeof item[key] === 'string' ? item[key].toLowerCase() : '').includes(searchTerm))
    //     )
    // }

    const related = (
        <Transition appear show={enabled} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={closeModal}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-200"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black backdrop-blur-sm bg-opacity-40" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full ml-[25vh] max-w-5xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title
                                    as="h3"
                                    className="text-lg font-semibold text-center pb-3 leading-6 text-gray-900"
                                >
                                    Select Related Products
                                </Dialog.Title>
                                <div className="mt-2">
                                    <div className='my-2'>
                                        <SearchBar searchButton={true} setSearchTerm={setSearchTerm} />
                                    </div>
                                    <div className="w-full gap-2 mx-auto grid grid-cols-5">

                                        {products?.map((product: any, index: number) => (
                                            <ProductCard isItemSelected={isSelected(product._id)} key={index} product={product} add={() => handleAdd(product)} />
                                        ))}
                                    </div>
                                    <Pagenation
                                        total={total}
                                        page={page}
                                        setPage={setPage}
                                        pageSize={pageSize}
                                        setPageSize={setPageSize}
                                    />
                                </div>

                                <div className="mt-4 flex gap-2 justify-end">
                                    <button
                                        type="button"
                                        className="inline-flex justify-center rounded-md border border-transparent bg-gray-100 px-4 py-2 text-sm font-medium text-black hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
                                        onClick={closeModal}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="button"
                                        className="inline-flex justify-center rounded-md border border-transparent bg-sky-100 px-4 py-2 text-sm font-medium text-sky-900 hover:bg-sky-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2"
                                        onClick={closeModal}
                                    >
                                        Done
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );

    // const [userInfo, setuserInfo] = useState({
    //     file: [],
    //     filepreview: null,
    // });

    // const handleSelectImage = async (e) => {

    //     setSelectedFiles(e.target.files);
    //     setuserInfo({
    //         ...userInfo,
    //         file: e.target.files,
    //         filepreview: URL.createObjectURL(e.target.files[0]),
    //         // filepreview2: URL.createObjectURL(e.target.files[1]),
    //     })
    // }

    return (

        <div className='grid justify-around grid-cols-1 gap-3 p-5 m-3 bg-white rounded-lg'>
            {error && <ErrorText error={error} />}
            {related}

            <div className='relative py-3 flex items-center justify-center mb-5 text-center bg-gray-200 rounded-lg'>
                <Switch
                    checked={active}
                    onChange={setActive}
                    className={`${active ? 'bg-green-400' : 'bg-red-600'}
                     absolute right-2 inline-flex h-[28px] w-[64px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
                >
                    <span className="sr-only">Use setting</span>
                    <span
                        aria-hidden="true"
                        className={`${active ? 'translate-x-7' : 'translate-x-0'}
                        pointer-events-none z-10 inline-block h-[24px] w-[24px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                    />
                </Switch>
                <h1 className='text-2xl text-center bg-gray-200'>Add Product</h1>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="grid gap-3 mb-6 md:grid-cols-2">

                    {/* Product Details  */}
                    <div>
                        <div>
                            <label htmlFor="name" className="block mb-1 text-sm font-medium text-gray-900">Product name</label>
                            <input type="text" name='name' id="name" className="bg-gray-50 border p-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-600 focus:border-red-600 block w-full" placeholder="Name" required />
                        </div>

                        <div className='grid grid-cols-2 gap-2'>
                            <div>
                                <label htmlFor="category" className="block mb-1 text-sm font-medium text-gray-900">Category</label>
                                <select id="category" onChange={(e) => setCategory(e.target.value)} value={category} name='category' className="bg-gray-50 p-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-600 focus:border-red-600 block w-full" placeholder="Category" required>
                                    {cats.map((cat: any, index: any) =>
                                        <option key={index} value={cat.name}>{cat.name}</option>
                                    )}
                                </select>
                            </div>

                            <div>
                                <label htmlFor="subCategory" className="block mb-1 text-sm font-medium text-gray-900">Subcategory</label>
                                <select id="subCategory" name='subCategory' className="bg-gray-50 border p-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-600 focus:border-red-600 block w-full" placeholder="Subcategory">
                                    {subCats?.map((sub: any, index: any) =>
                                        <option key={index} value={sub.name}>{sub.name}</option>
                                    )}
                                </select>
                            </div>
                        </div>

                        <div className='grid grid-cols-2 gap-2'>
                            <div>
                                <label htmlFor="code" className="block mb-1 text-sm font-medium text-gray-900 ">Product code</label>
                                <input type="text" name='code' id="code" className="bg-gray-50 border p-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-600 focus:border-red-600 block w-full" placeholder="Code" required />
                            </div>
                            <div>
                                <label htmlFor="quantity" className="block mb-1 text-sm font-medium text-gray-900">Quantity</label>
                                <input type="number" name='quantity' id="quantity" className="bg-gray-50 p-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-600 focus:border-red-600 block w-full" placeholder="Stock" required />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="imageAlt" className="block mb-1 text-sm font-medium text-gray-900 ">Brand</label>
                            <input type="text" id="imageAlt" name="imageAlt" className="bg-gray-50 p-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-600 focus:border-red-600 block w-full" placeholder="Brand Name" />
                        </div>
                        <div>
                            <label htmlFor="shortDescription" className="block mb-1 text-sm font-medium text-gray-900">Short description</label>
                            <textarea rows={3} name='shortDescription' id="shortDescription" className="bg-gray-50 p-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-600 focus:border-red-600 block w-full px-2.5" placeholder="Write a short desciption" />
                        </div>
                        <div>
                            <label htmlFor='tags' className="w-full text-sm font-medium text-gray-900">Tags</label>
                            <TagsInput
                                value={tags}
                                onChange={setTags}
                                name="tags"
                                placeHolder="Enter tags"
                            />
                        </div>
                        <p className='text-sm mt-1'>Featured</p>
                        <div className="flex mb-1 items-center pl-2.5 rounded-lg border border-gray-300">
                            <input id="bordered-checkbox-1" type="checkbox" onClick={handleFeature} checked={featured} name="bordered-checkbox" className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-600" />
                            <label htmlFor="bordered-checkbox-1" className="py-2.5 ml-2 w-full text-sm font-medium text-gray-900">Featured on home</label>
                        </div>

                        <div className='grid grid-cols-2 gap-3'>
                            <div>
                                <label htmlFor="regularPrice" className="block mb-1 text-sm font-medium text-gray-900">Regular Price</label>
                                <input type="number" name='regularPrice' placeholder='Regular price' id="regularPrice" className="bg-gray-50 p-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-600 focus:border-red-600 block w-full" />
                            </div>
                            <div>
                                <label htmlFor="onlinePrice" className="block mb-1 text-sm font-medium text-gray-900">Online Price</label>
                                <input type="number" name='onlinePrice' id="onlinePrice" placeholder='Online Price' className="bg-gray-50 p-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-600 focus:border-red-600 block w-full" required />
                            </div>
                        </div>
                        <div className='grid grid-cols-2 gap-2 bg-teal-100 rounded-md px-2 mt-3 py-2'>
                            <div>
                                <label htmlFor="offerPrice" className="mb-1 text-sm font-medium text-gray-900">Special Price/ Offer</label>
                                <input type="number" name='offerPrice' id="offerPrice" placeholder='Special price' className="bg-gray-50 p-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-600 focus:border-red-600 block w-full" />
                            </div>

                            <div>
                                <label htmlFor="offerEndDate" className="mb-1 text-sm font-medium text-gray-900">Offer Ends</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <svg aria-hidden="true" className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"></path></svg>
                                    </div>

                                    <input id='offerEndDate' name='offerEndDate' type="date" className="bg-gray-50 border p-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-600 focus:border-red-500 block w-full pl-10" placeholder="Set a date" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Upload Product images  */}
                    <div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Upload Photos</label>
                            <div className="flex justify-center px-6 pt-5 pb-6 mt-1 border-2 border-gray-300 border-dashed rounded-md">
                                <div className="space-y-1 text-center">
                                    <svg
                                        className="w-12 h-12 mx-auto text-gray-400"
                                        stroke="currentColor"
                                        fill="none"
                                        viewBox="0 0 48 48"
                                        aria-hidden="true"
                                    >
                                        <path
                                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                            strokeWidth={2}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                    <div className="flex items-center text-sm text-gray-600">
                                        <label
                                            htmlFor="file-upload"
                                            className="relative p-1 font-medium text-red-600 rounded-md cursor-pointer hover:text--500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-gray-300"
                                        >
                                            <span>Upload product images</span>
                                            <input multiple id="file-upload" name="file-upload"
                                                type="file"
                                                className="sr-only"
                                                onChange={(e) => handleSelectImage(e)}
                                            />
                                        </label>
                                    </div>
                                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                                </div>
                            </div>
                        </div>

                        {/* <div>
                            <input onChange={onChanges} type="file" className='hidden' name="file" multiple />
                            {imgSrc.map((link) => (
                                <img src={link} />
                            ))}
                        </div> */}

                        {/* Preview Images  */}
                        <div className='grid grid-cols-2 gap-2 mt-5'>
                            {files.map((file, index) =>
                                <div key={index} className='relative rounded-lg cursor-pointer h-36 ring-1 ring-gray-300 hover:opacity-70'>
                                    <div className="absolute top-0 right-0 z-10 grid items-center w-8 h-8 m-1 text-[red] bg-red-600 bg-opacity-25 rounded-lg justify-items-center hover:bg-opacity-50">
                                        <button type='button'
                                            onClick={() => { removeImage(file.name) }}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                                <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z" clipRule="evenodd" />
                                            </svg>                                        </button>
                                    </div>
                                    <div className='relative mx-auto h-36 w-44'>
                                        <Image fill alt='product image' src={URL.createObjectURL(file)} className='mx-auto h-36' />
                                    </div>
                                </div>
                            )}

                        </div>

                        {files.length === 0 && (
                            <div className='grid grid-cols-2 gap-2'>
                                {[0, 1, 2, 3, 4, 5].map(x => (

                                    <div key={x} className='relative flex items-center rounded-lg cursor-not-allowed h-36 border-dashed border-2 border-gray-300 hover:opacity-70'>
                                        <div className="absolute hidden top-0 right-0 z-10 items-center w-8 h-8 m-1 text-white bg-red-600 bg-opacity-25 rounded-lg justify-items-center hover:bg-opacity-50">

                                        </div>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-20 h-20 mx-auto text-gray-200">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                        </svg>

                                        {/* <img alt='product image' src={URL.createObjectURL(file)} className='mx-auto h-36' /> */}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Dynamic Input  */}
                <div className='grid items-start grid-cols-1 gap-3 md:grid-cols-2'>

                    {/* Details  */}
                    <div className='grid items-end gap-2'>
                        <h1 className='p-2 text-center bg-slate-200 rounded-lg'>More Informations</h1>
                        {formValues.map((element, index) => (

                            <div key={index} className='grid items-end gap-2 grid-cols-9'>

                                <div className='col-span-4'>
                                    <label htmlFor="title" className="block mb-2 text-xs font-medium text-gray-900">Title</label>
                                    <input
                                        type="text" name="title" id="title"
                                        placeholder="Enter detail"
                                        required
                                        className="bg-gray-50 border p-2 border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-red-600 focus:border-red-600 block w-full  "
                                        onChange={(e) => handleChange(element.id, e)}
                                        value={element.title || ""}
                                    />
                                </div>
                                <div className='col-span-4'>
                                    <label htmlFor="specification" className="block mb-2 text-xs font-medium text-gray-900">Description</label>
                                    <input
                                        type="text" name="specification" id="specification"
                                        placeholder="Enter description"
                                        required
                                        className="bg-gray-50 border p-2 border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-red-600 focus:border-red-600 block w-full  "
                                        onChange={(e) => handleChange(element.id, e)}
                                        value={element.specification || ""}
                                    />
                                </div>

                                <div className='col-span-1'>
                                    {formValues.length != 1 && (
                                        <button type="button" className="flex items-end" onClick={() => removeFormFields(element.id)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mb-2 ml-2 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>
                                    )}
                                </div>
                            </div>

                        ))}
                        <div>
                            <button className="w-auto px-4 py-2 text-xs text-center text-white bg-black rounded-lg hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-gray-300 sm:w-auto" type="button" onClick={addFormFields}>Add</button>
                        </div>
                    </div>

                    {/* Specifications  */}
                    <div className='grid items-end gap-2'>
                        <h1 className='p-2 text-center bg-slate-200 rounded-lg'>Product Specifications</h1>
                        {moreInfos.map((element, index) => (
                            <div className='grid items-end grid-cols-10' key={index}>
                                <div className='grid grid-cols-2 col-span-9 gap-2'>
                                    <div>
                                        <label htmlFor="title" className="block mb-2 text-xs font-medium text-gray-900">Title</label>
                                        <input type="text" name="title" id="title" placeholder="Enter title" required
                                            className="bg-gray-50 border p-2 border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-red-600 focus:border-red-600 block w-full  "
                                            value={element.title || ""}
                                            onChange={(e) => handleMoreinfo(element.id, e)}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="description" className="block mb-2 text-xs font-medium text-gray-900">Specification</label>
                                        <input type="text" name="description" id="description" placeholder="Enter specification" required
                                            className="bg-gray-50 border p-2 border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-red-600 focus:border-red-600 block w-full  "
                                            value={element.description || ""}
                                            onChange={(e) => handleMoreinfo(element.id, e)}
                                        />
                                    </div>
                                </div>
                                <div className='col-span-1'>
                                    {moreInfos.length != 1 && (
                                        <button type="button" className="flex items-end" onClick={() => removeMoreinfo(element.id)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mb-2 ml-2 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                        <div>
                            <button className="w-auto px-4 py-2 text-xs text-center text-white bg-black rounded-lg hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-gray-300 sm:w-auto" type="button" onClick={addMoreinfo}>Add</button>
                        </div>
                    </div>

                </div>
                <div className='flex items-center justify-between gap-2 p-4 mt-2 bg-gray-200 rounded-lg'>
                    <div className='flex items-center justify-self-end gap-2'>
                        <button onClick={() => setEnabled(!enabled)} className="w-auto px-4 py-2 text-xs text-center bg-white text-black ring-2 ring-black hover:ring-red-600 rounded-lg hover:bg-red-600 hover:text-white focus:ring-4 focus:outline-none focus:ring-gray-300 sm:w-auto" type='button'>Add Related Products</button>
                    </div>
                    <div className='flex items-center justify-self-end gap-2'>
                        <button className="w-auto px-4 py-2 text-xs text-center text-white bg-red-600 rounded-lg hover:bg-black focus:ring-4 focus:outline-none focus:ring-gray-300 sm:w-auto" type='button'>Cancel</button>
                        <button className="w-auto px-4 py-2 text-xs text-center text-white bg-black rounded-lg hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-gray-300 sm:w-auto" type='submit'>Submit</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export function AddProduct() {
    return (
        <AdminLayout>
            <Add />
        </AdminLayout>
    )
}
type PProps = {
    product: any;
    add: any;
    isItemSelected: boolean;
}
export function ProductCard(props: PProps) {

    const { product, add, isItemSelected } = props
    const router = useRouter()

    return (
        <div className="bg-white shadow-md border border-gray-200 rounded-lg">
            <button onClick={() => router.push(`/product/${product._id}`)} className='relative h-40 w-full'>
                <Image className="rounded-t-lg h-40 w-full"
                    fill
                    src={product.images[0]}
                    alt="image of product"
                />
            </button>
            <div className="h-[15vh] grid grid-cols-1 gap-2 content-between">
                <div className='p-2'>
                    <Link href={`/product/${product._id}`}
                        className="text-gray-900 font-semibold text-xs tracking-tight">{product.name.substring(0, 40)}...
                    </Link>
                </div>
                <div className={classNames(
                    isItemSelected ? "bg-green-500" : "",
                    'px-2 py-1 bg-sky-600 hover:bg-green-500 rounded-b-md'
                )}>
                    <input onChange={add} checked={isItemSelected} id="checkbox" type="checkbox" className={classNames(isItemSelected ? "text-green-500" : "",
                        "cursor-pointer w-4 h-4 text-sky-600 bg-gray-100 focus:outline-none focus:border-0 rounded border-gray-300 focus:ring-0 ring-2"
                    )}
                    />
                    <label htmlFor="checkbox" className="sr-only">checkbox</label>
                </div>
            </div>
        </div>
    )
}
