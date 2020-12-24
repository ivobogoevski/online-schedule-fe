import { ITeacher } from './teacher.model';
import { IExam } from './exam.model';

export interface IClass {
  Code: string;
  Name: string;
  Study?: string;
  Semester?: number;
  Teacher?: ITeacher;
  Classroom?: string;
  ClassDate?: string;
  Colloquium?: IExam;
  Exam?: IExam;
}
