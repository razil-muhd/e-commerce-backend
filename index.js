import express from "express"; 
import cors from "cors";
import env from "./env.js";
import ConnectDB from "./src/config/db.js";

const app = express();
app.use(cors());
app.use(express.json());
const port = env.PORT;
app.post("/sum",(req,res) => {
    const{number1,number2}= req.query;
 
    const sum = Number(number1)+Number(number2);
    res.send(`${sum}`);
})


ConnectDB();
app.listen(port,()=>{
    console.log(`running on port ${port}`)
})