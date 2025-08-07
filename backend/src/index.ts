import express from "express";
import cors from "cors";
import taskRouter from "./routers/taskRouters"


const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

app.use('/api/tasks', taskRouter)


app.listen(PORT, () => {
    console.log('server is started from :- '+ PORT)
})