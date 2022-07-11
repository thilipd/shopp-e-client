import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import ClipLoader from "react-spinners/ClipLoader";
import HashLoader from "react-spinners/HashLoader";
import axios from '../../../axios/axios';
import { Avatar, Badge } from '@mui/material';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { createProduct } from '../../../functions/product';
import { listCatagory, getSubsByCata } from '../../../functions/catagory';




const intialstate = {
    title: '',
    description: '',
    price: '',
    catagory: '',
    sub: '',
    color: ['black', 'silver', 'blue', 'white', 'red'],
    brand: ['Apple', 'Dell', 'Lenova', 'Asus', 'Samsung'],
    colors: '',
    brands: '',
    shipping: '',
    quantity: '',
    images: []
}

const CreateProduct = () => {

    const [catagories, setCatagories] = useState([]);
    const [subs, setSubs] = useState([]);

    const [values, setValues] = useState(intialstate);
    const [load, setLoad] = useState({
        loading: false,
        img: false,
        imgDlt: false
    });
    const { loading, img, imgDlt } = load


    const token = useSelector(state => state.token)

    const {
        title, description, price, color, brand, quantity
    } = values

    const handleChange = (e) => {

        const { value, name } = e.target;
        setValues({ ...values, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        createProduct(values, token).then((res) => {

            if (res.data) {
                toast.success(res.data.msg)
            }
            if (res.response.data.err) {
                toast.error(res.response.data.err.message)
            }
        })

        setValues(intialstate);
        // setTimeout(window.location.reload(), 6000);
    }

    const fileUploadResize = (e) => {

        console.log(e.target.files)
        let files = e.target.files;
        let allUploadedFiles = values.images

        if (files) {
            for (let i = 0; i < files.length; i++) {

                let file = files[i]
                let fd = new FormData();

                fd.append('images', file);

                setLoad({ ...load, img: true })
                axios.post('/api/product/uploadImage', fd, {
                    onUploadProgress: ProgressEvent => {
                        toast.success(`Upload Progress: ${Math.round(ProgressEvent.loaded / ProgressEvent.total * 100)}%`)
                    }
                }, {
                    headers: {
                        'content-type': 'multipart/form-data',
                        Authorization: token
                    }
                }).then(res => {
                    console.log(res.data.imgDetails)
                    allUploadedFiles.push(res.data.imgDetails);
                    setValues({ ...values, images: allUploadedFiles });
                    setLoad({ ...load, img: false })
                })

            }
        }


    }

    const handleCataChange = (e) => {
        e.preventDefault();
        const { value, name } = e.target;

        setValues({ ...values, [name]: value })

        getSubsByCata(value, token)
            .then((res) => {
                setSubs(res.data)
            })
    }

    const handleImgRemove = (id) => {

        console.log(id)
        setLoad({ ...load, imgDlt: true })
        axios.post('/api/product/removeImage', { public_id: id }, {
            headers: {
                Authorization: token
            }
        }).then((res) => {
            console.log(res)

            const { images } = values;

            const filteredImg = images.filter((item) => {
                return item.public_id !== id
            })

            setValues({ ...values, images: filteredImg });
            setLoad({ ...load, imgDlt: false })

        }).catch(err => {
            console.log(err)
        })


    }

    const handleSubChange = (e) => {
        e.preventDefault();
        const { value, name } = e.target;

        setValues({ ...values, sub: value })
    }

    const getCatagories = () => {
        listCatagory(token).then((res) => {
            setCatagories(res.data)
        })
    }


    useEffect(() => {
        setLoad({ ...load, loading: true })
        getCatagories();
        setLoad({ ...load, loading: false })
    }, [])




    return (


        <div className='productcontainer'>
            {
                loading ?
                    <>
                        <HashLoader />
                    </> :
                    <>
                        <div className="formContainer">
                            <div>
                                <h4>Create Product</h4>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <label>
                                    <div className="lableContainer">
                                        Title:
                                    </div>
                                    <div className="inputContainer">
                                        <input type="text"
                                            name='title'
                                            value={title}
                                            onChange={handleChange}
                                            autoFocus required />
                                    </div>
                                </label><br /><br />
                                <label>
                                    <div className="lableContainer">
                                        Descripton:
                                    </div>
                                    <div className="inputContainer">
                                        <input type="text"
                                            name='description'
                                            value={description}
                                            onChange={handleChange}
                                            autoFocus required />
                                    </div>
                                </label><br /><br />
                                <label>
                                    <div className="lableContainer">
                                        Price:
                                    </div>
                                    <div className="inputContainer">
                                        <input type="number"
                                            name='price'
                                            value={price}
                                            onChange={handleChange}
                                            autoFocus required />
                                    </div>
                                </label><br /><br />
                                <label>
                                    <div className="lableContainer">
                                        Shipping:
                                    </div>
                                    <div className="inputContainer">
                                        <select name='shipping' onChange={handleChange} >
                                            <option value={'none'}>Please select</option>
                                            <option value='yes'>Yes</option>
                                            <option value='no'>No</option>
                                        </select>
                                    </div>
                                </label><br /><br />
                                <label>
                                    <div className="lableContainer">
                                        Quantity:
                                    </div>
                                    <div className="inputContainer">
                                        <input type="text"
                                            name='quantity'
                                            value={quantity}
                                            onChange={handleChange}
                                            autoFocus required />
                                    </div>
                                </label><br /><br />
                                <label>
                                    <div className="lableContainer">
                                        Brands:
                                    </div>
                                    <div className="inputContainer">
                                        <select name='brands' onChange={handleChange} >
                                            <option value={'none'}>Please select</option>
                                            {brand.map((ele, i) => <option value={ele} key={`brands_${i}`}>{ele}</option>)}
                                        </select>
                                    </div>
                                </label><br /><br />

                                <label>
                                    <div className="lableContainer">
                                        Colors:
                                    </div>
                                    <div className="inputContainer">
                                        <select name='colors' onChange={handleChange} >
                                            <option value={'none'}>Please select</option>
                                            {color.map((ele, i) => <option value={ele} key={`colors_${i}`}>{ele}</option>)}
                                        </select>
                                    </div>
                                </label><br /><br />


                                <label>
                                    <div className="lableContainer">
                                        Catagories:
                                    </div>
                                    <div className="inputContainer">
                                        <select name='catagory' onChange={handleCataChange} >
                                            <option value={'none'}>Please select</option>
                                            {catagories.map((ele, i) => <option value={ele._id} key={`cata_${i}`}>{ele.name}</option>)}
                                        </select>
                                    </div>
                                </label><br /><br />

                                {(subs.length !== 0) ?
                                    <>
                                        <label>
                                            <div className="lableContainer">
                                                Subs:
                                            </div>
                                            <div className="inputContainer">
                                                <select name='subs' onChange={handleSubChange} >
                                                    <option value={'none'}>Please select</option>
                                                    {subs.map((ele, i) => <option value={ele._id} key={`sub_${i}`}>{ele.name}</option>)}
                                                </select>

                                            </div>
                                        </label><br /><br />
                                    </> :
                                    <></>
                                }
                                {img ?
                                    <>
                                        <ClipLoader /><br /><br />
                                    </> :
                                    <>
                                        <div className="upImg">
                                            {values.images && values.images.map((img) =>
                                                <Badge overlap="circular"
                                                    key={img.public_id}
                                                    color="error"
                                                    onClick={() => handleImgRemove(img.public_id)}
                                                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                                                    badgeContent='X'>
                                                    {imgDlt ? <>
                                                        <ClipLoader />
                                                    </> : <>
                                                        <Avatar alt={img.original_filename}
                                                            src={img.secure_url}
                                                            variant="rounded"
                                                            sx={{ width: 76, height: 76 }} />
                                                    </>}

                                                </Badge>
                                            )}
                                        </div>
                                    </>}

                                <label className='custom-file-upload'>

                                    Choose Files:
                                    <FileUploadIcon color='success' />

                                    <input type={'file'}
                                        accept='images/*'
                                        onChange={fileUploadResize}
                                        className='upl'
                                        hidden
                                        multiple />
                                </label><br /><br />

                                <input className='btn' type="submit" value="Save" />
                            </form>
                        </div>
                    </>
            }


        </div >


    )
}

export default CreateProduct
