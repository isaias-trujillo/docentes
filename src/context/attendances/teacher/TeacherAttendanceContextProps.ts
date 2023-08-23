import TeacherAttendance from "./TeacherAttendance.ts";

export type TeacherAttendanceContextProps = {
    loading : boolean,
    error?: string,
    message?: string,
    attendances: TeacherAttendance[],
    register: () => void
}

export default TeacherAttendanceContextProps