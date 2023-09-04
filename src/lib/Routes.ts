import { config } from "@/configuration/config";

export default class Routes {
  // NextJS app routes
  static BASE_PATH = "/database";

  // PAGES
  static PROJECTS = Routes.BASE_PATH;
  static PROJECTS_API_PAGE = Routes.BASE_PATH + "/projects-api";
  static PROJECT_SUBMISSION_SUCCESS = "/project-submission-success";

  // API
  static API_PATH = "/api";
  static API = {
    BASE_PATH: Routes.BASE_PATH + Routes.API_PATH,
    EDGE: {
      PROJECT_DATA: Routes.BASE_PATH + "/api/edge/project-data",
    },
  };

  // Forms
  static PARTNER_FORM = "https://bit.ly/PBpartner-form";
  static BECOME_A_CONTRIBUTOR = "https://bit.ly/applyPB";
  static ADD_NEW_PROJECT = Routes.BASE_PATH + "/forms/project-submission";
  static BULK_UPLOAD = Routes.BASE_PATH + "/bulk-upload";

  // WordPress pages
  static HOME = Routes.getExternalRoute("/");
  static ABOUT = Routes.getExternalRoute("/about");
  static BLOG = Routes.getExternalRoute("/blog");
  static WIKI =
    "https://www.notion.so/PB-Database-wiki-4eea2421bca64fa48f49dbf4e0752b5c";
  static NEWSLETTER = Routes.getExternalRoute("/newsletter");
  static RESOURCES = Routes.getExternalRoute("/resources");
  static UNIVERSITY_RESEARCH = Routes.getExternalRoute("/university-research");
  static DONATE = Routes.getExternalRoute("/donations");
  static CONTACT = Routes.getExternalRoute("/contact");
  static PRIVACY_POLICY = Routes.getExternalRoute("/privacy-policy");

  /**
   * Returns the full external route by appending the given path to the Positive Blockchain host.
   * @param path - The path to append to the Positive Blockchain host.
   * @returns The full external route.
   */
  static getExternalRoute(path: string): string {
    return `${config.constants.positiveBlockchain.HOST}${path}`;
  }

  static getApiRoute(path: string): string {
    return `${Routes.API.BASE_PATH}${path}`;
  }

  /**
   * Returns the given path as is.
   * @param path - The path to return.
   * @returns The given path.
   */
  static getRelativeHref(path: string): string {
    return `${Routes.BASE_PATH}/${path}`;
  }

  /**
   * Get project path
   */
  static getProjectPath(projectId: string): string {
    return `/projects/${projectId}`;
  }

  /**
   * Returns the base URL for the application based on the environment.
   * @returns The base URL for the application.
   */
  static getBaseUrl(): string {
    const isProd = process.env.NODE_ENV === "production";

    return isProd
      ? `https://${process.env.VERCEL_URL}/${Routes.BASE_PATH}`
      : `http://localhost:3000/${Routes.BASE_PATH}`;
  }
}
