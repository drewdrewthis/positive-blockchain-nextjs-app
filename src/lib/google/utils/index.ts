import { Project } from "@/types";

export * from "./parseGoogleSheetsValuesByHeaderRow";
export * from "./parseGoogleSheetsValuesByKeyRow";
export * from "./extractProjectDataHeaders";

// Remove all fields that start with PUBLIC_
export const stripNonPublicFields = (data: Project): Partial<Project> => {
  const publicFields = Object.keys(data).filter((key) =>
    key.startsWith("PUBLIC_")
  );

  return publicFields.reduce((acc, key) => {
    // @ts-expect-error Key is valid
    acc[key] = data[key as keyof Project];

    return acc;
  }, {} as Partial<Project>);
};
