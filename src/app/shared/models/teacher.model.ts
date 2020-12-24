import { IClass } from './class.model';

export interface ITeacher {
  TeacherId: number;
  Name: string;
  Email?: string;
  Office?: string;
  Classes?: IClass[];
}
