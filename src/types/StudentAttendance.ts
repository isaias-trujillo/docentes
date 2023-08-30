import Student from "./Student.ts";

export type StudentAttendance = Student & {attended: boolean}

export default StudentAttendance