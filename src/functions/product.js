import axios from '../axios/axios';



export const createProduct = async (product, token) => {
    try {
        const create = await axios.post(`/products/create`, product, {
            headers: { Authorization: token }
        });

        return create
    } catch (error) {
        console.log(error)

        return error
    }

}

export const listProductByCount = async (count) => {
    try {
        const product = await axios.get(`/products/list/${count}`);

        return product
    } catch (error) {
        console.log(error)

        return error
    }

}

export const displayProduct = async (slug) => {
    try {
        const product = await axios.get(`/products/product/${slug}`);

        return product
    } catch (error) {
        console.log(error)

        return error
    }
}


export const deleteProduct = async (slug) => {
    try {
        const product = await axios.delete(`/products/product/${slug}`);

        return product
    } catch (error) {
        console.log(error)

        return error
    }
}


export const updateProduct = async (slug, product, token) => {


    console.log(slug, product)
    try {
        const create = await axios.put(`/products/product/${slug}`, product, {
            headers: { Authorization: token }
        });

        return create
    } catch (error) {
        console.log(error)

        return error
    }

}

export const listProduct = async (sort, order, page) => {
    try {
        const product = await axios.post(`/products/sortProduct`, {
            sort,
            order,
            page
        });

        return product
    } catch (error) {
        console.log(error)

        return error
    }
}

export const getProductCount = async () => {
    try {
        const count = await axios.get(`products/count`)
        return count

    } catch (error) {
        console.log(error)
        return error
    }

}