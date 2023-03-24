import { config } from "@/configuration";

export default class Routes {
  // Forms
  static PARTNER_FORM = "https://bit.ly/PBpartner-form";
  static BECOME_A_CONTRIBUTOR = "https://bit.ly/applyPB";

  // WordPress pages
  static HOME = Routes.getExternalRoute("/");
  static ABOUT = Routes.getExternalRoute("/about");
  static BLOG = Routes.getExternalRoute("/blog");
  static NEWSLETTER = Routes.getExternalRoute("/newsletter");
  static RESOURCES = Routes.getExternalRoute("/resources");
  static UNIVERSITY_RESEARCH = Routes.getExternalRoute("/university-research");

  static getExternalRoute(path: string) {
    return `${config.constants.positiveBlockchain.HOST}${path}`;
  }

  static getPath(path: string) {
    return path;
  }
}
