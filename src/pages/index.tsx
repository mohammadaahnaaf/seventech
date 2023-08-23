import { Maine, ProductDetails } from '@seventech/client'
import { CartProvider } from '@seventech/hooks'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <CartProvider>
      <Maine />
      {/* <ProductDetails /> */}
    </CartProvider>
  )
}
