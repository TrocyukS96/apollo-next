import React from 'react';
import s from './styles.module.scss'

interface IProps{
    name:string
    link:string
    description:string
    style?:{}
}

const FeedItem = ({link,description,name,style}:IProps) => {
    return (
        <div className={s.inner} style={style ? style :{}}>
            <div>{name}</div>
            <div>{link}</div>
            <div>{description}</div>
        </div>

    );
};

export default FeedItem;