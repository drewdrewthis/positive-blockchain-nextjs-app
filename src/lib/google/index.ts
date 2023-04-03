import { config } from "../../configuration";

export * from "./sheets";
export * from "./auth";

const {
  constants: {
    google: { sheets },
  },
} = config;

const {
  databaseSheet: { SPREADSHEET_ID, SPREADSHEET_NAME },
} = sheets;

export function getCsv() {
  const url = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/gviz/tq?tqx=out:csv&sheet=${SPREADSHEET_NAME}`;
  console.log(url);
  return fetch(url);
}
