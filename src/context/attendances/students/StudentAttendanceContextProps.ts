import StudentAttendance from "./StudentAttendance.ts";

export type StudentAttendanceContextProps = {
    loading: boolean,
    error?: string,
    message?: string,
    marked: number,
    attendances: StudentAttendance[],
    markStudentAs: (studentId: string, attended: boolean) => void,
    markAllStudentAs: (attended: boolean) => void;
    register: () => void
}

export default StudentAttendanceContextProps