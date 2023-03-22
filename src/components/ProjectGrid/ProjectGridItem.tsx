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
  thumbnailSrc: string;
}

function ProjectGridItem(props: Props) {
  const { name, description, slug, category, thumbnailSrc } = props;

  const formattedDescription = description
    ? description[0].toUpperCase() + description.slice(1)
    : description;

  return (
    <Grid xs={12} sm={6} md={4} lg={3}>
      <div
        className={cx(
          "flex flex-col h-full rounded border bg-white",
          styles["grid-item"]
        )}
      >
        <div className="flex items-center gap-5 p-3">
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
              <h4 className="font-bold mt-0 text-lg">{name}</h4>
            </Link>
            <div>{category}</div>
          </div>
        </div>
        <Divider className="m-0" />
        <div className="p-3">{formattedDescription}</div>
      </div>
    </Grid>
  );
}

export default ProjectGridItem;
