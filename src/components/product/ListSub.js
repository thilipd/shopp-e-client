import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HashLoader from 'react-spinners/HashLoader';
import { listSub } from '../../functions/sub';
import { useSelector } from 'react-redux';
import { Button } from '@mui/material';


const ListSubs = () => {

    const [subs, setSubs] = useState([]);
    const [loading, setLoading] = useState(false);

    const token = useSelector(state => state.token);
    const navigate = useNavigate();

    const handleClick = (slug) => {
        navigate(`/admin/sub/${slug}`)
    }


    const loadData = () => {

        setLoading(true);

        listSub(token).then(res => setSubs(res.data));

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
                        {subs ? subs.map((sub) => <Button className='homeCataBtn' onClick={() => handleClick(sub.slug)}
                            variant="outlined"
                            key={sub._id} >{sub.name}</Button>) : <></>}
                    </div>
                    <br />
                    <br />
                    <br />
                </>}
        </div >
    )
}

export default ListSubs;
