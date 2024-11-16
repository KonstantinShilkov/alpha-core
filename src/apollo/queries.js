import { gql } from "@apollo/client";

export const LOGIN_MUTATION = gql`
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

export const GET_TREE = gql`
  query GetTree {
    modelTreeClasses {
      tree {
        id
        name
        description
        sort
        classTypes {
          id
          name
          description
          sort
          standard
          code
        }
        children {
          id
          name
          description
          children {
            id
            name
            description
            children {
              id
              name
              description
              children {
                id
                name
                description
              }
            }
          }
        }
      }
    }
  }
`;
