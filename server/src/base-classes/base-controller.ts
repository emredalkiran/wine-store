import express from 'express'
import { RequestData } from '../types'

export default abstract class BaseController {
  getRequestData(req: express.Request): RequestData {
    return {
      body: req.body,
      params: req.params
    }
  }
}
