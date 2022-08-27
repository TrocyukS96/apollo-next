import React from 'react';
import {useFormik} from "formik";
import s from "./styles.module.scss";
import {useMutation} from "@apollo/client";
import {ADD_NEW_LINK} from "../../api/links";
import {LinkType} from "../../types";
import {Button, TextareaAutosize, TextField} from "@mui/material";

type InitialValuesType = {
    description: string
    url: string
}

interface IProps {
    links: LinkType[]
    setLinks: (value: LinkType[]) => void
}

const AddLinkForm = ({links, setLinks}: IProps) => {
    const [post] = useMutation(ADD_NEW_LINK)
    const formik = useFormik({
        initialValues: {
            description: '',
            url: '',
        } as InitialValuesType,
        validate: (values: InitialValuesType) => {
            const errors = {} as InitialValuesType;
            if (!values.url) {
                errors.url = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.url)) {
                errors.url = 'Invalid email address';
            }
            if (values.description.length < 3) {
                errors.description = 'there must be at least 3 characters'
            }
            return errors
        },
        onSubmit: async (values) => {
            const data = await post({variables: {url: values.url, description: values.description}})
            setLinks([...links, data?.data?.post])
            formik.resetForm()
        },
    });
    return (
        <form className={s.form} onSubmit={formik.handleSubmit}>
            <div className={s.item}>
                <span>URL</span>
                <div className={s.inputInner}>
                    <TextField
                        type="text"
                        placeholder={'write link'}
                        id="url"
                        name="url"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.url}
                    />
                    {formik.errors.url ? <div className={s.error}>{formik.errors.url}</div> : null}
                </div>
            </div>
            <div className={s.item}>
                <span>Description</span>
                <div className={s.inputInner}>
                <TextareaAutosize
                    placeholder={'write description'}
                    id="description"
                    name="description"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.description}
                    className={s.textarea}
                    maxRows={4}
                />
                    {formik.errors.description ? <div className={s.error}>{formik.errors.description}</div> : null}
                </div>
            </div>
            <div className={s.btnWrap}>
                <Button type="submit" variant={'contained'}>add new Link</Button>
            </div>
        </form>
    );
};

export default AddLinkForm;