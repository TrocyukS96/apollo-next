import { gql, useMutation } from "@apollo/client";





export const FEED = gql`
query {
  feed(filter: "graphql") {
    count
    links {
      id
      description
      url
      postedBy {
        id
        name
      }
      votes {
        id
        user {
          id
          name
        }
      }
    }
  }
}
`;

export const ADD_NEW_LINK = gql`
mutation post ($url: String!, $description: String!) {
  post(url: $url, description: $description) {
    id
    description
    url
  }
}
`;

