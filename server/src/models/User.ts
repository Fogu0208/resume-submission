import mongoose, { Document, Schema } from 'mongoose';

// 定义用户接口
// Define User Interface
export interface IUser extends Document {
  username: string;
  password?: string;
  isAdmin: boolean;
}

// 定义用户 Schema
// Define User Schema
const UserSchema: Schema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IUser>('User', UserSchema);
