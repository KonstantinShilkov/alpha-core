import s from "./MainTree.module.css";
import Tree from "./Tree";

const MainTree = () => {
  return (
    <div className={s.mainContainer}>
      <div className={s.headerContainer}>
        Классы присвоения в Библтотеке найти
      </div>
      <div className={s.treeButtons}>Свернуть Развернуть</div>
      <div className={s.mainBodyBox}>
        <div className={s.tree}>
          <Tree />
        </div>
        <div className={s.detailsContainer}>
          Детали описание
          <div className={s.detailsBox}>Описание </div>
          <div className={s.propertiesTable}> Свойства </div>
          <div className={s.connectionTable}> Связи </div>
        </div>
      </div>
    </div>
  );
};

export default MainTree;
