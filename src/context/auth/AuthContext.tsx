import {createContext} from "react";
import AuthContextProps from "./AuthContextProps.tsx";

export const AuthContext = createContext<AuthContextProps>({
    login: (dni) => console.log(`Logging with dni ${dni}`),
    logout: () => console.log("Logging out"),
    loading: false,
    loggedIn: false,
    error: 'No pudo identificarse.',
});

export default AuthContext