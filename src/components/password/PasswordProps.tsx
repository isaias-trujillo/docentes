import {MutableRefObject} from "react";

export type PasswordProps = {
    name?: string,
    placeholder?: string,
    reference: MutableRefObject<HTMLInputElement | null>,
    onEnterKeyPressed?: () => void
}