import React from "react";
import Image from "next/image";
import { PB_LOGO } from "@/constants/image-paths";
import styles from "./styles.module.scss";
import cx from "classnames";
import { Button, Stack } from "@mui/material";
import Link from "next/link";
import { NestedMenuItem } from "./NestedMenuItem";

function Header() {
  return (
    <div className="bg-brand-primary w-full p-5 flex justify-between">
      <Image
        className={cx(styles.logo)}
        src={PB_LOGO}
        alt="Logo"
        width={661}
        height={80}
      />
      <Stack direction="row" spacing={2}>
        <NestedMenuItem title="Join us">
          <Link href="/">Become a contributor</Link>
        </NestedMenuItem>
        <NestedMenuItem title="About">
          <Link href="/">Become a contributor</Link>
        </NestedMenuItem>
        <Button href="/blog" className={cx(styles.button)}>
          Blog
        </Button>
      </Stack>
    </div>
  );
}

export default Header;
