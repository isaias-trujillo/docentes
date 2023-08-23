import {FC} from "react";
import TeacherAttendance from "../../context/attendances/teacher/TeacherAttendance.ts";
import styles from "./card.module.css"

export const TeacherAttendanceCard: FC<{ attendance: TeacherAttendance, order: number }> = ({attendance, order}) => {
    return <div className={styles.card} key={order}>
        <span className={styles.title}>Asistencia N° {order}</span>
        {
            <span className={styles.hour}>
                <strong className={styles.subtitle}>Hora de ingreso: </strong> {attendance["check in time"]}
            </span>
        }
        {
            attendance["check out time"] != undefined &&
            <span className={styles.hour}>
                <strong className={styles.subtitle}>Hora de salida: </strong> {attendance["check out time"]}
            </span>}
    </div>
}

export default TeacherAttendanceCard