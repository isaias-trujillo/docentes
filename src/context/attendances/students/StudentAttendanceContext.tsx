import {createContext} from "react";
import StudentAttendanceContextProps from "./StudentAttendanceContextProps.ts";

export const StudentAttendanceContext = createContext<StudentAttendanceContextProps>({
   loading: false,
   attendances: [],
   markStudentAs: (studentId, attended) => console.log(`Registering student with id '${studentId}' and state = '${attended}'`),
   register: () => console.log("Registering all attendances."),
   markAllStudentAs: (attended) => console.log(`Marking all students with status = '${attended}'`),
   marked: 0
});

export default StudentAttendanceContext;