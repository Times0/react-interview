import "./index.css";
import { Data, TreeView } from "./TreeView";
import { faker } from "@faker-js/faker";

interface CreateDataOptions {
  regionsCount?: number;
  sitesPerRegion?: number;
  activitiesPerSite?: number;
  workstationsPerActivity?: number;
}

function createData(
  options: CreateDataOptions = {
    regionsCount: 2,
    sitesPerRegion: 2,
    activitiesPerSite: 2,
    workstationsPerActivity: 3,
  }
): Data {
  const createWorkstations = (count: number) => {
    return Array.from({ length: count }, () => ({
      name: `${faker.commerce.department()} Station ${faker.number.int(999)}`,
    }));
  };

  return {
    regions: Array.from({ length: options.regionsCount ?? 2 }, () => ({
      name: faker.location.continent(),
      sites: Array.from({ length: options.sitesPerRegion ?? 2 }, () => ({
        name: faker.location.city(),
        activities: Array.from(
          { length: options.activitiesPerSite ?? 2 },
          () => ({
            name: faker.commerce.department(),
            workstations: createWorkstations(
              options.workstationsPerActivity ?? 3
            ),
          })
        ),
      })),
    })),
  };
}

function App() {
  const data: Data = createData({
    regionsCount: 5,
    sitesPerRegion: 2,
    activitiesPerSite: 2,
    workstationsPerActivity: 4,
  });

  return (
    <>
      <h1 className="text-3xl font-bold">Tree View</h1>
      <TreeView data={data} />
    </>
  );
}

export default App;
