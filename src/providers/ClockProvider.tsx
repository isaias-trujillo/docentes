import {FC, ReactNode, useEffect, useState} from "react";
import ClockContext from "../context/clock";
import TimeInfo from "../types/TimeInfo.ts";

const buildTimeInfoFromDate = (date: Date): TimeInfo => {
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    const ap = hours >= 12 ? 'p.m.' : 'a.m.';
    hours = hours % 12;
    const hoursString = (hours ? hours : 12).toString().padStart(2, '0');
    const dateString = date.toLocaleDateString('es-ES', {
        timeZone: 'America/Lima',
        dateStyle: 'full'
    })
    return {date: dateString, hours: `${hoursString}:${minutes}:${seconds}`, period: ap}
}

export const ClockProvider: FC<{ children: ReactNode }> = ({children}) => {
    const [loading, setLoading] = useState(false);
    const [date, setDate] = useState<Date | undefined>(undefined);
    const [previousDate, setPreviousDate] = useState<Date | undefined>(undefined);

    const getInfo = () => {
        return buildTimeInfoFromDate(date ?? new Date())
    }

    useEffect(() => {
        const startTime = performance.now();
        const secondsDifference = Math.abs((date?.getSeconds() ?? 0) - (previousDate?.getSeconds() ?? 0));
        if (date && secondsDifference < 30) {
            const id = setInterval(() => {
                const endTime = performance.now();
                date.setMilliseconds(date.getMilliseconds() + (endTime - startTime))
                setDate(() => new Date(date))
            }, 500);
            return () => clearInterval(id);
        }
        setLoading(() => true)
        const controller = new AbortController();
        fetch("http://localhost:80/sia-api/api/clock", {signal: controller.signal})
            .then(res => res.json())
            .then(res => {
                if (!res['success']) {
                    throw new Error(res['message'])
                }
                if (!res['found']) {
                    throw new Error(res['message'])
                }
                const date = new Date(res['datetime']);
                setPreviousDate(() => date)
                setDate(() => date)
            })
            .catch(() => {
                const date = new Date()
                setPreviousDate(() => date)
                setDate(() => date)
            })
            .finally(() => setLoading(() => false))
        return () => controller.abort()
    }, [date]);

    return (
        <ClockContext.Provider value={{
            loading: loading,
            date: date,
            getInfo: getInfo
        }}>
            {children}
        </ClockContext.Provider>
    )
}