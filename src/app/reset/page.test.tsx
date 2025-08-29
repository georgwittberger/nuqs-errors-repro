import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { NuqsTestingAdapter } from "nuqs/adapters/testing";
import { expect, it } from "vitest";
import Page from "./page";

it("renders data for selected sort order", async () => {
  const user = userEvent.setup();

  render(
    <NuqsTestingAdapter>
      <Page />
    </NuqsTestingAdapter>
  );

  await expect(
    screen.findByText("Sort order: asc")
  ).resolves.toBeInTheDocument();
  await expect(
    screen.findByText("Data: Data sorted in asc order")
  ).resolves.toBeInTheDocument();

  await user.click(screen.getByRole("button", { name: "Sort desc" }));

  await expect(
    screen.findByText("Sort order: desc")
  ).resolves.toBeInTheDocument();
  await expect(
    screen.findByText("Data: Data sorted in desc order")
  ).resolves.toBeInTheDocument();
  await expect(
    screen.findByText("Sort order: desc")
  ).resolves.toBeInTheDocument();
});
