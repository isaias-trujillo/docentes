import {FC, ReactNode, useEffect, useState} from "react";
import StudentAttendanceContext from "../../context/attendances/students";
import StudentAttendance from "../../context/attendances/students/StudentAttendance.ts";
import useAuth from "../../hooks/useAuth.ts";
import {useParams} from "react-router-dom";
import Student from "../../types/Student.ts";

export const StudentAttendanceProvider: FC<{ children: ReactNode }> = ({children}) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | undefined>(undefined)
    const [message, setMessage] = useState<string | undefined>(undefined)
    const [records, setRecords] = useState<StudentAttendance[]>([])
    const [marked, setMarked] = useState<number>(0)

    const {teacher, loggedIn} = useAuth();
    const {groupId} = useParams();

    const markStudentAs = (studentId: string, attended: boolean) => {
        const match = records.find(r => r.id == studentId)
        if (match) {
            match.attended = attended
            setRecords(() => [...records])
        }
        return;
    }
    const markAllStudentAs = (attended: boolean) => {
        setLoading(() => true)
        records.forEach(r => {
            markStudentAs(r.id, attended)
        })
        setLoading(() => false)
    }

    const register = () => {
        setError(() => undefined)
        setMessage(() => undefined)
        if (!teacher || !loggedIn) {
            setError(() => "El profesor no ha iniciado sesión.")
            return;
        }
        const count = records.filter(r => r.attended != undefined).length;
        if (count < 1) {
            setError(() => "No hay registros que enviar.")
            return
        }
        const controller = new AbortController();
        const dni = teacher.dni
        fetch(`http://localhost:80/sia-api/api/attendances/groups/${groupId}`, {
            signal: controller.signal,
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                    teacher: dni,
                    attendances: records.map(r => ({'student id': r.id, attended: r.attended}))
                }
            )
        })
            .then(res => res.json())
            .then(res => {
                if (!res['success']) {
                    throw new Error(res['message'])
                }
                setMessage(() => res['message']);
            }).catch(e => setError(() => e.message))
            .finally(() => setLoading(() => false))
    }

    useEffect(() => {
        setMarked(() => 0)
        setRecords(() => [])
        setError(() => undefined)
        setMessage(() => undefined)
        setLoading(() => true)
        if (!teacher || !loggedIn) {
            setError(() => "El profesor no ha iniciado sesión.")
            setLoading(() => false)
            return;
        }
        const dni = teacher.dni
        const controller = new AbortController();
        fetch(`http://localhost/sia-api/api/teachers/${dni}/groups/${groupId}/students`, {signal: controller.signal})
            .then(res => res.json())
            .then(res => {
                if (!res['success']) {
                    throw new Error(res['message'])
                }
                setError(() => undefined)
                const attendances = (res['records'] as Student[]).map(s => ({...s, attended: false}));
                setRecords(() => attendances)
            }).catch(e => setError(() => e.message))
            .finally(() => setLoading(() => false))
        return () => controller.abort();
    }, [groupId, loggedIn, teacher]);

    return <StudentAttendanceContext.Provider value={{
        loading: loading,
        error: error,
        message: message,
        marked: marked,
        attendances: records,
        markStudentAs: markStudentAs,
        markAllStudentAs: markAllStudentAs,
        register: register
    }}>
        {children}
    </StudentAttendanceContext.Provider>
}