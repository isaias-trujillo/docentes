import {FC, ReactNode} from "react";
import useAuth from "../../hooks/useAuth.ts";
import GroupsNavBar from "../../components/groups-navbar";
import useGroups from "../../hooks/useGroups.ts";
import Header from "../../components/header";
import SectionNavBar from "../../components/section-navbar";
import layout from "./layout.module.css"

export const GroupPageLayout: FC<{ children: ReactNode }> = ({children}) => {
    const {loading: loadingUser} = useAuth();
    const {loading: loadingGroups} = useGroups();

    if (loadingUser){
        return <span>Loading user...</span>
    }

    if (loadingGroups){
        return <span>Loading groups...</span>
    }

    return (
        <div className={layout.page}>
            <Header/>
            <section className={layout.content}>
                <GroupsNavBar/>
                <div className={layout.main}>
                    <SectionNavBar/>
                    {children}
                </div>
            </section>
        </div>
    )
}