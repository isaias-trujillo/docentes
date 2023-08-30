import {FC, ReactNode, useEffect, useState} from "react";
import GroupsContext from "../context/groups";
import useAuth from "../hooks/useAuth.ts";
import Group from "../types/Group.ts";
import host from "../host.ts";

export const GroupsProvider: FC<{ children: ReactNode }> = ({children}) => {
    const {teacher} = useAuth();
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | undefined>(undefined)
    const [groups, setGroups] = useState<Group[]>([]);

    useEffect(() => {
        if (!teacher) {
            setGroups(() => [])
            setLoading(() => false)
            return
        }
        const dni = teacher?.dni;
        const controller = new AbortController();
        setLoading(() => true)
        fetch(`${host}/sia-api/api/teachers/${dni}/groups`, {
            signal: controller.signal,
            headers: {'Content-Type': 'application/json'},
            method: 'get'
        }).then(res => res.json())
            .then((res) => {
                if (!res['success']) {
                    throw new Error(res['message'])
                }
                if (!res['found']) {
                    throw new Error(res['message'])
                }
                setGroups(() => res['records'])
            }).catch(e => setError(() => e.message))
            .finally(() => setLoading(() => false))
        return () => controller.abort();
    }, [teacher]);

    return (
        <GroupsContext.Provider value={{
            loading: loading,
            error: error,
            groups: groups
        }}>
            {children}
        </GroupsContext.Provider>
    )
}