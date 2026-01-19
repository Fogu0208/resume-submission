import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db';
import authRoutes from './routes/auth';
import applicationRoutes from './routes/applications';

// 加载环境变量
dotenv.config();

// 连接数据库
connectDB();

const app: Express = express();
const port = process.env.PORT || 5000;

// 中间件
app.use(cors());
app.use(express.json());
// 提供前端静态文件  
app.use(express.static('public'));  

// 路由
app.use('/api/auth', authRoutes);
app.use('/api/applications', applicationRoutes);

// 根路由
app.get('/', (req: Request, res: Response) => {
  res.send('InternHub API is running...');
});

// 启动服务器
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
