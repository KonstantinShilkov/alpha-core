import React from "react";
import s from "./CustomCheckBox.module.css";

const CustomCheckBox = () => {
  return (
    <label className={s.checkboxWrapper}>
      <input type="checkbox" disabled className={s.checkboxInput} />
      <span className={s.checkboxCustom}></span>
    </label>
  );
};

export default CustomCheckBox;
