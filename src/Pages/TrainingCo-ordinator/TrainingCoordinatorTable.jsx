import React from 'react';
import PropTypes from 'prop-types';
import {
  Table,
  TableContainer,
  Paper,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination,
  styled,
  tableCellClasses,
  Button,
} from '@mui/material';
import { trainingCoordinatorColumns } from '../../Config/constant';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
    fontWeight: 'bold',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const TrainingCoordinatorTable = (props) => {
  const {
    traineeData,
    checks = [],
    count,
    page,
    onPageChange,
    rowsPerPage,
    onRowsPerPageChange,
    rowsPerPageOptions,
    handleOnFeedbackChange,
    traineeId,
  } = props;

  return (
    <TableContainer
      component={Paper}
      sx={{
        marginTop: '10px',
        minWidth: 700,
        width: '97%',
        marginLeft: 'auto',
        marginRight: 'auto',
        flexGrow: 1,
      }}
    >
      <Paper>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              {trainingCoordinatorColumns.map(({ label, field }) => (
                <StyledTableCell align="center" key={trainingCoordinatorColumns[field]}>
                  {label}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {traineeData.map((dataitem) => (
              <StyledTableRow
                key={traineeData}
                traineeData={traineeData}
                value={traineeData}
              >
                {checks.map(({ icon }) => (
                  <StyledTableCell key={dataitem[icon]} align="center">
                    {icon}
                  </StyledTableCell>
                ))}
                {trainingCoordinatorColumns.map(({ field, format }) => (
                  <StyledTableCell key={dataitem[field]} align="center">
                    {format ? format(dataitem[field]) : dataitem[field]}
                  </StyledTableCell>
                ))}
                <StyledTableCell>
                  <Button
                    traineeId={traineeId}
                    variant="contained"
                    onClick={() => handleOnFeedbackChange(dataitem.assignedTrainees)}
                    feedbackData={dataitem}
                  >
                    View

                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={count}
          page={page}
          onPageChange={onPageChange}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={onRowsPerPageChange}
          rowsPerPageOptions={rowsPerPageOptions}
        />
      </Paper>
    </TableContainer>
  );
};

TrainingCoordinatorTable.propTypes = {
  traineeData: PropTypes.arrayOf(PropTypes.string),
  count: PropTypes.number,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number,
  onPageChange: PropTypes.func,
  rowsPerPage: PropTypes.number,
  traineeId: PropTypes.string.isRequired,
  rowsPerPageOptions: PropTypes.arrayOf(PropTypes.string),
  handleOnFeedbackChange: PropTypes.func.isRequired,
  checks: PropTypes.arrayOf(PropTypes.string),
};

TrainingCoordinatorTable.defaultProps = {
  traineeData: {},
  count: 0,
  onRowsPerPageChange: () => { },
  page: 0,
  onPageChange: () => { },
  rowsPerPage: 0,
  rowsPerPageOptions: [],
  checks: [],
};

export default TrainingCoordinatorTable;
