import { withAuth } from '@seventech-root/hoc'
import { OrderList } from '@seventech/admin/orders'
import React from 'react'

type Props = {}

const OrdersPage = (props: Props) => {
  return (
    <div>
        <OrderList />
    </div>
  )
}

export default withAuth(OrdersPage)