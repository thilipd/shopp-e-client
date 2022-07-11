
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../../axios/axios';
import { Paper } from '@mui/material';
import { toast } from 'react-toastify';


const Reset = () => {

    const { token } = useParams();

    const navigate = useNavigate();

    const [res, setRes] = useState('');

    const [passCode, setPassCode] = useState({
        password: "",
        confirm: ""
    })

    const handleChange = (e) => {

        const { name, value } = e.target;

        setPassCode({
            ...passCode, [name]: value
        })
    }



    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(passCode)

        if (passCode.password !== passCode.confirm) {

            toast.warn(`Passwords is do not match`)

        } else if (passCode.password.length <= 6) {

            toast.warn(`Password is too small`)

        } else {
            const response = await axios.post('/user/reset', { password: passCode.password }, {
                headers: { Authorization: token }
            })

            setRes(response.data.msg)
            toast.success(`Password updated successfully`)
            setPassCode(({
                password: "",
                confirm: ""
            }))

            setTimeout(() => {
                navigate('/login');
            }, 5000)
        }


    }



    return (
        <div className='resetContainer'>

            <Paper elevation={3}

                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 500,
                    height: 500,
                    backgroundColor: ' #0365a780 !important',
                    borderRadius: 10,
                    color: '#fff'
                }} >
                {
                    (!res) ?
                        <>
                            <form onSubmit={handleSubmit} className="registerForm">

                                <label>
                                    <div className="lableContainer">
                                        Password:
                                    </div>
                                    <div className="inputContainer">
                                        <input type="password"
                                            value={passCode.password}
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
                                            value={passCode.confirm}
                                            onChange={handleChange}
                                            autoFocus required />
                                    </div>
                                </label><br /><br />

                                <input className='btn' type="submit" value="Reset password" />
                            </form><br /><br />
                        </> :
                        <>
                            <h2>{res}</h2>
                        </>
                }



            </Paper>

        </div>
    )
}

export default Reset
