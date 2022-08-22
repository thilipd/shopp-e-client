import React, { useState } from 'react'
import { Paper } from '@mui/material';
import axios from '../../axios/axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { dispatchLogin } from '../../redux/actions/authActions';

const Login = () => {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const cart = useSelector(state => state.cart);

    console.log(cart.length)

    const [user, setUser] = useState({
        email: '',
        password: '',

    });

    console.log()

    const { email, password } = user;

    const handleSubmit = async (e) => {

        e.preventDefault();


        try {
            const response = await axios.post('/user/login', { ...user });


            window.localStorage.setItem('firstLogin', true);
            window.localStorage.setItem('login', JSON.stringify(response.data.userDetail._doc));
            window.localStorage.setItem('accessToken', JSON.stringify(response.data.access_token));

            const local = window.localStorage.getItem('login')

            setUser({
                email: '',
                password: '',
            });

            toast.success(response.data.msg)
            if (local) {
                dispatch(dispatchLogin())
                dispatch({ type: 'GET_TOKEN', payload: JSON.parse(window.localStorage.getItem('accessToken')) })

                cart.length ?
                    navigate('/cart') : navigate('/');



            }

        } catch (error) {

            if (error.response) return toast.error(error.response.data.msg);
            return toast.error(error.message)

        }

    }

    const handleChange = (e) => {

        const { name, value } = e.target;
        setUser({
            ...user, [name]: value
        })


    }



    return (
        <div>
            <div className='loginContainer'>
                <Paper elevation={3}
                    className='login'
                    sx={{
                        display: 'flex',
                        alignItems: 'left',
                        justifyContent: 'center',
                        width: 500,
                        height: 500,
                        padding: 10,
                        backgroundColor: 'none !important',
                        borderRadius: 10,
                        color: '#555'
                    }} >
                    <h2>Login</h2>

                    <form onSubmit={handleSubmit} className="registerForm">

                        <label>
                            <div className="lableContainer">
                                Email:
                            </div>
                            <div className="inputContainer">
                                <input type="email"
                                    name='email'
                                    value={email}
                                    onChange={handleChange}
                                    autoFocus required />
                            </div>
                        </label><br /><br />
                        <label>
                            <div className="lableContainer">
                                password
                            </div>
                            <div className="inputContainer">
                                <input type="password"
                                    name='password'
                                    value={password}
                                    onChange={handleChange}
                                    autoFocus required />
                            </div>
                        </label><br /><br />
                        <input className='btn' type="submit" value="Submit" />
                    </form><br /><br />

                    <div className="forgetPassword">
                        <Link to="/user/forget">Forget Password</Link>
                    </div>

                </Paper>
            </div>
        </div>
    )
}

export default Login
