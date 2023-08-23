import {createContext} from "react";
import TeacherAttendanceContextProps from "./TeacherAttendanceContextProps.ts";

export const TeacherAttendanceContext = createContext<TeacherAttendanceContextProps>({
    loading: false,
    attendances: [],
    register: () => alert("Registering attendance.")
})
export default TeacherAttendanceContext