import React from "react";
import Image from "next/image";
import { PB_LOGO } from "@/constants/image-paths";
import styles from "./styles.module.scss";
import cx from "classnames";
import { Stack } from "@mui/material";
import Link from "next/link";
import { NestedMenuItem } from "./NestedMenuItem";
import MenuItem from "./MenuItem";

const BECOME_A_CONTRIBUTOR_LINK = "https://bit.ly/applyPB";

function Header() {
  return (
    <div className="bg-brand-primary w-full p-5 flex justify-between items-center">
      <Link href="/" className={cx(styles.logo)}>
        <Image
          className="object-fit"
          src={PB_LOGO}
          alt="Logo"
          width={661}
          height={80}
        />
      </Link>
      <Stack direction="row" spacing={2}>
        <MenuItem href="/nextjs-app/projects">Projects</MenuItem>
        <NestedMenuItem title="Join us">
          <Link href={BECOME_A_CONTRIBUTOR_LINK}>Become a contributor</Link>
          <Link href="/university-research">University & Research</Link>
          <Link href="https://bit.ly/PBpartner-form">Partner with us</Link>
        </NestedMenuItem>
        <NestedMenuItem title="About">
          <Link href="/about">About PB</Link>
          <Link href="/newsletter">Newsletter</Link>
          <Link href="/resources">Resources</Link>
        </NestedMenuItem>
        <MenuItem href="/blog">Blog</MenuItem>
      </Stack>
    </div>
  );
}

export default Header;
