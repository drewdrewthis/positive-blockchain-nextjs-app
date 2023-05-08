import { Button } from "@mui/material";
import styles from "./styles.module.scss";
import cx from "classnames";

export default function MenuItem(props: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  const { href, children, className } = props;
  return (
    <div className={className}>
      <Button href={href} className={cx(styles.button, "justify-start")}>
        {children}
      </Button>
    </div>
  );
}
