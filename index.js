import express from 'express';
import cors from 'cors';
import env from './env.js';
import ConnectDB from './src/config/db.js';
import dashboardRoutes from './src/routes/dashboard/DashboardRoutes.js';
import {cwd} from 'process';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(cwd() + '/uploads', { maxAge: 31557600 }));
const port = env.PORT;
app.use('/dashboard/api', dashboardRoutes);

// app.post("/sum",(req,res) => {
//     const{number1,number2}= req.query;
//    const sum = Number(number1)+Number(number2);
//     res.send(`${sum}`);

// })

ConnectDB();
app.listen(port, () => {
	console.log(`server is listening on port number: ${port}`);
});
