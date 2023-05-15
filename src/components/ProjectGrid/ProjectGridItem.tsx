import Grid from "@mui/material/Unstable_Grid2";
import Image from "next/image";
import Link from "next/link";
import cx from "classnames";
import styles from "./styles.module.scss";
import upperFirst from "lodash/fp/upperFirst";
import { Divider } from "@mui/material";

interface Props {
  status: string; // The status of the project
  slug: string; // The slug of the project used for generating the project path
  name: string; // The name of the project
  description: string; // The description of the project
  categories: string[]; // An array of categories the project belongs to
  thumbnailSrc?: string; // The URL of the project thumbnail image
  blockchainTechnology?: string; // The blockchain technology used in the project
  blockchainType?: string; // The type of blockchain used in the project
  headquarters: string; // The headquarters location of the project
  searchRelevance?: number; // The relevance of the project in search results
  sdgOccurences: number[]; // An array of Sustainable Development Goals (SDGs) associated with the project
}

/**
 * A grid item for displaying a project in the project grid
 */
function ProjectGridItem(props: Props) {
  const { description, slug, thumbnailSrc } = props;
  const formattedDescription = upperFirst(description || "");
  const projectPath = `/${slug}`;

  return (
    <Grid xs={12} sm={6} md={6} lg={3}>
      <div
        className={cx(
          "flex flex-col h-full rounded border bg-white overflow-hidden",
          styles["grid-item"]
        )}
      >
        <Link href={projectPath}>
          <div className="flex items-center gap-5 p-3 bg-brand-primary">
            {thumbnailSrc && (
              <Image
                className="m-0"
                src={thumbnailSrc}
                alt={props.name}
                width={100}
                height={100}
              />
            )}
            <div>
              <h4 className="font-bold mt-0 text-white">{props.name}</h4>
              <div className="text-stone-50">{props.categories.join(", ")}</div>
            </div>
          </div>
        </Link>
        <Divider className="m-0" />
        <div className="p-3 text-xs mb-auto">{formattedDescription}</div>
        <Divider className="m-0" />
        <div className="p-3 bg-slate-100">
          <div className="text-xs">{props.status}</div>
          <div className="text-xs">
            <b>HQ:</b> {props.headquarters}
          </div>
          <div className="text-xs">
            <b>SDGs:</b> {props.sdgOccurences.join(", ")}
          </div>
          <div className="text-xs">{props.blockchainTechnology}</div>
          {props.searchRelevance && (
            <div className="text-xs mt-2 text-blue-500">
              <b>Search relevance:</b> {props.searchRelevance.toFixed(2)} %
            </div>
          )}
        </div>
      </div>
    </Grid>
  );
}

export default ProjectGridItem;
