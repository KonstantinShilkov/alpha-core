import { useQuery } from "@apollo/client";
import { useState, useEffect } from "react";
import { GET_TREE, GetTreeQueryResponse, ClassNode } from "../../apollo/queries";

const useTreeData = () => {
  const { data, loading, error } = useQuery<GetTreeQueryResponse>(GET_TREE);
  const [treeData, setTreeData] = useState<ClassNode[]>([]);
  const [filteredTreeData, setFilteredTreeData] = useState<ClassNode[]>([]);
  const [classesSelected, setClassesSelected] = useState<string>("");
  const [descriptions, setDescriptions] = useState<{ id: string; description: string }[]>([]);

  useEffect(() => {
    if (data?.modelTreeClasses?.tree) {
      const tree = data.modelTreeClasses.tree;
      setTreeData(tree);
      setFilteredTreeData(tree);
      setDescriptions(getDescriptions(tree));
      console.log(tree)
    }
  }, [data]);

  useEffect(() => {
    const filterTree = (nodes: ClassNode[], query: string): ClassNode[] => {
      if (!query || query.trim() === "") {
        return nodes;
      }

      return nodes
        .map((node) => {
          const children = node.children ? filterTree(node.children, query) : [];

          if (
            node.name.toLowerCase().includes(query.toLowerCase()) ||
            children.length > 0
          ) {
            return { ...node, children };
          }

          return null;
        })
        .filter(Boolean) as ClassNode[];
    };

    const filteredByClasses = () => {
      if (!treeData || treeData.length === 0) {
        return;
      }

      const filtered = filterTree(treeData, classesSelected);
      setFilteredTreeData(filtered);
    };

    filteredByClasses();
  }, [classesSelected, treeData]);

  const getSelectedClasses = (classNames: string) => {
    setClassesSelected(classNames);
  };

  const getDescriptions = (nodes: ClassNode[]): { id: string; description: string }[] => {
    const descriptions: { id: string; description: string }[] = [];
    const parseTree = (node: ClassNode) => {
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
