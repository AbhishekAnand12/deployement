import React, { lazy, Suspense } from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import { navigateRoles, roleForFeedback } from '../Config/constant';
import PrivateLayout from '../Layouts/PrivateLayout/PrivateLayout';
import AdminNavbar from '../Pages/Admin/adminNavBar';
import AdminDashboard from '../Pages/Admin/adminDashBoard';
import UserMangement from '../Pages/Admin/userManagement';
import AddBatch from '../Pages/AddBatch/addBatch';

const Trainee = lazy(() => import('../Pages/Trainee/trainee'));
const Login = lazy(() => import('../Pages/Login/login'));
const AddFeedbackFullpage = lazy(() => import('../Pages/AddFeedback/AddFeedbackFullPage'));
const Reviewer = lazy(() => import('../Pages/Reviewer/ReviewerTableColumns'));
const AddFeedback = lazy(() => import('../Pages/Trainee/addFeedback'));
const NoMatch = lazy(() => import('../Pages/NoMatchFound/noMatchFound'));
const Coordinator = lazy(() => import('../Pages/TrainingCo-ordinator/CoordinatorTableColumns'));
const Trainer = lazy(() => import('../Pages/Trainer/TrainerTableColumns'));

const PrivateRoute = () => (
  <BrowserRouter>
    <Routes>
      <Route
        path={navigateRoles.LOGIN}
        element={(
          <Suspense fallback={<div>Loading......</div>}>
            <Login />
          </Suspense>
        )}
      />
      <Route
        exact
        path={navigateRoles.ADMIN}
        element={(
          <>
            <AdminNavbar />
            <AdminDashboard />
          </>
        )}
      />
      <Route
        exact
        path={navigateRoles.ADMIN_ADDBATCH}
        element={(
          <>
            <CssBaseline />
            <>
              <AdminNavbar />
              <AddBatch />
            </>
          </>
        )}
      />
      <Route
        exact
        path={navigateRoles.UserManagement}
        element={(
          <>
            <AdminNavbar />
            <UserMangement />
          </>
        )}
      />
      <Route
        exact
        path={navigateRoles.TRAINEE}
        element={(
          <PrivateLayout>
            <Suspense fallback={<div>Loading......</div>}>
              <Trainee />
            </Suspense>
          </PrivateLayout>
        )}
      />
      <Route
        exact
        path={navigateRoles.TRAINER}
        element={(
          <PrivateLayout>
            <Suspense fallback={<div>Loading......</div>}>
              <Trainer />
            </Suspense>
          </PrivateLayout>
        )}
      />
      <Route
        exact
        path={navigateRoles.REVIEWER}
        element={(
          <PrivateLayout>
            <Suspense fallback={<div>Loading......</div>}>
              <Reviewer />
            </Suspense>
          </PrivateLayout>
        )}
      />
      <Route
        exact
        path={navigateRoles.TRAINING_COORDINATOR}
        element={(
          <PrivateLayout>
            <Suspense fallback={<div>Loading......</div>}>
              <Coordinator />
            </Suspense>
          </PrivateLayout>
        )}
      />
      <Route
        exact
        path={navigateRoles.TRAINER_ADDFEEDBACK}
        element={(
          <PrivateLayout>
            <Suspense fallback={<div>Loading......</div>}>
              <AddFeedbackFullpage role={roleForFeedback.TRAINER} />
            </Suspense>
          </PrivateLayout>
        )}
      />
      <Route
        exact
        path={navigateRoles.TRAINING_ADDFEEDBACK}
        element={(
          <PrivateLayout>
            <Suspense fallback={<div>Loading......</div>}>
              <AddFeedbackFullpage
                role={roleForFeedback.TRAINING_COORDINATOR}
              />
            </Suspense>
          </PrivateLayout>
        )}
      />
      <Route
        exact
        path={navigateRoles.TRAINEE_ADDFEEDBACK}
        element={(
          <PrivateLayout>
            <Suspense fallback={<div>Loading......</div>}>
              <AddFeedback role={roleForFeedback.TRAINEE} />
            </Suspense>
          </PrivateLayout>
        )}
      />
      <Route
        exact
        path={navigateRoles.REVIEWER_ADDFEEDBACK}
        element={(
          <PrivateLayout>
            <Suspense fallback={<div>Loading......</div>}>
              <AddFeedbackFullpage role={roleForFeedback.REVIEWER} />
            </Suspense>
          </PrivateLayout>
        )}
      />
      <Route
        exact
        path={navigateRoles.NOMATCH}
        element={(
          <Suspense fallback={<div>Loading......</div>}>
            <NoMatch />
          </Suspense>
        )}
      />
    </Routes>
  </BrowserRouter>
);

export default PrivateRoute;
