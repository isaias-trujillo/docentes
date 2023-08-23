import {useContext} from "react";
import StudentAttendanceContext from "../../context/attendances/students";

export const useAttendancesOfGroup = () => useContext(StudentAttendanceContext)