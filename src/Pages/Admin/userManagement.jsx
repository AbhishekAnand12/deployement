import React, {
  useState, useEffect, lazy, Suspense,
} from 'react';
import { Button } from '@mui/material';
import { useQuery } from '@apollo/client';
import { Edit, Delete, Search } from '@mui/icons-material';
import { cols } from '../../Config/constant';
import { GET_ALL_USERS } from '../../ApolloClient';
import {
  SearchBar, SearchIconWrapper, StyledInputBase, userManagementSearchBar,
  addUserButton, addBulkUsersButton,
} from './style';

const GenericTable = lazy(() => import('../../Components/Table/table'));
const AddBulkUsers = lazy(() => import('./addBulkUsers'));
const AddUser = lazy(() => import('./addUser'));

const UserMangement = () => {
  const [rows, setRows] = useState([]);
  const [isDialogOpen, setisDialogOpen] = useState(false);
  const [addBulkUsersDialog, setAddBulkUsersDialog] = useState(false);
  const [userEditDialog, setUserEditDialog] = useState(false);
  const [userRemoveDialog, setUserRemoveDialog] = useState(false);

  const { data = {} } = useQuery(GET_ALL_USERS);

  const userTableData = data?.getUserData;

  useEffect(() => {
    setRows(userTableData);
  }, [userTableData]);

  const requestSearch = (e) => {
    if (e.target.value) {
      const filteredRows = rows.filter((element) => element.name.toLowerCase()
        .includes(e.target.value));
      setRows(filteredRows);
    } else {
      setRows(userTableData);
    }
    return '';
  };

  return (
    <>
      <h2 style={{ marginLeft: '2rem' }}>User Management </h2>
      <Suspense fallback={<div>Loading....</div>}>
        <AddUser
          open={isDialogOpen}
          onClose={() => setisDialogOpen(false)}
          onSubmit={() => setisDialogOpen(false)}
        />
      </Suspense>
      <Suspense fallback={<div>Loading....</div>}>
        <AddBulkUsers
          open={addBulkUsersDialog}
          onClose={() => setAddBulkUsersDialog(false)}
          onSubmit={() => setAddBulkUsersDialog(false)}
        />
      </Suspense>
      <div style={{ width: '97%', marginBottom: '10vh', marginLeft: '13px' }}>
        <SearchBar sx={userManagementSearchBar}>
          <SearchIconWrapper>
            <Search />
          </SearchIconWrapper>
          <StyledInputBase
            id="outlined-basic"
            sx={{ borderBottom: '1px solid' }}
            label="search"
            variant="outlined"
            placeholder="Search By User Name"
            inputProps={{ 'aria-label': 'search' }}
            onChange={(searchedVal) => requestSearch(searchedVal)}
          />
        </SearchBar>
        <div style={{ float: 'right' }}>
          <Button
            variant="contained"
            style={addUserButton}
            onClick={() => setisDialogOpen(true)}
          >
            Add User
          </Button>
          <Button
            variant="contained"
            style={addBulkUsersButton}
            onClick={() => setAddBulkUsersDialog(true)}
          >
            Add Bulk Users
          </Button>
        </div>
      </div>
      <Suspense fallback={<div>Loading....</div>}>
        <GenericTable
          columns={cols}
          data={rows || []}
          actions={[
            {
              icon: <Edit />,
              handler: () => setUserEditDialog(true),
            },
            {
              icon: <Delete />,
              handler: () => setUserRemoveDialog(true),
            },
          ]}
          userEditDialog={userEditDialog}
          userRemoveDialog={userRemoveDialog}
          userEditDialogClose={() => setUserEditDialog(false)}
          userRemoveDialogClose={() => setUserRemoveDialog(false)}
          handleOnUserEditDialogSubmit={() => setUserEditDialog(false)}
          handleOnUserRemoveDialogSubmit={() => setUserRemoveDialog(false)}
        />
      </Suspense>
    </>
  );
};

export default React.memo(UserMangement);
