import {FC, useState} from "react";
import Button from "../button/Button.tsx";
import popup from "./popup.module.css"

export const Popup: FC<{ message: string, onClose?: () => void }> = ({message, onClose}) => {
    const [show, setShow] = useState(true)

    return <div className={popup.container} style={{display: show ? 'flex' : 'none'}}>
        <div className={popup.card}>
            <img className={popup.cover}
                 src={"https://img.freepik.com/vector-gratis/ilustracion-concepto-proyecto-universitario_114360-10541.jpg"}
                 alt={message}/>
            <span className={popup.message}>{message}</span>
            <Button name={"Cerrar"} onClick={() => {
                setShow(() => false)
                if (onClose) {
                    onClose()
                }
            }}/>
        </div>
    </div>
}

export default Popup