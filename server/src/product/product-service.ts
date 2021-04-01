import {
  productSchema,
  productUpdateSchema,
  validateFieldNames
} from './product-schema'
import { ValidationError } from '../utils/errors'
import { ProductRepoInterface } from './product-repository'
import { RequestData } from '../types'

export interface ProductServiceInterface {
  productRepository: ProductRepoInterface
  addProduct(request: RequestData): Promise<string>
  deleteProduct(request: RequestData): Promise<string>
  updateProduct(request: RequestData): Promise<string>
  findAllProducts(): Promise<string>
}

export class ProductService {
  productRepository: ProductRepoInterface
  constructor(productRepository: ProductRepoInterface) {
    this.productRepository = productRepository
  }

  async findAllProducts(): Promise<string> {
    const queryResult = await this.productRepository.findAllProducts()
    const result = {
      success: 'true',
      products: queryResult
    }
    return JSON.stringify(result)
  }

  async addProduct(request: RequestData): Promise<string> {
    const { error, value } = productSchema.validate(request.body)
    if (error) {
      throw new ValidationError(error)
    }
    const result = await this.productRepository.addProduct(value)

    const response = {
      success: true,
      result: result.ops
    }

    return JSON.stringify(response)
  }

  async deleteProduct(request: RequestData): Promise<string> {
    const { id } = request.params
    if (!id) {
      throw new ValidationError('No id provided')
    }
    const result = await this.productRepository.deleteProduct(id)
    if (result.deletedCount === 1) {
      const response = {
        success: true
      }
      return JSON.stringify(response)
    } else {
      throw new ValidationError('No document matches given id')
    }
  }

  async updateProduct(request: RequestData): Promise<string> {
    if (!request.body.fields || !validateFieldNames(request.body.fields))
      throw new ValidationError('Invalid request')

    const { error, value } = productUpdateSchema.validate(request.body.fields)
    if (error) {
      throw new ValidationError(error)
    }
    const result = await this.productRepository.updateProduct(value)
    console.log('Result ', result)
    const response = {
      success: true,
      result: result.value
    }

    return JSON.stringify(response)
  }
}
