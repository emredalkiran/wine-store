import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { ProductState, RootState } from '../../types'

interface ProductData {
  data: Record<string, any>
}

interface ProductUpdateData {
  updateData: Record<string, any>
}

const initialState: ProductState = {
  products: {},
  isProductsLoading: false,
  isSavingProduct: false,
  showError: false,
  errorMessage: ''
}
const url = 'http://localhost:5000/api/v1'
export const getProducts = createAsyncThunk('product/getProducts', async () => {
  const response = await axios.get(`${url}/products`)
  return response.data
})

export const deleteProduct = createAsyncThunk(
  'product/deleteProduct',
  async ({ id }: { id: string }) => {
    const response = await axios.delete(`${url}/products/delete/${id}`)
    return { ...response.data, id: id }
  }
)
export const addProduct = createAsyncThunk(
  'product/addProduct',
  async ({ data }: ProductData) => {
    const response = await axios.post(`${url}/products/add`, {
      ...data
    })
    return response.data
  }
)
export const updateProduct = createAsyncThunk(
  'product/updateProduct',
  async ({ updateData }: ProductUpdateData) => {
    const response = await axios.put(`${url}/products/update`, {
      fields: updateData
    })
    return response.data
  }
)

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    changeProductStock(state, action) {}
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state, action) => {
        state.isProductsLoading = true
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.isProductsLoading = false
        action.payload.products.forEach((product: Record<string, any>) => {
          state.products[product._id] = product
        })
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.isProductsLoading = false
      })
      .addCase(addProduct.pending, (state, action) => {
        state.isSavingProduct = true
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.isSavingProduct = false
        state.products[action.payload.result[0]._id] = action.payload.result[0]
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.isProductsLoading = false
        state.showError = true
        state.errorMessage = 'Oops, something went wrong'
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.products[action.payload.result._id] = action.payload.result
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        delete state.products[action.payload.id]
      })
  }
})

export const { changeProductStock } = productSlice.actions
export const selectIsSaving = (state: RootState) =>
  state.product.isSavingProduct
export const selectProducts = (state: RootState) => state.product.products
const reducer = productSlice.reducer
export default reducer
