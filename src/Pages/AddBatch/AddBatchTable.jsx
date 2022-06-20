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
} from '@mui/material';
import { addBatchTableColumns } from '../../Config/constant';

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

const AddBatchTable = (props) => {
  const {
    data,
    actions = [],
    count,
    page,
    onPageChange,
    rowsPerPage,
    onRowsPerPageChange,
    rowsPerPageOptions,
    setIndex,
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
              {addBatchTableColumns.map(({ label, field }) => (
                <StyledTableCell align="center" key={addBatchTableColumns[field]}>
                  {label}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((dataitem, index) => (
              <StyledTableRow
                key={data}
                data={data}
                value={data}
              >
                {addBatchTableColumns.map(({ field, format }) => (
                  <StyledTableCell key={dataitem[field]} align="center">
                    {format ? format(dataitem[field]) : dataitem[field]}
                  </StyledTableCell>
                ))}
                {actions.map(({ icon }) => (
                  <StyledTableCell
                    onClick={() => {
                      setIndex(index);
                    }}
                  >
                    {icon}
                  </StyledTableCell>
                ))}
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

AddBatchTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.string),
  actions: PropTypes.arrayOf(PropTypes.string),
  count: PropTypes.number,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number,
  onPageChange: PropTypes.func,
  rowsPerPage: PropTypes.number,
  rowsPerPageOptions: PropTypes.arrayOf(PropTypes.string),
  setIndex: () => {},
};

AddBatchTable.defaultProps = {
  data: {},
  actions: [],
  count: 0,
  onRowsPerPageChange: () => { },
  page: 0,
  onPageChange: () => { },
  rowsPerPage: 0,
  rowsPerPageOptions: [],
  setIndex: () => {},
};

export default AddBatchTable;
