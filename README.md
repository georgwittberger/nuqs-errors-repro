# Error Reproduction for nuqs Library

This demo application reproduces two problems discovered with nuqs v2.5.0 (and higher).

1. State setter functions returned by `useQueryState` are not memoized when using `NuqsTestingAdapter`. This is reproduced in the page <http://localhost:3000/setters>
2. Value of `useQueryState` temporarily resets to its previous value after setting a new value when other state changes cause the component to rerender as well (e.g. loading data based on new query parameter state). This is reproduced in the page <http://localhost:3000/reset>

## Getting Started

1. Install dependencies: `npm ci`
2. Run unit tests: `npm run test`
3. Run dev server: `npm run dev`
4. Open home page: <http://localhost:3000>
