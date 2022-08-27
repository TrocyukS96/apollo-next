import React, {useState} from 'react';
import s from './styles.module.scss'
import {VoteType} from "../../../types";
import UserIcon from "../../icons/userIcon";
import UpvoteIcon from "../../icons/upvoteIcon";
import ArrowUpIcon from "../../icons/arrowUpIcon";
import {useMutation} from "@apollo/client";
import {VOTE_LINK} from "../../../api/links";

interface IProps {
    link: string
    description: string
    style?: {}
    votes?: VoteType[]
    id: string
    userName?:string
}

const toMapVotes = (votes: VoteType[]) => <div className={s.votes}>{votes?.map((v: VoteType) => <div className={s.user}
                                                                                                     key={v.id}>{v.user.name[0]}</div>)}</div>
const FeedItem = ({link, description, userName, id, style, votes}: IProps) => {
    const [isVote, setIsVote] = useState(false)
    const [vote] = useMutation(VOTE_LINK)
    const [isOpenAccordion, setIsOpenAccordion] = useState(false)
    const voteByCondition = () => {
        if (votes && votes.length > 0) {
            return toMapVotes(votes)
        }
    }
    const upvoteHandler = async () => {
        if(!(votes?.find(f=>f.user.name===userName)) && !isVote){
            const data = await vote({variables: {linkId: id}})
            console.log(data)
            setIsVote(true)
        }

    }
    console.log(userName)
    return (
        <div className={s.inner} style={style ? style : {}}>
            <div className={s.description}>
                <div>{description}</div>
                <div onClick={upvoteHandler} className={s.upvoteIconWrapper}>
                    <UpvoteIcon className={s.upvoteIcon} fill={isVote || votes?.find(f=>f.user.name===userName)  ? 'black' : 'white'} />
                </div>
            </div>
            <div className={s.votesAccordion}
                 onClick={() => votes && votes.length > 0 && setIsOpenAccordion(!isOpenAccordion)}>
                <div className={s.iconWrapper}>
                    <ArrowUpIcon style={isOpenAccordion ? {transform: 'rotate(180deg)'} : ''}/>
                </div>
                <h3 className={s.title}
                    onClick={() => votes && votes.length > 0 && setIsOpenAccordion(!isOpenAccordion)}>
                    {
                        votes && votes?.length > 0 ?
                            <>
                                {voteByCondition()}
                            </>
                            : <div className={s.noUpvoteBlock}>
                                <div>no upvotes yet...</div>
                            </div>
                    }
                </h3>
                <div className={s.content} style={isOpenAccordion ? {height: '100%'} : {height: '0'}}>
                    <div className={s.contentInner}>
                        <ul>
                            {votes?.map((v) => {
                                return (
                                    <li className={s.contentItem} key={v.id}>{v.user.name}</li>
                                )
                            })}
                        </ul>

                    </div>
                </div>

            </div>
        </div>

    );
};

export default FeedItem;