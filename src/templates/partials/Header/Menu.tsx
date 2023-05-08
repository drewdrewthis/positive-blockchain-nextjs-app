import Link from "next/link";
import MenuItem from "./MenuItem";
import React, { useState } from "react";
import Routes from "@/lib/Routes";
import { NestedMenuItem } from "./NestedMenuItem";
import { Box, Dialog, IconButton, Stack } from "@mui/material";
import AddProjectButton from "./AddProjectButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Close } from "@mui/icons-material";

export default function Menu() {
  const [menuOpen, setMenuOpen] = useState(false);

  const container =
    window !== undefined ? () => window.document.body : undefined;

  return (
    <>
      {/* Mobile */}
      <Box sx={{ display: { xs: "block", md: "none" }, color: "white" }}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          color="inherit"
          onClick={() => setMenuOpen(true)}
        >
          <MenuIcon />
        </IconButton>
      </Box>
      {/* Desktop */}
      <Box sx={{ display: { xs: "none", md: "block" } }}>
        <Stack direction="row" spacing={2}>
          <Items />
        </Stack>
      </Box>
      <Dialog fullScreen open={menuOpen}>
        <div className="bg-brand-primary h-full p-5 flex flex-col justify-between items-center">
          <div className="w-full text-right text-white">
            <Close color="inherit" onClick={() => setMenuOpen(false)} />
          </div>
          <Items />
        </div>
      </Dialog>
    </>
  );
}

function Items() {
  return (
    <>
      <AddProjectButton />
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
    </>
  );
}
