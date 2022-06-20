import React, {
  lazy, Suspense, useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button, Stack, Stepper, Step, StepLabel,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useMutation, useQuery } from '@apollo/client';
import validate from './yup/validate';
import { steps } from '../../Config/constant';
import {
  CREATE_BATCH,
  GET_ALL_USERS,
} from '../../ApolloClient';

const AssignUser = lazy(() => import('./assignUser'));
const FileUpload = lazy(() => import('../../Components/FileUpload/fileupload'));
const Timeline = lazy(() => import('../../Components/Timeline/timeline'));

const AddBatch = () => {
  const [addBatch] = useMutation(CREATE_BATCH);
  const { data: { getUserData: data = [] } = {} } = useQuery(GET_ALL_USERS);
  const [tableData, setTableData] = useState([]);
  const [buttonDisable, setButtonDisable] = useState(true);
  const [activeStep, setActiveStep] = useState(0);
  const [skippedSteps, setSkippedSteps] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [errorMessage, setErrorMessage] = useState({});
  const [reviewer, setAssignR] = useState('');
  const [AssignedTraineeIndex, setIndexx] = useState(null);

  const trainees = [];
  const navigate = useNavigate();
  const [addBatchFormValues, setAddBatchFormValues] = useState({
    batchName: '',
    fbIntervalTC: '',
    fbIntervalR: '',
    fbIntervalT: '',
    coordinators: [],
    trainers: [],
    reviewers: [],
  });

  const {
    batchName,
    coordinators,
    trainers,
    fbIntervalTC,
    fbIntervalR,
    fbIntervalT,
    reviewers,
  } = addBatchFormValues;

  const handleOnfbIntervalTC = (event) => {
    setAddBatchFormValues({
      ...addBatchFormValues,
      fbIntervalTC: event.target.value,
    });
  };

  const handleOnfbIntervalR = (event) => {
    setAddBatchFormValues({
      ...addBatchFormValues,
      fbIntervalR: event.target.value,
    });
  };

  const handleOnfbIntervalT = (event) => {
    setAddBatchFormValues({
      ...addBatchFormValues,
      fbIntervalT: event.target.value,
    });
  };

  const handleValidation = async (value, field) => {
    const isError = await validate(field, value);
    setErrorMessage((prevState) => ({
      ...prevState,
      [field]: isError,
    }));
  };

  tableData?.map((records) => trainees.push(records.email));

  const handleOnBatchName = (event) => {
    setAddBatchFormValues({
      ...addBatchFormValues,
      batchName: event.target.value,
    });
  };

  const handleOnSelectCoordinatorChange = (event) => {
    const {
      target: { value },
    } = event;
    setAddBatchFormValues({
      ...addBatchFormValues,
      coordinators: value,
    });
  };

  const handleOnSelectTrainer = (event) => {
    const {
      target: { value },
    } = event;
    setAddBatchFormValues({
      ...addBatchFormValues,
      trainers: value,
    });
  };

  const handleSelect = (e) => {
    setAssignR(e.target.value);
  };

  const isStepSkipped = (step) => skippedSteps.includes(step);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
    setSkippedSteps(skippedSteps.filter((skipItem) => skipItem !== activeStep));
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleOnSubmit = async () => {
    try {
      const addBatchOutput = await addBatch({
        variables: {
          input: {
            userArray: data,
            batchName,
            startDate,
            endDate,
            reviewers,
            trainers,
            coordinators,
            feedbackTriningCoordinator: fbIntervalTC,
            feedbackReviewer: fbIntervalR,
            feedbackTrainee: fbIntervalT,
          },
        },
      });
      if (
        addBatchOutput?.data?.addBatch) {
        console.log('User and Batch inserted successfully', addBatchOutput?.data);
      } else {
        console.log('Bad Request');
      }
    } catch (responseError) {
      console.log('CATCH BLOCK: handleOnSubmit => ', responseError);
    }
  };

  return (
    <div>
      <Stack direction="row" spacing={2}>
        <Button
          sx={{
            color: 'black',
            borderColor: '#0063cc',
            '&:hover': {
              color: 'white',
              backgroundColor: 'black',
              borderColor: 'black',
            },
          }}
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/Admin', { replace: true })}
        >
          Back To DashBoard
        </Button>
      </Stack>
      <Stepper alternativeLabel activeStep={activeStep} sx={{ color: 'black' }}>
        {steps.map((step, index) => {
          const labelProps = {};
          const stepProps = {};
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step stepProps={stepProps}>
              <StepLabel style={{ color: 'black' }} labelProps={labelProps}>
                {step}
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <form>
        {(() => {
          switch (activeStep) {
            case 0:
              return (
                <Suspense fallback={<div>Loading....</div>}>
                  <FileUpload
                    {...{ setTableData, tableData, setButtonDisable }}
                  />
                </Suspense>
              );
            case 1:
              return (
                <Suspense fallback={<div>Loading....</div>}>
                  <AssignUser
                    data={tableData}
                    coordinators={coordinators}
                    trainers={trainers}
                    reviewers={reviewers}
                    assignR={reviewer}
                    handleSelect={handleSelect}
                    index={AssignedTraineeIndex}
                    setIndex={setIndexx}
                    handleOnSelectCoordinatorChange={
                      handleOnSelectCoordinatorChange
                    }
                    handleOnSelectTrainer={handleOnSelectTrainer}
                    handleValidation={handleValidation}
                    newUsers={data}
                    handleOnBatchName={handleOnBatchName}
                    setButtonDisable={setButtonDisable}
                    batchName={batchName}
                  />
                </Suspense>
              );
            case 2:
              return (
                <Suspense fallback={<div>Loading....</div>}>
                  <Timeline
                    startDate={startDate}
                    endDate={endDate}
                    handleOnStartDate={setStartDate}
                    handleOnEndDate={setEndDate}
                    {...{
                      errorMessage,
                      fbIntervalTC,
                      fbIntervalR,
                      fbIntervalT,
                      handleOnfbIntervalTC,
                      handleOnfbIntervalR,
                      handleOnfbIntervalT,
                      handleValidation,
                    }}
                  />
                </Suspense>
              );
            default:
              return 'unknown step';
          }
        })()}
      </form>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Button
          disabled={activeStep === 0}
          onClick={handleBack}
          sx={{
            color: 'black',
            borderColor: '#0063cc',
            '&:hover': {
              color: 'black',
              borderColor: '#262626',
            },
          }}
        >
          back
        </Button>
        &nbsp;&nbsp;
        <Button
          variant="contained"
          sx={{
            backgroundColor: 'black',
            borderColor: '#0063cc',
            '&:hover': {
              color: 'white',
              backgroundColor: 'black',
              borderColor: 'black',
            },
          }}
          onClick={() => {
            if (activeStep === steps.length - 1) {
              handleOnSubmit();
              navigate('/Admin', { replace: true });
            } else {
              handleNext();
            }
          }}
          disabled={buttonDisable}
        >
          {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
        </Button>
      </div>
    </div>
  );
};

export default React.memo(AddBatch);
