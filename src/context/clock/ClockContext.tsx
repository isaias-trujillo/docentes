import {createContext} from "react";
import ClockContextProps from "./ClockContextProps.ts";

export const ClockContext = createContext<ClockContextProps>({
    loading: false,
    date: new Date(),
    getInfo: () => ({
            hours: '00:00:00',
            period: 'a.m.',
            date: 'Monday'
        }
    )
})

export default ClockContext