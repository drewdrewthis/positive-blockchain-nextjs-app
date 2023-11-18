import { useEffect, useState } from "react";

import Routes from "@/lib/Routes";

type Categories = Record<string, string[]>;

export function useCategories() {
  const [data, setData] = useState<{ categories: Categories }>({
    categories: {},
  });

  useEffect(() => {
    fetch(Routes.getApiRoute("/categories"))
      .then((res) => res.json())
      .then((data) => data.data)
      .then(setData);
  }, []);

  return data;
}
