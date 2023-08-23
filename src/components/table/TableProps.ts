import {ReactNode} from "react";

export type Row = Record<string, any>

export type TableProps<T> = {
    columns: ReactNode[],
    rows: T[],
    mapper: (row: T) => ReactNode
}
export default TableProps