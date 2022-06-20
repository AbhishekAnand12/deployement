import {
  batchNameSchema,
  trainerSchema,
  trainingCordinatorSchema,
  fbIntervalTCSchema,
  fbIntervalRSchema,
  fbIntervalTSchema,
} from './schema';
import { YupHelper } from '../../../Config';

const { validateValue, handlePromiseError } = YupHelper;

const validate = async (field, value) => {
  let promise = '';
  switch (field) {
    case 'batchName':
      promise = validateValue(batchNameSchema, { batchName: value });
      break;

    case 'trainers':
      promise = validateValue(trainerSchema, { trainers: value });
      break;

    case 'coordinators':
      promise = validateValue(trainingCordinatorSchema, {
        trainingCordinator: value,
      });
      break;

    case 'fbIntervalTC':
      promise = validateValue(fbIntervalTCSchema, { fbIntervalTC: value });
      break;

    case 'fbIntervalR':
      promise = validateValue(fbIntervalRSchema, { fbIntervalR: value });
      break;

    case 'fbIntervalT':
      promise = validateValue(fbIntervalTSchema, { fbIntervalT: value });
      break;

    default:
      return '';
  }
  return handlePromiseError(promise);
};

export default validate;
