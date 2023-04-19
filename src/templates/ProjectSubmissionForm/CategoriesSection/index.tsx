import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { Button, IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import omit from "lodash/fp/omit";
import SingleCategoryBlock from "./SingleCategoryBlock";

interface CategoriesFormWrapperProps {
  categories: Record<string, string[]>;
}

function useController(props: CategoriesFormWrapperProps) {
  const { categories } = props;
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const methods = useFormContext();
  const [categoryBlocks, setCategoryBlocks] = useState([
    {
      id: "category-" + 1,
      categories,
    },
  ]);

  methods.watch(() => {
    if (categoryBlocks.length === 0) return;

    const _selectedCategories = categoryBlocks.map((form) => {
      return methods.getValues(form.id);
    });

    setSelectedCategories(_selectedCategories);
  });

  function addForm() {
    setCategoryBlocks([
      ...categoryBlocks,
      {
        id: "category-" + (categoryBlocks.length + 1),
        categories: omit(selectedCategories, categories),
      },
    ]);
  }

  const removeForm = (formId: string) => {
    setCategoryBlocks(
      categoryBlocks.filter((block: { id: string }) => block.id !== formId)
    );
  };

  return {
    categoryBlocks,
    addForm,
    removeForm,
  };
}

const CategoriesFormWrapper = (props: CategoriesFormWrapperProps) => {
  const { categoryBlocks, addForm, removeForm } = useController(props);

  return (
    <div className="flex w-full flex-col gap-3">
      {categoryBlocks.map((block) => (
        <div className="w-full flex" key={block.id}>
          <SingleCategoryBlock {...block} />
          <IconButton
            aria-label="delete"
            // color="error"
            onClick={() => removeForm(block.id)}
          >
            <Delete />
          </IconButton>
        </div>
      ))}
      <Button
        variant="contained"
        color="error"
        className="bg-green-500"
        onClick={() => addForm()}
      >
        Add Category
      </Button>
    </div>
  );
};

CategoriesFormWrapper.defaultProps = {
  categories: {
    "Art & Design": ["Graphic Design", "Illustration", "Photography"],
    "Business & Finance": ["Accounting", "Business", "Economics"],
    "Education & Teaching": ["Education", "Teaching"],
  },
};

export default CategoriesFormWrapper;
