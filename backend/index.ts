import express from 'express'
import { config } from 'dotenv'
import cors from 'cors'
import swaggerUi from 'swagger-ui-express';
import  apiDocumentation  from './docs/apiDocs';

// importer les routes 
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoute';
import roleRoutes from './routes/roleRoute';

const app = express()
app.use(express.json())
app.use(cors())


// middlewares app
app.use(express.urlencoded({ extended: false }))

// env variables
config()

//midlleware routes
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/roles', roleRoutes);


app.use('/documentation', swaggerUi.serve, swaggerUi.setup(apiDocumentation));

// Handle 404 errors
app.use((req, res, next) => {
    res.status(404).send('Not Found');
})

export default app






