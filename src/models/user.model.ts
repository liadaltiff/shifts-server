import { ObjectId } from "mongodb";

export default class User {
  constructor(
    public _id: ObjectId,
    public fullName: string,
    public role: string,
    public password?: string
  ) {}
}
