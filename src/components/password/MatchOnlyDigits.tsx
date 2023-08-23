import {ChangeEvent} from "react";

export const matchOnlyDigits = (e: ChangeEvent<HTMLInputElement>) => {
    e.target.value =e.target.value.replace(/\D/, '').slice(0, 8);
}