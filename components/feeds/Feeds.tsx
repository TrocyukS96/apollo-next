import React, {useEffect, useState} from 'react';
import {NetworkStatus, useLazyQuery, useMutation, useQuery} from "@apollo/client";
import {FETCH_ALL_LINKS, FETCH_LINKS_BY_PARAMS, FETCH_PAGINATION_LINKS, VOTE_LINK} from "../../api/links";
import FeedItem from "./feedItem/FeedItem";
import s from './styles.module.scss';
import {LinkType} from "../../types";
import AddLinkForm from "../addLinkForm/AddLinkForm";
import FilterInput from "../filterInput/FilterInput";
import {Pagination} from "@mui/material";
import {SIGN_IN} from "../../api/signIn";
import {useRouter} from "next/router";




const Feeds = () => {
    const router = useRouter()
    const [page, setPage] = React.useState(1);
    const allPostsQueryVars = {
        take: 10,
        skip: page,
    }
    const { loading, error, data, fetchMore, networkStatus } = useQuery(
        FETCH_PAGINATION_LINKS,
        {
            variables: allPostsQueryVars,
            notifyOnNetworkStatusChange: true,
        }
    )
    const [links, setLinks] = useState<LinkType[]>([] as LinkType[])
    useEffect(() => {
        setLinks(data?.feed?.links)
        console.log(data?.feed?.links)
    }, [data])

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };
    const {username} = router.query

    const loadingMorePosts = networkStatus === NetworkStatus.fetchMore

    // const loadMorePosts = () => {
    //     fetchMore({
    //         variables: {
    //             skip: allPosts.length,
    //         },
    //     })
    // }

    if (error) return <h1>something went wrong...</h1>
    if (loading && !loadingMorePosts) return <h1>loading...</h1>

    // const areMorePosts = allPosts.length < _allPostsMeta.count
    if (loading) {
        return <h1>loading...</h1>
    }
    if (error) {
        return <h1>something went wrong...</h1>
    }

    return (
        <div className={s.inner}>
            <FilterInput links={links} setLinks={setLinks}/>
            <div className={s.linksTitle}>
                <div className={s.descriptionTitle}>Description</div>
                <div className={s.VotesTitle}>Votes</div>
            </div>
            <div className={s.scrollbarContainer}>
                    {links && links.map((link) => {
                        return (
                            <FeedItem
                                key={link.id}
                                id={link.id}
                                votes={link.votes}
                                name={link.id}
                                link={link.url}
                                description={link.description}
                                userName={username ? username : ''}
                            />
                        )
                    })}
            </div>
            <div className={s.paginationWrapper}>
                <Pagination count={data?.feed?.count-1} variant="outlined" hidePrevButton hideNextButton page={page} onChange={handleChange} />
            </div>
            <AddLinkForm links={links} setLinks={setLinks}/>

        </div>
    )
        ;
};

export default Feeds;