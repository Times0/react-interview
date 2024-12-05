import { useState } from "react";
import "./index.css";
import { Data, TreeView } from "./TreeView";

// create a function to create data
function createData(): Data {
  return {
    regions: [
      {
        name: "North America",
        sites: [
          {
            name: "New York",
            activities: [
              {
                name: "Manufacturing",
                workstations: [
                  { name: "Assembly Line 1" },
                  { name: "Assembly Line 2" },
                  { name: "Quality Control" },
                ],
              },
              {
                name: "Packaging",
                workstations: [
                  { name: "Boxing Station" },
                  { name: "Labeling Station" },
                ],
              },
            ],
          },
          {
            name: "Los Angeles",
            activities: [
              {
                name: "Research",
                workstations: [
                  { name: "Lab Station 1" },
                  { name: "Lab Station 2" },
                ],
              },
            ],
          },
        ],
      },
      {
        name: "Europe",
        sites: [
          {
            name: "London",
            activities: [
              {
                name: "Distribution",
                workstations: [
                  { name: "Loading Dock A" },
                  { name: "Loading Dock B" },
                ],
              },
            ],
          },
        ],
      },
    ],
  };
}

function App() {
  const data: Data = createData();

  return (
    <>
      <h1 className="text-3xl font-bold">Tree View</h1>
      <TreeView data={data} />
    </>
  );
}

export default App;
