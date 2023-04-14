import { parse } from "csv-parse";
import { Project } from "../../types";
import { isUndefined, uniq } from "lodash/fp";
export * from "./extractFiltersFromProjectData";
export * from "./filterProjectDataByFilters";
export * from "./convertBooleanMapToArray";

export async function parseCsvBuffer(arrayBuffer: ArrayBuffer): Promise<any> {
  const csvBuffer = Buffer.from(new Uint8Array(arrayBuffer));
  const records: any[] = [];

  return new Promise((resolve, reject) => {
    try {
      parse(csvBuffer)
        .on("readable", function () {
          let record;
          // @ts-expect-error No type for this
          while ((record = this.read()) !== null) {
            records.push(record);
          }
        })
        .on("end", () => {
          resolve(records);
        });
    } catch (err) {
      reject(err);
    }
  });
}

export function snakeCaseToSentenceCase(str: string) {
  if (!str) return str;

  return str
    .split("_")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
}

export function extractSdgsFromProject(project: Project) {
  return uniq(
    project["sdg_occurences"]
      .split(",")
      .filter((x) => x !== "" && !isUndefined(x))
      .sort((a, b) => Number(a) - Number(b))
  );
}
