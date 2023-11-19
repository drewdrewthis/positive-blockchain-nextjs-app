import { Delete } from "@mui/icons-material";
import { Button, IconButton } from "@mui/material";
import React from "react";
import { FormProvider } from "react-hook-form";

import { submissionFormConfig } from "@/configuration";

import { withController } from "../../../lib/withContoller";
import withErrorBoundary from "../../../lib/withErrorBoundary";
import Prompt from "../Prompt";

import { useController } from "./hooks/useController";
import SingleCategoryBlock from "./SingleCategoryBlock";

const { MAX_CATEGORIES } = submissionFormConfig.constants;

const CategoriesSection = (props: ReturnType<typeof useController>) => {
  const { categoryBlocks, addForm, removeForm, selectedCategories } = props;
  const firstBlock = categoryBlocks[0];

  if (!firstBlock) return null;

  return (
    <FormProvider {...props.methods}>
      <div className="flex w-full flex-col gap-3">
        <div className="w-full" key={firstBlock.id}>
          <Prompt text="Primary Category" />
          <div className="w-full flex">
            <SingleCategoryBlock
              {...firstBlock}
              selectedCategories={selectedCategories}
            />
          </div>
        </div>
        <Prompt text="Additional categories" />
        {categoryBlocks.slice(1).map((block, idx) => (
          <div className="w-full flex" key={block.id + idx}>
            <SingleCategoryBlock
              {...block}
              selectedCategories={selectedCategories}
            />
            <IconButton
              aria-label="delete"
              onClick={() => removeForm(block.id)}
            >
              <Delete />
            </IconButton>
          </div>
        ))}
        <Button
          className="text-green-500"
          onClick={() => addForm()}
          disabled={categoryBlocks.length === MAX_CATEGORIES}
        >
          + Add Category
        </Button>
      </div>
    </FormProvider>
  );
};

export default withErrorBoundary(
  withController(CategoriesSection, useController)
);
