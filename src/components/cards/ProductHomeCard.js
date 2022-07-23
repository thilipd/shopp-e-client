import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Carousel from 'react-material-ui-carousel'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from 'react-router-dom';
import _, { isEqual } from 'lodash';
import { Tooltip } from '@mui/material';
import { dispatchCart } from '../../redux/actions/cartAction';
import { useDispatch } from 'react-redux';


const dummy = [
    'https://res.cloudinary.com/shoppe-ecomm/image/upload/v1657377147/shoppe_products/RE4LJcl_dii2l9.jpg',
    'https://res.cloudinary.com/shoppe-ecomm/image/upload/v1657378101/shoppe_products/refurb-2019-imac-27-gallery_i2vvvr.jpg'
]

const ProductHomeCard = ({ product, cart, setCart }) => {

    const dispatch = useDispatch();

    const { title, description, images, slug } = product;

    const [tooltip, setTooltip] = useState('Click to add')

    const navigate = useNavigate();


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
        <div>
            <Card sx={{ width: 345, height: 390 }}>

                {images.length !== 0 ? <>
                    <Carousel>
                        {images.map(img =>
                            <>
                                <CardMedia
                                    component="img"
                                    height="200"
                                    image={img.secure_url}
                                    alt="green iguana"
                                    sx={{
                                        padding: '10px'
                                    }}
                                />
                            </>)}

                    </Carousel></> : <>
                    <Carousel>

                        {
                            dummy.map(img =>
                                <>
                                    <CardMedia
                                        component="img"
                                        height="200"
                                        image={img}
                                        alt="green iguana"
                                        sx={{
                                            padding: '10px'
                                        }}
                                    />
                                </>)
                        }

                    </Carousel>
                </>}

                <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                        {title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {description && description.substring(0, 40)}...
                    </Typography>
                </CardContent>
                <CardActions className='cardActionHome'>

                    <Button variant='soft' onClick={() => navigate(`/product/${slug}`)}><VisibilityIcon />View</Button>

                    <Tooltip title={tooltip}>

                        <Button variant='soft' onClick={() => handleCart()}><AddShoppingCartIcon />Add to cart</Button>

                    </Tooltip >
                </CardActions>
            </Card>

        </div>
    )
}

export default ProductHomeCard
