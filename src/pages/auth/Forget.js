import React, { useState } from 'react';
import { Paper } from '@mui/material';
import axios from '../../axios/axios';
import { toast } from 'react-toastify';

const Forget = () => {

    const [email, setEmail] = useState('');
    const [res, setRes] = useState('');



    const handleChange = (e) => {

        setEmail(e.target.value)

    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('/user/forget', { email });

            console.log(response.data)
            toast.success(`Email is sent to ${email}. Click the link to reset the password`);

            setEmail('');

            setRes(response.data.msg)





        } catch (error) {

            console.log()

            toast.error(error.response.data.msg);
            setRes(error.response.data.msg);

        }


    }


    return (
        <div className='forgetContainer'>

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
                                        Email:
                                    </div>
                                    <div className="inputContainer">
                                        <input type="email"
                                            value={email}
                                            onChange={handleChange}
                                            autoFocus required />
                                    </div>
                                </label><br /><br />

                                <input className='btn' type="submit" value="Submit" />
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

export default Forget
