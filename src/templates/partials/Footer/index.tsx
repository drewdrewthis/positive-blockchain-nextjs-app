import Image from "next/image";
import Link from "next/link";
import React from "react";
import Routes from "@/lib/Routes";
import cx from "classnames";
import styles from "./styles.module.scss";
import { PB_LOGO } from "@/constants/image-paths";

function Footer() {
  return (
    <div className="bg-brand-primary w-full p-5 flex flex-col p-5 gap-5">
      <div className="w-full flex flex-col md:flex-row justify-between gap-4 items-center font-bold">
        <div className={cx(styles.logo, "m-auto md:ml-0")}>
          <Link href={Routes.HOME}>
            <Image
              className="object-fit"
              src={PB_LOGO}
              alt="Logo"
              width={661}
              height={80}
            />
          </Link>
        </div>
        <ul className="flex flex-row gap-4 text-white justify-center md:justify-start font-bold">
          <li>
            <Link href={Routes.DONATE}>Donate</Link>
          </li>
          <li>
            <Link href={Routes.CONTACT}>Contact</Link>
          </li>
          <li>
            <Link href={Routes.PRIVACY_POLICY}>Privacy Policy</Link>
          </li>
          <li>
            <Link href={Routes.getExternalRoute("/cookie-policy")}>
              Cookie Policy
            </Link>
          </li>
          <li>
            <Link href={Routes.getExternalRoute("/disclaimer")}>
              Disclaimer
            </Link>
          </li>
        </ul>
      </div>
      <div className="text-xs text-white text-center md:text-right">
        &#169; PositiveBlockchain 2023
      </div>
    </div>
  );
}

export default Footer;
