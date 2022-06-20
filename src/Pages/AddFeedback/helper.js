import * as yup from 'yup';
import { styled, Paper } from '@mui/material';

export const initialState = {
  batchId: '',
  givenFor: '',
  givenBy: '',
  week: '',
  rating: [
    {
      question: '',
      answer: '',
    },
  ],
  codeQuality: '',
  communication: '',
  behaviour: '',
  taskDelivery: '',
  comprehension: '',
  emailCommunication: '',
  redmine: '',
  goodPoints: '',
  improvementRequired: '',
  isDisabled: true,
  isTouched: {},
  error: {},
};

export const validationSchema = yup.object({
  givenFor: yup.string().label('Name').required(),
  week: yup.string().label('Select week no').required(),
  codeQuality: yup.string().label('Select a no').required(),
  communication: yup.string().label('Select a no').required(),
  behaviour: yup.string().label('Select a no').required(),
  taskDelivery: yup.string().label('Select a no').required(),
  comprehension: yup.string().label('Select a no').required(),
  emailCommunication: yup.string().label('Select a no').required(),
  redmine: yup.string().label('Select a no').required(),
  goodPoints: yup.string().required('Please enter some good points'),
  improvementRequired: yup
    .string()
    .required('please enter some improvement points'),
});

export const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'grey' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export const hasErrors = (errors) => Object.keys(errors).length !== 0;
export const hasTouched = (touched) => Object.keys(touched).length !== 0;
