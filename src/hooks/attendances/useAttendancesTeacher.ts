import {useContext} from "react";
import TeacherAttendanceContext from "../../context/attendances/teacher";

export const useAttendancesTeacher = () => useContext(TeacherAttendanceContext);

export default useAttendancesTeacher