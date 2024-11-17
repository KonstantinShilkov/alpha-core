import { useQuery } from "@apollo/client";
import { useState, useEffect } from "react";
import { GET_TREE } from "../../apollo/queries";

const useTreeData = () => {
  const { data, loading, error } = useQuery(GET_TREE);
  const [treeData, setTreeData] = useState([]);
  const [filteredTreeData, setFilteredTreeData] = useState([]);
  const [classesSelected, setClassesSelected] = useState("");
  const [descriptions, setDescriptions] = useState([]);

  useEffect(() => {
    if (data) {
      const tree = data.modelTreeClasses.tree;
      setTreeData(tree);
      setFilteredTreeData(tree);
      setDescriptions(getDescriptions(tree));
    }
  }, [data]);

  useEffect(() => {
    const filteredByClasses = (classesSelected) => {
      if (!treeData || treeData.length === 0) {
        return;
      }

      if (!classesSelected || classesSelected.trim() === "") {
        setFilteredTreeData(treeData);
      } else {
        const filtered = treeData.filter((treeItem) =>
          treeItem.name.toLowerCase().includes(classesSelected.toLowerCase())
        );
        setFilteredTreeData(filtered);
      }
    };

    filteredByClasses(classesSelected);
  }, [classesSelected, treeData]);

  const getSelectedClasses = (classNames) => {
    setClassesSelected(classNames);
  };

  const getDescriptions = (nodes) => {
    const descriptions = [];
    const parseTree = (node) => {
      descriptions.push({ id: node.id, description: node.description });
      if (node.children) {
        node.children.forEach(parseTree);
      }
    };
    nodes.forEach(parseTree);
    return descriptions;
  };

  return {
    treeData,
    loading,
    error,
    filteredTreeData,
    getSelectedClasses,
    descriptions,
  };
};

export default useTreeData;
