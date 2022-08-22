import axios from '../axios/axios';

export const userCart = async (cart, token) => {
    await axios.post('user/cart', { cart }, {
        headers: { Authorization: token }
    })
}