export interface IFetchData {
  project: string;
  course: string;
  person: string;
  email: string;
  department: string;
  location: string;
  courseStartedDate: string;
  openedLessonsCount: string;
  completedDate: string;
  completedLessonsCount: number;
  totalLessonsCount: number;
  haveNotStarted: string;
  notOnSchedule: string;
  haveStarted: string;
  quizScore: number;
  quizScoreTotal: number;
  certificateTitle: string | null;
}

export interface ICourse {
  course: string;
  openedLessonsCount: number;
  projects: Array<ProjectType>;
}

export type ProjectType = {
  project: string;
  completedLessonsCount: number;
};
