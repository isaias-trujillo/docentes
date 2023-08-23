import {useContext} from "react";
import GroupsContext from "../context/groups";

export const useGroups = () => useContext(GroupsContext)
export default useGroups