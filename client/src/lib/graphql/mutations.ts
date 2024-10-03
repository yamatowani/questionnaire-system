import { gql } from '@apollo/client';

export const ADD_NEW_ADMIN_USER = gql`
  mutation AddNewAdminUser($newAdminUserData: NewAdminUserInput!) {
    addNewAdminUser(newAdminUserData: $newAdminUserData) {
      id
      name
      email
      password_digest
      session_id
      created_at
      updated_at
    }
  }
`;
