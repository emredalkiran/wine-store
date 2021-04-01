import ProductController from './produt-controller'
import express from 'express'
import { Router } from '../base-classes/interfaces'
import { ServiceContainer } from '../service-container'

export class ProductRouter implements Router {
  app: express.Application
  productController: ProductController
  constructor(app: express.Application, serviceContainer: ServiceContainer) {
    this.app = app
    this.productController = new ProductController(
      serviceContainer.product.service
    )
    this.setRoutes()
  }
  setRoutes() {
    this.app.get(
      '/api/v1/products',
      (req: express.Request, res: express.Response) =>
        this.productController.findAllProducts(req, res)
    )
    this.app.post(
      '/api/v1/products/add',
      (req: express.Request, res: express.Response) =>
        this.productController.addProduct(req, res)
    )
    this.app.delete(
      '/api/v1/products/delete/:id',
      (req: express.Request, res: express.Response) =>
        this.productController.deleteProduct(req, res)
    )
    this.app.put(
      '/api/v1/products/update',
      (req: express.Request, res: express.Response) =>
        this.productController.updateProduct(req, res)
    )
  }
}
