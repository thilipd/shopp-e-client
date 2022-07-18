import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { createCatagory, listCatagory, deleteCatagory } from '../../../functions/catagory';
import HashLoader from "react-spinners/HashLoader";
import { List, ListItemAvatar, ListItemText, Divider, Avatar, ListItem } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';

const CreateCatagory = () => {

    const [cataName, setCataname] = useState('');
    const [loading, setLoading] = useState(false);
    const [catagories, setCatagories] = useState([]);

    const token = useSelector(state => state.token);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setCataname(e.target.value);
    }

    const handleDelete = (slug) => {

        let answer = window.confirm("Delete???");

        if (answer) {
            setLoading(true)
            deleteCatagory(slug, token)
                .then((res) => {
                    setLoading(false)
                    toast.error(res.data)
                })
                .catch((err) => {
                    if (err.res.data) toast.error(err.res.data)
                })
        }
    }


    const getCatagories = () => {
        listCatagory(token).then((res) => setCatagories(res.data))
    }

    const handleEdit = (slug) => {
        navigate(`/admin/catagory/edits/${slug}`);
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true)

        createCatagory({ cataName }, token)
            .then((res) => {
                toast.success(`${res.data.name} has been added to the catagories`);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                if (err.response.data) toast.error(err.response.data)
            })

        setCataname('');

    }

    useEffect(() => {
        getCatagories();
    }, [loading])




    return (
        <div className='catagoryContainer'>
            <div className="col">

                {
                    loading ?
                        <HashLoader /> :
                        <>
                            <div className="head">
                                <h4>Create Catagory</h4>
                            </div>
                            <div className="formContainer">
                                <form onSubmit={handleSubmit}>
                                    <label>
                                        <div className="lableContainer">
                                            Name:
                                        </div>
                                        <div className="inputContainer">
                                            <input type="text"
                                                name='name'
                                                value={cataName}
                                                onChange={handleChange}
                                                autoFocus required />
                                        </div>
                                    </label><br /><br />
                                    <input className='btn' type="submit" value="Save" />

                                </form>
                            </div>
                        </>
                }

            </div>
            <div className="col cataListCont">
                <div className="head">
                    <h4>Catagories List</h4>
                </div>
                <div className="cataListContainer">
                    <br /><br /><br /><br /><br /><br />
                    <List className="catalist">
                        {catagories.map((cata, i) => {
                            return (<>
                                <ListItem className={'list'} key={i + 1} >

                                    <ListItemText primary={cata.name} />

                                    <ListItemAvatar onClick={() => handleEdit(cata.slug)}>
                                        <Avatar sx={{ bgcolor: '#fff' }} className='edtAvatar'>
                                            <EditIcon color='primary' />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemAvatar onClick={() => handleDelete(cata.slug)}>
                                        <Avatar sx={{ bgcolor: ' #fff' }} className='dltAvatar'>
                                            <DeleteIcon className='dltbtn' />
                                        </Avatar>
                                    </ListItemAvatar>

                                </ListItem>
                                <Divider component="li" /><br /><br />
                            </>)
                        }
                        )}
                    </List>

                </div>
            </div>

        </div>
    )
}

export default CreateCatagory
