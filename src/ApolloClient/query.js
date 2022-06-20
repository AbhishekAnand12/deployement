import { gql } from '@apollo/client';

export const GET_ALL_USERS = gql`
  query Data {
    getUserData {
      name
      email
      contactNo
      department
      location
      empId
      originalId
    }
  }
`;

export const GET_ALL_BATCHS = gql`
query GetBatchData {
  getBatchData {
    originalId
    batchName
    startDate
    endDate
    feedbackTriningCoordinator
    feedbackReviewer
    feedbackTrainee
    reviewers {
      assignedTrainees {
        originalId
        name
        email
        contactNo
        department
        location
        empId
      }
      reviewer {
        originalId
        name
        email
        contactNo
        department
        location
        empId
      }
    }
    trainers {
      originalId
      name
      email
      contactNo
      department
      location
      empId
    }
    coordinators {
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

export const GETBATCHBYID = gql`
query GetBatchById($getBatchByIdId: String!) {
  getBatchById(id: $getBatchByIdId) {
    batchName
    coordinators {
      name
    }
    reviewers {
      reviewer {
        name
      }
      assignedTrainees {
        name
        department
      }
    }
  }
}
`;

export const GET_REVIEWER_TRAINEES = gql`
 query GetAddFeedbackData($originalId: String, $role: String) {
  getAddFeedbackData(originalId: $originalId, role: $role) {
    reviewers {
      reviewer {
        originalId
      }
      assignedTrainees {
        name
        originalId
      }
    }
    originalId
    startDate
    endDate
  }
}
`;

export const USERPROFILEDATA = gql`
  query UserProfileData {
    userProfileData {
      data {
        originalId
        name
      }
    }
  }
`;

export const GET_COMBINEDDATA = gql`
query UserProfileData {
  userProfileData {
    data {
      originalId
    }
  }
}
`;

export const GET_TRAINER = gql`
query GetAddFeedbackData($originalId: String, $role: String) {
  getAddFeedbackData(originalId: $originalId, role: $role) {
    originalId
    startDate
    endDate
    trainers {
      name
      originalId
    }
  }
}
`;

export const GET_TRAINEE = gql`
query Data {
  userProfileData {
    data {
      originalId
      name
      email
      contactNo
      department
      location
    }
  }
}
`;

export const GET_TRAINEESDETAILS = gql`
    query GetAddFeedbackData($originalId: String, $role: String) {
      getAddFeedbackData(originalId: $originalId, role: $role) {
        coordinators {
          name
        }
        reviewers {
          reviewer {
            name
          }
          assignedTrainees {
            originalId
          }
        }
      }
    }
  `;

export const GET_FEEDBACK = gql`
    query Data {
      getFeedbackData {
        data {
          givenFor
          goodPoints
          improvementRequired
          week
          rating {
            question
            answer
          }
        }
      }
    }
  `;

export const GETTCBATCHBYID = gql`
query Query($getBatchByIdId: String!) {
  getBatchById(id: $getBatchByIdId) {
    originalId
    batchName
    reviewers {
      assignedTrainees {
        name
      }
      reviewer {
        name
      }
    }
    trainers {
      name
    }
    coordinators {
      name
    }
    trainees
    count
  }
}
  `;

export const BATCHDATA = gql`
  query Data {
    getBatchData {
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
        count
      }
    }
  }
    `;

export const SELECTBATCHDATA = gql`
query GetBatchData {
  getBatchData {
    originalId
    batchName
  }
}
  `;

export const GETFEEDBACKBYTRAINEEID = gql`
query GetFeedbackByTraineeId($givenFor: String!) {
  getFeedbackByTraineeId(givenFor: $givenFor) {
    week
    rating {
      question
      answer
    }
  }
}
`;

export const FEEDBACKSPECIFICID = gql`
query Data {
  getFeedbackData {
    data {
      originalId
    }
  }
}
`;

export const TRAINEEBYID = gql`
query GetUserById($originalId: String!) {
  getUserById(originalId: $originalId) {
    data
  }
}`;
