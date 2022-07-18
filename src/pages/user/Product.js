import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SingleProduct from '../../components/product/SingleProduct';
import { displayProduct } from '../../functions/product';


const Product = () => {

    const [product, setProduct] = useState({})

    const { slug } = useParams();

    const loadProduct = (slug) => {
        displayProduct(slug).then((res) => {
            setProduct(res.data[0]);
        })
    }

    useEffect(() => {
        loadProduct(slug)
    }, [slug]);

    return (

        <div>
            <SingleProduct product={product} />

        </div>
    )
}

export default Product;
