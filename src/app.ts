import express, { type Application, type Request, type Response } from "express"
import logger from "./middleware/logger";
const app : Application = express()

app.use(logger)
app.get("/", (req : Request, res : Response) => {
    res.status(200).json({
        success : true,
        message : "This is Express Root Route",
    })
});

export default app