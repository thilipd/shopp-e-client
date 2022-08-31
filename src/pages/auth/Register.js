import React, { useState } from 'react';
import { Paper } from '@mui/material';
import { toast } from 'react-toastify';
import axios from '../../axios/axios';


const Register = () => {

    const [userDetails, setUserDetails] = useState({
        name: '',
        email: '',
        password: '',
        confirm: ''

    });

    const [res, setRes] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;

        setUserDetails({
            ...userDetails, [name]: value
        })
    }




    const handleSubmit = async (e) => {
        e.preventDefault();


        const { name, email, password } = userDetails;

        if (userDetails.password !== userDetails.confirm) {

            toast.warn(`Passwords do not match`);


        } else {
            try {
                const response = await axios.post('/user/register', { name, email, password });
                setUserDetails({
                    name: '',
                    email: '',
                    password: '',
                    confirm: ''

                });

                setRes(response.data.msg)

                toast.success(`Email is sent to ${userDetails.email}. Click the link to complete the registration`);

                setTimeout(setRes(''), 10000)

                console.log(response.data)

            } catch (error) {
                toast.error(error.response.data.msg)
                //hi
            }





        }



        // window.localStorage.setItem('emailForRegistarion', userDetails.email);


    }


    return (
        <div className='registerContainer'>
            <Paper elevation={3}
                sx={{
                    display: 'flex',
                    alignItems: 'left',
                    justifyContent: 'center',
                    width: 500,
                    height: 600,
                    padding: 10,
                    backgroundColor: 'none !important',
                    borderRadius: 10,
                    color: '#555'
                }} >


                {
                    (!res) ?
                        <>
                            <form onSubmit={handleSubmit} className="registerForm">

                                <h2>Register</h2><br /><br /><br /><br />
                                <label>
                                    <div className="lableContainer">
                                        Name:
                                    </div>
                                    <div className="inputContainer">
                                        <input type="text"
                                            name='name'
                                            value={userDetails.name}
                                            onChange={handleChange}
                                            autoFocus required />
                                    </div>
                                </label><br /><br />
                                <label>
                                    <div className="lableContainer">
                                        Email:
                                    </div>
                                    <div className="inputContainer">
                                        <input type="email"
                                            name='email'
                                            value={userDetails.email}
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
                                            value={userDetails.password}
                                            onChange={handleChange}
                                            autoFocus required />
                                    </div>
                                </label><br /><br />
                                <label>
                                    <div className="lableContainer">
                                        Confirm password:
                                    </div>
                                    <div className="inputContainer">
                                        <input type="password"
                                            name='confirm'
                                            value={userDetails.confirm}
                                            onChange={handleChange}
                                            autoFocus required />
                                    </div>
                                </label><br /><br />
                                <input className='btn' type="submit" value="Submit" />
                            </form>
                        </> :
                        <>
                            <h2>{res}</h2>
                        </>
                }

            </Paper>
        </div >
    )
}

export default Register
