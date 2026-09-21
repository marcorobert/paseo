import { useCallback, useMemo, useState } from "react";

export const DEFAULT_VISIBLE_SIDEBAR_GROUP_ITEMS = 20;

export function normalizeSidebarGroupLimit(visibleItemCount: number | undefined): number {
  if (visibleItemCount === undefined || !Number.isFinite(visibleItemCount)) {
    return DEFAULT_VISIBLE_SIDEBAR_GROUP_ITEMS;
  }
  return Math.max(1, Math.floor(visibleItemCount));
}

export function selectLimitedSidebarGroupItems<T>(
  items: readonly T[],
  visibleItemCount: number | undefined,
  expanded: boolean,
): T[] {
  const limit = normalizeSidebarGroupLimit(visibleItemCount);
  return expanded ? items.slice() : items.slice(0, limit);
}

export function useLimitedSidebarGroup<T>(items: readonly T[], visibleItemCount?: number) {
  const [expanded, setExpanded] = useState(false);
  const limit = normalizeSidebarGroupLimit(visibleItemCount);
  const visibleItems = useMemo(
    () => selectLimitedSidebarGroupItems(items, limit, expanded),
    [expanded, items, limit],
  );
  const canToggle = items.length > limit;
  const toggleExpanded = useCallback(() => setExpanded((current) => !current), []);

  return { visibleItems, expanded, canToggle, toggleExpanded };
}
