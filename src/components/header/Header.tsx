import {FC} from "react";
import Button from "../button/Button.tsx";
import useAuth from "../../hooks/useAuth.ts";
import styles from "./header.module.css"

import {capitalizeEachWord} from "../../utils/capitalizeEachWord.ts";

export const Header: FC = () => {
    const {teacher, logout} = useAuth();
    return <section className={styles.header}>
        <div className={styles.teacher}>
            <span
                className={styles.accent}>Docente:</span><span>{capitalizeEachWord(teacher?.["full name"] ?? "Mr. Nobody")}</span>
        </div>
        <Button name={'Desconectarse'} onClick={logout} style={'light'}/>
    </section>
}

export default Header