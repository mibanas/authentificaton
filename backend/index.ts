import express from 'express'
import 'module-alias/register';

class Server {
    private app : express.Application
    private port : number

    constructor(port : number) {
        this.app = express()
        this.port = port
    }

    public start() : void {
        this.app.listen(this.port, () => {
            console.log(`Port is running in the port ${this.port}`);
        })
    }
}



export default Server