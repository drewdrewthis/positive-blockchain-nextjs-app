import cx from "classnames";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import { PB_LOGO } from "@/constants/image-paths";
import Routes from "@/lib/Routes";

import Menu from "./Menu";
import styles from "./styles.module.scss";

function Header() {
  return (
    <nav className="bg-brand-primary w-full p-5 flex justify-between items-center">
      <Link href={Routes.HOME} className={cx(styles.logo)}>
        <Image
          className="object-fit"
          src={PB_LOGO}
          alt="Logo"
          width={661}
          height={80}
        />
      </Link>
      <Menu />
    </nav>
  );
}

export default Header;
