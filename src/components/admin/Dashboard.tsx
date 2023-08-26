import React from 'react'
import { useRouter } from 'next/router';
import Link from 'next/link';
import { AdminLayout } from '@seventech/layouts';
import { axiosAPI } from '..';
import { Order } from './orders';

function Dash() {

  const router = useRouter()
  const [datas, setDatas] = React.useState<any>({})

  React.useEffect(() => {
    async function getDashboard() {
      const res = await axiosAPI.get('/analytics');
      setDatas(res.data)
    }
    getDashboard()

  }, []);


  return (
    <div className='grid grid-cols-1 gap-3 justify-around mx-3 my-3 sm:grid-cols-2 lg:grid-cols-4'>
    
        <Card
          title='Total Products'
          // subtitle=''
          link='/admin/products'
          cardData={datas.totalProducts || 0}
        />
      <Card
        title='Total Orders'
        // subtitle=''
        link='/admin/orders'
        cardData={datas.totalOrders || 0}
      />
      <Card
        title='Total Customers'
        // subtitle=''
        link='/admin/subscribers'
        cardData={datas.totalUsers || 0}
      />
      <RedCard
        title='Out of Stock'
        // subtitle=''
        link='/admin/products'
        cardData={datas.totalOutOfStockProducts || 0}
      />
    </div>
  )
}

type Props = {
  cardData: any;
  title: string;
  link: string
}

function Card(props: Props) {
  const { cardData, title, link } = props
  return title ? (
    <div className='p-3 items-center grid mx-auto w-[100%] h-40 rounded-md ring-white cursor-pointer ring-2 hover:ring-green-600 bg-white'>
      <Link href={link} className='text-2xl hover:text-green-500 text-gray-500'>
        {title}
      </Link>
      {/* <p className='text-green-500'>(Last 3 Weeks)</p> */}
      <h1 className='text-5xl text-green-500'>{cardData}</h1>
    </div>
  ) : null
}

function RedCard(props: Props) {
  const { cardData, title, link } = props
  return title ? (
    <div className='p-3 items-center grid mx-auto w-[100%] h-40 rounded-md ring-white cursor-pointer ring-2 hover:ring-red-600 bg-white'>
      <Link href={link} className='text-2xl hover:text-red-500 text-gray-500'>
        {title}
      </Link>
      <h1 className='text-5xl text-red-500'>{cardData}</h1>
    </div>
  ) : null
}

export function Dashboard() {
  return (
    <AdminLayout>
      <Dash />
      <Order />
    </AdminLayout>
  )
}