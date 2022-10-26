
import 'express-async-errors'
import express from 'express'
import cors from 'cors'
import { AppDataSource } from './data-source'
import { errorMiddleware } from './middlewares/error'
import routes from './routes'

//Primeiro conecta com o banco e depois configura o servidor
AppDataSource.initialize().then(() => {
	const app = express()

	app.use(express.json())

	app.use(cors())

	app.use(routes)

	// app.use(errorMiddleware)
	return app.listen(process.env.PORT)
})