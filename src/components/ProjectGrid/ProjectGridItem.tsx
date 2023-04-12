import Grid from "@mui/material/Unstable_Grid2";
import Image from "next/image";
import styles from "./styles.module.scss";
import cx from "classnames";
import { Divider } from "@mui/material";
import Link from "next/link";

interface Props {
  slug: string;
  name: string;
  description: string;
  category: string;
  thumbnailSrc?: string;
  blockchainTechnology?: string;
  blockchainType?: string;
  headquarters: string;
}

function ProjectGridItem(props: Props) {
  const { name, description, slug, category, thumbnailSrc } = props;

  const formattedDescription = description
    ? description[0].toUpperCase() + description.slice(1)
    : description;

  return (
    <Grid xs={12} sm={6} md={6} lg={3}>
      <div
        className={cx(
          "flex flex-col h-full rounded border bg-white overflow-hidden max-h-96",
          styles["grid-item"]
        )}
      >
        <div className="flex items-center gap-5 p-3 bg-brand-secondary">
          {thumbnailSrc && (
            <Link href={`/projects/${slug}`}>
              <Image
                className="m-0"
                src={thumbnailSrc}
                alt={name}
                width={100}
                height={100}
              />
            </Link>
          )}
          <div>
            <Link href={`/projects/${slug}`}>
              <h4 className="font-bold mt-0 text-lg text-white">{name}</h4>
            </Link>
            <div className="text-stone-50">{category}</div>
          </div>
        </div>
        <Divider className="m-0" />
        <div className="p-3 text-xs mb-auto">{formattedDescription}</div>
        <Divider className="m-0" />
        <div className="p-3 bg-slate-100">
          <div className="text-xs">
            <b>Primary Headquarters:</b> {props.headquarters}
          </div>
          <div className="text-xs">
            <b>Blockchain Type:</b> {props.blockchainType}
          </div>
          <div className="text-xs">
            <b>Blockchain Technologies:</b> {props.blockchainTechnology}
          </div>
        </div>
      </div>
    </Grid>
  );
}

export default ProjectGridItem;
