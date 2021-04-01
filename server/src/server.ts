import env from 'dotenv'
import http from 'http'
import MongoConnection from './utils/database'
import App from './app'
import { creaeteServiceContainer } from './service-container'

async function init() {
  env.config()
  const connectionURL = `mongodb://${process.env.URL}`
  const port = process.env.PORT || 5000
  const databaseConnection = new MongoConnection()
  const app = new App()
  try {
    const db = await databaseConnection.connect(
      connectionURL,
      process.env.DATABASE_NAME!
    )
    console.log(`Connected to ${process.env.DATABASE_NAME} database `)
    console.log('Starting server...')
    const server = http.createServer(app.instance)

    const serviceContainer = creaeteServiceContainer(db)
    app.configureApp(serviceContainer)
    server.listen({ host: 'localhost', port: port }, () =>
      console.log(`Server listening at localhost on port 5000`)
    )
  } catch (err) {
    console.log(err)
  }
}

init()
