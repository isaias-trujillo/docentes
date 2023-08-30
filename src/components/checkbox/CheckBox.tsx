import {FC, ReactNode, useEffect, useState} from "react";
import CheckBoxProps from "./CheckBoxProps.ts";
import checkboxStyles from "./checkbox.module.css"

export const CheckBox: FC<CheckBoxProps> = ({initialState= false, onClick}) => {
    const [state, setState] = useState<boolean>(initialState)
    const [icon, setIcon] = useState<ReactNode>(undefined)
    const [style, setStyle] = useState<string | undefined>(undefined)

    useEffect(() => {
        if (!initialState) {
           // setIcon(() => <span className="material-symbols-outlined">close</span>)
           setIcon(() => <span className="material-symbols-outlined">close</span>)
            setStyle(() => checkboxStyles.bad)
        }
        if (initialState) {
            setIcon(() => <span className="material-symbols-outlined">done_all</span>)
            setStyle(() => checkboxStyles.good)
        }
        return () => {}
    }, [initialState]);

    return <div className={style} onClick={() => {
        if (state) {
            //setIcon(()=> <span className="material-symbols-outlined">close</span>)
            setIcon(() => <span className="material-symbols-outlined">close</span>)
            setStyle(() => checkboxStyles.bad)
        }
        if (!state) {
            setIcon(() => <span className="material-symbols-outlined">done_all</span>)
            setStyle(() => checkboxStyles.good)
        }
        setState(prevState => !prevState)
        onClick(state)
    }}>{icon}</div>
}

export default CheckBox