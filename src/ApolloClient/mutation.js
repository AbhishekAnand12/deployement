import { gql } from '@apollo/client';

export const CREATE_USER = gql`
mutation AddBatch($input: BatchData) {
  addBatch(input: $input) {
    userArray {
      email
      name
      department
      contactNo
      location
      empId
    }
    data {
      originalId
      batchName
      startDate
      endDate
      count
      trainers
      reviewers {
        assignedTrainees
        reviewer
      }
      coordinators
      feedbackTriningCoordinator
      feedbackReviewer
      feedbackTrainee
    }
  }
}
`;

export const DELETE_USER = gql`
  mutation Mutation($input: deletedUser) {
    deletedUser(input: $input) {
      message
      data {
        originalId
      }
      status
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUserData($input: UsersData) {
    updateUserData(input: $input) {
      message
      status
      data {
        originalId
        name
        email
        contactNo
        department
        location
        empId
      }
    }
  }
`;

export const DELETE_BATCH = gql`
  mutation DeletedBatch($input: originalId) {
    deletedBatch(input: $input) {
      message
      status
      data {
        originalId
      }
    }
  }
`;

export const UPDATE_BATCH = gql`
  mutation UpdatedBatch($input: BatchData) {
    updatedBatch(input: $input) {
      message
      status
      data {
        originalId
        batchName
        startDate
        endDate
        reviewers {
          assignedTrainees
          reviewer
        }
        trainers
        coordinators
        trainees
        count
      }
    }
  }
`;

export const ADD_BULK_USERS = gql`
  mutation Mutation($input: addBulkUsers) {
    addBulkUsers(input: $input) {
      message
      status
    }
  }
`;

export const CREATE_BATCH = gql`
mutation AddBatch($input: BatchData) {
  addBatch(input: $input) {
    userArray {
      email
      name
      department
      contactNo
      location
      empId
    }
    data {
      originalId
      batchName
      startDate
      endDate
      count
      trainers
      reviewers {
        assignedTrainees
        reviewer
      }
      coordinators
      feedbackTriningCoordinator
      feedbackReviewer
      feedbackTrainee
    }
  }
}
`;

export const GOOGLE_LOGIN = gql`
  mutation Mutation($input: googleLogin) {
    googleLogin(input: $input) {
      token
      role
    }
  }
`;

export const ADD_FEEDBACK = gql`
    mutation AddedFeedbackData($input: Feedbacks) {
      addedFeedbackData(input: $input) {
        data {
          batchId
          week
          originalId
          givenFor
          createdAt
          givenBy
          rating {
            question
            answer
          }
          goodPoints
          improvementRequired
        }
      }
    }
  `;

export const ADD_TRAINER_FEEDBACK = gql`
mutation AddedFeedbackData($input: Feedbacks) {
  addedFeedbackData(input: $input) {
    data {
      week
      givenFor
      givenBy
      rating {
        question
        answer
      }
      description
    }
  }
}
`;
