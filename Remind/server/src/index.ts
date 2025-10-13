import "dotenv/config";
import express from "express";
import cors from "cors";
import { logger } from "./middlewares/logger.js";
import { ErrorMiddleware } from "./middlewares/error.js";
import { AppError } from "./utils/AppError.js";
import { authRouter } from "./routes/auth-routes.js";
import { HttpStatus } from "./constants/enums.js";
import { dbconnect } from "./utils/dbconnection.js";
import { contentRouter } from "./routes/content-routes.js";
import { shareRouter } from "./routes/brain-routes.js";
const { PORT } = process.env;
const app = express();
app.use(logger);

app.use(express.json());
app.use(cors());

app.use('/api/v1',authRouter);
app.use('/api/v1/content',contentRouter)
app.use('/api/v1/share/',shareRouter)


app.all(/.*/, (req, res, next) => {
  next(new AppError("Invalid Route", HttpStatus.FORBIDDEN))
});

app.use(ErrorMiddleware);

const start = async () => {
  try {
    await dbconnect();
    app.listen(PORT, () => {
      console.log(`Starting server at port :${PORT}`);
    });
  } catch (error) {
    console.error(`Failed to start application:${error}"`);
    process.exit(1);
  }
};

start();
