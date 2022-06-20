export const tablecols = [
  {
    label: 'Batch Name',
    field: 'batchName',
  },
  {
    label: 'Training_Cordinator',
    field: 'coordinators',
  },

  {
    label: 'Trainer',
    field: 'trainers',
  },

  {
    label: 'Total Trainees',
    field: 'traineeCount',
  },
  {
    label: 'Start Date',
    field: 'startDate',
  },
  {
    label: 'End Date',
    field: 'endDate',
  },
];

export const cols = [
  {
    label: 'Name',
    field: 'name',
  },
  {
    label: 'Email',
    field: 'email',
  },

  {
    label: 'Department',
    field: 'department',
  },
  {
    label: 'Location',
    field: 'location',
  },
  {
    label: 'Contact Number',
    field: 'contactNo',
  },
  {
    label: 'EMP ID',
    field: 'empId',
  },
];

export const steps = ['Upload Details', 'Assign Users', 'Timeline'];

export const addBatchTableColumns = [
  {
    label: 'Emp ID',
    field: 'empId',
  },
  {
    label: 'Name',
    field: 'name',
  },
  {
    label: 'Email',
    field: 'email',
  },
  {
    label: 'Contact',
    field: 'contactNo',
  },
  {
    label: 'Department',
    field: 'department',
  },
  {
    label: 'Location',
    field: 'location',
  },
];

export const acceptableFileName = ['xlsx', 'xls', 'csv'];

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
export const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 50,
    },
  },
};

export const noMatch = 'images/NoMatchFound.jpg';
export const errorBoundry = 'images/error_boundry.jpg';
export const loginPage = 'images/login_page.png';

export const navigateRoles = {
  LOGIN: '/',
  NOMATCH: '/*',
  ADMIN: '/Admin',
  UserManagement: '/UserManagement',
  TRAINING_COORDINATOR: '/trainingCoordinator',
  REVIEWER: '/reviewer',
  TRAINER: '/trainer',
  TRAINEE: '/trainee',
  TRAINER_ADDFEEDBACK: '/trainer/feedback',
  TRAINING_ADDFEEDBACK: '/trainingCoordinator/feedback',
  TRAINEE_ADDFEEDBACK: '/trainee/feedback',
  REVIEWER_ADDFEEDBACK: '/reviewer/feedback',
  ADMIN_ADDBATCH: '/Admin/addbatch',
};

export const roleForFeedback = {
  TRAINEE: 'trainee',
  REVIEWER: 'reviewer',
  TRAINER: 'trainer',
  TRAINING_COORDINATOR: 'trainingCoordinator',
};

export const trainerTableCols = [
  {
    label: 'Trainee Name',
    field: 'assignedTrainees',
  },
  {
    label: 'Department',
    field: 'department',
  },
  {
    label: 'Training Coordinator',
    field: 'coordinators',
  },
  {
    label: 'Reviewer',
    field: 'reviewer',
  },
];

export const trainingCoordinatorColumns = [
  {
    label: 'Trainee Name',
    field: 'assignedTrainees',
  },
  {
    label: 'Department',
    field: 'department',
  },
  {
    label: 'Reviewer',
    field: 'reviewer',
  },
  {
    label: 'Trainer',
    field: 'trainers',
  },
];
