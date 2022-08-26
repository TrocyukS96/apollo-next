import {MainLayout} from "../components/layouts/mainLayout/MainLayout";
import Head from "next/head";
import s from './../styles/registration.module.scss';
import {useFormik} from "formik";
import {useRouter} from "next/router";
import {gql, useMutation} from "@apollo/client";
import {SIGN_UP} from "../api/signUp";
import {validate} from "../utils/validate";



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
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.name}
                                />
                                {formik.errors.name ? <div className={s.error}>{formik.errors.name}</div> : null}
                            </div>
                        </div>
                        <div className={s.inputWrap}>
                            <label htmlFor="email">Email</label>
                            <div>
                                <input
                                    id="email"
                                    name="email"
                                    type="text"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.email}
                                />
                                {formik.errors.email ? <div className={s.error}>{formik.errors.email}</div> : null}
                            </div>
                        </div>
                        <div className={s.inputWrap}>
                            <label htmlFor="password">Password</label>
                            <div>

                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.password}
                                />
                                {formik.errors.password ?
                                    <div className={s.error}>{formik.errors.password}</div> : null}
                            </div>
                        </div>
                        <div className={s.btnWrap}>
                            <button type="submit">
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </>

    )
}
// }
