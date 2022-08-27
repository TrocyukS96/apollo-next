import {gql, useMutation} from "@apollo/client";


export const FETCH_LINKS_BY_PARAMS = gql`
query feed($filter:String!) {
  feed(filter: $filter) {
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

export const FETCH_PAGINATION_LINKS = gql`
query feed($take:Int!,$skip:Int!) {
  feed(take: $take,skip: $skip) {
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

export const FETCH_ALL_LINKS = gql`
query {
  feed {
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

