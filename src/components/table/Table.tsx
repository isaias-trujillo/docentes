import TableProps from "./TableProps.ts";
import tableLayout from "./layout.module.css"

export const Table = <T extends NonNullable<unknown>>(props: TableProps<T>) => {
    const {columns, rows, mapper} = props;
    return (
        <table className={tableLayout.table}>
            <thead className={tableLayout.header}>
            <tr>
                {columns.map((c, index) => <th key={index} className={tableLayout.cell}>{c}</th>)}
            </tr>
            </thead>
            <tbody>
            {
                rows.map((row, index) => <tr key={index}>{mapper(row)}</tr>)
            }
            </tbody>
        </table>
    )
};