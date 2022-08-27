import {MainLayout} from "../components/layouts/mainLayout/MainLayout";
import Head from "next/head";
import s from './../styles/registration.module.scss';
import {useFormik} from "formik";
import {useRouter} from "next/router";
import {gql, useMutation} from "@apollo/client";
import {SIGN_UP} from "../api/signUp";
import {validate} from "../utils/validate";
import {Button, Input} from "@mui/material";



export default function Registration() {
    const [signup] = useMutation(SIGN_UP)
    const router = useRouter()


    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: ''
        } ,
        validate,
        onSubmit: async (values) => {
            const preparedData = {name: values.name, email: values.email, password: values.password}
             await signup({
                variables: {...preparedData}
            }).then((res) => {
                 console.log(res.data.data)
                 router.push('/')
             })
            console.log('submit')

        },
    });
    const redirectHandler = () => {
        router.push('/login')
    }
    return (
            <>
                <Head>
                    <title>
                        Sign Up
                    </title>
                </Head>
                <div className={s.inner}>
                    <form onSubmit={formik.handleSubmit} className={s.container}>
                        <h1>Sign Up</h1>
                        <div className={s.inputWrap}>
                            <label htmlFor="name">Name</label>
                            <div>
                                <Input
                                    id="name"
                                    name="name"
                                    type="text"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.name}
                                    style={{width:'170px',padding:'0 3px'}}
                                    placeholder={'name'}
                                />
                                {formik.errors.name ? <div className={s.error}>{formik.errors.name}</div> : null}
                            </div>
                        </div>
                        <div className={s.inputWrap}>
                            <label htmlFor="email">Email</label>
                            <div>
                                <Input
                                    id="email"
                                    name="email"
                                    type="text"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.email}
                                    style={{width:'170px',padding:'0 3px'}}
                                    placeholder={'email'}

                                />
                                {formik.errors.email ? <div className={s.error}>{formik.errors.email}</div> : null}
                            </div>
                        </div>
                        <div className={s.inputWrap}>
                            <label htmlFor="password">Password</label>
                            <div>

                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.password}
                                    style={{width:'170px',padding:'0 3px'}}
                                    placeholder={'password'}
                                />
                                {formik.errors.password ?
                                    <div className={s.error}>{formik.errors.password}</div> : null}
                            </div>
                        </div>
                        <div className={s.btnWrap}>
                            <Button type="submit" variant={'contained'}>
                                Submit
                            </Button>
                        </div>
                        <div className={s.redirectBlock}>
                            <p>Already have an account?</p>
                            <p onClick={redirectHandler}>Sign up</p>
                        </div>
                    </form>
                </div>
            </>

    )
}
// }
