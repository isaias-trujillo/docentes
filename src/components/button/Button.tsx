import {FC} from "react";
import styles from "./styles.module.css"

type Style = 'dark' | 'light';
type Props = { name: string, onClick: () => void, style?: Style , disabled?: boolean};

export const Button: FC<Props> = ({name, onClick, style = 'dark', disabled = false}) => {
    const className = style === 'dark' ? styles.dark : styles.light;
    return <button className={className} onClick={() => {
        if (!disabled){
            onClick()
        }
    }} disabled={disabled}>{name}</button>;
}

export default Button