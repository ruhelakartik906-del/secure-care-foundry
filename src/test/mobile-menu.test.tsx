import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Header } from "@/components/site/Header";

const location = vi.hoisted(() => ({ pathname: "/" }));
vi.mock("@tanstack/react-router", () => ({
  useRouterState: () => location.pathname,
  Link: ({ to, children, activeOptions, activeProps, params, ...props }: any) => <a href={to} {...props}>{children}</a>,
}));
vi.mock("@/components/site/EnquiryDialog", () => ({ useEnquiry: () => ({ open: vi.fn() }) }));

afterEach(() => { cleanup(); location.pathname = "/"; });

describe("Mobile menu interactions", () => {
  it("reopens repeatedly and returns focus to its opener on close", async () => {
    render(<Header />);
    const trigger = screen.getByRole("button", { name: "Open menu" });
    for (let i = 0; i < 5; i++) {
      fireEvent.click(trigger);
      expect(screen.getByRole("dialog", { name: "Menu" })).toBeInTheDocument();
      fireEvent.click(screen.getByRole("button", { name: "Close menu" }));
      await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
      await waitFor(() => expect(trigger).toHaveFocus());
      expect(document.body.style.pointerEvents).not.toBe("none");
    }
  });

  it("closes after navigation and lets the menu open on the next page", async () => {
    const view = render(<Header />);
    fireEvent.click(screen.getByRole("button", { name: "Open menu" }));
    location.pathname = "/blogs";
    view.rerender(<Header />);
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
    fireEvent.click(screen.getByRole("button", { name: "Open menu" }));
    expect(screen.getByRole("dialog", { name: "Menu" })).toBeInTheDocument();
  });
});