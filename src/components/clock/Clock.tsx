import {FC} from "react";
import styles from "./styles.module.css"
import {useClock} from "../../hooks/useClock.ts";

export const Clock: FC = () => {
    const {loading, getInfo} = useClock();
    const info = getInfo()

    return <div className={styles.clock}>
        <div className={styles.hours}>
            <span>{loading ? "00:00:00" : (info?.hours ?? '00:00:00')}</span><span className={styles.accent}>{loading ? "??" : (info?.period ?? "??")}</span>
        </div>
        <span className={styles.date}>{loading ? "Waiting response from server." : info?.date}</span>
    </div>;
}

export default Clock