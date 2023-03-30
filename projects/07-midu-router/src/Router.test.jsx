import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import { Router } from "./Router";
import { getCurrentPath } from "./utils";
import { Route } from "./Route";
import { Link } from "./Link";

vi.mock("./utils.js", () => ({
  getCurrentPath: vi.fn(),
}));

describe("Router", () => {
  beforeEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it("should render", () => {
    render(<Router routes={[]} />);
    expect(true).toBeTruthy();
  });

  it("should render a default component when no route matches", () => {
    render(
      <Router routes={[]} defaultComponent={() => <h1>404 Not Found</h1>} />
    );
    expect(screen.getByText("404 Not Found")).toBeTruthy();
  });

  it("should render a component when a route matches", () => {
    getCurrentPath.mockReturnValue("/");

    render(<Router routes={[{ path: "/", component: () => <h1>Home</h1> }]} />);
    expect(screen.getByText("Home")).toBeTruthy();
  });

  it("should navigate when a link is clicked", async () => {
    getCurrentPath.mockReturnValueOnce("/");

    render(
      <Router>
        <Route
          path="/"
          component={() => {
            return (
              <>
                <h1>Home</h1>
                <Link to="/about">Go to About</Link>
              </>
            );
          }}
        />
        <Route path="/about" component={() => <h1>About</h1>} />
      </Router>
    );

    const link = await screen.findByText(/Go to About/);
    link.click();

    expect(screen.getByText(/About/)).toBeTruthy();
  });
});
