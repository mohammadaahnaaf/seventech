import '@seventech-root/styles/globals.css'
import '@seventech-root/styles/tag.css'
import type { AppProps } from 'next/app'
import { CartProvider } from 'react-use-cart';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CartProvider>
      <Component {...pageProps} />
    </CartProvider>)
}
