import { getRegionsFromSubregions } from "../regions";

const countryData = [
  {
    country: "Zambia",
    subregion: "Eastern Africa",
    region: "Africa",
    hemisphere: "Global South",
  },
  {
    country: "Zimbabwe",
    subregion: "Eastern Africa",
    region: "Africa",
    hemisphere: "Global South",
  },
  {
    country: "All Eastern Asia",
    subregion: "Eastern Asia",
    region: "Asia",
    hemisphere: "Global South",
  },
  {
    country: "China",
    subregion: "Eastern Asia",
    region: "Asia",
    hemisphere: "Global South",
  },
  {
    country: "Japan",
    subregion: "Eastern Asia",
    region: "Asia",
    hemisphere: "Global South",
  },
  {
    country: "Mongolia",
    subregion: "Eastern Asia",
    region: "Asia",
    hemisphere: "Global South",
  },
  {
    country: "North Korea",
    subregion: "Eastern Asia",
    region: "Asia",
    hemisphere: "Global South",
  },
  {
    country: "South Korea",
    subregion: "Eastern Asia",
    region: "Asia",
    hemisphere: "Global South",
  },
  {
    country: "Taiwan",
    subregion: "Eastern Asia",
    region: "Asia",
    hemisphere: "Global South",
  },
  {
    country: "All Eastern Europe",
    subregion: "Eastern Europe",
    region: "Europe",
    hemisphere: "Global North",
  },
  {
    country: "Armenia",
    subregion: "Eastern Europe",
    region: "Europe",
    hemisphere: "Global North",
  },
];

describe("utils/regions", () => {
  describe("getRegionFromSubregions", () => {
    it("should return the regions for a list of subregions", () => {
      const subregions = ["Eastern Asia", "Eastern Africa"];
      const regions = getRegionsFromSubregions(subregions, countryData);
      expect(regions).toEqual(["Asia", "Africa"]);
    });
  });
});
  