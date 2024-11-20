import React, { FC, ReactNode } from "react";
import s from "./TableConnections.module.css";
import CustomCheckBox from "../../../common/CustomElements/CheckBox/CustomCheckBox";

interface DataRow {
  status: ReactNode; 
  className: string;
}

const TableConnections: FC = () => {
  const data: DataRow[] = [
    {
      status: <CustomCheckBox />,
      className: "Механическое оборудование",
    },
    {
      status: <CustomCheckBox />,
      className: "Титул",
    },
  ];

  return (
    <div className={s.tableContainer}>
      <table className={s.table}>
        <thead>
          <tr>
            <th className={s.header}>
              <CustomCheckBox />
            </th>
            <th className={s.header}>Название Класса</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan={2}>
              <hr className={s.separator} />
            </td>
          </tr>
          {data.map((row, index) => (
            <tr key={index} className={s.row}>
              <td className={s.cell}>{row.status}</td>
              <td className={s.cell}>{row.className}</td>
            </tr>
          ))}
          <tr>
            <td colSpan={2}>
              <hr className={s.separator} />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TableConnections;
