import React from 'react'
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Image from 'next/image';
import { axiosRoot } from '@seventech/utils';

export function Banner() {

    const [banners, setBanners] = React.useState<any>([
        {
            _id: "64d6d561996934bfea92c009",
            images: [
                "https://seventech-images.s3.ap-southeast-1.amazonaws.com/banner-1691800929711.jpg",
                "https://seventech-images.s3.ap-southeast-1.amazonaws.com/banner2-1691800929787.png",
                "https://seventech-images.s3.ap-southeast-1.amazonaws.com/banner3-1691800929855.jpg"
            ],
            keys: [
                "banner-1691800929711.jpg",
                "banner2-1691800929787.png",
                "banner3-1691800929855.jpg"
            ],
            createdAt: "2023-08-12T00:42:09.999Z",
            updatedAt: "2023-08-12T00:42:09.999Z",
            __v: 0
        }
    ])

    // get images data 
    React.useEffect(() => {
        async function getBanners() {
            try {
                const res = await axiosRoot.get('/banner');
                setBanners(res.data)
            } catch (err) {
                console.log(err)
            }
        }
        getBanners()
    }, []);

    return (
        <div className="max-w-7xl border-b border-pink-900 shadow mx-auto">
            {banners.map((items: { images: any }, index: number) => (

                <Carousel
                    key={index}
                    autoPlay
                    infiniteLoop
                    animationHandler="fade"
                    stopOnHover={false}
                    showStatus={false}
                    showIndicators={false}
                    showThumbs={false}
                    interval={2500}
                    transitionTime={700}
                    swipeable={false}
                    emulateTouch
                    className='z-50'
                >
                    {items?.images.map((image: string, index: number) => (
                        <div key={index} className='h-[30vh] lg:h-[65vh] w-full relative'>
                            <Image
                                fill
                                src={image}
                                alt={`banner-image-${1 + index}`}
                                className='z-50 object-cover h-[20vh] md:h-[65vh] select-none cursor-pointer'
                            />
                        </div>
                    ))}
                </Carousel>
            ))}
        </div>
    )
}