import React, { useEffect, useState } from 'react'
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import BasicTabs from '../tabs/SingleProductTab';
import _ from 'lodash';
import { Tooltip } from '@mui/material';
import { dispatchCart } from '../../redux/actions/cartAction';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';



const defaultImgURL = ['https://picsum.photos/seed/picsum/200/300', "https://picsum.photos/200/300?random=1", "https://picsum.photos/200/300?random=2"];

// function TabPanel(props) {
//     const { children, value, index, ...other } = props;
// }

const SingleProduct = ({ product }) => {

    const localCart = useSelector(state => state.cart);

    const { slug } = useParams();

    const [cart, setCart] = useState(localCart);

    const [tooltip, setTooltip] = useState('Added');

    const x = localCart.filter((obj) => {
        return (obj.slug === slug)
    });

    const dispatch = useDispatch();


    const { _id,
        brands,
        catagory,
        colors,
        description,
        images,
        price,
        quantity,
        shipping,
        sold,
        sub,
        title } = product;




    const handleCart = () => {

        setCart([...cart, {
            ...product,
            count: 1
        }]);
        setTooltip('Added')


    }

    useEffect(() => {
        let unique = _.uniqWith(cart, _.isEqual)
        localStorage.setItem('cart', JSON.stringify(unique));
        dispatch(dispatchCart(unique))

    }, [cart])

    return (
        <>
            <div className='singleProductContainer'>
                <div className="singleImgContainer">
                    {images && images.length ? <Carousel showArrows={true} autoPlay infiniteLoop>
                        {images && images.map((img, i) => {

                            return <>
                                <img src={img.secure_url} alt="img" key={img.asset_id} />
                            </>
                        })}
                    </Carousel> :
                        <>
                            <Carousel showArrows={true} autoPlay infiniteLoop>
                                {defaultImgURL.map((url, i) => {

                                    return <>
                                        <img src={url} alt="img" key={i + 1} />
                                    </>
                                })}
                            </Carousel>
                        </>
                    }
                    <>
                        <div className='tabContainer'>
                            <BasicTabs description={description} />
                        </div>
                    </>

                </div>
                <div className="singleProdInfoContainer">

                    <table>
                        <tr>
                            <th colspan="2" >{title}</th>
                        </tr>
                        <tr>
                            <th>Price</th>
                            <td>₹ {price}</td>
                        </tr>
                        <tr>
                            <th>Catagory</th>
                            <td>
                                {catagory ? <Link to={`/admin/catatgory/${catagory.slug}`}>{catagory.name}</Link> : '-'}
                            </td>
                        </tr>
                        <tr>
                            <th>Sub Catagory</th>
                            <td>{sub ? <Link to={`/admin/sub/${sub.slug}`}>{sub.name} </Link> : '-'}</td>
                        </tr>
                        <tr>
                            <th>Shipping</th>
                            <td>{shipping}</td>
                        </tr>
                        <tr>
                            <th>Color</th>
                            <td>{colors}</td>
                        </tr>
                        <tr>
                            <th>Brand</th>
                            <td>{brands}</td>
                        </tr>
                        <tr>
                            <th>Available</th>
                            <td>{Number(quantity) - Number(sold)}</td>
                        </tr>
                        <tr>
                            <th>Sold</th>
                            <td>{sold}</td>
                        </tr>
                        <tr>
                            <th>
                                <Tooltip title={tooltip}>
                                    <Button onClick={() => handleCart()} variant='soft' color='sucess' >  <AddShoppingCartIcon /></Button>
                                </Tooltip >
                            </th>
                            <th>
                                <Button variant='soft' color="info"> <FavoriteBorderIcon /></Button>
                            </th>
                        </tr>


                    </table>


                </div>

            </div>

        </>
    )
}

export default SingleProduct;
