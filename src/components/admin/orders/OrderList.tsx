import React from 'react'
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Pagenation, SearchBar, SuccessText } from '@seventech/shared';
import { useDebounce } from 'use-debounce';
import { axiosAPI, fDate, fDnT, useUniqueId } from '@seventech/utils';
import { AdminLayout } from '@seventech/layouts';

export function Order() {

  const router = useRouter()
  const [searchTerm, setSearchTerm] = React.useState<string>('')
  const [selected, setSelected] = React.useState<any[]>([]);
  const [allSelected, setAllSelected] = React.useState(false)
  const [orders, setOrders] = React.useState([]);
  const [success, setSuccess] = React.useState('')
  const [pageSize, setPageSize] = React.useState(10)
  const [page, setPage] = React.useState(0)
  const [total, setTotal] = React.useState(0)

  const [searchedName] = useDebounce(searchTerm, 400);

  //Get Data
  React.useEffect(() => {
    async function getOrder() {
      try {
        const res = await axiosAPI.get(`/orders?page=${page + 1}&size=${pageSize}&searchQuery=${searchedName}`);
        setOrders(res.data.orders)
        setTotal(res.data.count)
      } catch (err: any) {
        console.log(err)
      }
    }
    getOrder()
  }, [success, page, pageSize, searchedName]);

  function handleAllChecked(event: any) {
    // !checkedAll ? setCheckedAll(true) : setCheckedAll(false)
    if (event.target.checked) {
      const newSelecteds = orders.map((n: any) => n._id);
      setSelected(newSelecteds);
      setAllSelected(true)
      return;
    }
    setSelected([]);
    setAllSelected(false)
    // console.log(selected)
  }

  const handleChecked = (event: any, name: any) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: React.SetStateAction<any[]> = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const isSelected = (name: any) => selected.indexOf(name) !== -1 || allSelected;

  // delete category 
  function handleDelete() {
    selected.map((item) =>
      axiosAPI.delete(`/orders/${item}`)
    )
    setSuccess('Order vanished')
    setTimeout(() => { setSuccess('') }, 2000)
  }

  // const slugs = ['customer_name', 'customer_number', 'createdAt', 'total', '_id', 'status']

  // const search = (data) => {
  //   return data.filter((item) =>
  //     slugs.some((key) => (typeof item[key] === 'string' ? item[key].toLowerCase() : '').includes(searchTerm))
  //   )
  // }

  const digify = useUniqueId();

  return (
    <>
      {success && (
        <SuccessText success={success} />
      )}
      {/* <ErrorText error={error} /> */}
      <div className="mx-3 mt-3 bg-gray-100 overflow-x-auto relative shadow-md sm:rounded-lg">
        <div className='flex justify-center w-full py-1 bg-sky-600'>
          <div className='md:w-1/3 bg-white bg-opacity-50 rounded-full'>
            <SearchBar searchButton={true} setSearchTerm={setSearchTerm} />
          </div>
        </div>
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="p-4">
                <div className="flex items-center">
                  <input id="checkbox-all-search" onChange={handleAllChecked} type="checkbox" className="cursor-pointer w-4 h-4 text-red-600 bg-gray-100 rounded border-gray-300 focus:ring-red-500 focus:ring-2" />
                  <label htmlFor="checkbox-all-search" className="sr-only">checkbox</label>
                </div>
              </th>
              <th scope="col" className="py-3 px-6">
                Order ID
              </th>
              <th scope="col" className="py-3 px-6">
                Customer name
              </th>
              <th scope="col" className="py-3 px-6">
                Phone
              </th>
              <th scope="col" className="py-3 px-6">
                Date
              </th>
              <th scope="col" className="py-3 px-6">
                Status
              </th>
              <th scope="col" className="py-3 px-6">
                Price
              </th>
              <th scope="col" className="py-3 px-6">
                {selected.length !== 0 && (
                  <button type='button' onClick={handleDelete}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                      <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z" clipRule="evenodd" />
                    </svg>
                  </button>
                )}
                <span className="sr-only">Edit</span>
                {/* Action */}
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order: any, index: number) => {
              const isItemSelected = isSelected(order._id);
              return (
                <tr key={index} className="bg-white border-b hover:bg-gray-50">
                  <td className="p-4 w-4">
                    <div className="flex items-center">
                      <input onChange={(event) => handleChecked(event, order._id)} checked={isItemSelected} id="checkbox" type="checkbox" className="cursor-pointer w-4 h-4 text-red-600 bg-gray-100 rounded border-gray-300 focus:ring-red-500 focus:ring-2" />
                      <label htmlFor="checkbox" className="sr-only">checkbox</label>
                    </div>
                  </td>
                  <td scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">
                    #STE{fDnT(order.createdAt)}
                  </td>
                  <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">
                    {order.customer_name}
                  </th>
                  <td className="py-4 px-6 hover:text-red-600">
                    <Link href={"tel:" + order.customer_number}>
                      {order.customer_number}
                    </Link>
                  </td>
                  <td className="py-4 px-6">
                    {fDate(order.createdAt)}
                  </td>
                  <td className="capitalize py-4 px-6">
                    {order.status || 0}
                  </td>
                  <td className="py-4 px-6">
                    ৳ {order.total}
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button
                      type='button'
                      className="font-medium hover:text-red-600 text-gray-400 hover:underline"
                      onClick={() => router.push(`/admin/orders/${order._id}`)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
                        <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
                      </svg>

                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        <Pagenation total={total} page={page} setPage={setPage} pageSize={pageSize} setPageSize={setPageSize} />
      </div>
    </>
  )
}

export function OrderList() {
  return (
    <AdminLayout>
      <Order />
    </AdminLayout>
  )
}