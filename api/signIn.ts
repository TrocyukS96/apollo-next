import { gql, useMutation } from "@apollo/client";





export const SIGN_IN = gql`
mutation login ($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    user {
    name
    }
    token
  }
}
`;

