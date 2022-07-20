import React, { useState, useEffect } from 'react';
import { displayCatagory } from '../../../functions/catagory';
import { useNavigate, useParams } from 'react-router-dom';
import ProductHomeCard from '../../../components/cards/ProductHomeCard';
import HashLoader from 'react-spinners/HashLoader';



const ProductsByCatagory = () => {

    const { slug } = useParams();

    const [catagory, setCatagory] = useState({});
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        displayCatagory(slug).then((res) => {
            setCatagory(res.data.catagory);
            setProducts(res.data.products);

            setLoading(false);
        })
    }, []);


    const handleDelete = (slug) => {

        console.log(slug)
    }



    return (

        loading ? <>
            <HashLoader />
        </> : <>
            <div className='productCataContainer'>

                <div>
                    <h3 className='homeSubHead'>{products.length} product in {catagory.name} catagory</h3>
                </div>

                <div className='productCataCard'>
                    {

                        products && products.map((prod) => {

                            return <ProductHomeCard product={prod} handledelete={handleDelete} />

                        })
                    }
                </div>
            </div>
        </>


    )
}

export default ProductsByCatagory
