import cx from "classnames";
import React from "react";

import Routes from "@/lib/Routes";

import MenuItem from "../MenuItem";

function AddProjectButton() {
  return (
    <MenuItem
      className={cx("border-2 py-0 px-2 flex align-items")}
      href={Routes.ADD_NEW_PROJECT}
      target="_blank"
    >
      <span
        className="bold mr-2"
        style={{
          fontWeight: "900",
          fontSize: "1.5rem",
          lineHeight: 0,
          marginTop: "-0.2rem",
        }}
      >
        +
      </span>
      Add Project
    </MenuItem>
  );
}

export default AddProjectButton;
