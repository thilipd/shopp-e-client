import React, { useState, useEffect } from 'react';
import HashLoader from 'react-spinners/HashLoader';
import Typewriter from "typewriter-effect";
import Newarrivals from '../components/home/Newarrivals';
import BestSeller from '../components/home/BestSellers';
import ListCatagory from '../components/product/ListCatagory';
import ListSubs from '../components/product/ListSub';
import { useSelector } from 'react-redux';


const Home = () => {



    const localCart = useSelector(state => state.cart)

    let [cart, setCart] = useState(localCart);

    const [loading, setLoading] = useState({
        pageLoad: false,
        cardLoad: false
    });

    const { pageLoad, cardLoad } = loading;

    if (!window.localStorage.getItem('cart')) window.localStorage.setItem('cart', '');





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
                        <Newarrivals cart={cart} setCart={setCart} />
                    </div>
                    <div>
                        <BestSeller cart={cart} setCart={setCart} />
                    </div>

                    <div>
                        <div>
                            <h3 className='homeSubHead'>Catagories</h3>
                            <ListCatagory />
                        </div>
                    </div>

                    <div>
                        <div>
                            <h3 className='homeSubHead'>Sub Catagories</h3>
                            <ListSubs />
                        </div>
                    </div>
                </>}


        </div>
    )
}

export default Home
