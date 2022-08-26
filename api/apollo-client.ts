import {ApolloClient, createHttpLink, HttpLink, InMemoryCache} from '@apollo/client'
import {setContext} from "@apollo/client/link/context";




const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem('token');
    // return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
        }
    }
});


const httpLink = new HttpLink({
    uri: 'https://api.vrmarketing.guru/', // Server URL (must be absolute)
    credentials: 'same-origin', // Additional fetch() options like `credentials` or `headers`
    headers:{
        "Access-Control-Allow-Origin":"http://localhost:3000/",

    }
})

export const client = new ApolloClient({
    link:authLink.concat(httpLink),
    cache:new InMemoryCache()
})

