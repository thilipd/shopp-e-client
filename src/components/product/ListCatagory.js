
import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import HashLoader from 'react-spinners/HashLoader';
import { listCatagory } from '../../functions/catagory';
import Chip from '@mui/material/Chip';
import { useSelector } from 'react-redux';
import { Button } from '@mui/material';


const ListCatagory = () => {

    const [catagories, setCatagories] = useState([]);
    const [loading, setLoading] = useState(false);

    const token = useSelector(state => state.token);
    const navigate = useNavigate();

    const handleClick = (slug) => {
        navigate(`/admin/catatgory/${slug}`)
    }


    const loadData = () => {

        setLoading(true);

        listCatagory(token).then(res => setCatagories(res.data));

        setLoading(false);

    }

    useEffect(() => {
        loadData()
    }, [])



    return (
        <div>
            {loading ?
                <>
                    <HashLoader />
                </> :
                <>
                    <br />
                    <br />
                    <br />
                    <div className="cataBtn">
                        {catagories ? catagories.map((cata) => <Button className='homeCataBtn' onClick={() => handleClick(cata.slug)}
                            variant="outlined"
                            key={cata._id} >{cata.name}</Button>) : <></>}
                    </div>
                    <br />
                    <br />
                    <br />
                </>}
        </div >
    )
}

export default ListCatagory
