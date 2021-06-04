import { IFetchData, ICourse, IProject } from '../types';

const fetcher = (url: string) => {
  return fetch(url)
    .then((response) => response.json())
    .then((data: Array<IFetchData>) => readData(data));
};

const readData = (data: Array<IFetchData>) => {
  // eslint-disable-next-line prefer-const
  let myData: Array<ICourse> = [];

  data.forEach((project: IFetchData) => {
    const indexOfStevie = myData.findIndex(
      (c: ICourse) => c.course === project.course
    );
    if (indexOfStevie === -1) {
      myData.push({
        course: project.course,
        openedLessonsCount: parseInt(project.openedLessonsCount),
        projects: [
          {
            project: project.project,
            completedLessonsCount: project.completedLessonsCount,
          },
        ],
      });
    } else {
      myData[indexOfStevie].openedLessonsCount += parseInt(
        project.openedLessonsCount
      );
      const secondIndex = myData[indexOfStevie].projects.findIndex(
        (j: IProject) => j.project === project.project
      );
      if (secondIndex === -1) {
        myData[indexOfStevie].projects.push({
          project: project.project,
          completedLessonsCount: project.completedLessonsCount,
        });
      } else {
        myData[indexOfStevie].projects[secondIndex].completedLessonsCount +=
          project.completedLessonsCount;
      }
    }
  });

  return myData;
};

export default fetcher;
