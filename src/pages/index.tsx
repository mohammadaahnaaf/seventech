import { Inter } from 'next/font/google'
import { Footers } from '@seventech/shared'
import { Maine } from '@seventech/client'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div>
      <Maine />
    </div>
  )
}
