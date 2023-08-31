import { useRouter } from 'next/router'
import React from 'react'

type Props = {}

const TopGPage = (props: Props) => {
    const router = useRouter()
    const { y, z } = router.query
    console.log(y, z)
    return (
        <div>TopGPage</div>
    )
}

export default TopGPage