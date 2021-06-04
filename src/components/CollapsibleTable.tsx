import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import Row from './Row';

import { ICourse } from '../types';

interface ICollapsibleTable {
  courses: Array<ICourse>;
}

const CollapsibleTable: React.FC<ICollapsibleTable> = ({ courses }) => {
  if (!courses) {
    return <div>No courses</div>;
  }

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>
              <Typography variant="h4" component="h4">
                Course Name
              </Typography>
            </TableCell>
            <TableCell align="right">
              <Typography variant="h4" component="h4">
                Opened Lessons
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {courses.map((course: ICourse) => (
            <Row key={course.course} course={course} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CollapsibleTable;
