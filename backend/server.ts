import Server from "./index";
import ConnectToMongoDB from './config/db'

const server = new Server(3000)

server.start()
ConnectToMongoDB.connect()