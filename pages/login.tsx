import {useMutation} from "@apollo/client";
import {useRouter} from "next/router";
import {useFormik} from "formik";
import {validate} from "../utils/validate";
import Head from "next/head";
import s from "../styles/login.module.scss";
import {SIGN_IN} from "../api/signIn";
import {Button, Input, TextField} from "@mui/material";


export default function Login() {
    const [login] = useMutation(SIGN_IN)
    const router = useRouter()
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: ''
        } ,
        validate,
        onSubmit:async (values )=> {
            const preparedData = {email: values.email, password: values.password}
           await login({
                variables: {...preparedData}
            }).then((res) => {
               console.log(res?.data?.login?.token)
               localStorage.setItem('token',res?.data?.login?.token)
                router.query.name = res.data.login.user.name
               router.push(`/${res.data.login.user.name}`)
            })
            console.log('submit')

        },
    });

    const redirectHandler = () => {
        router.push('/registration')
    }

    return (
        <>
            <Head>
                <title>
                    Sign In
                </title>
            </Head>
            <div className={s.inner}>
                {/*//@ts-ignore*/}

                <form onSubmit={formik.handleSubmit} className={s.container}>
                    <h1>Sign In</h1>
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
                                placeholder={'email'}
                                style={{width:'170px',padding:'0 3px'}}
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
                                placeholder={'password'}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.password}
                                style={{width:'170px',padding:'0 3px'}}
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
                        <p>Do not you have an account?</p>
                        <p onClick={redirectHandler}>Sign up</p>
                    </div>
                </form>
            </div>
        </>

    )
}
