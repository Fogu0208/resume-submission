import express, { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { protect } from '../middleware/auth';

const router = express.Router();

// 生成 JWT
const generateToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET as string, {
    expiresIn: '30d',
  });
};

// @route   POST /api/auth/register
// @desc    注册用户 (Register User)
// @access  Public
router.post('/register', async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;

  try {
    // 检查用户是否存在
    const userExists = await User.findOne({ username });
    if (userExists) {
      res.status(400).json({ message: '用户已存在' });
      return;
    }

    // 加密密码
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 创建用户
    const user = await User.create({
      username,
      password: hashedPassword,
    });

    if (user) {
      res.status(201).json({
        _id: user.id,
        username: user.username,
        isAdmin: user.isAdmin,
        token: generateToken(user.id),
      });
    } else {
      res.status(400).json({ message: '无效的用户数据' });
    }
  } catch (error) {
    res.status(500).json({ message: '服务器错误' });
  }
});

// @route   POST /api/auth/login
// @desc    用户登录 (Login User)
// @access  Public
router.post('/login', async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;

  try {
    // 查找用户
    const user = await User.findOne({ username });

    // 验证密码
    if (user && (await bcrypt.compare(password, user.password as string))) {
      res.json({
        _id: user.id,
        username: user.username,
        isAdmin: user.isAdmin,
        token: generateToken(user.id),
      });
    } else {
      res.status(401).json({ message: '用户名或密码错误' });
    }
  } catch (error) {
    res.status(500).json({ message: '服务器错误' });
  }
});

// @route   GET /api/auth/me
// @desc    获取当前用户信息 (Get Current User)
// @access  Private
router.get('/me', protect, async (req: Request, res: Response) => {
  res.json({
    _id: req.user?._id,
    username: req.user?.username,
    isAdmin: req.user?.isAdmin,
  });
});

export default router;
