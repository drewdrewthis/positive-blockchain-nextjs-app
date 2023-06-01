import { UseFormReturn, useForm } from "react-hook-form";
import { useCallback, useEffect, useState } from "react";
import omit from "lodash/fp/omit";
import { submissionFormConfig } from "@/configuration";
import { compact, concat, times, uniq } from "lodash/fp";
import { remove, set } from "lodash";

const { MAX_CATEGORIES } = submissionFormConfig.constants;

interface CategoryResponse {
  category: string;
  subcategories: string[];
}

interface CategoriesFormWrapperProps {
  categories: Record<string, string[]>;
  initialValues?: {
    category_1?: string;
    category_2?: string;
    category_3?: string;
    sub_category_1?: string[];
    sub_category_2?: string[];
    sub_category_3?: string[];
  };
  onChange(categories: CategoryResponse[]): void;
}

export function useController(props: CategoriesFormWrapperProps) {
  const { onChange, initialValues, categories } = props;

  // Set the initial selected categories
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const methods = useForm({
    defaultValues: {
      sub_category_1: [],
      sub_category_2: [],
      sub_category_3: [],
      ...initialValues,
    },
  });

  const { reset, watch } = methods;

  // Handle the argument callback
  watch((values: any) => {
    onChange(values);
  });

  // Establish the category blocks state with the first category block
  const [categoryBlocks, setCategoryBlocks] = useState<
    {
      id: string;
      categories: Record<string, string[]>;
    }[]
  >([]);

  // Watch the values to capture the selected categories
  watch((values) => {
    if (categoryBlocks.length === 0) return;

    // Use the category block ids to get the values from the form.
    // The values are the category ids
    const _selectedCategories = categoryBlocks.map((form) => {
      return methods.getValues(form.id as any);
    });

    setSelectedCategories(_selectedCategories);
  });

  // Add a new category section (main category + subcategories)
  const addForm = useCallback(() => {
    if (categoryBlocks.length >= MAX_CATEGORIES) return;

    setCategoryBlocks([
      ...categoryBlocks,
      {
        id: "category_" + (categoryBlocks.length + 1),
        categories,
      },
    ]);
  }, [categories, categoryBlocks]);

  /**
   * This effect is responsible for adding
   * the category sections on load based on the initial
   * values.
   */
  useEffect(() => {
    // If there are already the max number of categories, don't add any more
    if (categoryBlocks.length > 2) return;

    // Get the number of categories already chosen in the initial values
    const count = compact([
      initialValues?.category_1,
      initialValues?.category_2,
      initialValues?.category_3,
    ]).length;

    // For each category, add a new category section
    times(() => addForm(), count || 1);

    // Reset the form to the initial values
    reset(initialValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    initialValues?.category_1,
    initialValues?.category_2,
    initialValues?.category_3,
  ]);

  const removeForm = (formId: string) => {
    // Remove the value from the form
    methods.reset({
      ...methods.getValues(),
      [formId]: "",
    });

    // Remove the form from the category blocks
    const newBlocks = categoryBlocks.filter(
      (block: { id: string }) => block.id !== formId
    );

    // Reset the category block ids
    const updatedBlocks = newBlocks.map((block, index) => {
      return {
        ...block,
        id: "category_" + (index + 1),
      };
    });

    // Remove the block
    setCategoryBlocks(updatedBlocks);
  };

  return {
    methods,
    categoryBlocks,
    addForm,
    removeForm,
    selectedCategories,
  };
}
