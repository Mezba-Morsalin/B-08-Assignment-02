import express, { type Application, type Request, type Response } from "express"
import logger from "./middleware/logger";
import { authRoute } from "./modules/auth/auth.route";
const app : Application = express()

app.use(express.json())
app.use(express.text())
app.use(express.urlencoded())
app.use(logger)

app.get("/", (req : Request, res : Response) => {
    res.status(200).json({
        success : true,
        message : "This is Express Root Route",
    })
});

app.use("/api/v1/auth", authRoute)
export default app