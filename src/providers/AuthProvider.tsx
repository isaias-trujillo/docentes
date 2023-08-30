import {FC, ReactNode, useEffect, useState} from "react";
import AuthContext from "../context/auth";
import Teacher from "../types/Teacher.ts";
import host from "../host.ts";

export const AuthProvider: FC<{ children: ReactNode }> = ({children}) => {
    const [loading, setLoading] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const [error, setError] = useState<string | undefined>(undefined);
    const [teacher, setTeacher] = useState<Teacher | undefined>(undefined);

    const login = (dni: string | undefined) => {
        if (!dni || dni.trim().length === 0) {
            setError(() => "DNI vacío.")
            return;
        }
        setLoading(() => true)
        fetch(`${host}/sia-api/api/auth`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({dni: dni}),
        })
            .then(res => res.json())
            .then((res) => {
                if (!res['success']) {
                    throw new Error(res['message'])
                }
                if (!res['found']) {
                    throw new Error(res['message'])
                }
                setTeacher(() => res['teacher'])
                localStorage.setItem('user', JSON.stringify(res['teacher']))
                setLoggedIn(() =>  true)
            })
            .catch((e) => {
                setError(() => e.message)
            })
            .finally(() => {
                setLoading(() => false)
            })
    }

    const logout = () => {
        setTeacher(() => undefined)
        localStorage.removeItem('user')
        setLoggedIn(() => false)
        window.location.reload()
    }

    useEffect(() => {
        const item = localStorage.getItem('user')
        if (!item) {
            return
        }
        const currentTeacher = JSON.parse(item) as Teacher
        setTeacher(() => currentTeacher)
        setLoggedIn(() => true)
    }, []);

    return (
        <AuthContext.Provider value={{
            login: login,
            error: error,
            loggedIn: loggedIn,
            teacher: teacher,
            loading: loading,
            logout: logout
        }}>
            {children}
        </AuthContext.Provider>
    )
}