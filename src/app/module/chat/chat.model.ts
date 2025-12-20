import mongoose, { Schema, Document, Types } from "mongoose";

export interface IMessage extends Document {
  sender: string | Types.ObjectId;
  recipient: string | Types.ObjectId;
  text: string;
  read: boolean;
  timestamp: Date;
}

const messageSchema = new Schema<IMessage>(
  {
    sender: { type: Schema.Types.ObjectId, ref: "User", required: true },
    recipient: { type: Schema.Types.ObjectId, ref: "User", required: true },
    text: { type: String, required: true },
    read: { type: Boolean, default: false },
    timestamp: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

messageSchema.index({ sender: 1, recipient: 1, timestamp: -1 });

const Message = mongoose.model<IMessage>("Message", messageSchema);
export default Message;
