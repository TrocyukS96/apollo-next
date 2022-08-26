import React, {useEffect, useState} from 'react';
import {useMutation, useQuery} from "@apollo/client";
import {ADD_NEW_LINK, FEED} from "../../api/feed";
import FeedItem from "./feedItem/FeedItem";
import s from './styles.module.scss';
import {useFormik} from "formik";
import {LinkType} from "../../types";

type InitialValuesType = {
    description:string
    url:string
}


const Feeds = () => {
    const { data, loading, error } = useQuery(FEED);
    const [post] = useMutation(ADD_NEW_LINK)
    const [links,setLinks] = useState<LinkType[]>([] as LinkType[])

    useEffect(()=>{setLinks(data?.feed?.links)},[data])

    const addLinkHandler =async () => {

    }
    console.log(data?.feed?.links)
    console.log(links)

    const formik = useFormik({
        initialValues: {
            description: '',
            url: '',
        } as InitialValuesType ,
        validate:(values:InitialValuesType)=>{
            const errors = {} as InitialValuesType;
            if (!values.url) {
                errors.url = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.url)) {
                errors.url = 'Invalid email address';
            }
            if(values.description.length<3){
                errors.description = 'there must be at least 3 characters'
            }
            return errors
        },
        onSubmit:async (values )=> {
            const data = await post ({variables:{url:values.url, description:values.description}})
            setLinks([...links,data?.data?.post])
            formik.resetForm()
        },
    });

    if(loading){
        return <h1>loading...</h1>
    }
    if(error){
        return <h1>something went wrong...</h1>
    }
    return (
        <div className={s.inner}>
            <FeedItem name={'Id'} link={'Link'} description={'Description'} style={{borderBottom:"none",backgroundColor:'#fffa84'}}/>
            {links && links.map((link)=>{
                return(
                    <FeedItem key={link.id} name={link.id} link={link.url} description={link.description}/>
                )
            })}
            <form className={s.addPostBlock} onSubmit={formik.handleSubmit}>
                <div className={s.inputWrap}>
                    <span>URL</span>
                    <input
                        type="text"
                        placeholder={'write link'}
                        id="url"
                        name="url"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.url}
                    />

                </div>
                {formik.errors.url ? <div className={s.error}>{formik.errors.url}</div> : null}
                <div className={s.inputWrap}>
                    <span>Description</span>
                    <textarea
                        placeholder={'write description'}
                        id="description"
                        name="description"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.description}
                    />
                </div>
                {formik.errors.description ? <div className={s.error}>{formik.errors.description}</div> : null}
                <div className={s.btnWrap}>
                    <button type="submit" onClick={addLinkHandler}>add new Link</button>
                </div>
            </form>
        </div>
    );
};

export default Feeds;