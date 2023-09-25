import React, { Fragment } from 'react'
import { useRouter } from 'next/router';
import { TagsInput } from 'react-tag-input-component';
import { Dialog, Switch, Transition } from '@headlessui/react';
import { ProductCard } from './AddProduct';
import { ErrorText, Pagenation, SearchBar, SuccessText } from '@seventech/shared';
import { useDebounce } from 'use-debounce';
import { axiosAPI, axiosRoot, fDateTime } from '@seventech/utils';
import Image from 'next/image';
import { AdminLayout } from '@seventech/layouts';

const Detail = () => {

  const router = useRouter()
  const itemId = router.query.id

  const [products, setProducts] = React.useState([]);
  const [cats, setCats] = React.useState([]);
  const [subCats, setSubCats] = React.useState([]);
  const [tags, setTags] = React.useState<string[]>([]);
  const [images, setImages] = React.useState([]);
  const [files, setFiles] = React.useState<any[]>([]);
  const [relatedProducts, setRelatedProducts] = React.useState<any[]>([]);

  const [isFeatured, setIsFeatured] = React.useState<boolean>(false)
  const [active, setActive] = React.useState(false)
  const [enabled, setEnabled] = React.useState(false)
  const [error, setError] = React.useState('')
  const [success, setSuccess] = React.useState('')
  const [searchTerm, setSearchTerm] = React.useState('')
  const [pageSize, setPageSize] = React.useState(10)
  const [page, setPage] = React.useState(0)
  const [total, setTotal] = React.useState(0);

  const [details, setDetails] = React.useState<any>(
    {
      _id: '',
      name: '',
      category: '',
      subCategory: '',
      imageAlt: '',
      specifications: '',
      code: '',
      quantity: '',
      price: "",
    }
  );

  const [formValues, setFormValues] = React.useState([
    {
      _id: '',
      title: ""
    }
  ]);

  const [moreInfos, setMoreInfo] = React.useState([
    {
      _id: '',
      title: "",
      description: ''
    }
  ]);

  const [reviews, setReviews] = React.useState([
    {
      _id: "",
      userName: "",
      comment: "",
      date: ''
    }
  ]);


  // get category options
  React.useEffect(() => {
    async function getCategory() {
      const res = await axiosRoot.get('/categories');
      setCats(res.data.categories)
    }
    function setSubCategory() {
      cats.map((x: any) => {
        if (x.name === details.category) {
          setSubCats(x.subCategories)
        }
      });
    }
    getCategory()
    details && setSubCategory()
  }, [cats, details]);


  // get data 
  React.useEffect(() => {

    async function getProduct() {
      const res = await axiosAPI.get(`/products/${itemId}`);
      setDetails(res.data)
      setTags(res.data.tags)
      setActive(res.data.inStock)
      setReviews(res.data.reviews)
      setIsFeatured(res.data.isFeatured)
      setFormValues(res.data.details)
      setMoreInfo(res.data.information)
      setImages(res.data.images)
      let related = res.data.relatedProducts.map((x: any) => x._id)
      setRelatedProducts(related)
      // setRelatedProducts(res.data.relatedProducts)
    }

    itemId && getProduct()

  }, [itemId, success]);


  // submit edit 
  async function handleSubmit(event: any) {

    try {
      event.preventDefault()
      const data = new FormData(event.currentTarget);

      data.delete('bordered-checkbox')
      data.delete('file-upload')
      data.delete('detail')
      data.delete('title')
      data.delete('description')
      data.set('tags', JSON.stringify(tags))
      data.set('relatedProducts', JSON.stringify(relatedProducts))
      data.set('isFeatured', String(isFeatured))
      data.set('inStock', String(active))

      Array.from(files).forEach(file => {
        data.append('images', file)
      })
      const formDataObj: any = {};
      data.forEach((value: any, key: any) => (formDataObj[key] = value));
      console.log('edit data', formDataObj)

      await axiosAPI.put(`/products/${itemId}`, data);
      setSuccess('Product Updated.')
      setTimeout(() => {
        setSuccess('')
      }, 2000)
    } catch (error: any) {

      console.log(error)
      setError(error.response?.data?.message)
    }
  }

  // upload images 
  const handleSelectImage = (e: any) => {
    let file: any = e.target.files;

    for (let i: number = 0; i < file.length; i++) {
      const fileType: any = file[i]['type'];
      const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];

      if (validImageTypes.includes(fileType)) {
        setFiles([...files, file[i]]);
        setImages([])
      } else {
        setError("only images accepted");
      }
    }
  };

  // remove uploaded image 
  const removeImage = (i: any) => {
    setFiles(files.filter(x => x.name !== i));
  }

  // handle edit product 
  const handleAllChange = (event: any) => {
    const { name, value } = event.target;
    setDetails((prevState: any) => ({
      ...prevState,
      [name]: value
    }));
  }

  // Product Details 
  const handleChange = (id: any, event: any) => {
    const newInputFields = formValues.map((i: any) => {
      if (id === i.id) {
        i[event.target.name] = event.target.value
      }
      return i;
    })

    setFormValues(newInputFields);
  };

  const [newDetails, setNewDetails] = React.useState({
    _id: '',
    title: '',
    description: ''
  })

  // Submit More Info 
  async function addFormFields() {
    const reqDetailsData = {
      title: newDetails.title,
      description: newDetails.description
    }
    await axiosAPI.post(`/products/${itemId}/details`, reqDetailsData);
    setSuccess('Product details added.')
    setTimeout(() => { setSuccess('') }, 2000)
  };

  function removeFormFields(id: any) {
    axiosAPI.delete(`/products/${itemId}/details/${id}`);

    const values = [...formValues];
    values.splice(values.findIndex((value) => value._id === id), 1);
    setFormValues(values);

    setSuccess('Product details vanished.')
    setTimeout(() => { setSuccess('') }, 2000)
  }

  // Product Reviews 
  const handleReview = (id: any, event: any) => {
    const newInputFields = reviews.map((i: any) => {
      if (id === i._id) {
        i[event.target.name] = event.target.value
      }
      return i;
    })

    setReviews(newInputFields);
  };

  function removeReview(id: any) {
    axiosAPI.delete(`/products/${itemId}/review/${id}`);

    const values = [...reviews];
    values.splice(values.findIndex(value => value._id === id), 1);
    setReviews(values);

    setSuccess('Product review vanished.')
    setTimeout(() => { setSuccess('') }, 2000)
  }

  // More Information 
  const handleMoreinfo = (id: any, event: any) => {
    const newInputFields = moreInfos.map((i: any) => {
      if (id === i._id) {
        i[event.target.name] = event.target.value
      }
      return i;
    })

    setMoreInfo(newInputFields);
  };

  const [newMoreinfo, setNewMoreinfo] = React.useState({
    _id: '',
    title: '',
    description: ''
  })

  const handleNewMoreinfo = (event: any) => {
    const { name, value } = event.target;
    setNewMoreinfo((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const handleNewDetails = (event: any) => {
    const { name, value } = event.target;
    setNewDetails((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  // submit specifications 
  async function addMoreinfo() {
    const reqInfoData = {
      title: newMoreinfo.title,
      description: newMoreinfo.description
    }
    await axiosAPI.post(`/products/${itemId}/information`, reqInfoData);
    setSuccess('Product information added.')
    setTimeout(() => { setSuccess('') }, 2000)
  };

  function removeMoreinfo(id: any) {
    axiosAPI.delete(`/products/${itemId}/information/${id}`);

    const values = [...moreInfos];
    values.splice(values.findIndex(value => value._id === id), 1);
    setMoreInfo(values);
    setSuccess('Product information vanished.')
    setTimeout(() => { setSuccess('') }, 2000)
  }

  function closeModal() {
    setEnabled(false)
  }

  const [searchedName] = useDebounce(searchTerm, 400);

  // get product data 
  React.useEffect(() => {
    async function getProducts() {
      const res = await axiosRoot.get(`/products?page=${page + 1}&size=${pageSize}&searchQuery=${searchedName}`);
      setProducts(res.data.products)
      setTotal(res.data.count)
    }
    getProducts()
  }, [router, searchedName, page, pageSize, success]);

  // handle related products 
  function handleAdd(product: any) {
    const selectedIndex = relatedProducts.indexOf(product._id);
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
                  className="text-lg text-center font-medium leading-6 text-gray-900"
                >
                  Add Related Products
                </Dialog.Title>
                <div className="mt-2">
                  <div className='my-2 rounded-full bg-gray-200'>
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

                <div className="mt-4 flex justify-end">
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

  return (
    <div className='grid p-5 bg-white rounded-lg grid-cols-1 gap-3 justify-around mx-3 my-3'>
      {success && (<SuccessText success={success} />)}
      {error && (<ErrorText error={error} />)}

      {related}
      <div className='relative py-3 flex items-center justify-center mb-5 text-center bg-gray-200 rounded-lg'>

        <Switch
          checked={active}
          onChange={setActive}
          className={`${active ? 'bg-green-300' : 'bg-red-600'}
            absolute right-2 inline-flex h-[28px] w-[64px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
        >
          <span className="sr-only">Use setting</span>
          <span
            aria-hidden="true"
            className={`${active ? 'translate-x-7' : 'translate-x-0'}
              pointer-events-none z-10 inline-block h-[24px] w-[24px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
          />
        </Switch>
        <h1 className='text-2xl text-center bg-gray-200'>Edit Product</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="grid gap-3 mb-6 lg:grid-cols-2">

          {/* Product Informations  */}
          <div>
            <div>
              <label htmlFor="name" className="block mb-1 text-sm font-medium text-gray-900">Product name</label>
              <input type="text" onChange={(event) => handleAllChange(event)} value={details.name || ""} id="name" name='name' className="bg-gray-50 p-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-600 focus:border-red-600 block w-full" placeholder="" required />
            </div>

            <div className='grid grid-cols-2 gap-3'>

              <div>
                <label htmlFor="category" className="block mb-1 text-sm font-medium text-gray-900">Category</label>
                <select id="category" name='category'
                  onChange={(event) => handleAllChange(event)} value={details.category || ""}
                  className="bg-gray-50 border p-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-600 focus:border-red-600 block w-full" placeholder="" required>
                  {cats.map((cat: any, index: number) =>
                    <option key={index}>{cat.name}</option>
                  )}
                </select>
              </div>

              <div>
                <label htmlFor="subCategory" className="block mb-1 text-sm font-medium text-gray-900">Subcategory</label>
                <select id="subCategory" value={details.subCategory || ''} onChange={(event) => handleAllChange(event)} name='subCategory' className="bg-gray-50 p-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-600 focus:border-red-600 block w-full" placeholder="Subcategory">
                  {subCats?.map((sub: any, index: number) =>
                    <option key={index} value={sub.name}>{sub.name}</option>
                  )}
                </select>
              </div>
            </div>

            <div className='grid grid-cols-2 gap-3'>
              <div>
                <label htmlFor="code" className="block mb-1 text-sm font-medium text-gray-900 ">Product code</label>
                <input type="text" onChange={(event) => handleAllChange(event)} value={details.code || ""} name="code" id="code" className="bg-gray-50 p-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-600 focus:border-red-600 block w-full" placeholder="" />
              </div>
              <div>
                <label htmlFor="quantity" className="block mb-1 text-sm font-medium text-gray-900">Quantity</label>
                <input type="number" onChange={(event) => handleAllChange(event)} value={details.quantity || ""} name="quantity" id="quantity" className="bg-gray-50 p-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-600 focus:border-red-600 block w-full" placeholder="" />
              </div>
            </div>

            <div>
              <label htmlFor="imageAlt" className="block mb-1 text-sm font-medium text-gray-900 ">Brand</label>
              <input type="text" id="imageAlt" name="imageAlt" onChange={(event) => handleAllChange(event)} value={details.imageAlt || ""} className="bg-gray-50 border p-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-600 focus:border-red-600 block w-full" placeholder="Brand Name" />
            </div>
            <div>
              <label htmlFor="shortDescription" className="block mb-1 text-sm font-medium text-gray-900">Short Description</label>
              <textarea name='shortDescription' rows={3} onChange={(event) => handleAllChange(event)} value={details.shortDescription || ""} id="shortDescription" className="bg-gray-50 p-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-600 focus:border-red-600 block w-full" placeholder="enter specifications" />
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
            <div className="flex items-center pl-2.5 mt-1 rounded-lg border border-gray-300">
              <input id="bordered-checkbox-1" type="checkbox" onClick={() => isFeatured ? setIsFeatured(false) : setIsFeatured(true)} checked={isFeatured} name="bordered-checkbox" className="w-4 h-4 text-red-600 bg-gray-100 rounded border-gray-300 focus:ring-red-600" />
              <label htmlFor="bordered-checkbox-1" className="p-2 ml-2 w-full text-sm font-medium text-gray-900">Featured on home</label>
            </div>


            <div className='grid grid-cols-2 gap-3'>
              <div>
                <label htmlFor="regularPrice" className="block mb-1 text-sm font-medium text-gray-900">Regular Price</label>
                <input type="number" onChange={(event) => handleAllChange(event)} value={details.regularPrice || ""} name='regularPrice' placeholder='Regular price' id="regularPrice" className="p-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-600 focus:border-red-600 block w-full" />
              </div>
              <div>
                <label htmlFor="onlinePrice" className="block mb-1 text-sm font-medium text-gray-900">Online Price</label>
                <input type="number" onChange={(event) => handleAllChange(event)} value={details.onlinePrice || ""} name='onlinePrice' id="onlinePrice" placeholder='Online Price' className="bg-gray-50 p-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-600 focus:border-red-600 block w-full" required />
              </div>
            </div>
            <div className='grid grid-cols-2 gap-2 bg-teal-100 rounded-md px-2 mt-3 py-2'>
              <div>
                <label htmlFor="offerPrice" className="mb-1 text-sm font-medium text-gray-900">Special Price/ Offer</label>
                <input type="number" onChange={(event) => handleAllChange(event)} value={details.offerPrice || ""} name='offerPrice' id="offerPrice" placeholder='Special price' className="bg-gray-50 p-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-600 focus:border-red-600 block w-full" />
              </div>

              <div>
                <label htmlFor="offerEndDate" className="mb-1 text-sm font-medium text-gray-900">Offer Ends</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg aria-hidden="true" className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"></path></svg>
                  </div>

                  <input id='offerEndDate' onChange={(event) => handleAllChange(event)} value={details.offerEndDate || ""} name='offerEndDate' type="date" className="bg-gray-50 border p-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-600 focus:border-red-500 block w-full pl-10" placeholder="Select date" />
                </div>
              </div>
            </div>
          </div>

          {/* Upload product images  */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Upload Photos</label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
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
                    className="relative cursor-pointer font-medium p-1 rounded-md text-red-600 hover:text--500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-gray-300"
                  >
                    <span>Upload a file</span>
                    <input id="file-upload" name="file-upload"
                      onChange={handleSelectImage}
                      type="file"
                      className="sr-only"
                      multiple
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
              </div>
            </div>

            {/* Product images  */}
            <div className='grid mt-5 gap-2 grid-cols-2'>
              {images.map((item: any, index: number) => (

                <div key={index} className='h-36 rounded-lg ring-1 ring-gray-300 hover:opacity-70 cursor-pointer relative'>
                  <div className="absolute m-1 z-10 grid items-center justify-items-center top-0 right-0 h-8 w-8 text-[red] rounded-lg bg-red-600 bg-opacity-25 hover:bg-opacity-50">
                    <button type='button'
                      onClick={() => { removeImage(item.name) }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                  <div className='h-36 w-36 relative mx-auto'>
                    <Image fill alt='product image' src={`${item}`} className='h-36 mx-auto' />
                  </div>
                </div>

              ))}
              {files.map((item: any, index: number) => (

                <div key={index} className='h-36 rounded-lg ring-1 ring-gray-300 hover:opacity-70 cursor-pointer relative'>
                  <div className="absolute m-1 z-10 grid items-center justify-items-center top-0 right-0 h-8 w-8 text-white rounded-lg bg-red-600 bg-opacity-25 hover:bg-opacity-50">
                    <button type='button'
                      onClick={() => { removeImage(item.name) }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z" clipRule="evenodd" />
                      </svg>                    </button>
                  </div>
                  <div className='h-36 w-36 relative mx-auto'>
                    <Image fill alt='product image' src={URL.createObjectURL(item)} className='h-36 mx-auto' />
                  </div>
                </div>

              ))}

            </div>
          </div>

        </div>

        {/* Dynamic Input  */}
        <div className='grid grid-cols-1 lg:grid-cols-2 items-start gap-2'>

          {/* Product Details  */}
          {formValues && (
            <div className='grid col-span-2 lg:col-span-1 items-end gap-2'>
              <h1 className='p-2 text-center bg-slate-200 rounded-lg'>More Informations</h1>
              {formValues?.map((element: any, index: number) => (

                <div className='grid items-end grid-cols-10' key={index}>
                  <div className='grid grid-cols-2 col-span-9 gap-2'>
                    <div>
                      <label htmlFor="title" className="block mb-2 text-xs font-medium text-gray-900">Title</label>
                      <input type="text" name="title" id="title" value={element.title || ""} onChange={(e) => handleChange(element.id, e)} className="p-2 bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-red-600 focus:border-red-600 block w-full" placeholder="Enter title" />
                    </div>
                    <div>
                      <label htmlFor="description" className="block mb-2 text-xs font-medium text-gray-900">Details</label>
                      <input type="text" name="description" id="description" value={element.description || ""} onChange={(e) => handleChange(element.id, e)} className="p-2 bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-red-600 focus:border-red-600 block w-full" placeholder="Enter details" />
                    </div>
                  </div>
                  <div>
                    {formValues.length != 0 && (
                      <button type="button" className="items-center mb-1 ml-2 flex" onClick={() => removeFormFields(element._id)}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600 rounded-sm bg-red-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>
              ))}

              {/* add new details */}
              <div className='grid items-end grid-cols-10'>
                <div className='grid grid-cols-2 col-span-9 gap-2'>
                  <div>
                    <label htmlFor="title" className="block mb-2 text-xs font-medium text-gray-900">New Title</label>
                    <input type="text" name="title" id="title"
                      value={newDetails.title || ""}
                      onChange={(e) => handleNewDetails(e)}
                      className="bg-gray-50 p-2 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-red-600 focus:border-red-600 block w-full" placeholder="Enter title" />
                  </div>
                  <div>
                    <label htmlFor="description" className="block mb-2 text-xs font-medium text-gray-900">New Description</label>
                    <input type="text" name="description" id="description" value={newDetails.description || ""} onChange={(e) => handleNewDetails(e)} className="bg-gray-50 p-2 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-red-600 focus:border-red-600 block w-full" placeholder="Enter details" />
                  </div>
                </div>
                <div>
                  <button onClick={addFormFields} type="button" className="items-center flex ml-2 mb-1 text-green-600">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 bg-green-100">
                      <path fillRule="evenodd" d="M12 5.25a.75.75 0 01.75.75v5.25H18a.75.75 0 010 1.5h-5.25V18a.75.75 0 01-1.5 0v-5.25H6a.75.75 0 010-1.5h5.25V6a.75.75 0 01.75-.75z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Product Specifications  */}
          {moreInfos && (
            <div className='grid col-span-2 lg:col-span-1 items-end gap-2'>
              <h1 className='p-2 text-center bg-slate-200 rounded-lg'>Product Specifications</h1>
              {moreInfos?.map((element, index) => (
                <div className='grid items-end grid-cols-10' key={index}>
                  <div className='grid grid-cols-2 col-span-9 gap-2'>
                    <div>
                      <label htmlFor="title" className="block mb-2 text-xs font-medium text-gray-900">Title</label>
                      <input type="text" name="title" id="title" value={element.title || ""} onChange={(e) => handleMoreinfo(element._id, e)} className="bg-gray-50 p-2 border w-full border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-red-600 focus:border-red-600 block" placeholder="Enter details" />
                    </div>
                    <div>
                      <label htmlFor="description" className="block mb-2 text-xs font-medium text-gray-900">Description</label>
                      <input type="text" name="description" id="description" value={element.description || ""} onChange={(e) => handleMoreinfo(element._id, e)} className="p-2 bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-red-600 focus:border-red-600 block w-full" placeholder="Enter details" />
                    </div>

                  </div>
                  <div className='col-span-1'>
                    {moreInfos.length != 0 && (
                      <button type="button" className="items-center mb-1 ml-2 flex" onClick={() => removeMoreinfo(element._id)}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 bg-red-100 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>
              ))}

              {/* New More info Add  */}
              <div className='grid items-end grid-cols-10'>
                <div className='grid grid-cols-2 col-span-9 gap-2'>
                  <div>
                    <label htmlFor="title" className="block mb-2 text-xs font-medium text-gray-900">New Title</label>
                    <input type="text" name="title" id="title"
                      value={newMoreinfo.title || ""}
                      onChange={(e) => handleNewMoreinfo(e)}
                      className="bg-gray-50 border p-2 border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-red-600 focus:border-red-600 block w-full" placeholder="Enter title" />
                  </div>
                  <div>
                    <label htmlFor="description" className="block mb-2 text-xs font-medium text-gray-900">New Description</label>
                    <input type="text" name="description" id="description"
                      value={newMoreinfo.description || ""}
                      onChange={(e) => handleNewMoreinfo(e)}
                      className="bg-gray-50 border p-2 border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-red-600 focus:border-red-600 block w-full" placeholder="Enter description" />
                  </div>
                </div>
                <div className='col-span-1'>
                  <button onClick={addMoreinfo} type="button" className="items-center flex ml-2 mb-1 text-green-600">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 bg-green-100">
                      <path fillRule="evenodd" d="M12 5.25a.75.75 0 01.75.75v5.25H18a.75.75 0 010 1.5h-5.25V18a.75.75 0 01-1.5 0v-5.25H6a.75.75 0 010-1.5h5.25V6a.75.75 0 01.75-.75z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Reviews  */}
          {reviews && (
            <div className='grid items-end col-span-2 gap-2'>
              <h1 className='p-2 text-center bg-slate-200 rounded-lg'>Reviews</h1>
              {reviews?.map((element: any, index: number) => (
                <div className='grid grid-cols-12 items-end' key={index}>
                  <div className='grid grid-cols-4 col-span-11 gap-2'>
                    <div>
                      <label htmlFor="userName" className="block mb-2 text-xs font-medium text-gray-900">Reviewed by</label>
                      <input type="text" name="userName" id="userName" value={element.name || ""} onChange={(e) => handleReview(element._id, e)} className="bg-gray-50 p-2 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-red-600 focus:border-red-600 block w-full" placeholder="Enter details" />
                    </div>
                    <div>
                      <label htmlFor="date" className="block mb-2 text-xs font-medium text-gray-900">Reviewed At</label>
                      <input type="text" name="date" id="date" value={fDateTime(+element.date) || ""} readOnly className="bg-gray-50 p-2 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-red-600 focus:border-red-600 block w-full" placeholder="Enter details" />
                    </div>
                    <div>
                      <label htmlFor="rating" className="block mb-2 text-xs font-medium text-gray-900">Rating</label>
                      <input type="number" name="rating" id="rating" value={element.rating || ""} onChange={(e) => handleReview(element._id, e)} className="bg-gray-50 p-2 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-red-600 focus:border-red-600 block w-full" placeholder="Enter details" />
                    </div>
                    <div>
                      <label htmlFor="comment" className="block mb-2 text-xs font-medium text-gray-900">Comment</label>
                      <input type="text" name="comment" id="comment" value={element.comment || ""} onChange={(e) => handleReview(element._id, e)} className="bg-gray-50 p-2 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-red-600 focus:border-red-600 block w-full" placeholder="Enter details" />
                    </div>
                  </div>
                  <div>
                    {reviews.length > 0 && (
                      <button type="button" className="items-center ml-2 mb-1 flex" onClick={() => removeReview(element._id)}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 bg-red-100 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
        <div className='flex items-center justify-between gap-2 p-4 mt-2 bg-gray-200 rounded-lg'>
          <div className='flex items-center justify-self-end gap-2'>
            <button onClick={() => setEnabled(!enabled)} className="w-auto px-4 py-2 text-xs text-center bg-white text-black ring-2 ring-black hover:ring-red rounded-lg hover:bg-black hover:text-white focus:outline-none sm:w-auto" type='button'>Add Related Products</button>
            <button onClick={() => setRelatedProducts([])} className="w-auto px-4 py-2 text-xs text-center bg-white hover:text-white ring-2 ring-red-600 rounded-lg hover:bg-red-600 text-red-600 focus:outline-none sm:w-auto" type='button'>Clear All Related Products</button>
          </div>
          <div className='flex items-center justify-self-end gap-2'>
            <button onClick={() => router.back()} className="w-auto px-4 py-2 text-xs text-center text-white bg-red-600 rounded-lg hover:bg-black focus:ring-4 focus:outline-none focus:ring-gray-300 sm:w-auto" type='button'>Cancel</button>
            <button className="w-auto px-4 py-2 text-xs text-center text-white bg-black rounded-lg hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-gray-300 sm:w-auto" type='submit'>Submit</button>
          </div>
        </div>
      </form>
    </div>
  )
}

export function ProductsDetails() {
  return (
    <AdminLayout>
      <Detail />
    </AdminLayout>
  )
}