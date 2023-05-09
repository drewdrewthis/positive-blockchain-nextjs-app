import Footer from "../partials/Footer/index";
import Header from "../partials/Header";
import InputBase from "@mui/material/InputBase";
import ProjectFilter from "@/components/ProjectFilter";
import ProjectGrid from "@/components/ProjectGrid";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Search } from "@mui/icons-material";
import { useController } from "./useController";
import { withController } from "@/lib/withContoller";
import { Button, Dialog, Typography } from "@mui/material";
import Link from "next/link";
import cx from "classnames";
import styles from "./styles.module.scss";

function ProjectPageTemplate(props: ReturnType<typeof useController>) {
  const {
    projectData,
    handleSearch,
    filters,
    handleFilterUpdate,
    toggleFilters,
    showFilters,
  } = props;

  console.log(showFilters);

  return (
    <div className="flex flex-col gap-10 h-full min-h-screen">
      <Header />
      <div className="prose max-w-none max-w-7xl mx-auto sm:p-10 px-5 w-full h-full">
        <div className="flex flex-col sm:flex-row gap-5 justify-between items-center content-center mb-10">
          <Typography variant="h1" className="mb-0">
            Project Directory
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
              Request Data Snapshot
            </Button>
          </Link>
        </div>
        <div className="flex justify-center w-full flex-col items-center">
          <div className="m-auto border rounded p-2">
            <Search>
              <SearchIcon />
            </Search>
            <InputBase
              className="w-72"
              placeholder="Type to sort by relevance (ex. logistics)"
              onChange={handleSearch}
            />
          </div>
          <Button
            className="sm:hidden"
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
            <ProjectFilter filters={filters} onChange={handleFilterUpdate} />
            <Dialog
              className="sm:hidden"
              open={showFilters}
              onClose={() => toggleFilters(false)}
              fullScreen
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
