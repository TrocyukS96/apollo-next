import {gql} from "@apollo/client";

enum Sort {
    asc,
    desc
}

type SortType = {
    description:Sort
}

type LinkOrderByInput = {
    description: Sort
    // url: Sort
    // createdAt: Sort
}

export const GET_LINKS_BY_PARAMS = gql`
query feed($filter:String!,$take:Int!,$skip:Int!, $orderBy:LinkOrderByInput!) {
  feed(filter:$filter,take: $take,skip: $skip,orderBy:$orderBy) {
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

export const VOTE_LINK = gql`
mutation vote ($linkId: ID!) {
  vote(linkId: $linkId) {
     id
  }
}
`;

