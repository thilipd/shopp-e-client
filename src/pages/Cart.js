import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

import IconButton from '@mui/material/IconButton';

import { dispatchCart } from '../redux/actions/cartAction';



const Cart = () => {


    const colors = ['black', 'silver', 'blue', 'white', 'red']


    const cart = useSelector(state => state.cart);
    const user = useSelector(state => state.auth.user);

    const dispatch = useDispatch();
    const getTotal = () => {

        let total = 0;
        cart.map((c) => {
            total = total + (c.price * c.count)

        });

        return total
    }

    const handleColor = (e) => {


        let cart = [];

        if (localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart'))
        }

        cart.map((product, i) => {
            if (product._id === e.target.id) {
                cart[i].colors = e.target.value;
            }
        })

        localStorage.setItem('cart', JSON.stringify(cart));
        dispatch(dispatchCart(cart))


    }

    const handleAdd = (e, id) => {
        e.preventDefault();

        let cart = [];

        if (localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart'))
        }
        cart.map((product, i) => {
            if (product._id === id) {
                cart[i].count += 1;
            }
        })
        localStorage.setItem('cart', JSON.stringify(cart));
        dispatch(dispatchCart(cart))


    }

    const handleMinus = (e, id) => {
        e.preventDefault();
        let cart = [];

        if (localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart'))
        }
        cart.map((product, i) => {
            if (product._id === id) {
                if (cart[i].count !== 1) {
                    cart[i].count -= 1;
                } else if (cart[i].count === 1) {

                    const bool = prompt("Are you sure to remove the item from the cart? Please enter 1 to remove the item")

                    console.log(bool)
                    if (bool) {
                        cart.splice(i, 1);
                    }
                }

            }
        })
        localStorage.setItem('cart', JSON.stringify(cart));
        dispatch(dispatchCart(cart))
    }

    const handleRemove = (e, id) => {
        e.preventDefault();

        console.log(id);
        e.preventDefault();
        let cart = [];

        if (localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart'))
        }
        cart.map((product, i) => {



            if (product._id === id) {
                const bool = prompt("Are you sure to remove the item from the cart? Please enter 1 to remove the item")
                if (bool) {
                    cart.splice(i, 1);
                }
            }


        })
        localStorage.setItem('cart', JSON.stringify(cart));
        dispatch(dispatchCart(cart))
    }


    return (
        <div className='conatiner-fluid  cartPage pt-2'>

            <div className="row">
                <div className="col-8 p-3">
                    <div className="row">
                        <h4>Cart</h4>
                    </div>
                    {!cart.length ?
                        <>
                            No Products in cart, <Link to='/'>Continue shopping </Link>
                        </> :
                        <>
                            <div className="row">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Image</th>
                                            <th>Title</th>
                                            <th>Price</th>
                                            <th>Brand</th>
                                            <th>Color</th>
                                            <th>Count</th>
                                            {/* <th>Shipping</th> */}
                                            <th>Remove</th>
                                        </tr>
                                    </thead>
                                    <tbody >
                                        {
                                            cart.map((prod) => {
                                                return <>

                                                    <tr key={prod._id}>
                                                        <td className='imgRow'><img src={prod.images[0].url} alt={prod.slug} /></td>
                                                        <td>{prod.title}</td>
                                                        <td>{prod.price}</td>
                                                        <td>{prod.brands}</td>
                                                        <td>
                                                            <select id={prod._id} onChange={(e) => handleColor(e)} name='color' >

                                                                {prod.colors ?
                                                                    <>
                                                                        <option>{prod.colors}</option>
                                                                        {colors.filter(c => prod.colors !== c).map((c) => (
                                                                            <option >{c}</option>
                                                                        ))}
                                                                    </>
                                                                    :
                                                                    <>
                                                                        <option>select</option>
                                                                        {colors.map((c) => (
                                                                            <option >{c}</option>
                                                                        ))}
                                                                    </>
                                                                }
                                                            </select>
                                                        </td>
                                                        <td>
                                                            <div className='tableCount'>
                                                                <IconButton onClick={(e) => handleAdd(e, prod._id)} >
                                                                    <ControlPointIcon color={'success'} />
                                                                </IconButton>
                                                                <div>
                                                                    {prod.count}
                                                                </div>
                                                                <IconButton onClick={(e) => handleMinus(e, prod._id)} >
                                                                    <RemoveCircleOutlineIcon color={'error'} />
                                                                </IconButton>
                                                            </div>
                                                        </td>
                                                        {/* <td> {prod.shipping === 'yes' ?
                                                            <>
                                                                <DoneIcon color='success' />
                                                            </> :
                                                            <>
                                                                <CloseIcon color='error' />
                                                            </>}
                                                        </td> */}

                                                        <td>
                                                            <IconButton onClick={(e) => handleRemove(e, prod._id)} >
                                                                <CloseIcon color='error' />
                                                            </IconButton>
                                                        </td>
                                                    </tr>

                                                </>
                                            })}
                                    </tbody>
                                </table>
                            </div>
                        </>}

                </div>
                <div className="col-1 p-4 vl"></div>
                <div className="col-3 p-3">
                    <div className="row">
                        <h4>Order Summary</h4>
                        <hr />
                    </div>
                    <div className="row">
                        {
                            (!user._id) ?
                                <>
                                    Please login to purchase the products. <Link to='/login'>login</Link>
                                </> : !cart.length ? <>
                                    No Products in cart, <Link to='/'>Continue shopping </Link>
                                </> : <>
                                    <table>
                                        <thead>
                                            <tr>

                                                <th>Title</th>
                                                <th>Count</th>
                                                <th>Remove</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                cart.map((c, i) => {
                                                    return <>
                                                        <tr>
                                                            <td>{c.title}  </td>
                                                            <td>{c.count}  </td>
                                                            <td>{c.count * c.price}  </td>
                                                        </tr>
                                                    </>
                                                })
                                            }
                                        </tbody>

                                        <tbody>

                                            <tr>
                                                <td colSpan="2"><strong>Total</strong>  </td>

                                                <td>{getTotal()}  </td>
                                            </tr>

                                        </tbody>
                                    </table>
                                </>
                        }

                    </div>
                </div>

            </div>

        </div >
    )
}

export default Cart
