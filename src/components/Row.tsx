import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { ICourse, IProject } from '../types';

// remove duplicated bottom border in each row
const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

type RowProps = {
  course: ICourse;
};

const Row: React.FC<RowProps> = ({ course }) => {
  const [open, setOpen] = useState(false);
  const classes = useRowStyles();

  const isDesktopOrLaptop = useMediaQuery('(min-width:992px)');

  const boxMargin = isDesktopOrLaptop ? 8 : 1;

  return (
    <>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
            role="button">
            {open ? (
              <KeyboardArrowUpIcon fontSize="large" />
            ) : (
              <KeyboardArrowDownIcon fontSize="large" />
            )}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          <Typography variant="h5" component="h5">
            {course.course}
          </Typography>
        </TableCell>
        <TableCell align="right">
          <Typography variant="h5" component="h5">
            {course.openedLessonsCount}
          </Typography>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box marginX={boxMargin} marginY={1}>
              <Typography variant="h5" gutterBottom component="h5">
                Projects
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <Typography variant="h6" gutterBottom component="h6">
                        Name
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="h6" gutterBottom component="h6">
                        Completed Lessons
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {course.projects &&
                    course.projects.map((project: IProject) => (
                      <TableRow key={project.project}>
                        <TableCell component="th" scope="row">
                          <Typography variant="body1" gutterBottom>
                            {project.project}
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Typography variant="body1" gutterBottom>
                            {project.completedLessonsCount}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default Row;
