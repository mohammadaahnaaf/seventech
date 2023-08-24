import { isServer } from '@seventech/utils';
import React from 'react'
import { useCart } from 'react-use-cart';

type Props = {}

export const ProductDetails = (props: Props) => {

    const [view, setView] = React.useState(false)
    const { addItem, emptyCart, totalUniqueItems } = useCart();

    const handleAddToCart = () => {

        const newItem = {
            id: 'item1',
            name: 'Sample Item',
            category: 'Sample Item',
            image: 'Sample Item',
            quantity: 1,
            price: 9.99,
        };
        addItem(newItem)

    };

    React.useEffect(() => {
        setView(true)
    }, [])

    if (isServer()) {
        return null
    }

    return view ? (
        <div className='h-40 grid justify-start'>
            ProductDetails
            <h2>{totalUniqueItems}</h2>
            <button type='button' onClick={handleAddToCart}>Add</button>
            <button type='button' onClick={emptyCart}>clear cart</button>
        </div>
    ) : null
}