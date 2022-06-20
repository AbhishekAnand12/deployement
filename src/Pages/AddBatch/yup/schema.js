import * as yup from 'yup';

const batchNameSchema = yup.object().shape({
  batchName: yup.string().required('Batch Name is required'),
});

const trainingCordinatorSchema = yup.object().shape({
  trainingCordinator: yup.array().min(1).required('Coordinators is required'),
});

const trainerSchema = yup.object().shape({
  trainers: yup.array().min(1).required('Trainer is required'),
});

const fbIntervalTCSchema = yup.object().shape({
  fbIntervalTC: yup.string().required('Select Week is required'),
});

const fbIntervalRSchema = yup.object().shape({
  fbIntervalR: yup.string().required('Select Week is required'),
});

const fbIntervalTSchema = yup.object().shape({
  fbIntervalT: yup.string().required('Select Week is required'),
});

export {
  batchNameSchema,
  trainerSchema,
  trainingCordinatorSchema,
  fbIntervalTCSchema,
  fbIntervalRSchema,
  fbIntervalTSchema,
};
