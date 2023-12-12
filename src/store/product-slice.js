import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// const productInterface = {
//     _id: '',
//     name: '',
//     description: '',
//     quantity: 0,
//     status: '',
//     category: '',
//     freeShipping: true,
//     averageRating: '',
//     user: '',
//     image: '',
//     reviews: []
// }

const initialState = {
    isLoading: false,
    products: [] ,
    imageUrl: '',
    addProductSuccess: false,
    product: {},
    isDeleting: false,
    deleteSuccess: false,
    editSuccess: false,
    isEditing: false,
    reviews: [],
    getProductSuccess: null
}


const baseURL = '/api/v1'
const getAllProducts = createAsyncThunk('products/getAll', async () => {
    try {
        const response = await axios.get(`${baseURL}/products`)
        const products = await response.data
        console.log(products);
        return products
    }catch (e) {
        console.log(e)
    }
})

const uploadImage = createAsyncThunk('products/uploadImg', async(formData) => {
    try {
        const response = await axios.post(`${baseURL}/products/uploadProdImage`, formData)
        const image = await response.data
        const url = image.img.src
        console.log(response);
        return url
    } catch(e) {
        console.log(e)
    }
})

const editProduct = createAsyncThunk('products/edit', async({id, product}) => {
    try {
        console.log(id, product);
        const response = await axios.patch(`${baseURL}/products/${id}`, product)
        const editedProduct = await response.data
        console.log(editedProduct);
        return editedProduct
    } catch(e) {
        console.log(e);
    }
})

const addProduct = createAsyncThunk('products/add', async (product) => {
    try {
        const response = await axios.post(`${baseURL}/products`, product)
        const addedProduct = await response.data
        return addedProduct
    } catch (e) {
        console.log(e);
    }
})

const deleteProduct = createAsyncThunk('products/delete', async (id) => {
    try{
        const response = await axios.delete(`${baseURL}/products/${id}`)
        const deletedProduct = await response.data
        return deletedProduct
    } catch(e) {
        console.log(e)
    }
})


const getOneProdut = createAsyncThunk('products/getOne', async(id) => {
    try {
        const response = await axios.get(`${baseURL}/products/${id}`)
        const getProduct = response.data
        return getProduct
    } catch(e) {
        console.log(e);
    }
})

const getReviews = createAsyncThunk('products/review', async(id) => {
    try {
        const response = await axios.get(`${baseURL}/products/${id}/reviews`)
        const reviews = response.data
        return reviews
    } catch(e) {
        console.log(e);
    }
})

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllProducts.pending, state => {
            state.isLoading = true
        })
        builder.addCase(getAllProducts.fulfilled, (state, action) => {
            state.isLoading = false
            state.products =  action.payload
            state.getProductSuccess = true
        })
        builder.addCase(getAllProducts.rejected, (state, action) => {
            state.isLoading = false;
            state.getProductSuccess = true
        });
        builder.addCase(uploadImage.pending, state => {
            state.isLoading = true
        } )
        builder.addCase(uploadImage.fulfilled, (state, action) => {
            state.imageUrl = action.payload

        })
        builder.addCase(addProduct.pending, state => {

        }) 
        builder.addCase(addProduct.fulfilled, (state, action)=> {
            state.addProductSuccess = true
            state.imageUrl = ''
        }) 
        builder.addCase(deleteProduct.pending, (state) => {
            state.isDeleting = true
        })
        builder.addCase(deleteProduct.fulfilled, (state) => {
            state.deleteSuccess = true
            state.isDeleting = false
            state.imageUrl = ''
        })
        builder.addCase(deleteProduct.rejected, (state)=> {
            state.deleteSuccess = false
            state.isDeleting = false
        })
        builder.addCase(getOneProdut.fulfilled, (state, action) => {
            state.product = action.payload.product
        })
        builder.addCase(editProduct.pending, state => {
            state.isEditing = true
        })
        builder.addCase(editProduct.fulfilled, (state, action) => {
            state.editSuccess = true
            state.isEditing = false
            console.log(action.payload)
            state.product = action.payload.product
            state.imageUrl = ''

        })
        builder.addCase(editProduct.rejected, state => {
            state.editSuccess = false
            state.isEditing = false
        })
        builder.addCase(getReviews.fulfilled, (state,action) => {
            state.product.reviews = action.payload
        })
    }
})

export const productActions = {...productsSlice.actions, getAllProducts, uploadImage, addProduct, deleteProduct, getOneProdut, editProduct, getReviews}
export default productsSlice