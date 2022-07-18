import React, { useState, useEffect } from 'react';
import HashLoader from 'react-spinners/HashLoader';
import ProductHomeCard from '../components/cards/ProductHomeCard';
import { listProductByCount } from '../functions/product';
import Typewriter from "typewriter-effect";
import LoadingCard from '../components/cards/LoadingCard';
import Newarrivals from '../components/home/Newarrivals';
import BestSeller from '../components/home/BestSellers';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState({
        pageLoad: false,
        cardLoad: false
    });

    const { pageLoad, cardLoad } = loading

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
                        <Newarrivals />
                    </div>
                    <div>
                        <BestSeller />
                    </div>
                </>}


        </div>
    )
}

export default Home
