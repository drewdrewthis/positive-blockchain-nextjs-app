import kebabCase from "lodash/kebabCase";
import compact from "lodash/fp/compact";
import uniq from "lodash/fp/uniq";

type Project = {
  slug: string;
} & Record<string, string | number | string[]>;

export function parseGoogleSheetsData(
  data: string[][],
  options: {
    headerRow: number;
    keyRow: number;
  }
): {
  slug: string;
}[] {
  const { headerRow, keyRow } = options;
  const headerRowIndex = headerRow - 1;
  const keyRowIndex = keyRow - 1;
  const headers = data[headerRowIndex];
  const keys = data[keyRowIndex];
  const rows = data.slice(headerRow);
  return rows.map((row) => {
    const projectObj = row.reduce(
      (acc, cell, i) => {
        const rawKey = keys[i];
        if (rawKey && isPublic(rawKey)) {
          const key = stripPublicPrefix(rawKey);
          acc[key] = formatCell(key, cell);
        }
        return acc;
      },
      {
        slug: "",
      } as Project
    );

    const projectName = projectObj["project_name"] as string;

    if (projectName) {
      projectObj.slug = kebabCase(projectName);
    }

    return projectObj;
  });
}

function formatCell(key: string, cell: string) {
  if (key.includes("_list")) {
    return uniq(compact(cell.split(",").map((item) => item.trim())));
  }

  return cell;
}

function isPublic(str: string) {
  return str.startsWith("PUBLIC_");
}
function stripPublicPrefix(str: string) {
  return str.replace("PUBLIC_", "");
}
