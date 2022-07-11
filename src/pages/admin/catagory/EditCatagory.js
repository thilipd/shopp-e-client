import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { updateCatagory, displayCatagory } from '../../../functions/catagory';
import HashLoader from "react-spinners/HashLoader";



const EditCatagory = () => {


    const { slug } = useParams();


    const [cataName, setCataname] = useState('');
    const [loading, setLoading] = useState(false);


    const token = useSelector(state => state.token);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setCataname(e.target.value);
    }




    // const getCatagories = () => {
    //     listCatagory(token).then((res) => setCatagories(res.data))
    // }


    const handleSubmit = (e, slug) => {
        e.preventDefault();
        setLoading(true)

        console.log(slug);



        updateCatagory(slug, cataName, token)
            .then(res => {
                console.log(res.data)
                toast.success(res.data.msg);
                setLoading(true)
                navigate('/admin/catagory');
            }).catch((err) => {
                console.log(err);
                if (err.response.data) toast.error(err.response.data)
            })



    }

    useEffect(() => {

        displayCatagory(slug)
            .then((res) => setCataname(res.data.name));
        // getCatagories();
    }, [loading])




    return (
        <div className='catagoryContainer'>
            <div className="col">

                {
                    loading ?
                        <HashLoader /> :
                        <>
                            <div className="head">
                                <h4>Update Catagory</h4>
                            </div>
                            <div className="formContainer">
                                <form onSubmit={(e) => handleSubmit(e, slug)}>
                                    <label>
                                        <div className="lableContainer">
                                            Name:
                                        </div>
                                        <div className="inputContainer">
                                            <input type="text"
                                                name='name'
                                                value={slug}
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
            {/* <div className="col cataListCont">
                <div className="head">
                    <h4>Catagories List</h4>
                </div>


            </div> */}
        </div>


    )
}

export default EditCatagory
