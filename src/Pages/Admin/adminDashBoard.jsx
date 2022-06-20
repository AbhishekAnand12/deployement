import React, {
  useState, lazy, Suspense, useEffect, useCallback,
} from 'react';
import {
  Typography, styled, Box, Paper, Button, Grid,
} from '@mui/material';
import { useQuery } from '@apollo/client';
import { Edit, Delete, Search } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { tablecols } from '../../Config/constant';
import { GET_ALL_BATCHS } from '../../ApolloClient/query';
import {
  SearchBar, SearchIconWrapper, StyledInputBase, addBatchButton, adminSearchBar,
} from './style';

const GenericTable = lazy(() => import('../../Components/Table/table'));

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

let tempData;
const AdminDashboard = () => {
  const [rows, setRows] = useState([]);
  const [batchEditDialog, setBatchEditDialog] = useState(false);
  const [batchRemoveDialog, setBatchRemoveDialog] = useState(false);

  const navigate = useNavigate();

  const handleOnDataSet = useCallback(() => {
    const temp = tempData?.map((element) => ({
      batchName: element.batchName,
      coordinators: element.coordinators.map(
        (coordinator) => coordinator.name,
      ),
      trainers: element.trainers.map((trainer) => trainer.name),
      traineeCount: element.reviewers.length,
      startDate: element.startDate,
      endDate: element.endDate,
    }));
    setRows(...rows, temp);
  }, []);

  const { refetch } = useQuery(GET_ALL_BATCHS, {
    onCompleted: (data) => {
      tempData = data.getBatchData || [];
      handleOnDataSet();
    },
  });

  const requestSearch = (searchVal) => {
    if (searchVal.target.value === '') {
      handleOnDataSet();
    } else {
      const filteredRows = rows.filter(
        (element) => element.batchName.toLowerCase().includes(searchVal.target.value),
      );
      setRows(filteredRows);
    }
    return '';
  };

  let pendingCount = 0;
  let completedCount = 0;

  tempData?.map((element) => {
    if (element.endDate > new Date().toISOString()) {
      completedCount += 1;
      return completedCount;
    }
    pendingCount += 1;
    return pendingCount;
  });

  useEffect(() => {
    refetch();
  });

  const totalBatches = `Total Batches : ${tempData?.length || 0}`;
  const progressBatches = `In Progress Batches : ${pendingCount}`;
  const completedBatches = `Completed Batches : ${completedCount}`;

  return (
    <>
      <Box sx={{ flexGrow: 1, marginLeft: '50px', marginTop: '50px' }}>
        <Grid
          container
          direction="row"
          alignItems="flex-end"
          justifyContent="center"
          spacing={4}
        >
          <Grid item xs="auto">
            <Item>{progressBatches}</Item>
          </Grid>
          <Grid item xs="auto">
            <Item>{completedBatches}</Item>
          </Grid>
          <Grid item xs="auto">
            <Item>{totalBatches}</Item>
          </Grid>
        </Grid>
        <br />
        <br />
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="flex-end"
        >
          <Grid item xl="auto">
            <Typography
              variant="h6"
            >
              All batch
            </Typography>
          </Grid>
          <Grid item xl="auto">
            <SearchBar sx={adminSearchBar}>
              <SearchIconWrapper>
                <Search />
              </SearchIconWrapper>
              <StyledInputBase
                id="outlined-basic"
                sx={{
                  borderBottom: '1px solid',
                }}
                label="search"
                variant="outlined"
                placeholder="Search By Batch Name"
                inputProps={{ 'aria-label': 'search' }}
                onChange={(searchedVal) => requestSearch(searchedVal)}
              />
            </SearchBar>
            <Button
              variant="outlined"
              style={addBatchButton}
              onClick={() => navigate('/Admin/addBatch', { replace: true })}
            >
              Add Batch
            </Button>
            {' '}
          </Grid>
        </Grid>
      </Box>
      <Suspense fallback={<div>Loading......</div>}>
        <GenericTable
          columns={tablecols}
          data={rows || []}
          actions={[
            {
              icon: <Edit />,
              handler: () => setBatchEditDialog(true),
            },
            {
              icon: <Delete />,
              handler: () => setBatchRemoveDialog(true),
            },
          ]}
          batchEditDialog={batchEditDialog}
          batchRemoveDialog={batchRemoveDialog}
          batchEditDialogClose={() => setBatchEditDialog(false)}
          batchRemoveDialogClose={() => setBatchRemoveDialog(false)}
          handleOnBatchEditDialogSubmit={() => setBatchEditDialog(false)}
          handleOnBatchRemoveDialogSubmit={() => setBatchRemoveDialog(false)}
        />
      </Suspense>
    </>
  );
};

export default React.memo(AdminDashboard);
