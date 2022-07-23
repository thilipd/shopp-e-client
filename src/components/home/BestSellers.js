import React, { useState, useEffect } from 'react';
import HashLoader from 'react-spinners/HashLoader';
import ProductHomeCard from '../cards/ProductHomeCard';
import { listProduct, getProductCount } from '../../functions/product';
import Typewriter from "typewriter-effect";
import { toast } from 'react-toastify';
import LoadingCard from '../cards/LoadingCard';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const BestSellers = ({ cart, setCart }) => {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [productCount, setProductCount] = useState(0);

    const { pageLoad, cardLoad } = loading
    const handledelete = (slug) => {


    }


    const handlePagination = (e) => {

        console.log(e.target.innerText)

        setPage(Number(e.target.innerText))

    }




    const loadProducts = () => {

        setLoading(true)

        listProduct('sold', 'desc', page)
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
        setLoading({ ...loading, pageLoad: true })
        loadProducts()
        setLoading({ ...loading, pageLoad: false })
    }, [page])

    useEffect(() => {
        getProductCount().then((res) => {
            setProductCount(res.data)
        })
    }, [page])



    return (
        <div >
            <div>
                <h3 className='homeSubHead'>Best Sellers</h3>
            </div>
            <div className="contentContainer">
                {products.map((prod) =>

                    <>
                        {cardLoad ? <LoadingCard /> : <ProductHomeCard product={prod} handledelete={handledelete} cart={cart} setCart={setCart} />}

                    </>
                )}
            </div>
            <div className="paginate">
                {loading ? <></> : <>
                    <Stack spacing={2}>
                        <Pagination defaultPage={page}
                            onChange={(e) => handlePagination(e)}
                            count={Math.ceil((productCount / 4))}
                            variant="outlined" />
                    </Stack>
                </>}
            </div>

        </div>
    )
}

export default BestSellers
