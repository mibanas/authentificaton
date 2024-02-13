import express, { Application } from 'express';
import dotenv from "dotenv";

dotenv.config()
class Server {
    private app: Application;
    private port: number ;

    constructor() {
        this.app = express();
        this.port = 3030;
    }

    public start(): void {
        this.app.listen(this.port, () => {
            console.log(`Server is running on port ${this.port}`);
        });
    }

    public getApp(): Application {
        return this.app;
    }
}

export default Server;