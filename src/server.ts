import express, { type Request, type Response } from "express"
const app = express()
const port = 5000

app.get("/", (req : Request, res : Response) => {
    res.status(200).json({
        success : true,
        message : "This is Express Root Route",
    })
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})