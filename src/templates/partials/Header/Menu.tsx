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

  return (
    <>
      {/* Mobile */}
      <Box sx={{ display: { xs: "block", md: "none" }, color: "white" }}>
        <IconButton
          size="large"
          aria-label="menu"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          color="inherit"
          onClick={() => setMenuOpen(true)}
        >
          <MenuIcon />
        </IconButton>
      </Box>
      <Dialog
        fullScreen
        open={menuOpen}
        PaperComponent={({ children }) => children as any}
      >
        <div className="bg-brand-primary w-full h-full p-5 flex flex-col overflow-auto">
          <div className="w-full text-right mb-5">
            <IconButton
              aria-label="close"
              aria-controls="menu-appbar"
              className="text-white"
              onClick={() => setMenuOpen(false)}
            >
              <Close color="inherit" />
            </IconButton>
          </div>
          <div className="flex flex-col gap-4 w-full text-left">
            <Items />
          </div>
        </div>
      </Dialog>

      {/* Desktop */}
      <Box sx={{ display: { xs: "none", md: "block" } }}>
        <Stack direction="row" spacing={2}>
          <Items />
        </Stack>
      </Box>
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
