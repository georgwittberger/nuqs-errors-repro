"use client";

import { parseAsStringLiteral, useQueryState } from "nuqs";
import { useEffect, useRef } from "react";

const sortOrder = ["asc", "desc"] as const;

export default function Setters() {
  const [sort, setSort] = useQueryState(
    "sortOrder",
    parseAsStringLiteral(sortOrder).withDefault("asc")
  );
  const setterRef = useRef(setSort);
  const isSetterSameAsPrevious = Object.is(setterRef.current, setSort);

  useEffect(() => {
    setterRef.current = setSort;
  });

  useEffect(() => {
    console.log(
      "Running effect depending on setter (expected to be logged only once/twice)"
    );
  }, [setSort]);

  console.log("Rendering with sort order:", sort);

  return (
    <main>
      <h1 className="text-4xl mb-8">
        State Setters Not Memoized Anymore (Testing Only)
      </h1>
      <p className="mb-4">
        This demo reproduces the problem that state setter functions returned by
        useQueryState are not memoized when using NuqsTestingAdapter. A new
        function is returned on every render causing the effect to rerun more
        often than expected.
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
      <p>Setter is same as in previous render: {`${isSetterSameAsPrevious}`}</p>
    </main>
  );
}
