import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'
import mongoose, { ConnectOptions } from "mongoose"
import cors from "cors"
import eventRoutes from "./routes"

dotenv.config({path: './.env'});

const app: Express = express();
const port: string | number = process.env.PORT || 8000

app.use(cors())
app.use(express.json())
app.use(eventRoutes)

const uri: string = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_DB}.greb8ew.mongodb.net/?retryWrites=true&w=majority`

type connectOptions = {
  useNewUrlParser: boolean
  useUnifiedTopology: boolean
}

const options : ConnectOptions & connectOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

// app.listen(port, () => {
//   console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
// });

mongoose.connect(uri, options)
  .then(() => 
    app.listen(port, () =>
      console.log(`Server running on http://localhost:${port}`)
    )
  )
  .catch((error) => {
    throw error
  })