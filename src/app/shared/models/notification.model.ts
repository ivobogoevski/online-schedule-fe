import { IClass } from "./class.model";
import { ITeacher } from "./teacher.model";

export interface INotification {
  NotificationId: number;
  NotificationContent: string;
  NotificationDate: string;
  EditDate: string;
  Class: IClass;
  Teacher: ITeacher;
}
