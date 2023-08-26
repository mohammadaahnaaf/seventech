import React, { useState } from 'react'
import { useRouter } from 'next/router';
import { ErrorText } from '@seventech/shared';
import { Tab } from '@headlessui/react'
import Privacy from './Privacy';
import Terms from './Terms';
import About from './About';
import Image from 'next/image';
import { axiosAPI, axiosRoot, classNames, isServer } from '@seventech/utils';
import { AdminLayout } from '@seventech/layouts';

function Setting() {

  const router = useRouter();
  const [files, setFiles] = useState<any[]>([]);
  const [error, setError] = useState<string>('')
  const [banners, setBanners] = useState<any[]>([])
  const [success, setSuccess] = useState<string>('')

  // get images data 
  React.useEffect(() => {
    async function getBanners() {
      const res = await axiosRoot.get('/banner');
      setBanners(res.data)
    }
    getBanners()
  }, [success]);

  // Delete Banner
  async function handleDelete(id: any) {
    await axiosAPI.delete(`/banner/${id}`);
    setSuccess('Banner Vanished')
  }

  // submit form data
  const handleSubmit = async (event: any) => {

    try {
      event.preventDefault()
      const data = new FormData(event.currentTarget);
      data.delete('file-upload')

      Array.from(files).forEach(file => {
        data.append('images', file)
      })

      await axiosAPI.post('/banner', data);
      router.reload()
    } catch (error: any) {

      console.log(error)
      setError(error.response?.data?.message)
    }
  }

  // select images 
  const handleSelectImage = (e: any) => {

    let file = e.target.files;
    const selectedFilesArray = Array.from(file);

    const imagesArray = selectedFilesArray.map((file) => {
      return file;
    });

    setFiles((previousImages: any) => previousImages.concat(imagesArray));
  };

  //remove image
  const removeImage = (i: any) => {
    setFiles(files.filter((x: any) => x.name !== i));
  }

  // handle image upload 
  // const handleSelectImage = (e) => {
  //   let file = e.target.files;

  //   for (let i = 0; i < file.length; i++) {
  //     const fileType = file[i]['type'];
  //     const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
  //     if (validImageTypes.includes(fileType)) {
  //       setFile([...files, file[i]]);
  //     } else {
  //       setError("only images accepted");
  //     }
  //   }
  // };

  return (
    <div className='pt-6 rounded-b-lg'>
      {error && (
        <ErrorText error={error} />
      )}
      <form onSubmit={handleSubmit}>
        {/* Upload banners  */}
        <div className="shadow rounded-lg">

          <div className="px-4 py-5 bg-red-600 sm:p-6">

            {/* Upload Input  */}
            <div>
              <label className="block text-sm font-medium text-gray-100">Upload Photos</label>
              <div className="flex justify-center px-6 pt-5 pb-6 mt-1 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">

                  <div className="flex items-center text-sm text-gray-100">
                    <label
                      htmlFor="file-upload"
                      className="relative p-1 font-medium text-gray-200 mx-auto cursor-pointer hover:text--500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-gray-300"
                    >
                      <svg
                        className="w-12 h-12 mx-auto text-gray-100 hover:text-white"
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
                      <span>Upload A New Banner</span>
                      <input multiple id="file-upload" name="file-upload"
                        type="file"
                        className="sr-only"
                        onChange={handleSelectImage}
                      />
                    </label>
                  </div>
                  {/* <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p> */}
                </div>
              </div>
            </div>
          </div>

          {/* Banners Images Previews */}
          <div className='grid p-4 bg-black'>
            <div className='grid grid-cols-2 w-full gap-2'>
              {files?.map((file: any, index: number) =>
                <div key={index} className='h-36 rounded-lg ring-1 ring-gray-300 hover:opacity-70 cursor-pointer relative'>
                  <div className="absolute m-1 z-10 grid items-center justify-items-center top-0 right-0 h-8 w-8 text-white rounded-lg bg-red-600 bg-opacity-25 hover:bg-opacity-50">
                    <button type='button'
                      onClick={() => removeImage(file.name)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z" clipRule="evenodd" />
                      </svg>                    </button>
                  </div>
                  <div className='h-36 w-auto relative'>
                    <Image alt='product image' src={URL.createObjectURL(file)} fill className='h-36 mx-auto' />
                  </div>
                </div>
              )}
            </div>
            {files.length === 0 && (
              <div className='grid grid-cols-2 w-full gap-2 md:gap-3'>
                {banners?.map((item: any, index: number) =>
                  <>
                    {item.images.map((image: any) =>
                      <div key={index} className='h-36 ring-2 ring-red-600 hover:opacity-70 cursor-pointer relative'>
                        <div className="absolute m-1 z-10 grid items-center justify-items-center top-0 right-0 h-8 w-8 text-white rounded-lg bg-red-600 bg-opacity-25 hover:bg-opacity-50">
                          <button type='button'
                            onClick={() => handleDelete(item._id)}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="text-[red] w-6 h-6">
                              <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z" clipRule="evenodd" />
                            </svg>                          </button>
                        </div>
                        <div className='h-36 mx-auto w-auto'>
                          <Image layout='fill' alt='product image' src={image} className='h-36 mx-auto object-cover' />
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            )}
          </div>

          <div className="px-4 py-3 bg-white rounded-b-lg text-right sm:px-6">
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600"
            >
              Save
            </button>
          </div>
        </div>
      </form>

    </div>
  )
}


export function AdminSettings() {

  const [tab, setTab] = React.useState<string>('banner')
  const [view, setView] = React.useState<boolean>(false)
  const tabs = [
    {
      value: 'banner',
      name: 'Banner',
    },
    {
      value: 'about',
      name: 'About Us',
    },
    {
      value: 'terms',
      name: 'Terms And Conditions',
    },
    {
      value: 'privacy',
      name: 'Privacy Policy',
    },
  ]

  React.useEffect(() => {
    setView(true)
  }, [])

  if (isServer()) {
    return null
  }
  return view ? (
    <AdminLayout>
      <div className="max-w-6xl rounded-lg my-6 bg-white w-full mx-auto pt-6">
        <Tab.Group>
          <Tab.List className="grid lg:flex border-y-2 border-y-red-600">

            {tabs.map((item, index) => (
              <Tab
                key={item.value}

                className={({ selected }) =>
                  classNames(
                    index === 3 ? "" : "border-r-2",
                    'w-full py-2.5 text-sm font-medium leading-5 text-red-600 border-red-600 hover:border-white',
                    'focus:outline-none focus:ring-0',
                    selected
                      ? 'bg-red-600 shadow text-white border-white'
                      : 'hover:bg-red-600 border-red-600 hover:text-white'
                  )
                }
              >
                <button type='button' onClick={() => setTab(item.value)}>
                  {item.name}
                </button>
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels>

            <Tab.Panel>
              <Setting />
            </Tab.Panel>

            <Tab.Panel>
              <About />
            </Tab.Panel>

            <Tab.Panel>
              <Terms />
            </Tab.Panel>

            <Tab.Panel>
              <Privacy />
            </Tab.Panel>

          </Tab.Panels>
        </Tab.Group>
      </div>
    </AdminLayout>
  ) : null
}
