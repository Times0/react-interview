import "./index.css";
import { TreeView } from "./TreeView";
import { faker } from "@faker-js/faker";

interface CreateDataOptions {
  regionsCount?: number;
  sitesPerRegion?: number;
  activitiesPerSite?: number;
  workstationsPerActivity?: number;
}

function createData({
  regionsCount = 2,
  sitesPerRegion = 2,
  activitiesPerSite = 2,
  workstationsPerActivity = 3,
}: CreateDataOptions = {}): Data {
  return {
    regions: Array.from({ length: regionsCount }, () => ({
      name: faker.location.continent(),
      sites: Array.from({ length: sitesPerRegion }, () => ({
        name: faker.location.city(),
        activities: Array.from({ length: activitiesPerSite }, () => ({
          name: faker.commerce.department(),
          workstations: Array.from({ length: workstationsPerActivity }, () => ({
            name: `${faker.commerce.department()} Station ${faker.number.int(
              999
            )}`,
          })),
        })),
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
