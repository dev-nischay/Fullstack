import express from "express"
const app  = express();
import mongoose from "mongoose";
import 'dotenv/config'
import logger from "./middlewares/logger.js";
import cors from "cors"
const PORT = 3000;
import userRouter from "./routes/user-routes.js";
app.use(express.json());
app.use(logger)
app.use(cors({ origin:"http://localhost:5173"}))

app.use("/user",userRouter)
// app.use("/admin",adminRouter)



app.use((err,req,res,next) => {
   return res.status(500).json({message:`Something went wrong Error:${err.message}`})
})


app.use((req,res,next) => {
   return res.status(500).json({message:`Invalid Route`})
})



const main  = async() => {
    await mongoose.connect(process.env.MONGO_URL)
    app.listen(PORT,() => {
        console.log(`server running on Port:${PORT}...`)
    })
}

main()