import { useState } from "react";

interface ExpandableItemProps {
  name: string;
  children?: React.ReactNode;
  isExpandable?: boolean;
  isLast?: boolean;
  level?: number;
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
    <div className="flex flex-col">
      <div
        className="flex items-center cursor-pointer"
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
        {isExpandable && (
          <span className="mr-2 font-mono text-gray-300">
            {isExpanded ? "-" : "+"}
          </span>
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
  return (
    <div className="p-4 font-mono">
      {data.regions.map((region, regionIndex) => (
        <ExpandableItem
          key={`region-${regionIndex}`}
          name={region.name}
          level={1}
          isLast={regionIndex === data.regions.length - 1}
        >
          {region.sites.map((site, siteIndex) => (
            <ExpandableItem
              key={`site-${siteIndex}`}
              name={site.name}
              level={2}
              isLast={siteIndex === region.sites.length - 1}
            >
              {site.activities.map((activity, activityIndex) => (
                <ExpandableItem
                  key={`activity-${activityIndex}`}
                  name={activity.name}
                  level={3}
                  isLast={activityIndex === site.activities.length - 1}
                >
                  {activity.workstations.map(
                    (workstation, workstationIndex) => (
                      <ExpandableItem
                        key={`workstation-${workstationIndex}`}
                        name={workstation.name}
                        isExpandable={false}
                        level={4}
                        isLast={
                          workstationIndex === activity.workstations.length - 1
                        }
                      />
                    )
                  )}
                </ExpandableItem>
              ))}
            </ExpandableItem>
          ))}
        </ExpandableItem>
      ))}
    </div>
  );
};
