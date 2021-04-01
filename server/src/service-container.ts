import { Db } from 'mongodb'
import {
  ProductRepoInterface,
  ProductRepository
} from './product/product-repository'
import {
  ProductServiceInterface,
  ProductService
} from './product/product-service'
import { ErrorMesages, errorMessages } from './utils/error-messages'

export interface ServiceContainer {
  product: {
    repository: ProductRepoInterface
    service: ProductServiceInterface
  }
  errorMessages: ErrorMesages
}

export function creaeteServiceContainer(db: Db): ServiceContainer {
  const productRepository = new ProductRepository(db)
  const productService = new ProductService(productRepository)

  return {
    product: {
      repository: productRepository,
      service: productService
    },
    errorMessages: errorMessages
  }
}
