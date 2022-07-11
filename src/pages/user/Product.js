import React from 'react'
import { useParams } from 'react-router-dom'

const Product = () => {


    const { slug } = useParams();

    return (
        <div>
            <h4>{slug}</h4>
        </div>
    )
}

export default Product;
