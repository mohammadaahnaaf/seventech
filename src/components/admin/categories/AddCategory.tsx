import React from 'react'
import { v4 as uuidv4 } from 'uuid';
import { ErrorText } from '@seventech/shared';
import { useRouter } from 'next/router';
import { axiosAPI } from '@seventech/utils';
import { AdminLayout } from '@seventech/layouts';
import { Switch } from '@headlessui/react';

function Add() {

  const [formValues, setFormValues] = React.useState([{ id: uuidv4(), names: "" }])
  const [active, setActive] = React.useState(false)
  const [error, setError] = React.useState('')
  const [isLoading, setIsLoading] = React.useState(false)
  const [indexing, setIndexing] = React.useState(0)
  const [featured, setFeatured] = React.useState(false)
  const router = useRouter()

  // submit form data
  const handleSubmit = async (event: any) => {

    try {
      event.preventDefault()

      const data = new FormData(event.currentTarget);

      const reqData = {
        name: data.get('categoryName'),
        tagline: data.get('tagline'),
        isFeatured: featured,
        // show: active,
        index: +indexing,
        subCategories: formValues.map(value => (
          {
            name: value.names,
          }
        ))
      }
      setIsLoading(true)
      await axiosAPI.post('/categories', reqData);
      router.push('/admin/category')

    } catch (error: any) {
      setIsLoading(false);
      console.log(error)
      setError(error.response?.data?.message)
    }
  }

  const handleChange = (id: string, event: any) => {
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
      names: ''
    }])
  };

  const removeFormFields = (id: string) => {
    const values = [...formValues];
    values.splice(values.findIndex(value => value.id === id), 1);
    setFormValues(values);
  }

  // Featured? 
  const handleFeature = () => {
    if (featured === false) {
      setFeatured(true)
    } else {
      setFeatured(false)
    }
  }

  return (
    <>
      {error && (<ErrorText error={error} />)}

      {/* <SuccessText success={success} /> */}

      <div className='p-5 min-h-screen bg-white rounded-lg m-3'>
        {isLoading && (
          <div className="p-3 my-2 text-sm text-red-700 bg-yellow-100 rounded-lg" role="alert">
            <span className="font-medium">Loading!</span> Category is adding.
          </div>
        )}
        <form onSubmit={handleSubmit}>
        
          <div className='relative py-3 flex items-center justify-center mb-5 text-center bg-gray-200 rounded-lg'>
            <Switch
              checked={active}
              onChange={setActive}
              className={`${active ? 'bg-green-400' : 'bg-red-600'}
                     absolute right-2 inline-flex h-[28px] w-[64px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
            >
              <span className="sr-only">Avtive</span>
              <span
                aria-hidden="true"
                className={`${active ? 'translate-x-7' : 'translate-x-0'}
                        pointer-events-none z-10 inline-block h-[24px] w-[24px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
              />
            </Switch>
            <h1 className='text-2xl text-center bg-gray-200'>Add Category</h1>
          </div>
          
          <div className="grid gap-2 max-w-4xl mx-auto bg-gray-100 shadow rounded-lg ring-2 ring-gray-300 mb-6">
            {featured && (
              <>
                <div className='w-full px-4 pt-2'>
                  <label htmlFor="tagline" className="block my-2 text-xs font-medium text-gray-900">Tagline</label>
                  <input type="text" name='tagline' id="tagline" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5" placeholder="Category Title" />
                </div>

                <div className='w-full px-4 pt-2'>
                  <label htmlFor="indexing" className="block my-2 text-xs font-medium text-gray-900">Index</label>
                  <select id="indexing" onChange={(e: any) => setIndexing(e.target.value)} value={indexing || ""} name='indexing' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-600 focus:border-red-600 block w-full p-2.5" placeholder="Category Index">
                    <option value='1'>1st</option>
                    <option value='2'>2nd</option>
                    <option value='3'>3rd</option>
                    <option value='4'>4th</option>
                    <option value='5'>5th</option>
                  </select>
                </div>
              </>
            )}
            <div className='w-full px-4'>
              <label htmlFor="categoryName" className="block my-2 text-xs font-medium text-gray-900">Category name</label>
              <input type="text" name='categoryName' id="categoryName" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5" placeholder="Category Name" required />
            </div>

            <div className='px-4 grid items-center w-full gap-2'>

              {formValues.map((value, index) => (
                <div className='flex w-full' key={index}>
                  <div className='min-w-[96%]'>
                    <label htmlFor="names" className="block mb-2 text-xs text-gray-900">childs</label>
                    <input
                      type="text" name="names" id="names" value={value.names || ""}
                      onChange={(e) => handleChange(value.id, e)}
                      className="bg-gray-50 w-full border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-red-500 focus:border-red-500 block p-2.5" placeholder="Enter a subcategory" required />
                  </div>
                  {formValues.length != 1 ? (
                    <button type="button" className="col-span-1 items-end flex" onClick={() => removeFormFields(value.id)}>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-2 mb-2 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  ) : (
                    <button type="button" className="col-span-1 items-end flex cursor-not-allowed">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-2 mb-2 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  )}
                </div>
              ))}
              <div>
                <button className="w-auto text-white bg-black hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-lg text-xs sm:w-auto px-4 py-2 text-center" type="button" onClick={addFormFields}>Add Child</button>
              </div>
            </div>

            <div className='py-2 px-4 border-t-2 border-t-gray-300 rounded-b-lg mt-2 bg-gray-300 flex justify-end'>
              <div className='flex gap-2 w-full'>
                <div className=''>
                  <input id="bordered-checkbox-1" type="checkbox" onClick={handleFeature} checked={featured} name="bordered-checkbox" className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-600" />
                  <label htmlFor="bordered-checkbox-1" className="py-2.5 ml-2 w-full text-sm font-medium text-gray-900">Featured on home</label>
                </div>
                {/* <div className=''>
                <label htmlFor="indexing" className="block mb-2 text-xs text-gray-900">Index</label>
                <input id="indexing" type="number" onClick={(e) => setIndexing(e.target.value)} value={indexing} name="indexing" className="text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-600" />
              </div> */}
              </div>
              <button type='submit' className='rounded-lg hover:bg-red-600 bg-black text-xs text-white px-4 py-2'>Done</button>

            </div>
          </div>
        </form>
      </div>
    </>
  )
}

export function AddCategory() {
  return (
    <AdminLayout>
      <Add />
    </AdminLayout>
  )
}