import mongoose, { Document, Schema } from 'mongoose';

// 定义投递记录接口
// Define Application Interface
export interface IApplication extends Document {
  user: mongoose.Types.ObjectId;
  company: string;
  position: string;
  status: 'applied' | 'interview' | 'offer' | 'reject';
  date: Date;
  note?: string;
}

// 定义投递记录 Schema
// Define Application Schema
const ApplicationSchema: Schema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['applied', 'interview', 'offer', 'reject'],
      default: 'applied',
    },
    date: {
      type: Date,
      default: Date.now,
    },
    note: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IApplication>('Application', ApplicationSchema);
