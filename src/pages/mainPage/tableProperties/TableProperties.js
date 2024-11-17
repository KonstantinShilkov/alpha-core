import React from "react";
import s from "./TableProperties.module.css";
import CustomCheckBox from "../../../common/CustomElements/CheckBox/CustomCheckBox";

const TableProperties = () => {
  const data = [
    {
      name: "Давление Номинальное",
      defaultValue: "2,5",
      unit: "МПа",
    },
    {
      name: "Пожаробезопасный",
      defaultValue: <CustomCheckBox />,
      unit: "",
    },
    { name: "Температура среды", defaultValue: "", unit: "°C" },
    {
      name: "Функциональный признак прибора",
      defaultValue: "Т",
      unit: "",
    },
  ];

  return (
    <div className={s.tableContainer}>
      <table className={s.table}>
        <thead>
          <tr>
            <th className={s.header}>
              <span>Название</span>
            </th>
            <th className={s.header}>
              <span>Значение по умолчанию</span>
            </th>
            <th className={s.header}>
              <span>Единица измерения</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan="3">
              <hr className={s.separator} />
            </td>
          </tr>
          {data.map((row, index) => (
            <tr key={index} className={s.row}>
              <td className={s.cell}>{row.name}</td>
              <td className={s.cell}>{row.defaultValue}</td>
              <td className={s.cell}>{row.unit}</td>
            </tr>
          ))}
          <tr>
            <td colSpan="3">
              <hr className={s.separator} />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TableProperties;
