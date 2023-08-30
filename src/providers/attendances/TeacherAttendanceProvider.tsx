import {FC, ReactNode, useCallback, useEffect, useState} from "react";
import TeacherAttendanceContext from "../../context/attendances/teacher";
import TeacherAttendance from "../../context/attendances/teacher/TeacherAttendance.ts";
import useAuth from "../../hooks/useAuth.ts";
import {useParams} from "react-router-dom";
import host from "../../host.ts";

export const TeacherAttendanceProvider: FC<{ children: ReactNode }> = ({children}) => {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | undefined>(undefined)
    const [message, setMessage] = useState<string | undefined>(undefined)
    const [attendances, setAttendances] = useState<TeacherAttendance[]>([]);
    const {teacher, loggedIn} = useAuth();
    const {groupId} = useParams();

    const register = () => {
        setMessage(() => undefined)
        setError(() => undefined)
        setLoading(() => true)
        if (!teacher || !loggedIn) {
            setError(() => "El profesor no ha iniciado sesión.")
            setLoading(() => false)
            return;
        }
        const controller = new AbortController();
        const dni = teacher.dni;
        fetch(`${host}/sia-api/api/attendances/teacher/${dni}/groups/${groupId}`, {
            signal: controller.signal,
            method: 'post',
            headers: {'Content-Type': 'application/json'}
        })
            .then(res => res.json())
            .then(res => {
                if (!res['success']) {
                    throw new Error(res['message'])
                }
                if (!res['created']) {
                    throw new Error(res['message'])
                }
                setMessage(() => res['message']);
                getAttendanceList(controller);
            }).catch(e => setError(() => e.message))
            .finally(() => setLoading(() => false))
        return () => controller.abort()
    }

    const getAttendanceList = useCallback((controller: AbortController) => {
            setAttendances(() => [])
            setError(() => undefined)
            setMessage(() => undefined)
            setLoading(() => true)
            if (!teacher || !loggedIn) {
                setError(() => "El profesor no ha iniciado sesión.")
                setLoading(() => false)
                return;
            }
            const dni = teacher.dni;
            fetch(`${host}/sia-api/api/attendances/teacher/${dni}/groups/${groupId}`, {signal: controller.signal})
                .then(res => res.json())
                .then(res => {
                    if (!res['success']) {
                        throw new Error(res['message'])
                    }
                    if (!res['found']) {
                        throw new Error(res['message'])
                    }
                    setError(() => undefined)
                    setAttendances(() => res['records'])
                }).catch(e => setError(() => e.message))
                .finally(() => setLoading(() => false))
        }
        , [groupId, loggedIn, teacher])

    useEffect(() => {
        const controller = new AbortController();
        getAttendanceList(controller);
        return () => controller.abort()
    }, [getAttendanceList, groupId]);

    return (
        <TeacherAttendanceContext.Provider value={{
            loading: loading,
            error: error,
            message: message,
            register: register,
            attendances: attendances
        }}>
            {children}
        </TeacherAttendanceContext.Provider>
    )
}

export default TeacherAttendanceProvider