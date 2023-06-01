import React from "react";
import { Button, IconButton, Typography } from "@mui/material";
import { Delete } from "@mui/icons-material";
import SingleCategoryBlock from "./SingleCategoryBlock";
import { useController } from "./hooks/useController";
import { withController } from "../../../lib/withContoller";
import { FormProvider } from "react-hook-form";
import { submissionFormConfig } from "@/configuration";
import withErrorBoundary from "../../../lib/withErrorBoundary";

const { MAX_CATEGORIES } = submissionFormConfig.constants;

const CategoriesSection = (props: ReturnType<typeof useController>) => {
  const { categoryBlocks, addForm, removeForm, selectedCategories } = props;
  const firstBlock = categoryBlocks[0];

  if (!firstBlock) return null;

  return (
    <FormProvider {...props.methods}>
      <div className="flex w-full flex-col gap-3">
        <div className="w-full" key={firstBlock.id}>
          <Typography variant="overline">Primary Category *</Typography>
          <div className="w-full flex">
            <SingleCategoryBlock
              {...firstBlock}
              selectedCategories={selectedCategories}
            />
          </div>
        </div>
        <Typography variant="overline">Additional categories</Typography>
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
