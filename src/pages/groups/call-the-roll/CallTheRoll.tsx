import {GroupPageLayout} from "../GroupPageLayout.tsx";
import {useAttendancesOfGroup} from "../../../hooks/attendances/useAttendancesOfGroup.ts";
import Notification from "../../../components/notification";
import CheckBox from "../../../components/checkbox";
import Button from "../../../components/button/Button.tsx";
import layout from "./layout.module.css"
import StudentAttendance from "../../../context/attendances/students/StudentAttendance.ts";
import {capitalizeEachWord} from "../../../utils/capitalizeEachWord.ts";
import {Table} from "../../../components/table/Table.tsx";
import Popup from "../../../components/popup";
import {useState} from "react";

export const CallTheRoll = () => {
    const {
        loading,
        error,
        message,
        attendances,
        markStudentAs,
        markAllStudentAs,
        register
    } = useAttendancesOfGroup();

    const [hideMainContent, setHideMainContent] = useState(true)

    const mapper = (attendance: StudentAttendance) => {
        return <>
            <td key={0}>
                <div>{attendance.code}</div>
            </td>
            <td key={1}>
                <div>{capitalizeEachWord(attendance["full name"])}</div>
            </td>
            <td key={2}>
                <div>
                    <CheckBox initialState={attendance.attended} onClick={(state) => {
                        if (!state) {
                            markStudentAs(attendance.id, true)
                            return
                        }
                        if (state) {
                            markStudentAs(attendance.id, false)
                        }
                    }}/>
                </div>
            </td>
        </>
    }

    if (loading) {
        return <span>Loading...</span>
    }

    const markedAsAttendedCount = attendances.filter(a => a.attended).length;
    const markedAsNotAttendedCount = attendances.length - markedAsAttendedCount;

    return <GroupPageLayout>
        {
            (message != undefined && hideMainContent) ?
                <Popup message={message} onClose={() => setHideMainContent(() => false)}/>
                : <>
                    <div className={layout.page}>
                        <div className={layout.options}>
                            {error && <Notification message={error}/>}
                            {<Notification
                                message={`Asistencias: ${markedAsAttendedCount}, faltas: ${markedAsNotAttendedCount}`}
                                type={'info'}/>}
                            <div className={layout.top}>
                                Marcar a todos como
                                <CheckBox initialState={true} onClick={(state) => {
                                    if (!state) {
                                        markAllStudentAs(true)
                                        return
                                    }
                                    markAllStudentAs(false)
                                }}/>
                            </div>
                        </div>
                        <Table columns={[
                            'Código',
                            'Estudiante',
                            'Asistencia'
                        ]} rows={attendances} mapper={mapper}/>
                    </div>
                    <div className={layout.bottom}>
                        <Button name={'Registrar asistencias'} onClick={() => {
                            register()
                            setHideMainContent(() => true)
                        }}/>
                    </div>
                </>
        }
    </GroupPageLayout>
}

export default CallTheRoll