# InternHub - 实习申请追踪系统

## 📖 项目简介
InternHub 是一个全栈开发的实习申请管理平台，旨在帮助学生高效追踪和管理求职进度。项目采用 **Vue 3 + TypeScript + Node.js** 前后端分离架构，实现了从用户注册登录到申请条目增删改查（CRUD）的完整业务流程，并成功部署于 **Vercel** 平台。


## 🛠️ 技术栈 (Tech Stack)

### 前端 (Frontend)
- **核心框架**: Vue 3 (Composition API)
- **语言**: TypeScript (严格模式)
- **构建工具**: Vite
- **状态管理**: Pinia
- **路由管理**: Vue Router (包含路由守卫)
- **UI 样式**: Tailwind CSS (响应式设计)
- **HTTP 请求**: Axios (封装拦截器处理 JWT)

### 后端 (Backend)
- **运行环境**: Node.js
- **Web 框架**: Express.js
- **数据库**: MongoDB (Mongoose ODM)
- **认证授权**: JWT (JSON Web Tokens)
- **API 规范**: RESTful API

### 部署与运维 (DevOps)
- **托管平台**: Vercel (Serverless Functions)
- **版本控制**: Git
- **包管理**: npm / Monorepo 结构

## ✨ 核心功能与亮点

1.  **安全的身份认证体系**
    - 实现基于 JWT 的用户注册与登录。
    - 前端 Axios 拦截器自动注入 Token。
    - 后端中间件验证 Token 有效性，保护私有路由。

2.  **完整的业务流管理**
    - 仪表盘 (Dashboard) 可视化展示申请状态。
    - 支持申请记录的创建、编辑、删除及状态更新（已投递、面试中、Offer、被拒）。
    - 数据库连接池优化 (Mongoose)，确保高并发下的稳定性。

3.  **工程化与部署**
    - 采用 Monorepo 结构管理前后端代码，便于统一维护。
    - 配置 Vercel Rewrites 实现前后端路由无缝衔接。
    - 环境变量管理 (Environment Variables) 区分开发与生产环境。

## 📂 项目目录结构

```
├── client/                 # 前端项目 (Vue 3 + Vite)
│   ├── src/
│   │   ├── api/           # API 接口封装
│   │   ├── stores/        # Pinia 状态管理
│   │   ├── views/         # 页面组件
│   │   └── ...
├── server/                 # 后端项目 (Express)
│   ├── src/
│   │   ├── config/        # 数据库配置
│   │   ├── models/        # MongoDB 数据模型
│   │   ├── routes/        # API 路由
│   │   └── ...
├── api/                    # Vercel Serverless 入口
└── vercel.json             # 部署配置文件
```

## 🚀 本地运行 (Local Setup)

1. **克隆项目**
   ```bash
   git clone https://github.com/Fogu0208/resume-submission.git
   cd resume-submission
   ```

2. **安装依赖**
   ```bash
   # 安装根目录及子项目依赖
   npm install
   cd client && npm install
   cd ../server && npm install
   ```

3. **配置环境变量**
   - 在 `server` 目录下创建 `.env` 文件，配置 `MONGO_URI` 和 `JWT_SECRET`。
   - 在 `client` 目录下创建 `.env` 文件，配置 `VITE_API_URL`。

4. **启动项目**
   ```bash
   # 启动后端 (server 目录)
   npm run dev

   # 启动前端 (client 目录)
   npm run dev
   ```
