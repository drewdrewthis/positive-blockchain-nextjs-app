import Image from "next/image";
import Link from "next/link";
import MenuItem from "./MenuItem";
import React from "react";
import Routes from "@/lib/Routes";
import cx from "classnames";
import styles from "./styles.module.scss";
import { NestedMenuItem } from "./NestedMenuItem";
import { PB_LOGO } from "@/constants/image-paths";
import { Stack } from "@mui/material";

function Header() {
  return (
    <div className="bg-brand-primary w-full p-5 flex justify-between items-center">
      <Link href={Routes.HOME} className={cx(styles.logo)}>
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
        <MenuItem href="/nextjs-app/projects-api">API</MenuItem>
        <NestedMenuItem title="Join us">
          <Link href={Routes.BECOME_A_CONTRIBUTOR}>Become a contributor</Link>
          <Link href={Routes.UNIVERSITY_RESEARCH}>University & Research</Link>
          <Link href={Routes.PARTNER_FORM}>Partner with us</Link>
        </NestedMenuItem>
        <NestedMenuItem title="About">
          <Link href={Routes.ABOUT}>About PB</Link>
          <Link href={Routes.NEWSLETTER}>Newsletter</Link>
          <Link href={Routes.RESOURCES}>Resources</Link>
        </NestedMenuItem>
        <MenuItem href={Routes.BLOG}>Blog</MenuItem>
      </Stack>
    </div>
  );
}

export default Header;
