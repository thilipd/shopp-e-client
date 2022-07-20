import React, { useState, useEffect } from 'react';
import { displaySub } from '../../../functions/sub';
import { useNavigate, useParams } from 'react-router-dom';
import ProductHomeCard from '../../../components/cards/ProductHomeCard';
import HashLoader from 'react-spinners/HashLoader';



const ProductsBysub = () => {

    const { slug } = useParams();

    const [sub, setsub] = useState({});
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        displaySub(slug).then((res) => {
            setsub(res.data.sub);
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
                    <h3 className='homeSubHead'>{products.length} product in {sub.name} sub-catagory</h3>
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

export default ProductsBysub
