import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { updateSub, displaySub } from '../../../functions/sub';
import { listCatagory } from '../../../functions/catagory';
import HashLoader from "react-spinners/HashLoader";



const EditSub = () => {

    const { slug, id } = useParams();

    const [catagories, setCatagories] = useState([]);
    const [cataName, setCataname] = useState(slug);
    const [loading, setLoading] = useState(false);
    const [parentCata, setParentCata] = useState('')



    const token = useSelector(state => state.token);

    const navigate = useNavigate();



    const handleChange = (e) => {
        setCataname(e.target.value);
    }
    const handleSelect = (e) => {
        setParentCata(e.target.value)
    }

    const handleSubmit = (e, slug) => {
        e.preventDefault();
        setLoading(true)

        updateSub(slug, cataName, parentCata, token)
            .then(res => {
                toast.success(res.data.msg);
                setLoading(true);
                navigate('/admin/subcatagory')
            }).catch((err) => {
                if (err.response.data) toast.error(err.response.data);

            })

        setCataname('');

    }


    useEffect(() => {
        setLoading(true);
        displaySub(slug)
            .then((res) => {
                setCataname(res.data.name);

            });
        listCatagory(token).then((res) => {
            setCatagories(res.data)
            setLoading(false);
        });


    }, [])

    return (

        <div className='catagoryContainer'>
            <div className="col">

                {
                    loading ?
                        <HashLoader /> :
                        <>
                            <div className="head">
                                <h4>Update Sub-Catagory</h4>
                            </div>
                            <div className="formContainer">
                                <form onSubmit={(e) => handleSubmit(e, slug)}>
                                    <label>
                                        <div className="lableContainer">
                                            Catagory:
                                        </div>

                                        <div className="inputContainer">
                                            <select onChange={(e) => handleSelect(e)} >
                                                <option value={'none'}>Please select</option>
                                                {catagories.map((cata) =>

                                                    <option value={cata._id} key={cata._id} selected={(cata._id == id)}>{cata.name}</option>


                                                )}
                                            </select>
                                        </div>

                                    </label><br /><br />
                                    <label>
                                        <div className="lableContainer">
                                            Sub:
                                        </div>
                                        <div className="inputContainer">
                                            <input type="text"
                                                name='name'
                                                value={cataName}
                                                onChange={(e) => handleChange(e)}
                                                autoFocus required />
                                        </div>
                                    </label><br /><br />
                                    <input className='btn' type="submit" value="Update" />

                                </form>
                            </div>
                        </>
                }

            </div>
        </div >
    )
}

export default EditSub
