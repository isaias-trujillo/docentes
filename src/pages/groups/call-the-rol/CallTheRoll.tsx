import {GroupPageLayout} from "../GroupPageLayout.tsx";
import {useAttendancesOfGroup} from "../../../hooks/attendances/useAttendancesOfGroup.ts";
import Notification from "../../../components/notification";
import CheckBox from "../../../components/checkbox";
import Button from "../../../components/button/Button.tsx";
import layout from "./layout.module.css"
import StudentAttendance from "../../../context/attendances/students/StudentAttendance.ts";
import {capitalizeEachWord} from "../../../utils/capitalizeEachWord.ts";
import {Table} from "../../../components/table/Table.tsx";

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

    return <GroupPageLayout>
        <div className={layout.page}>
            <div id={'pasar-lista-cabecera'} className={layout.options}>
                {error && <Notification message={error}/>}
                {(message) && <Notification message={message} type={'info'}/>}
                <div className={layout.top}>
                    Marcar a todos como
                    <CheckBox onClick={(state) => {
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
            <Button name={'Registrar asistencia'} onClick={() => {
                register()
                const section = document.querySelector('#pasar-lista-cabecera')
                section?.scrollIntoView({behavior: 'smooth', block: 'start'})
            }}/>
        </div>
    </GroupPageLayout>
}

export default CallTheRoll