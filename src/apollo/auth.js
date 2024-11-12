import { gql } from "@apollo/client";

const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      organizations {
        users {
          name
          surname
        }
      }
    }
  }
`;

export { LOGIN_MUTATION };
