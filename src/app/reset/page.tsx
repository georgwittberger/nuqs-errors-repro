"use client";

import { parseAsStringLiteral, useQueryState } from "nuqs";
import { useEffect, useState } from "react";

const sortOrder = ["asc", "desc"] as const;

export default function Reset() {
  const [sort, setSort] = useQueryState(
    "sortOrder",
    parseAsStringLiteral(sortOrder).withDefault("asc")
  );
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    const timeoutId = setTimeout(() => {
      setData(`Data sorted in ${sort} order`);
      setIsLoading(false);
    }, 200);
    return () => clearTimeout(timeoutId);
  }, [sort]);

  console.log("Rendering with sort order:", sort);

  return (
    <main>
      <h1 className="text-4xl mb-8">
        State Suddenly Resetting To Previous Value
      </h1>
      <p className="mb-4">
        This demo reproduces the problem that useQueryState temporarily resets
        to its previous value after setting a new value. View the console and
        click on the buttons to change the state. The component is rerendered
        four times with the newly set value but then suddenly there are two
        rerenders with the previous value. Then it rerenders with the new value
        again. This happens when the component is rerendered due to some other
        state changes like the loading state in this example.
      </p>
      <p>Sort order: {sort}</p>
      <div className="flex gap-2 mb-4">
        <button
          type="button"
          className="border border-gray-600 rounded px-4 py-2"
          onClick={() => setSort("asc")}
        >
          Sort asc
        </button>
        <button
          type="button"
          className="border border-gray-600 rounded px-4 py-2"
          onClick={() => setSort("desc")}
        >
          Sort desc
        </button>
      </div>
      <p>Data: {isLoading ? "loading" : data}</p>
    </main>
  );
}
