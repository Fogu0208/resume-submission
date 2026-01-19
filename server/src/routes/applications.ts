import express, { Request, Response } from 'express';
import Application from '../models/Application';
import { protect, admin } from '../middleware/auth';

const router = express.Router();

// @route   GET /api/applications
// @desc    获取投递记录 (Get Applications)
// @access  Private
router.get('/', protect, async (req: Request, res: Response) => {
  try {
    let applications;
    
    // 如果是管理员，查看所有记录；否则只查看自己的
    if (req.user?.isAdmin) {
      applications = await Application.find().populate('user', 'username');
    } else {
      applications = await Application.find({ user: req.user?._id });
    }
    
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: '获取数据失败' });
  }
});

// @route   POST /api/applications
// @desc    新增投递记录 (Create Application)
// @access  Private
router.post('/', protect, async (req: Request, res: Response): Promise<void> => {
  const { company, position, status, date, note } = req.body;

  try {
    const application = new Application({
      user: req.user?._id,
      company,
      position,
      status,
      date,
      note,
    });

    const createdApplication = await application.save();
    res.status(201).json(createdApplication);
  } catch (error) {
    res.status(400).json({ message: '创建失败', error });
  }
});

// @route   PUT /api/applications/:id
// @desc    更新投递记录 (Update Application)
// @access  Private
router.put('/:id', protect, async (req: Request, res: Response): Promise<void> => {
  const { company, position, status, date, note } = req.body;

  try {
    const application = await Application.findById(req.params.id);

    if (application) {
      // 检查权限：只有创建者或管理员可以修改
      if (application.user.toString() !== req.user?._id.toString() && !req.user?.isAdmin) {
        res.status(401).json({ message: '没有权限修改此记录' });
        return;
      }

      application.company = company || application.company;
      application.position = position || application.position;
      application.status = status || application.status;
      application.date = date || application.date;
      application.note = note || application.note;

      const updatedApplication = await application.save();
      res.json(updatedApplication);
    } else {
      res.status(404).json({ message: '记录未找到' });
    }
  } catch (error) {
    res.status(400).json({ message: '更新失败' });
  }
});

// @route   DELETE /api/applications/:id
// @desc    删除投递记录 (Delete Application)
// @access  Private
router.delete('/:id', protect, async (req: Request, res: Response): Promise<void> => {
  try {
    const application = await Application.findById(req.params.id);

    if (application) {
      // 检查权限
      if (application.user.toString() !== req.user?._id.toString() && !req.user?.isAdmin) {
        res.status(401).json({ message: '没有权限删除此记录' });
        return;
      }

      await application.deleteOne();
      res.json({ message: '记录已删除' });
    } else {
      res.status(404).json({ message: '记录未找到' });
    }
  } catch (error) {
    res.status(400).json({ message: '删除失败' });
  }
});

export default router;
