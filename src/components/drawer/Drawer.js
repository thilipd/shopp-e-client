import React, { useState } from 'react'
import Drawer from '@mui/material/Drawer';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';

const SideDrawer = ({ children }) => {


    const dispatch = useDispatch();
    const { cart, drawer } = useSelector(state => ({ ...state }));

    const navigate = useNavigate();

    const handleClose = () => {
        dispatch({ type: 'SET_VISIBLE', payload: false });
    }

    const handleGotoCart = () => {
        dispatch({ type: 'SET_VISIBLE', payload: false });
        navigate('/cart');
    }


    return (
        <div className='p-3'>
            <Drawer anchor={'right'} open={drawer} onClose={handleClose}>
                <div className='p-3'>
                    <h4 className='mb-4'>Cart has {cart.length} {cart.length === 1 ? <>product</> : <>products</>}</h4>

                    {
                        cart.map((c) => (
                            <>
                                <Card sx={{ display: 'flex' }}>
                                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                        <CardContent sx={{ flex: '1 0 auto' }}>
                                            <Typography component="div" variant="h6">
                                                {c.title}
                                            </Typography>
                                            <Typography variant="subtitle1" color="text.secondary" component="div">
                                                Price: ₹ {c.price}
                                            </Typography>
                                        </CardContent>
                                    </Box>
                                    <CardMedia
                                        component="img"
                                        sx={{ width: 101 }}
                                        image={c.images[0].url}
                                        alt="Live from space album cover"
                                    />
                                </Card>
                                <br />
                            </>
                        ))
                    }

                    <Button onClick={handleGotoCart}>Go to Cart</Button>
                </div>
            </Drawer>
        </div>
    )
}

export default SideDrawer
