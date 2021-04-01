import express from 'express'
import expressWinston from 'express-winston'
import helmet from 'helmet'
import winston from 'winston'
import cors from 'cors'
import { ServiceContainer } from './service-container'

import { ProductRouter } from './product/product-router'

export class App {
  instance: express.Application
  constructor() {
    this.instance = express()
  }

  private setRoutes(serviceContainer: ServiceContainer): void {
    const productRouter = new ProductRouter(this.instance, serviceContainer)
  }

  configureApp(serviceContainer: ServiceContainer): void {
    this.instance.use(helmet())
    this.instance.use(cors())
    this.instance.use(express.urlencoded({ extended: true }))
    this.instance.use(express.json())
    this.instance.use(
      expressWinston.logger({
        transports: [new winston.transports.Console()],
        format: winston.format.combine(
          winston.format.colorize(),
          winston.format.json()
        )
      })
    )
    this.setRoutes(serviceContainer)
    this.instance.use(
      expressWinston.errorLogger({
        transports: [new winston.transports.Console()],
        format: winston.format.combine(
          winston.format.colorize(),
          winston.format.json()
        )
      })
    )
  }
}

export default App
