import {createContext} from "react";
import GroupsContextProps from "./GroupsContextProps.ts";

const GroupsContext = createContext<GroupsContextProps>({
    loading: false,
    groups: []
})

export default GroupsContext