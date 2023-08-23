import {FC} from "react";
import {NavLink, useParams} from "react-router-dom";
import styles from "./styles.module.css"

export const SectionNavBar: FC = () => {
    const {groupId} = useParams()
    return (
        <nav className={styles.navbar}>
            <NavLink to={`/grupos/${groupId}/marcar-entrada-salida`}
                     className={({isActive}) => isActive ? styles.active : styles.inactive}>
                <span className="material-symbols-outlined">sync_alt</span>
                Marcar entrada/salida
            </NavLink>
            <NavLink to={`/grupos/${groupId}/pasar-lista`}
                     className={({isActive}) => isActive ? styles.active : styles.inactive}>
                <span className="material-symbols-outlined">checklist</span>
                Pasar lista
            </NavLink>
        </nav>
    )
}

export default SectionNavBar