import {FC} from "react";
import {NavLink} from "react-router-dom";
import styles from "./styles.module.css"
import useGroups from "../../hooks/useGroups.ts";

export const GroupsNavBar: FC = () => {
    const {groups} = useGroups();
    const path = window.location.href.split("/").slice(-1);
    return <nav className={styles.navbar}>
        {groups.map((g, index) => <NavLink
            to={`/grupos/${g.id}/${path}`}
            key={index}
            className={({isActive}) => isActive ? styles.active : styles.inactive}>
            <span>{g.course}</span>
            <span>{g.classroom}{g.turn ? `-${g.turn}` : ""}</span>
        </NavLink>)}
    </nav>
}

export default GroupsNavBar