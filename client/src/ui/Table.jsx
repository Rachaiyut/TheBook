import { createContext, useContext } from "react";

const TableContext = createContext();

function Table({ children }) {
    return (
        <TableContext.Provider value={{}}>
            <table className="min-w-full bg-white border border-gray-200 overflow-hidden">
                {children}
            </table>
        </TableContext.Provider>
    );
}

function Row({ children }) {
    return (
        <tr className="border-b border-gray-200 p-8">
            {children}
        </tr>
    );
}

function Header({ children }) {
    return (
        <thead className="bg-gray-50 uppercase  text-gray-600 text-sm font-semibold p-8">
            <Row>
                {children}
            </Row>
        </thead>
    );
}

function Body({ children }) {
    return <tbody>{children}</tbody>;
}

Table.Row = Row;
Table.Header = Header;
Table.Body = Body;

export default Table;
