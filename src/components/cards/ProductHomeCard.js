import React, { useState } from 'react';
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


const dummy = [
    'https://res.cloudinary.com/shoppe-ecomm/image/upload/v1657377147/shoppe_products/RE4LJcl_dii2l9.jpg',
    'https://res.cloudinary.com/shoppe-ecomm/image/upload/v1657378101/shoppe_products/refurb-2019-imac-27-gallery_i2vvvr.jpg'
]

const ProductHomeCard = ({ product, handledelete }) => {

    const { title, description, images, slug } = product;

    let [cart, setCart] = useState([])

    const navigate = useNavigate();


    const handleCart = () => {


        if (cart.length === 0) {
            setCart(cart.push({
                ...product,
                count: 1
            }));
            localStorage.setItem('cart', JSON.stringify(cart));
        }

        if (cart.length !== 0) {
            setCart([...cart, { ...product, count: 1 }]);
            localStorage.setItem('cart', JSON.stringify(cart));
        }





        console.log(typeof (cart), cart)



    }


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
                    <Button variant='soft' onClick={() => handleCart()}><AddShoppingCartIcon />Add to cart</Button>
                </CardActions>
            </Card>

        </div>
    )
}

export default ProductHomeCard
