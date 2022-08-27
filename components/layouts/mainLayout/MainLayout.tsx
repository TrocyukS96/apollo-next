import {FC, ReactNode, useEffect} from "react";
import s from './mainLayout.module.scss';
import {useRouter} from "next/router";
import Toaster from "react-hot-toast";

interface IProps {
    children:ReactNode
}

export const MainLayout:FC<IProps> = ({children}) =>{
    const router = useRouter()
    useEffect(()=>{
        router.push('/login')
    },[])
    return(
        <div className={s.wrapper}>
            {children}
        </div>
    )
}