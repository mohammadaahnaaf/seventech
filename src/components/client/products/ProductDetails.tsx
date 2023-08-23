import { useCart } from '@seventech/hooks';
import React from 'react'

type Props = {}

export const ProductDetails = (props: Props) => {

    const { cartDispatch, cartState } = useCart();
    const uniqueItemsCount = cartState.items.length;

    const handleAddToCart = () => {

        const newItem = {
            id: 'item1',
            name: 'Sample Item',
            category: 'Sample Item',
            image: 'Sample Item',
            quantity: 1,
            price: 9.99,
        };

        // Dispatch the 'ADD_ITEM' action to add the item to the cart
        cartDispatch({ type: 'ADD_ITEM', payload: newItem });
    };
    return (
        <div className='h-40'>ProductDetails
            <h2>{uniqueItemsCount}</h2>
            <button type='button' onClick={handleAddToCart}>Add</button>
        </div>
    )
}