import React, { useState, useEffect } from 'react';
import axios from '../../axios/axios';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { dispatchAllUser, fetchAllUser } from '../../redux/actions/usersAction';
import { toast } from 'react-toastify';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';

import { Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
const Profile = () => {

    const dispatch = useDispatch();

    const auth = useSelector(state => state.auth);
    const token = useSelector(state => state.token);
    const allUsers = useSelector(state => state.users)

    const { user, isAdmin } = auth

    const [data, setData] = useState({
        name: '',
        email: '',
        password: '',
        confirm: '',

    })

    const { name, email, password, confirm } = data;

    const [avatar, setAvatar] = useState(false);
    const [loading, setLoading] = useState(false);
    const [callBack, setCallBack] = useState(false);

    const navigate = useNavigate();


    const handleAvatar = async (e) => {
        e.preventDefault();
        try {

            const file = e.target.files[0];

            console.log(file)

            if (!file) return toast.error("No files were uploaded");

            if (file.size > 1024 * 1024) return toast.error('File size is greater then 1mb');

            if (file.type !== 'image/jpeg' && file.type !== 'image/png')
                return res.status(400).json({ msg: "File type is incorrect" });


            let formData = new FormData();

            formData.append('file', file);



            setLoading(true);
            console.log(formData)
            const res = await axios.post('/api/uploadImage', formData, {
                headers: { 'content-type': 'multipart/form-data', Authorization: token }
            })

            setLoading(false)
            setAvatar(res.data.imgDetails.url);

            return toast.success("Image ready to upload");



        } catch (error) {
            toast.error(error.response.data.msg)

        }

    }

    const handleChange = (e) => {
        const { name, value } = e.target;

        setData({ ...data, [name]: value });
    }

    const updateUser = async () => {
        try {
            await axios.patch('/user/update', {
                name: name ? name : user.name,
                avatar: avatar ? avatar : user.avatar
            }, { headers: { Authorization: token } })

            setData({ ...data, password: '', confirm: '' })
            toast.success("Updated user successfully")

        } catch (error) {
            console.log(error)

            toast.error(error.response.data.msg)
        }


    }

    const updatePassword = async () => {
        if (password !== confirm) {

            toast.warn(`Passwords is do not match`)

        } else if (password.length <= 6) {

            toast.warn(`Password is too small`)

        } else {
            await axios.post('/user/reset', { password: password }, {
                headers: { Authorization: token }
            })
            setData({ ...data, password: '', confirm: '' })
            toast.success(`Password updated successfully`)

        }
    }


    const handleUpdate = () => {
        if (name || avatar) updateUser();
        if (password) updatePassword();


    }

    const handleEdit = (id) => {
        navigate(`/editUser/${id}`)
    }

    const handleDelete = async (id) => {
        try {
            if (window.confirm("Are you sure you want to delete this user account???")) {
                setLoading(true);
                await axios.delete(`user/delete/${id}`, {
                    headers: { Authorization: token }
                });

                setCallBack(!callBack)

            }

        } catch (error) {
            toast.error(error.message)
        }

        setLoading(false);
    }


    useEffect(() => {
        if (isAdmin) {
            fetchAllUser(token).then(res => {
                return dispatch(dispatchAllUser(res))
            })
        }
    }, [token, isAdmin, dispatch, callBack])

    return (
        <>
            <div className="profileContainer">
                <div className=" profile">
                    <h2>{isAdmin ? "Admin Profile" : "User Profile"}</h2>


                    <div className="avatar">
                        <img src={`${avatar ? avatar : user.avatar}`}></img>
                        <span>
                            <input type={'file'}
                                onChange={handleAvatar}
                                name="file"
                                id="file_upload"></input>
                            <CameraAltOutlinedIcon />
                            <p>Change</p>
                        </span>
                    </div>
                    <div className="formGroup">
                        <label>
                            <div className="lableContainer">
                                Name:
                            </div>
                            <div className="inputContainer">
                                <input type="text"
                                    name='name'
                                    value={name}
                                    onChange={handleChange}
                                    placeholder={user.name}
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
                                    defaultValue={user.email}
                                    disabled
                                />
                            </div>
                        </label><br /><br />

                        <label>
                            <div className="lableContainer">
                                Password
                            </div>
                            <div className="inputContainer">
                                <input type="password"
                                    name='password'
                                    value={password}
                                    onChange={handleChange}
                                />
                            </div>
                        </label><br /><br />
                        <label>
                            <div className="lableContainer">
                                Confirm password:
                            </div>
                            <div className="inputContainer">
                                <input type="password"
                                    name='confirm'
                                    value={confirm}
                                    onChange={handleChange}
                                />
                            </div>
                        </label><br /><br />

                        <button disabled={loading}
                            onClick={handleUpdate}>Update</button>

                    </div>
                </div>
                <div className='users'>
                    <h2>{isAdmin ? "Users" : "Orders"}</h2>
                    <div className="usersTable">
                        <table className='customers'>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>NAME</th>
                                    <th>EMAIL</th>
                                    <th>ADMIN</th>
                                    <th>EDIT</th>
                                    <th>DELETE</th>
                                </tr>
                            </thead>
                            <tbody>

                                {
                                    (allUsers) ?
                                        (allUsers.map(user => (
                                            <tr key={user._id} id={user._id} >
                                                <td>{user._id}</td>
                                                <td>{user.name}</td>
                                                <td>{user.email}</td>
                                                <td>{user.role === 1 ? <CheckIcon color='success' /> : <ClearIcon color='error' />}</td>
                                                <td> <Button variant="outlined" onClick={() => handleEdit(user._id)} startIcon={<EditIcon />} color='primary' >
                                                    Edit
                                                </Button></td>
                                                <td> <Button variant="outlined" onClick={() => handleDelete(user._id)} color='error' startIcon={<DeleteIcon />}>
                                                    Delete
                                                </Button></td>
                                            </tr>
                                        ))) :
                                        <></>
                                }

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile;
