import { Db, ObjectID } from 'mongodb'

export interface ProductRepoInterface {
  addProduct(data: Record<string, any>): Promise<any>
  deleteProduct(productId: string): Promise<any>
  updateProduct(data: Record<string, any>): Promise<any>
  findAllProducts(): Promise<any>
}

export class ProductRepository implements ProductRepoInterface {
  db: Db
  constructor(db: Db) {
    this.db = db
  }
  addProduct(data: Record<string, any>): Promise<any> {
    return this.db.collection('wines').insertOne(data)
  }
  deleteProduct(productId: string): Promise<any> {
    return this.db.collection('wines').deleteOne({
      _id: new ObjectID(productId)
    })
  }

  findAllProducts(): Promise<any> {
    return this.db
      .collection('wines')
      .find({}, { projection: { type: 0 } })
      .toArray()
  }

  updateProduct(data: Record<string, any>): Promise<any> {
    const id = data._id
    delete data._id

    return this.db.collection('wines').findOneAndUpdate(
      {
        _id: new ObjectID(id)
      },
      {
        $set: {
          ...data
        }
      },
      { returnOriginal: false }
    )
  }
}
