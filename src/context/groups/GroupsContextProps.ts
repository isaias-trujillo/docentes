import Group from "../../types/Group.ts";

export type GroupsContextProps = {
    loading: boolean,
    error?: string,
    groups: Group[]
}

export default GroupsContextProps