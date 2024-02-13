import Server from "./server";
import ConnectToMongoDB from './config/db'
import cors from 'cors'
import { json, urlencoded } from 'express';


// importer les routes 
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoute';
import roleRoutes from './routes/roleRoute';

// initiate server and app
const server = new Server();

//midlleware
server.getApp().use(json());
server.getApp().use(urlencoded({ extended: true }));
server.getApp().use(cors());


//midlleware routes
server.getApp().use('/auth', authRoutes);
server.getApp().use('/users', userRoutes);
server.getApp().use('/role', roleRoutes);


server.start();
ConnectToMongoDB.connect();