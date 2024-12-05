import { useState } from "react";

interface ExpandableItemProps {
  name: string;
  children?: React.ReactNode;
  isExpandable?: boolean;
  isLast?: boolean;
  level: number;
}

const ExpandableItem = ({
  name,
  children,
  isExpandable = true,
  isLast = false,
  level = 0,
}: ExpandableItemProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="flex flex-col -space-y-[0.33rem]">
      <div
        className={`flex items-center ${isExpandable ? "cursor-pointer" : ""}`}
        onClick={() => isExpandable && setIsExpanded(!isExpanded)}
      >
        {level > 0 && (
          <div className="flex">
            {Array.from({ length: level - 1 }).map((_, i) => (
              <span key={i} className="text-gray-300 px-2">
                │
              </span>
            ))}
            <span className="text-gray-300 px-2">{isLast ? "└" : "├"}</span>
          </div>
        )}
        {isExpandable ? (
          <span className="mr-2 font-mono text-gray-300">
            {isExpanded ? "─" : "+"}
          </span>
        ) : (
          <span className="mr-2 font-mono text-gray-300">─</span>
        )}
        <span>{name}</span>
      </div>
      {isExpanded && children}
    </div>
  );
};

interface TreeViewProps {
  data: Data;
}

export const TreeView = ({ data }: TreeViewProps) => {
  const renderTreeNode = (
    node: { name: string; [key: string]: any },
    level: number,
    index: number,
    siblings: any[],
    childrenKey?: string
  ) => {
    console.log(childrenKey);
    const hasChildren: boolean = childrenKey
      ? Array.isArray(node[childrenKey]) && node[childrenKey].length > 0
      : false;
    const children = hasChildren && childrenKey ? node[childrenKey] : [];

    return (
      <ExpandableItem
        key={`node-${level}-${index}`}
        name={node.name}
        level={level}
        isLast={index === siblings.length - 1}
        isExpandable={hasChildren}
      >
        {hasChildren &&
          children.map((child: any, childIndex: number) =>
            renderTreeNode(
              child,
              level + 1,
              childIndex,
              children,
              Object.keys(child).find((key) => Array.isArray(child[key]))
            )
          )}
      </ExpandableItem>
    );
  };

  return (
    <div className="p-4 font-mono">
      {data.regions.map((region, index) =>
        renderTreeNode(region, 1, index, data.regions, "sites")
      )}
    </div>
  );
};
