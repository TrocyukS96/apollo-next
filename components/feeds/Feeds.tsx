import React, {useEffect, useState} from 'react';
import {NetworkStatus, useQuery} from "@apollo/client";
import {GET_LINKS_BY_PARAMS} from "../../api/links";
import FeedItem from "./feedItem/FeedItem";
import s from './styles.module.scss';
import {LinkType, ParamsType} from "../../types";
import AddLinkForm from "../addLinkForm/AddLinkForm";
import FilterInput from "../filterInput/FilterInput";
import {Pagination} from "@mui/material";
import {useRouter} from "next/router";

const Feeds = () => {
    const router = useRouter()
    const [page, setPage] = useState(1);
    const [params,setParams] = useState<ParamsType>({
        filter:'',
        take:10,
        skip:1,
        orderBy:{description:'desc'}
    } as ParamsType)
    const { loading, error, data, fetchMore, networkStatus } = useQuery(
        GET_LINKS_BY_PARAMS,
        {
            variables:params,
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
        setParams({...params,skip:value})
    };
    const {username} = router.query

    const loadingMorePosts = networkStatus === NetworkStatus.fetchMore

    const sortHandler = () =>{

    }

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
            <FilterInput  params={params} setParams={setParams}/>
            <div className={s.linksTitle}>
                <div className={s.descriptionTitle} onClick={sortHandler}>Description</div>
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