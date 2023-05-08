import React, { ComponentProps } from "react";
import styles from "./styles.module.scss";
import cx from "classnames";
import { Button, Stack, useMediaQuery } from "@mui/material";
import {
  ClickAwayListener,
  Grow,
  MenuItem,
  MenuList,
  Paper,
  Popper,
} from "@mui/material";

interface Props {
  title: string;
  children: React.ReactNode | React.ReactNode[];
}

export function NestedMenuItem(props: Props) {
  const { title, children } = props;
  const arrayChildren = React.Children.toArray(children);
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLButtonElement>(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);

  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const buttonProps = {
    ref: anchorRef,
    "aria-controls": open ? "composition-menu" : undefined,
    "aria-expanded": open ? "true" : undefined,
    "aria-haspopup": true,
    onClick: handleToggle,
    className: cx(styles.button),
  } as ComponentProps<typeof Button>;

  const isMobile = useMediaQuery("(max-width: 768px)");

  const list = (
    <MenuList
      autoFocusItem={open}
      id="composition-menu"
      aria-labelledby="composition-button"
      onKeyDown={handleListKeyDown}
    >
      {arrayChildren.map((child, idx) => (
        <MenuItem
          key={idx}
          onClick={handleClose}
          className={cx(styles["nested-menu-item"])}
        >
          {child}
        </MenuItem>
      ))}
    </MenuList>
  );

  return isMobile ? (
    <div className="w-full">
      <Button {...buttonProps}>{title}</Button>
      {list}
    </div>
  ) : (
    <div>
      <Button {...buttonProps}>{title}</Button>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        placement="bottom-start"
        transition
        disablePortal
        keepMounted
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom-start" ? "left top" : "left bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                {list}
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
}
