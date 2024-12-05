declare global {
  interface Data {
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
}
