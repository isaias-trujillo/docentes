import {FC} from "react";
import styles from "./styles.module.css"

export const Notification: FC<{ message: string, type?: 'error' | 'info' }> = ({message, type = 'error'}) => {
    const className = type === 'error' ? styles.error : styles.info;
    const icon = type === 'error'
        ? <span className="material-symbols-outlined">error</span>
        : <span className="material-symbols-outlined">info</span>;
    return (
        <div className={className}>{icon}{message}</div>
    )
}

export default Notification