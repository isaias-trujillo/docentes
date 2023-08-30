import './App.css'
import Login from "./pages/login";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ProtectedRoutes from "./routing/ProtectedRoutes.tsx";
import CheckInOut from "./pages/groups/check-in-out";
import CallTheRoll from "./pages/groups/call-the-roll";
import TeacherAttendanceProvider from "./providers/attendances/TeacherAttendanceProvider.tsx";
import {StudentAttendanceProvider} from "./providers/attendances/StudentAttendanceProvider.tsx";

function App() {
    return <BrowserRouter basename={'/docentes-pregrado'}>
        <Routes>
            <Route index={true} element={<Login/>}/>
            <Route path={'grupos/:groupId'} element={<ProtectedRoutes/>}>
                <Route path={'marcar-entrada-salida'} element={
                    <TeacherAttendanceProvider>
                        <CheckInOut/>
                    </TeacherAttendanceProvider>
                }/>
                <Route path={'pasar-lista'} element={
                    <StudentAttendanceProvider>
                        <CallTheRoll/>
                    </StudentAttendanceProvider>
                }/>
            </Route>
        </Routes>
    </BrowserRouter>
}

export default App
