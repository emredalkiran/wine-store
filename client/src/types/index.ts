export interface ProductState {
  products: Record<string, Record<string, any>>

  isProductsLoading: boolean
  isSavingProduct: boolean
  showError: boolean
  errorMessage: string
}

export interface RootState {
  product: ProductState
}
