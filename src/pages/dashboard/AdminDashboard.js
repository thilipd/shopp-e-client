import React, { useState, useEffect } from 'react';
import { listProductByCount } from '../../functions/product';
import { useSelector } from 'react-redux';
import ProductCard from '../../components/cards/ProductCard';
import HashLoader from "react-spinners/HashLoader";
import { deleteProduct } from '../../functions/product';
import { toast } from 'react-toastify';

const AdminDashboard = () => {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState('');

    const { token } = useSelector(state => state.token);


    const handledelete = (slug) => {

        let answer = window.confirm("Delete???");
        if (answer) {
            setLoading(true);
            deleteProduct(slug)
                .then(res => {
                    setLoading(false)
                    toast.error('File deleted');
                    getProducts();

                })
                .catch(err => {
                    if (err.res.data) toast.error(err.res.data)
                })
        };
    }

    const getProducts = () => {
        listProductByCount(100)
            .then((res) => {
                setProducts([...res.data])
                setLoading(false)
            })
            .catch((err) => {
                setLoading(false)
                console.log(err)
            })
    }


    useEffect(() => {

        setLoading(true)
        getProducts();

    }, [])

    return (
        <div className='proContainer'>
            <h2> All Products</h2>

            {
                loading ?
                    <>
                        <HashLoader />
                    </> :
                    <>
                        <div className="productsContainer" >
                            {
                                products.map((prod) =>
                                    <>
                                        <ProductCard product={prod}
                                            handledelete={handledelete}
                                            key={prod._id} />
                                    </>
                                )
                            }

                        </div>
                    </>
            }


        </div>
    )
}

export default AdminDashboard
