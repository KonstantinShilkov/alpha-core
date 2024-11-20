import { gql } from "@apollo/client";

export interface User {
  name: string;
  surname: string;
}

export interface Organization {
  users: User[];
}

export interface AuthPayload {
  token: string;
  organizations: Organization[];
}

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


export interface ClassType {
  id: string;
  name: string;
  description: string;
  sort: number;
  standard: boolean;
  code: boolean;
}

export interface ClassNode {
  id: string;
  name: string;
  description: string;
  children?: ClassNode[];
  classTypes?: ClassType[];
}

export interface ModelTreeClass {
  tree: ClassNode[];
}

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

export type LoginMutationResponse = {
  login: AuthPayload;
};

export type GetTreeQueryResponse = {
  modelTreeClasses: {
    tree: ClassNode[];
  };
};


