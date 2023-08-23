import {useContext} from "react";
import ClockContext from "../context/clock";

export const useClock = () => useContext(ClockContext)