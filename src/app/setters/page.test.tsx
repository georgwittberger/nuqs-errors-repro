import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { NuqsTestingAdapter } from "nuqs/adapters/testing";
import { expect, it, vi } from "vitest";
import Page from "./page";

it("uses same setter on every render", async () => {
  const user = userEvent.setup();

  render(
    <NuqsTestingAdapter>
      <Page />
    </NuqsTestingAdapter>
  );

  await expect(
    screen.findByText("Sort order: asc")
  ).resolves.toBeInTheDocument();
  expect(
    screen.getByText("Setter is same as in previous render: true")
  ).toBeInTheDocument();

  await user.click(screen.getByRole("button", { name: "Sort desc" }));

  await expect(
    screen.findByText("Sort order: desc")
  ).resolves.toBeInTheDocument();
  expect(
    screen.getByText("Setter is same as in previous render: true")
  ).toBeInTheDocument();
});

it("runs effect at most twice", async () => {
  const user = userEvent.setup();
  const consoleLogSpy = vi.spyOn(console, "log");

  render(
    <NuqsTestingAdapter>
      <Page />
    </NuqsTestingAdapter>
  );

  await user.click(screen.getByRole("button", { name: "Sort desc" }));
  await user.click(screen.getByRole("button", { name: "Sort asc" }));
  await user.click(screen.getByRole("button", { name: "Sort desc" }));

  const effectLogs = consoleLogSpy.mock.calls.filter((call) =>
    call[0].includes("Running effect depending on setter")
  );
  expect(effectLogs.length).toBeLessThanOrEqual(2);
});
