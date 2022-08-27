import React from 'react';
import {useQuery} from "@apollo/client";
import {GET_LINKS_BY_PARAMS} from "../../api/links";

interface IProps{
    fill?:string
    className?:string
}

const UpvoteIcon = ({fill,className}:IProps) => {
    return (
        <svg className={className ? className : ''} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={fill ? fill : 'white'} width={24} height={24} stroke={'black'}>
            <title>like-1</title>
            <path className="a"
                  d="M20,15.659h0a1.5,1.5,0,1,1,0,3H19a1.5,1.5,0,0,1,1.5,1.5c0,.829-.672,1-1.5,1H12.5c-2.851,0-3.5-.5-7-1v-8.5c2.45,0,6.5-4.5,6.5-8.5,0-1.581,2.189-2.17,3,.719.5,1.781-1,5.281-1,5.281h8a1.5,1.5,0,0,1,1.5,1.5c0,.829-.672,2-1.5,2H21a1.5,1.5,0,0,1,0,3H20"/>
            <rect className="a" x="0.5" y="10.159" width="5" height="12"/>
            <path d="M3.25,19.159a.75.75,0,1,0,.75.75.75.75,0,0,0-.75-.75Z"/>
        </svg>

    );
};

export default UpvoteIcon;

// const { loading, error, data, fetchMore, networkStatus } = useQuery(
//     GET_LINKS_BY_PARAMS,
//     {
//         variables: {
//             orderBy:{
//                 description: 'asc',
//                 // url: 'asc',
//                 // createdAt: 'asc',
//             }
//         },
//         notifyOnNetworkStatusChange: true,
//     }
// )