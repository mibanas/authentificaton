import { config } from "dotenv";
import mongoose from "mongoose";

// Variables d'environnement
config();

const dbName = process.env.DB_NAME
const password = process.env.PASSWORD 
const url = `mongodb+srv://auth:${password}@cluster0.7gicgw1.mongodb.net/${dbName}?retryWrites=true&w=majority`


class dbConnection {
    constructor() {}
    
    async connect() {
        try {
            await mongoose.connect(url, {
                dbName: process.env.DB_NAME
            })
            console.log('Le serveur est connecté à la base de données MongoDB.')
        } catch (error) {
            console.error(`Le serveur ne peut pas se connecter à la base de données : ${error}`)
        }
    }
}

const ConnectToMongoDB = new dbConnection();

export default ConnectToMongoDB;
