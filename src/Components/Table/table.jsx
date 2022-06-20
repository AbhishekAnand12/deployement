import React, { useState } from 'react';
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
import withLoaderAndMessage from '../HOC/withLoaderAndMessage';
import { EditUser, EditBatch } from '../Edit';
import { DeleteUser, DeleteBatch } from '../Delete';

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

const GenericTable = (props) => {
  const {
    data,
    userEditDialog,
    userRemoveDialog,
    userEditDialogClose,
    userRemoveDialogClose,
    handleOnUserEditDialogSubmit,
    handleOnUserRemoveDialogSubmit,
    checks = [],
    count,
    page,
    actions = [],
    onPageChange,
    rowsPerPage,
    onRowsPerPageChange,
    rowsPerPageOptions,
    columns,
    batchEditDialog,
    batchRemoveDialog,
    batchEditDialogClose,
    handleOnBatchEditDialogSubmit,
    batchRemoveDialogClose,
    handleOnBatchRemoveDialogSubmit,
  } = props;

  const [oldData, setOldData] = useState({});

  const handleOnOldData = (dataItem) => {
    setOldData(dataItem);
  };

  return (
    <>
      <EditUser
        userEditDialog={userEditDialog}
        onClose={userEditDialogClose}
        onSubmit={handleOnUserEditDialogSubmit}
        data={oldData}
      />
      <DeleteUser
        userRemoveDialog={userRemoveDialog}
        onClose={userRemoveDialogClose}
        onSubmit={handleOnUserRemoveDialogSubmit}
        data={oldData}
      />
      <EditBatch
        batchEditDialog={batchEditDialog}
        onClose={batchEditDialogClose}
        onSubmit={handleOnBatchEditDialogSubmit}
        data={oldData}
      />
      <DeleteBatch
        batchRemoveDialog={batchRemoveDialog}
        onClose={batchRemoveDialogClose}
        onSubmit={handleOnBatchRemoveDialogSubmit}
        data={oldData}
      />
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
                {columns.map(({ label, field }) => (
                  <StyledTableCell align="center" key={columns[field]}>
                    {label}
                  </StyledTableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((dataitem, index) => (
                <StyledTableRow key={dataitem[index]} onClick={() => {}}>
                  {checks.map(({ icon }) => (
                    <StyledTableCell key={dataitem[icon]} align="center">
                      {icon}
                    </StyledTableCell>
                  ))}
                  {columns.map(({ field, format }) => (
                    <StyledTableCell key={dataitem[field]} align="center">
                      {format ? format(dataitem[field]) : dataitem[field]}
                    </StyledTableCell>
                  ))}
                  {actions.map(({ icon, handler }) => (
                    <StyledTableCell
                      key={dataitem[icon]}
                      align="center"
                      onClick={(event) => {
                        handler(event, index);
                        handleOnOldData(dataitem);
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
    </>
  );
};

GenericTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.string),
  columns: PropTypes.arrayOf(PropTypes.string),
  count: PropTypes.number,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number,
  onPageChange: PropTypes.func,
  rowsPerPage: PropTypes.number,
  rowsPerPageOptions: PropTypes.arrayOf(PropTypes.stirng),
  actions: PropTypes.arrayOf(PropTypes.stirng),
  checks: PropTypes.arrayOf(PropTypes.stirng),
  batchEditDialog: PropTypes.bool,
  batchRemoveDialog: PropTypes.bool,
  userEditDialog: PropTypes.bool,
  userRemoveDialog: PropTypes.bool,
  userEditDialogClose: () => {},
  userRemoveDialogClose: () => {},
  handleOnUserEditDialogSubmit: () => {},
  handleOnUserRemoveDialogSubmit: () => {},
  batchEditDialogClose: PropTypes.func,
  handleOnBatchEditDialogSubmit: PropTypes.func,
  batchRemoveDialogClose: PropTypes.func,
  handleOnBatchRemoveDialogSubmit: PropTypes.func,
};

GenericTable.defaultProps = {
  data: [],
  columns: [],
  count: 0,
  onRowsPerPageChange: () => {},
  page: 0,
  onPageChange: () => {},
  rowsPerPage: 0,
  rowsPerPageOptions: [],
  actions: [],
  checks: [],
  batchEditDialog: false,
  batchRemoveDialog: false,
  userEditDialog: false,
  userRemoveDialog: false,
  userEditDialogClose: () => {},
  userRemoveDialogClose: () => {},
  handleOnUserEditDialogSubmit: () => {},
  handleOnUserRemoveDialogSubmit: () => {},
  batchEditDialogClose: () => {},
  handleOnBatchEditDialogSubmit: () => {},
  batchRemoveDialogClose: () => {},
  handleOnBatchRemoveDialogSubmit: () => {},
};
export default withLoaderAndMessage(GenericTable);
