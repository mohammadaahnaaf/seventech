import { useRouter } from 'next/router';
import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Define types
interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

type CartAction =
  | { type: 'LOAD_CART'; payload: CartState }
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: { id: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' };

interface CartContextType {
  cartState: CartState;
  cartDispatch: React.Dispatch<CartAction>;
}

// Create a context for the cart
const CartContext = createContext<CartContextType | undefined>(undefined);

// Define initial cart state
const initialCartState: CartState = {
  items: [],
};

// Define cart reducer function
const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {

    case 'LOAD_CART':
      return {
        ...state,
        items: action.payload.items || [],
      };

    case 'ADD_ITEM':
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item
          ),
        };
      } else {
        return {
          ...state,
          items: [...state.items, { ...action.payload, quantity: 1 }],
        };
      }

    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload.id),
      };

    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id ? { ...item, quantity: action.payload.quantity } : item
        ),
      };

    case 'CLEAR_CART':
      return {
        ...state,
        items: [],
      };

    default:
      return state;
  }
};

// Custom hook that uses the cart context
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

// CartProvider component that wraps your app
interface CartProviderProps {
  children: React.ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {

  const [cartState, cartDispatch] = useReducer(cartReducer, initialCartState);
  const router = useRouter()

  // Load cart data from local storage when the component mounts
  useEffect(() => {
    let storedCart = localStorage.getItem('cart');
    console.log("a: " + storedCart)
    if (storedCart) {
      cartDispatch({ type: 'LOAD_CART', payload: JSON.parse(storedCart) });
    }
  }, [router]);

  // Save cart data to local storage whenever the cart state changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartState));
    console.log("b: " + cartState.items[0]?.id)
  }, [cartState]);

  return (
    <CartContext.Provider value={{ cartState, cartDispatch }}>
      {children}
    </CartContext.Provider>
  );
};
