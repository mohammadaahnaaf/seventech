import { Maine } from '@seventech/client'
import { Inter } from 'next/font/google'
import Head from 'next/head'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
       <Head>
        <title>SevenTech | Home</title>
        <meta name="seventech" content="Home Page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Maine />
    </>

  )
}
