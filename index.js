import express from 'express';
import cors from 'cors';
import env from './env.js';
import ConnectDB from './src/config/db.js';
import dashboardRoutes from './src/routes/dashboard/DashboardRoutes.js';
import { cwd } from 'process';
import frontendRoutes from './src/routes/frontend/FrontendRoutes.js';
import { webhookRouter } from './src/routes/frontend/main-routes/webhookrouter.js';

const app = express();
app.use(cors());
app.use('/webhook', express.raw({type: 'application/json'}), webhookRouter);
app.use(express.json());
app.use('/uploads', express.static(cwd() + '/uploads', { maxAge: 31557600 }));
const port = env.PORT;
app.use('/dashboard/api', dashboardRoutes);
app.use('/frontend/api', frontendRoutes);

ConnectDB();
app.listen(port, () => {
	console.log(`server is listening on port number: ${port}`);
});
