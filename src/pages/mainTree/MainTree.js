import useTreeData from "../hooks/useTreeData";
import s from "./MainTree.module.css";
import TableConnections from "./tableConnections/TableConnections";
import TableProperties from "./tableProperties/TableProperties";
import Tree from "./Tree";
import { useEffect, useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import searchIcon from "..//..//assets/images/search icon.jpg";
import Preloader from "../../common/Preloader";

const MainTree = () => {
  const { treeData, loading, error, filteredTreeData, getSelectedClasses } =
    useTreeData();
  const [expandedItems, setExpandedItems] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [selectedValue, setSelectedValue] = useState("");

  const handleExpandAll = () => {
    const allNodeIds = [];
    const collectIds = (node) => {
      allNodeIds.push(node.id);
      if (node.children) {
        node.children.forEach(collectIds);
      }
    };
    filteredTreeData.forEach(collectIds);
    setExpandedItems(allNodeIds);
  };

  const handleCollapseAll = () => {
    setExpandedItems([]);
  };

  const treeClassesNames = treeData.map((treeItem) => treeItem.name);

  useEffect(() => {
    getSelectedClasses(selectedValue);
  }, [selectedValue]);

  if (loading) {
    return <Preloader />;
  }

  if (error) {
    return <p>Ошибка загрузки дерева: {error.message}</p>;
  }

  return (
    <div className={s.mainContainer}>
      <div className={s.headerContainer}>
        <div className={s.classes}>Классы</div>
        <div className={s.filterSearchBox}>
          <div>
            <select className={s.assigned} defaultValue="">
              <option value="" disabled>
                Присвоенные
              </option>
              <option value="yes">Да</option>
              <option value="no">Нет</option>
            </select>
          </div>
          <div>
            <select className={s.inLibrary} defaultValue="">
              <option value="" disabled>
                В Библиотеке
              </option>
              <option value="yes">Да</option>
              <option value="no">Нет</option>
            </select>
          </div>
          <div className={s.searchContainer}>
            <Autocomplete
              freeSolo
              options={treeClassesNames}
              value={searchValue}
              onInputChange={(event, newValue) => setSearchValue(newValue)}
              onChange={(event, newValue) => setSelectedValue(newValue)}
              renderInput={(params) => (
                <div ref={params.InputProps.ref} className={s.inputWrapper}>
                  <span className={s.icon}>
                    <img
                      className={s.searchIconImage}
                      src={searchIcon}
                      alt="Search Icon"
                    />
                  </span>
                  <input
                    {...params.inputProps}
                    className={s.search}
                    placeholder="Найти Классы"
                  />
                </div>
              )}
            />
          </div>
        </div>
      </div>
      <div className={s.treeButtons}>
        <button className={s.buttonMin} onClick={handleCollapseAll}>
          Свернуть все
        </button>
        <button className={s.buttonExp} onClick={handleExpandAll}>
          Развернуть все
        </button>
      </div>
      <div className={s.mainBodyBox}>
        <div className={s.tree}>
          <Tree
            data={filteredTreeData}
            expandedItems={expandedItems}
            setExpandedItems={setExpandedItems}
            loading={loading}
          />
        </div>
        <div className={s.detailsContainer}>
          <div className={s.detailsText}>
            <span>Описание</span>
          </div>
          <div className={s.detailsBox}>
            <textarea className={s.detailsTextArea} disabled />
          </div>
          <div className={s.propertiesText}>
            <span>Свойства</span>
          </div>
          <div className={s.propertiesTable}>
            <TableProperties />
          </div>
          <div className={s.connectionText}>
            <span> Связи </span>
          </div>
          <div className={s.connectionTable}>
            <TableConnections />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainTree;
