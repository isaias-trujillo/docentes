import TimeInfo from "../../types/TimeInfo.ts";

export type ClockContextProps = {
    loading: boolean,
    date?: Date,
    getInfo: () => TimeInfo
}

export default ClockContextProps