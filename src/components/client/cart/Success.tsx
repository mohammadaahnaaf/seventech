import React from 'react'
import { useCart } from 'react-use-cart';
import Router from 'next/router'
import { fToNow } from '@seventech/utils';
import html2canvas from 'html2canvas';

type Props = {
    order: any
}

export function Success(props: Props) {
    const { order } = props

    const { emptyCart, totalUniqueItems } = useCart();

    function copyToClipboard(text: string) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        alert('Order id coppied')
    }

    function handleSuccess() {
        const { pathname } = Router
        emptyCart()
        if (pathname === '/checkout') {
            Router.push('/')
        }
    }

    const myRef = React.useRef<any>(null);

    const downloadDivAsPNG = () => {
        const divToConvert = myRef.current;

        if (!divToConvert) {
            console.error('Ref not found.');
            return;
        }

        html2canvas(divToConvert).then((canvas: any) => {
            const dataURL = canvas.toDataURL('image/png');

            const downloadLink = document.createElement('a');
            downloadLink.href = dataURL;
            downloadLink.download = 'my-order.png';

            downloadLink.click();
        });
    };

    return (
        <div className='min-h-screen py-6 bg-gray-100'>
            <div ref={myRef} className='bg-white mx-auto rounded-lg max-w-5xl h-full p-2 md:p-6'>
                <div className='grid gap-2 items-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"
                        className='bg-green-600 justify-self-center text-white p-2 rounded-full h-20 w-20' >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>

                    <h1 className='text-green-600 text-2xl md:text-4xl text-center'>Thank You</h1>
                    <h1 className='text-gray-800 text-md md:text-xl font-normal text-center'>Your order has been recived</h1>
                    
                    <div className='flex gap-2 pb-2 items-center justify-center'>
                        <h2 className='font-semibold text-center text-black text-md md:text-xl'>Your Order ID: <span className='truncate'>{order?._id}</span></h2>
                        <button type='button' onClick={() => copyToClipboard(order?._id)}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-sky-600 hover:text-green-600">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" />
                            </svg>
                        </button>
                    </div>
                </div>

                <div className='grid gap-4 items-center grid-cols-2 py-4 lg:grid-cols-4'>
                    <div className='cols-span-1 text-center text-black  bg-green-500 bg-opacity-20 items-center grid rounded-lg p-3'>
                        <h2>Total Price</h2>
                        <h2>TK {order?.total || 0}</h2>
                    </div>
                    <div className='cols-span-1 text-center text-black  bg-green-500 bg-opacity-20 items-center grid rounded-lg p-3'>
                        <h2>Ordered At</h2>
                        <h2>{fToNow(order?.createdAt) || 0}</h2>
                    </div>
                    <div className='cols-span-1 text-center text-black  bg-green-500 bg-opacity-20 items-center grid rounded-lg p-3'>
                        <h2>Order Status</h2>
                        <h2>{order?.status || 0}</h2>
                    </div>
                    <div className='cols-span-1 text-center text-black  bg-green-500 bg-opacity-20 items-center grid rounded-lg p-3'>
                        <h2>Total Products</h2>
                        <h2>{totalUniqueItems}</h2>
                    </div>
                </div>

                {order && <ProductsViews order={order} />}

                <div className='flex gap-3 mt-4 items-center justify-center'>
                    <button className='text-md text-white bg-black p-2 w-full hover:text-red-600 text-center' type='button' onClick={handleSuccess}>Back to home</button>
                    <button className='text-md p-2 w-full bg-green-600 hover:text-red-600 text-center text-white' type='button' onClick={downloadDivAsPNG}>Download</button>
                </div>
            </div>
        </div>
    )
}

function ProductsViews(props: Props) {
    const { order } = props
    const { items, cartTotal, totalItems } = useCart()
    const [ship, setShip] = React.useState(0)

    React.useEffect(() => {
        if (order.city === 'Dhaka') {
            setShip(60)
        } else {
            setShip(120)
        }
    }, [order])

    return (
        <div className="overflow-y-auto relative p-4">
            <table className="w-full text-sm text-left text-black">
                <thead className="text-xs text-black uppercase bg-green-500 bg-opacity-20">
                    <tr>
                        <th scope="col" className="py-3 px-6">
                            Product name
                        </th>
                        <th scope="col" className="py-3 px-6">
                            Qty
                        </th>
                        <th scope="col" className="py-3 px-6">
                            Price
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item, index) => (
                        <tr key={index} className="border-b">
                            <th scope="row" className="py-4 px-6 font-medium truncate text-black  whitespace-nowrap">
                                {index + 1}{'.  '} {item.name}
                            </th>
                            <td className="py-4 px-6">
                                {item.quantity}
                            </td>
                            <td className="py-4 px-6">
                                ৳ {item.price}
                            </td>
                        </tr>
                    ))}
                    <tr className=' bg-green-400 text-black bg-opacity-10 border-b'>
                        <th className='py-4 px-6 font-medium whitespace-nowrap'>Subtotal:</th>
                        <td className="py-4 px-6">{totalItems}</td>
                        <td className="py-4 px-6">৳ {cartTotal}</td>
                    </tr>
                    <tr>
                        <th className='py-4 px-6 font-medium text-gray-800 '>Total: (with shipping cost)</th>
                        <td className="text-black py-4 px-6">{''}</td>
                        <td className="text-black py-4 px-6">৳ {+cartTotal + ship}</td>
                    </tr>
                </tbody>
            </table>
        </div>

    )
}