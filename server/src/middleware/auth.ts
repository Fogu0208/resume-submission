import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/User';

interface JwtPayload {
  id: string;
}

// 保护路由的中间件
// Middleware to protect routes
export const protect = async (req: Request, res: Response, next: NextFunction) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // 获取 token (Bearer <token>)
      token = req.headers.authorization.split(' ')[1];

      // 验证 token
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;

      // 获取用户信息并附加到 request 对象
      req.user = await User.findById(decoded.id).select('-password') as IUser;

      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: '未授权，Token 验证失败' });
    }
  }

  if (!token) {
    res.status(401).json({ message: '未授权，没有 Token' });
  }
};

// 管理员中间件
// Middleware for admin access
export const admin = (req: Request, res: Response, next: NextFunction) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).json({ message: '未授权，仅管理员可访问' });
  }
};
