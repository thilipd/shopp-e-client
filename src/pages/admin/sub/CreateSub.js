import React, { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { createSub, listSub, deleteSub } from '../../../functions/sub';
import { listCatagory } from '../../../functions/catagory';
import HashLoader from "react-spinners/HashLoader";
import { List, ListItemAvatar, ListItemText, Divider, Avatar, ListItem } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';

const CreateSub = () => {

    const [cataName, setCataname] = useState('');
    const [loading, setLoading] = useState(false);
    const [catagories, setCatagories] = useState([]);
    const [parentCata, setParentCata] = useState("")
    const [subs, setSubs] = useState([]);

    const token = useSelector(state => state.token);

    const navigate = useNavigate();
    const selectInputRef = useRef();

    const handleChange = (e) => {
        setCataname(e.target.value);
    }

    const handleDelete = (slug) => {

        let answer = window.confirm("Delete???");

        if (answer) {
            setLoading(true)
            deleteSub(slug, token)
                .then((res) => {
                    setLoading(false)
                    toast.error(res.data)
                })
                .catch((err) => {
                    if (err.res.data) toast.error(err.res.data)
                })
        }
    }

    const handleSelect = (e) => {
        setParentCata(e.target.value)
    }



    const handleEdit = (slug) => {

        let p_id;
        subs.forEach((sub) => {
            if (sub.slug === slug) p_id = sub.parent

        })

        navigate(`/admin/sub/edits/${p_id}/${slug}`);
    }


    const handleSubmit = (e) => {
        e.preventDefault();

        createSub({ cataName, parent: parentCata }, token)
            .then((res) => {
                toast.success(`${res.data.name} has been added to the sub-catagories`);
                setParentCata('');
                setCataname('');
                selectInputRef.current.value = 'none';

            })
            .catch((err) => {

                if (err.response.data) toast.error(err.response.data)
            })


    }

    const getCatagories = () => {
        listCatagory(token).then((res) => setCatagories(res.data))
    }

    const getSubs = () => {
        listSub(token).then((res) => {

            setSubs(res.data)
        }).catch((err) => {
            console.log(err)
        })

    }

    useEffect(() => {
        getSubs();
        getCatagories();
    }, [loading, cataName])



    return (
        <div>
            <div className='catagoryContainer'>
                <div className="col">

                    {
                        loading ?
                            <HashLoader /> :
                            <>
                                <div className="head">
                                    <h4>Create Sub-Catagory</h4>
                                </div>
                                <div className="formContainer">
                                    <form onSubmit={handleSubmit}>
                                        <label>
                                            <div className="lableContainer">
                                                Catagory:
                                            </div>
                                            <div className="inputContainer">
                                                <select ref={selectInputRef} onChange={(e) => handleSelect(e)} >
                                                    <option value={'none'}>Please select</option>
                                                    {catagories.map((cata) => <option value={cata._id} key={cata._id}>{cata.name}</option>)}
                                                </select>
                                            </div>
                                        </label><br /><br />
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
                        <h4>Sub-Catagories List</h4>
                    </div>
                    <div className="cataListContainer">
                        <br /><br /><br /><br /><br /><br />
                        <List className="catalist">
                            {subs.map((sub) => {
                                return (<>
                                    <ListItem className={'list'} key={sub._id} >

                                        <ListItemText primary={sub.name} />

                                        <ListItemAvatar onClick={() => handleEdit(sub.slug)}>
                                            <Avatar sx={{ bgcolor: '#fff' }} className='edtAvatar'>
                                                <EditIcon color='primary' />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemAvatar onClick={() => handleDelete(sub.slug)}>
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
        </div>
    )
}

export default CreateSub
