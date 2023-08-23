import {FC, useState} from "react";
import styles from "./styles.module.css"
import {PasswordProps} from "./PasswordProps.tsx";
import {matchOnlyDigits} from "./MatchOnlyDigits.tsx";

export const Password: FC<PasswordProps> = ({name = "password", placeholder = "insert your password", reference, onEnterKeyPressed}) => {
    const [checked, setChecked] = useState(false);

    return (
        <div className={styles.password}>
            <label className={styles.label} htmlFor={'password-input-id'}>
                <span className={styles.title}>{name}</span>
                <input
                    className={styles.field}
                    id={'password-input-id'}
                    autoFocus={true}
                    placeholder={placeholder}
                    type={checked ? 'text' : 'password'}
                    ref={reference}
                    onChange={matchOnlyDigits}
                    onKeyDown={(event) => {
                        if (onEnterKeyPressed && event.key == "Enter") {
                            onEnterKeyPressed()
                        }
                    }}
                />
            </label>
            <label className={styles.checkboxLabel}>
                <input className={styles.checkbox} type={'checkbox'}
                       onChange={() => setChecked((prevState) => !prevState)}/>
                Mostrar
            </label>
        </div>
    )
}

export default Password