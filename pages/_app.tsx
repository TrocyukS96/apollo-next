import '../styles/globals.css';
import type {AppProps} from 'next/app';
import {ApolloProvider} from "@apollo/client";
import {MainLayout} from "../components/layouts/mainLayout/MainLayout";
import Guard from "../components/layouts/Guard";
import {client} from "../api/apollo-client";

function MyApp({Component, pageProps}: AppProps) {

    return <ApolloProvider client={client}>
        <Guard>
            <MainLayout>
                <Component {...pageProps} />
            </MainLayout>
        </Guard>
    </ApolloProvider>
}

export default MyApp
