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
           setIcon(() => undefined)
            setStyle(() => checkboxStyles.none)
        }
        if (initialState) {
            setIcon(() => <span className="material-symbols-outlined">done_all</span>)
            setStyle(() => checkboxStyles.good)
        }
        return () => {}
    }, [initialState]);

    return <div className={style} onClick={() => {
        switch (state) {
            case false:
                setState(() => true)
                setIcon(() => <span className="material-symbols-outlined">done_all</span>)
                setStyle(() => checkboxStyles.good)
                break;
            case true:
                setState(() => false)
                //setIcon(()=> <span className="material-symbols-outlined">close</span>)
                setIcon(()=> undefined)
                setStyle(() => checkboxStyles.none)
                break;
        }
        onClick(state)
    }}>{icon}</div>
}

export default CheckBox