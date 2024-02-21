import app from './index'
import { config } from 'dotenv';
import ConnectToMongoDB from './config/db'


// env variable 
config()
const port =  3030

// data base connexion
ConnectToMongoDB.connect()

app.listen(port, () => {
    console.log(`Server is running at the port ${port}`);
})