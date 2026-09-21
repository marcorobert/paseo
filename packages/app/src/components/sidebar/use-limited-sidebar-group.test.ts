import { describe, expect, it } from "vitest";
import {
  DEFAULT_VISIBLE_SIDEBAR_GROUP_ITEMS,
  normalizeSidebarGroupLimit,
  selectLimitedSidebarGroupItems,
} from "./use-limited-sidebar-group";

describe("useLimitedSidebarGroup", () => {
  it("limits collapsed groups and returns every item when expanded", () => {
    const items = ["one", "two", "three", "four"];

    expect(selectLimitedSidebarGroupItems(items, 2, false)).toEqual(["one", "two"]);
    expect(selectLimitedSidebarGroupItems(items, 2, true)).toEqual(items);
  });

  it("normalizes invalid and fractional limits", () => {
    expect(normalizeSidebarGroupLimit(undefined)).toBe(DEFAULT_VISIBLE_SIDEBAR_GROUP_ITEMS);
    expect(normalizeSidebarGroupLimit(Number.NaN)).toBe(DEFAULT_VISIBLE_SIDEBAR_GROUP_ITEMS);
    expect(normalizeSidebarGroupLimit(0)).toBe(1);
    expect(normalizeSidebarGroupLimit(2.9)).toBe(2);
  });
});
