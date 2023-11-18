import { Button } from "@mui/material";
import cx from "classnames";

import styles from "./styles.module.scss";

export default function MenuItem(props: {
  href: string;
  children: React.ReactNode;
  className?: string;
  target?: string;
}) {
  const { href, children, className } = props;
  return (
    <div className={className}>
      <Button
        href={href}
        className={cx(styles.button, "justify-center")}
        target={props.target}
      >
        {children}
      </Button>
    </div>
  );
}
