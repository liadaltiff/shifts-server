import { ObjectId } from "mongodb";

// export interface IUser extends Document {
//   _id: String;
//   fullName: String;
//   role: String;
//   password: String;
// }

// const user: Schema = new Schema(
//   {
//     _id: {
//       type: String,
//       required: true,
//     },
//     fullName: {
//       type: String,
//       required: true,
//     },
//     role: {
//       type: String,
//       required: true,
//     },
//     password: {
//       type: String,
//       required: true,
//     },
//   },
//   { versionKey: false }
// );

// export default model<IUser>("User", user);

export default class User {
  constructor(
    public _id: ObjectId,
    public fullName: string,
    public role: string,
    public password: string
  ) {}
}
