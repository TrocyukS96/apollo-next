import {useRouter} from "next/router";
import s from './../styles/username.module.scss';
import Feeds from "../components/feeds/Feeds";

const UserPage = () => {
    const router = useRouter()

    const {username} = router.query
    console.log(router.query)
    return (
        <div className={s.container}>
                <header className={s.header}>
                    <div className={s.userName}><span>{ username ? username[0].toUpperCase() : "U"}</span></div>
                </header>
                <main className={s.main}>
                    <h3 className={s.mainTitle}>My posts</h3>
                    <div className={s.content}>
                        <h4>list of Links</h4>
                            <Feeds/>
                    </div>
                </main>
        </div>
    )
}

export default UserPage;