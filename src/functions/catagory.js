
import axios from '../axios/axios';



export const createCatagory = async (catagory, token) => {
    try {
        const create = await axios.post(`/catagories/create`, { name: catagory.cataName }, {
            headers: { Authorization: token }
        });

        return create
    } catch (error) {

        return error.response
    }

}

export const listCatagory = async (token) => {

    try {
        const list = await axios.get('/catagories/list', {
            headers: { Authorization: token }
        });

        return list
    } catch (error) {

        return error.response
    }

}

export const displayCatagory = async (slug) => {

    try {
        const read = await axios.get(`/catagories/catagory/${slug}`);

        return read
    } catch (error) {

        return error.response
    }


}

export const updateCatagory = async (slug, catName, token) => {


    try {
        const update = await axios.put(`/catagories/catagory/${slug}`, { name: catName }, {
            headers: { Authorization: token }
        });

        return update
    } catch (error) {

        return error.response
    }

}


export const deleteCatagory = async (slug, token) => {
    try {
        const dlt = await axios.delete(`/catagories/catagory/${slug}`, {
            headers: { Authorization: token }
        });

        return dlt
    } catch (error) {

        return error.response
    }


}

export const getSubsByCata = async (id, token) => {
    try {
        const subs = await axios.get(`/catagories/catagory/subs/${id}`, {
            headers: { Authorization: token }
        });

        return subs
    } catch (error) {

        return error.response
    }

}