import AddToCart from './lib/components/buttons/AddToCart';
import { useState, useEffect } from 'react';


export default function Product() {

    // {
    //     image_url: 'k',
    //     product_id: 40,
    //     product_name: 'sonpapdi2',
    //     product_description: null
    //   },

    const [images, setImages] = useState([{
            image_url: 'k',
            product_id: 40,
            product_name: 'sonpapdi2',
            product_description: null
          }]);

    useEffect(() => {
        // Simulate fetching data and set the images
        async function fetchData() {
            // Replace this with your actual data-fetching logic
            const data = await fetch('http://localhost:5000/all-products');
            const result = await data.json();
            setImages(result);
        }
        fetchData();
    }, []);

    const renderImages = images.map(imagepath => (
        <div key={imagepath.product_id} className='w-64  '>
            <img className=' w-full h-64 object-cover border' src={imagepath.image_url} alt={"test" + imagepath} />
            <div>
                <p className='m-2'>{imagepath.product_name}</p>
                <AddToCart />
            </div>
        </div>
    ))

    return (
        <>
            <div className=' m-auto w-11/12 grid grid-cols-4 '>
                { renderImages }
            </div>
        </>
    )
}