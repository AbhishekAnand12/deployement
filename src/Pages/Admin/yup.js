import * as yup from 'yup';

const addUserValidationSchema = yup.object({
  name: yup.string().label('Name').required(),
  email: yup.string().email().label('Email Address').required(),
  location: yup.string().label('Location').required(),
  department: yup.string().label('Department').required(),
  contactNo: yup.string().label('Contact Number').required(),
  empId: yup.string().label('EMP ID').required(),
});

export default addUserValidationSchema;
