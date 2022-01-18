import { ObjectId } from "mongodb";

export default class Shift {
  constructor(
    public _id: ObjectId,
    public shiftDate: string,
    public shiftName: string,
    public shiftPerson: string,
    public shiftPersonId: string,
    public shiftStartTime: string,
    public shiftEndTime: string
  ) {}
}
