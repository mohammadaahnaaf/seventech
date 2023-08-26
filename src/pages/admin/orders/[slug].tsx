import { withAuth } from '@seventech-root/hoc'
import { OrderDetails } from '@seventech/admin'
import React from 'react'

type Props = {}

const OrderDetailsPage = (props: Props) => {
  return (
    <div>
        <OrderDetails />
    </div>
  )
}

export default withAuth(OrderDetailsPage)