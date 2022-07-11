import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from '../../axios/axios';
import { toast } from 'react-toastify';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import { IconButton } from '@mui/material';


const Editusers = () => {

    const { id } = useParams();

    const users = useSelector(state => state.users);
    const token = useSelector(state => state.token);

    const [editUser, setEdituser] = useState([]);
    const [admin, setAdmin] = useState(false);
    const [num, setNum] = useState(0)

    const navigate = useNavigate()



    const handleCheck = () => {
        setAdmin(!admin);
        setNum(num + 1)
    }


    const handleUpdate = async () => {

        try {

            if (num % 2) {
                const res = await axios.patch(`/user/updateRole/${editUser._id}`,
                    { role: admin ? 1 : 0, id: id },
                    {
                        headers: { Authorization: token }
                    })
                toast.success(res.data.msg)
                setNum(0);
            }
        } catch (error) {
            toast.error(error.message)
        }
    }


    useEffect(() => {
        if (users.length !== 0) {
            users.map(user => {
                if (user._id === id) {
                    setEdituser(user);
                    setAdmin(user.role === 1 ? true : false);
                }
            })
        }
    }, [users, id])

    return (
        <div className='editContainer'>

            <div className="formGroup editUser">
                <h4>User Edit</h4>
                <label>
                    <div className="lableContainer">
                        Name:
                    </div>
                    <div className="inputContainer">
                        <input type="text"
                            name='name'
                            value={editUser.name}
                            placeholder={"User name"}
                            disabled
                        />
                    </div>
                </label><br /><br />
                <label>
                    <div className="lableContainer">
                        Email
                    </div>
                    <div className="inputContainer">
                        <input type="email"
                            name='email'
                            defaultValue={editUser.email}
                            disabled
                        />
                    </div>
                </label><br /><br />
                <div className="lableContainer">
                    Role
                </div>
                <label className='role'>

                    isAdmin
                    <input type="checkbox"
                        id='isAdmin'
                        checked={admin}
                        onChange={handleCheck}
                    />

                </label><br /><br />



                <button onClick={handleUpdate}>Update</button>

            </div>
            <div className="backBtn">
                <IconButton onClick={() => navigate(-1)}>
                    <ArrowCircleLeftIcon color="primary" />Back
                </IconButton>
            </div>
        </div>
    )
}

export default Editusers
