import React, { useState } from "react";
import s from "./DropDownSelector.module.css";

const DropDownSelector = ({ label }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [checkedValues, setCheckedValues] = useState({
    yes: false,
    no: true,
  });

  const handleToggleDropdown = () => setIsOpen((prev) => !prev);

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;

    setCheckedValues((prev) => ({
      yes: name === "yes" ? checked : false,
      no: name === "no" ? checked : false,
    }));

    setIsOpen(false);
  };

  const selectedText = checkedValues.yes ? `${label} + 1` : `${label}`;

  return (
    <div className={s.dropdownContainer}>
      <button
        className={s.toggleButton}
        onClick={handleToggleDropdown}
        aria-expanded={isOpen}
      >
        {selectedText}
        <span className={s.chevron} />
      </button>
      {isOpen && (
        <div className={s.dropdownMenu}>
          <label className={s.checkboxLabel}>
            <input
              type="checkbox"
              name="yes"
              checked={checkedValues.yes}
              onChange={handleCheckboxChange}
            />
            Да
          </label>
          <label className={s.checkboxLabel}>
            <input
              type="checkbox"
              name="no"
              checked={checkedValues.no}
              onChange={handleCheckboxChange}
            />
            Нет
          </label>
        </div>
      )}
    </div>
  );
};

export default DropDownSelector;
