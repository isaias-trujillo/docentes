import Teacher from "../../types/Teacher.ts";

export type AuthContextProps = {
    loading: boolean,
    loggedIn: boolean,
    teacher?: Teacher,
    error?: string,
    login: (dni: string | undefined) => void,
    logout: () => void
}


export default AuthContextProps