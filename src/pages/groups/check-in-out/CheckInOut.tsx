import {GroupPageLayout} from "../GroupPageLayout.tsx";
import Clock from "../../../components/clock";
import Button from "../../../components/button/Button.tsx";
import Notification from "../../../components/notification";
import useAttendancesTeacher from "../../../hooks/attendances/useAttendancesTeacher.ts";
import TeacherAttendance from "../../../context/attendances/teacher/TeacherAttendance.ts";
import TeacherAttendanceCard from "../../../components/teacher-attendance-card";
import styles from "./styles.module.css"

export const CheckInOut = () => {
    const {loading, error, register, attendances, message} = useAttendancesTeacher();
    if (loading) {
        return <span>Loading</span>
    }

    const buttonState = getButtonState(attendances);

    return <GroupPageLayout>
        <div className={styles.page}>
            <Notification message={'No olvide registrar la asistencia de los estudiantes tanto virtual como física.'}
                          type={'info'}/>
            <Clock/>
            <Button name={buttonState.name ?? "Ya no puede marcar"} onClick={register} disabled={buttonState.disabled}/>
            <div className={styles.information}>
                {
                    attendances.map((a, index) => <TeacherAttendanceCard key={index} attendance={a} order={index+1}/>)
                }
                {error && <Notification message={error}/>}
                {message && <Notification message={message} type={'info'}/>}
            </div>
        </div>
    </GroupPageLayout>
}

const getButtonState = (attendances: TeacherAttendance[]) => {
    const size = attendances.length;
    if (size === 0) {
        return {
            name: "Marcar entrada",
            disabled: false
        };
    }
    const lastRecord = attendances[size - 1];
    if (size === 1) {
        return {
            name: !lastRecord['check out time'] ? "Marcar salida" : "Marcar entrada",
            disabled: false
        }
    }
    return !lastRecord['check out time'] ? {
        name: 'Marcar salida',
        disabled: false
    } : {disabled: true}
}

export default CheckInOut