import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import * as yup from 'yup';

export const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'grey' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export const validationSchema = yup.object({
  givenFor: yup.string().label('Name').required(),
  week: yup.string().label('Select week no').required(),
  trainingProcess: yup.string().label('Select a no').required(),
  ratingTrainer: yup.string().label('Select a no').required(),
  ratingReviewer: yup.string().label('Select a no').required(),
  rateTask: yup.string().label('Select a no').required(),
  description: yup.string().label('Select a no').required(),
});

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
  trainingProcess: '',
  rateTask: '',
  ratingTrainer: '',
  ratingReviewer: '',
  description: '',
  isTouched: {},
  error: {},
};

export const hasErrors = (errors) => Object.keys(errors).length !== 0;
export const hasTouched = (touched) => Object.keys(touched).length !== 0;
