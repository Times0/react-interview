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
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div className="w-full bg-white p-4 mb-4">
        <h1 className="text-3xl font-bold">Yelhow</h1>
      </div>
      <div className="flex gap-4 px-4 flex-grow">
        <div className="w-3/4 p-4 bg-white rounded-lg shadow flex-grow">
          {/* Placeholder for left side content */}
        </div>
        <div className="w-1/4 p-4 bg-white rounded-lg shadow flex-grow">
          <TreeView data={data} />
        </div>
      </div>
    </div>
  );
}

export default App;
