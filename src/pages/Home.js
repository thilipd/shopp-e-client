import React, { useState, useEffect } from 'react';
import HashLoader from 'react-spinners/HashLoader';
import ProductHomeCard from '../components/cards/ProductHomeCard';
import { listProductByCount } from '../functions/product';
import Typewriter from "typewriter-effect";
import { toast } from 'react-toastify';
import LoadingCard from '../components/cards/LoadingCard';


const Home = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState({
        pageLoad: false,
        cardLoad: false
    });

    const { pageLoad, cardLoad } = loading
    const handledelete = (slug) => {


    }


    const loadProducts = () => {

        setLoading({ ...loading, cardLoad: true })

        listProductByCount(3)
            .then((res) => {
                setProducts([...res.data])
                setLoading({ ...loading, cardLoad: false })
            })
            .catch((err) => {
                setLoading({ ...loading, cardLoad: false })
                console.log(err)
            })
    }


    useEffect(() => {
        setLoading({ ...loading, pageLoad: true })
        loadProducts()
        setLoading({ ...loading, pageLoad: false })
    }, [])


    console.log(products)
    return (


        <div className="homeconatiner">
            {pageLoad ?
                <>
                    <HashLoader />
                </> :
                <>
                    <div className="mainHead">


                        <Typewriter
                            autoStart={true}
                            onInit={(typewriter) => {

                                typewriter
                                    .pauseFor(2500)
                                    .typeString('A simple yet powerful app')
                                    .pauseFor(300)
                                    .deleteAll()
                                    .typeString("Shopp-E")
                                    .pauseFor(300)
                                    .deleteAll()
                                    .typeString("Welcomes You")
                                    .deleteAll()
                                    .typeString("Shopp-E")
                                    .start();
                            }}
                        />

                        <br /><br />

                    </div>
                    <div>
                        <h3>All Products</h3>
                    </div>
                    <div className="contentContainer">



                        {products.map((prod) =>

                            <>
                                {cardLoad ? <LoadingCard /> : <ProductHomeCard product={prod} handledelete={handledelete} />}

                            </>
                        )}

                    </div>
                </>}


        </div>
    )
}

export default Home
