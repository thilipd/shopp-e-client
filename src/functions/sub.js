
import axios from '../axios/axios';



export const createSub = async (sub, token) => {
    try {
        const create = await axios.post(`/sub_catagoies/create`, { name: sub.cataName, parent: sub.parent }, {
            headers: { Authorization: token }
        });

        return create
    } catch (error) {

        return error.response
    }

}

export const listSub = async (token) => {

    try {
        const list = await axios.get('/sub_catagoies/list', {
            headers: { Authorization: token }
        });

        return list
    } catch (error) {

        return error.response
    }

}

export const displaySub = async (slug) => {

    try {
        const read = await axios.get(`/sub_catagoies/sub/${slug}`);

        return read
    } catch (error) {

        return error.response
    }


}

export const updateSub = async (slug, catName, parent, token) => {

    try {
        const update = await axios.put(`/sub_catagoies/sub/${slug}`, { name: catName, parent: parent }, {
            headers: { Authorization: token }
        });

        return update
    } catch (error) {

        return error.response
    }

}


export const deleteSub = async (slug, token) => {
    try {
        const dlt = await axios.delete(`/sub_catagoies/sub/${slug}`, {
            headers: { Authorization: token }
        });

        return dlt
    } catch (error) {

        return error.response
    }


}