import Footer from "../partials/Footer/index";
import Header from "../partials/Header";
import InputBase from "@mui/material/InputBase";
import ProjectFilter from "@/components/ProjectFilter";
import ProjectGrid from "@/components/ProjectGrid";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import Search from "@mui/icons-material/Search";
import { useController } from "./useController";
import { withController } from "@/lib/withContoller";
import { Button, Dialog, Typography, useMediaQuery, Divider } from "@mui/material";
import Link from "next/link";
import cx from "classnames";
import styles from "./styles.module.scss";
import { config } from "@/configuration";

const { breakpoints } = config.constants;

function ProjectPageTemplate(props: ReturnType<typeof useController>) {
  const isMobile = useMediaQuery(`(max-width: ${breakpoints.sm})`);

  const {
    projectData,
    handleSearch,
    filters,
    handleFilterUpdate,
    toggleFilters,
    showFilters,
  } = props;

  return (
    <div className="flex flex-col gap-5 h-full min-h-screen">
      <Header />
      <div className="prose max-w-none max-w-7xl mx-auto sm:p-10 px-5 w-full h-full mt-5">
        <div className="flex flex-col sm:flex-row gap-5 justify-between items-center content-center mb-10">
          <Typography variant="h1" className="mb-0 font-semibold">
            Web3 Impact Database
          </Typography>
          <Link href="/forms/request-data-snapshot" className="no-underline">
            <Button
              variant="contained"
              size="medium"
              className="bg-brand-secondary"
              color="primary"
              sx={{
                boxShadow: "none",
              }}
            >
              Get Database
            </Button>
          </Link>
        </div>
        <Divider className="hidden md:flex my-8" />
        <div className="sm:hidden flex justify-center flex-col w-255">
          <Button
            aria-label="Show Filters"
            onClick={() => toggleFilters(true)}
          >
            Show Filters
          </Button>
        </div>
        <p>{projectData["project_name"]}</p>
        <div className="flex gap-3 w-full items-start">
          <div
            className={cx("w-3/12 sm:block", styles.filters, {
              ["hidden"]: !showFilters,
            })}
          >
            <div className="border rounded p-2 mb-4">
              <Search>
                <SearchIcon />
              </Search>
              <InputBase
                className="text-sm"
                placeholder="Search for projects"
                onChange={handleSearch}
              />
            </div>
            {/*
              NB: The two ProjectFilters maintain their own state independently, as they
              use internal forms that are not managed by React.

              If the user changes the filters on the mobile view, the desktop data will reflect
              those filters, but the filter UI will not update.
            */}

            {/* Desktop filters */}
            {!isMobile && (
              <ProjectFilter filters={filters} onChange={handleFilterUpdate} />
            )}

            {/* Mobile filters */}
            <Dialog
              className="sm:hidden"
              open={showFilters}
              onClose={() => toggleFilters(false)}
              fullScreen
              keepMounted={isMobile}
            >
              <Button
                aria-label="Hide Filters"
                onClick={() => toggleFilters(false)}
              >
                Hide Filters
              </Button>
              <ProjectFilter filters={filters} onChange={handleFilterUpdate} />
            </Dialog>
          </div>
          <ProjectGrid className="flex-1 w-9/12" projectData={projectData} />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default withController(ProjectPageTemplate, useController);
