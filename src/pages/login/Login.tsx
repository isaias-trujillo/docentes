import {FC, useRef} from "react";
import Password from "../../components/password";
import Clock from "../../components/clock";
import Button from "../../components/button/Button.tsx";
import useAuth from "../../hooks/useAuth.ts";
import Notification from "../../components/notification";
import styles from "./login.module.css"
import useGroups from "../../hooks/useGroups.ts";
import {Navigate} from "react-router-dom";

export const Login: FC = () => {
    const {login, error, loading, loggedIn} = useAuth();
    const {loading: loadingGroups, groups} = useGroups()

    const ref = useRef<HTMLInputElement | null>(null)
    if (loading) {
        return <span>Loading...</span>
    }

    if (loggedIn) {
        if (loadingGroups) {
            return <span>Loading groups</span>
        }
        const first = groups.length >= 1 ? groups[0] : undefined;
        if (!first) {
            return <span>U don't have any group.</span>
        }
        return <Navigate to={`/grupos/${first.id}/marcar-entrada-salida`}/>
    }

    return (
        <section className={styles.page}>
            <img
                className={styles.cover}
                src={"https://images.unsplash.com/photo-1590402494682-cd3fb53b1f70?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"}
                alt={'Profesora dictando clase con pizarra.'}
            />
            <header className={styles.header}>
                <span>FCC</span>
                <span>Pregrado</span>
            </header>
            <div className={styles.form}>
                <Clock/>
                <Password name={'DNI'} placeholder={'Ingrese su DNI.'} reference={ref}
                          onEnterKeyPressed={() => login(ref.current?.value)}/>
                <Button name={'Ingresar'} onClick={() => login(ref.current?.value)}/>
                {
                    error && <Notification message={error}/>
                }
            </div>
        </section>
    )
}
export default Login