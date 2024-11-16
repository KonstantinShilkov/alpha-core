import { React } from "react";
import { SimpleTreeView } from "@mui/x-tree-view/SimpleTreeView";
import { TreeItem } from "@mui/x-tree-view/TreeItem";
import s from "./MainTree.module.css";

const RecursiveTreeItem = ({ node, expandedItems, setExpandedItems }) => {
  const handleDoubleClick = (event) => {
    event.stopPropagation();

    setExpandedItems((prevExpandedItems) =>
      prevExpandedItems.includes(node.id)
        ? prevExpandedItems.filter((id) => id !== node.id)
        : [...prevExpandedItems, node.id]
    );
  };

  return (
    <TreeItem
      itemId={node.id}
      label={node.name}
      className={s.treeItem}
      onDoubleClick={handleDoubleClick}
      sx={{
        "& .MuiCheckbox-root": {
          width: "18px",
          height: "18px",
          color: "#292222",
        },
      }}
    >
      {node.children &&
        node.children.map((child) => (
          <RecursiveTreeItem
            key={child.id}
            node={child}
            expandedItems={expandedItems}
            setExpandedItems={setExpandedItems}
          />
        ))}
    </TreeItem>
  );
};

const Tree = ({ data, expandedItems, setExpandedItems, loading }) => {
  if (!data || data.length === 0) {
    return <div>Нет данных для отображения</div>;
  }

  const handleExpandedItemsChange = (event, itemIds) => {
    setExpandedItems(itemIds);
  };

  return (
    <SimpleTreeView
      expansionTrigger="iconContainer"
      multiSelect
      checkboxSelection
      expandedItems={expandedItems}
      onExpandedItemsChange={handleExpandedItemsChange}
      className={s.treeComponent}
    >
      {data.map((node) => (
        <RecursiveTreeItem
          key={node.id}
          node={node}
          expandedItems={expandedItems}
          setExpandedItems={setExpandedItems}
        />
      ))}
    </SimpleTreeView>
  );
};

export default Tree;
