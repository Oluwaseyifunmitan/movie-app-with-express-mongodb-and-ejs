import mongoose, { Schema } from "mongoose";

export interface userAttributes {
  _id?: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

const userSchema = new Schema(
  {
    firstname: {
      type: String,
    },
    lastname: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
    },
  },
  { timestamps: true }
);

const userInstance = mongoose.model<userAttributes>("User", userSchema);

export default userInstance;
