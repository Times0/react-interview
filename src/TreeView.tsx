import { useState } from "react";

export interface Data {
  regions: {
    name: string;
    sites: {
      name: string;
      activities: {
        name: string;
        workstations: {
          name: string;
        }[];
      }[];
    }[];
  }[];
}

interface TreeViewProps {
  data: Data;
}

interface ExpandableItemProps {
  name: string;
  children?: React.ReactNode;
  isExpandable?: boolean;
}

const ExpandableItem = ({
  name,
  children,
  isExpandable = true,
}: ExpandableItemProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="ml-12">
      <div
        className="flex items-center cursor-pointer"
        onClick={() => isExpandable && setIsExpanded(!isExpanded)}
      >
        {isExpandable && (
          <span className="mr-2 font-mono">{isExpanded ? "-" : "+"}</span>
        )}
        <span>{name}</span>
      </div>
      {isExpanded && children}
    </div>
  );
};

export const TreeView = ({ data }: TreeViewProps) => {
  return (
    <div className="p-4">
      {data.regions.map((region, regionIndex) => (
        <ExpandableItem key={`region-${regionIndex}`} name={region.name}>
          {region.sites.map((site, siteIndex) => (
            <ExpandableItem key={`site-${siteIndex}`} name={site.name}>
              {site.activities.map((activity, activityIndex) => (
                <ExpandableItem
                  key={`activity-${activityIndex}`}
                  name={activity.name}
                >
                  {activity.workstations.map(
                    (workstation, workstationIndex) => (
                      <ExpandableItem
                        key={`workstation-${workstationIndex}`}
                        name={workstation.name}
                        isExpandable={false}
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
