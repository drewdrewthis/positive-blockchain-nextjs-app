import { Button } from "@mui/material";
import styles from "./styles.module.scss";
import cx from "classnames";

export default function Menuitem(props: {
  href: string;
  children: React.ReactNode;
}) {
  const { href, children } = props;
  return (
    <div>
      <Button href={href} className={cx(styles.button)}>
        {children}
      </Button>
    </div>
  );
}
