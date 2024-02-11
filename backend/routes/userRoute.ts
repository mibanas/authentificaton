import { Router } from 'express'

export class userRouter {
    public routes 
    
    constructor() {
        this.routes = Router()
    }

    private initializeRoutes() : void {
        this.routes.get('/')
    }
}