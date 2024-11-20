import React, { ChangeEvent, Dispatch, FC, MouseEvent, SetStateAction } from "react";
import { SimpleTreeView } from "@mui/x-tree-view/SimpleTreeView";
import { TreeItem } from "@mui/x-tree-view/TreeItem";
import s from "./WrappedTree.module.css";

interface TreeNode {
  id: string;
  name: string;
  children?: TreeNode[];
}

interface RecursiveTreeItemProps {
  node: TreeNode;
  expandedItems: string[];
  setExpandedItems: Dispatch<SetStateAction<string[]>>;
  setSelectedNodeId: Dispatch<SetStateAction<string | null>>;
}

const RecursiveTreeItem: FC<RecursiveTreeItemProps> = ({
  node,
  expandedItems,
  setExpandedItems,
  setSelectedNodeId,
}) => {
  const handleDoubleClick = (event: MouseEvent) => {
    event.stopPropagation();

    setExpandedItems((prevExpandedItems) =>
      prevExpandedItems.includes(node.id)
        ? prevExpandedItems.filter((id) => id !== node.id)
        : [...prevExpandedItems, node.id]
    );
  };

  const handleClick = () => {
    setSelectedNodeId(node.id);
  };

  return (
    <TreeItem
      itemId={node.id}
      label={node.name}
      onClick={handleClick}
      className={s.treeItem}
      onDoubleClick={handleDoubleClick}
      sx={{
        "& .MuiCheckbox-root": {
          "& .MuiSvgIcon-root": {
            width: "24px",
            height: "24px",
          },
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
            setSelectedNodeId={setSelectedNodeId}
          />
        ))}
    </TreeItem>
  );
};

interface WrappedTreeProps {
  data: TreeNode[];
  expandedItems: string[];
  setExpandedItems: Dispatch<SetStateAction<string[]>>;
  setSelectedNodeId: Dispatch<SetStateAction<string | null>>;
  loading: boolean;
}

const WrappedTree: FC<WrappedTreeProps> = ({
  data,
  expandedItems,
  setExpandedItems,
  setSelectedNodeId,
  loading,
}) => {
  if (!data || data.length === 0) {
    return <div>Нет данных для отображения</div>;
  }

  const handleExpandedItemsChange = (
    event: ChangeEvent<{}>,
    itemIds: string[]
  ) => {
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
          setSelectedNodeId={setSelectedNodeId}
        />
      ))}
    </SimpleTreeView>
  );
};

export default WrappedTree;
