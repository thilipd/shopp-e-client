import React, { useEffect, useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../../axios/axios';
import { Paper } from '@mui/material';
import { toast } from 'react-toastify';

const Activation = () => {

    const { activation_token } = useParams();
    const [msg, setMsg] = useState('');

    const fetchData = async () => {
        try {
            const response = await axios.post('/user/activation', {
                activation_token: activation_token
            });


            setMsg(response.data.msg);

        } catch (error) {

            toast.warn(error.response.data.msg);
            setMsg(error.response.data.msg);

        }

    }

    useMemo(() => fetchData(), [activation_token])









    return (
        <>

            <div className='registerContainer'>
                <Paper elevation={3}
                    sx={{
                        padding: 20,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 500,
                        height: 500,
                        backgroundColor: ' #0365a780 !important',
                        borderRadius: 10,
                        color: '#fff'
                    }} >
                    <h4>{msg}</h4>
                </Paper>
            </div>

        </>
    )
}

export default Activation
