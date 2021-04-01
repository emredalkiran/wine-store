import express from 'express'
import { silly } from 'winston'
import BaseController from '../base-classes/base-controller'
import { httpHeader, statusCode } from '../utils/http-header'
import { ProductServiceInterface } from './product-service'

export default class UserController extends BaseController {
  productService: ProductServiceInterface
  constructor(productService: ProductServiceInterface) {
    super()
    this.productService = productService
  }
  async findAllProducts(
    req: express.Request,
    res: express.Response
  ): Promise<void> {
    try {
      const response = await this.productService.findAllProducts()
      res.set(httpHeader.json).status(statusCode.success).send(response)
    } catch (err) {
      console.log(err)
      res
        .set(httpHeader.json)
        .status(statusCode.internalError)
        .send({
          response: {
            success: false,
            error: err.errorMessage
          }
        })
    }
  }

  async addProduct(req: express.Request, res: express.Response): Promise<void> {
    const reqData = this.getRequestData(req)
    try {
      const response = await this.productService.addProduct(reqData)
      res.set(httpHeader.json).status(statusCode.success).send(response)
    } catch (err) {
      res
        .set(httpHeader.json)
        .status(statusCode.badRequest)
        .send({
          response: {
            success: false,
            error: err.errorMessage
          }
        })
    }
  }
  async deleteProduct(
    req: express.Request,
    res: express.Response
  ): Promise<void> {
    const reqData = this.getRequestData(req)
    console.log('Req data: ', reqData)
    try {
      const response = await this.productService.deleteProduct(reqData)
      res.set(httpHeader.json).status(statusCode.success).send(response)
    } catch (err) {
      console.log(err)
      res
        .set(httpHeader.json)
        .status(statusCode.badRequest)
        .send({
          response: {
            success: false,
            error: err.errorMessage
          }
        })
    }
  }
  async updateProduct(
    req: express.Request,
    res: express.Response
  ): Promise<void> {
    const reqData = this.getRequestData(req)
    try {
      const response = await this.productService.updateProduct(reqData)
      res.set(httpHeader.json).status(statusCode.success).send(response)
    } catch (err) {
      console.log(err)
      res
        .set(httpHeader.json)
        .status(statusCode.badRequest)
        .send({
          response: {
            success: false,
            error: err.errorMessage
          }
        })
    }
  }
}
