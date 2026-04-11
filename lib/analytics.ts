import { createAdminClient } from "@/lib/supabase/admin";
import type { AdminAnalyticsSummary } from "@/types";

type SiteVisitRow = {
  path: string;
  visit_date: string;
};

function normalizePath(path: string) {
  if (!path.startsWith("/")) {
    return `/${path}`;
  }

  return path;
}

export async function trackSiteVisit(visitorId: string, path: string) {
  const normalizedPath = normalizePath(path);

  if (normalizedPath.startsWith("/api") || normalizedPath === "/auth/callback") {
    return;
  }

  const supabase = createAdminClient();
  const visitDate = new Date().toISOString().slice(0, 10);
  const { error } = await supabase.from("site_visits").upsert(
    [
      {
        visitor_id: visitorId,
        path: "__site__",
        visit_date: visitDate
      },
      {
        visitor_id: visitorId,
        path: normalizedPath,
        visit_date: visitDate
      }
    ] as never,
    {
      onConflict: "visitor_id,path,visit_date",
      ignoreDuplicates: true
    }
  );

  if (error) {
    throw error;
  }
}

export async function getAdminAnalyticsSummary(): Promise<AdminAnalyticsSummary> {
  const supabase = createAdminClient();
  const { data, error } = await supabase.from("site_visits").select("path,visit_date");

  if (error) {
    console.error("Unable to load visit analytics.", error);
    return {
      totalVisitors: 0,
      visitorsToday: 0,
      visitorsLast7Days: 0,
      topPages: []
    };
  }

  const today = new Date().toISOString().slice(0, 10);
  const lastSevenDays = new Date();
  lastSevenDays.setDate(lastSevenDays.getDate() - 6);
  const lastSevenDaysString = lastSevenDays.toISOString().slice(0, 10);
  const rows = (data || []) as SiteVisitRow[];

  const totalVisitors = rows.filter((row) => row.path === "__site__").length;
  const visitorsToday = rows.filter(
    (row) => row.path === "__site__" && row.visit_date === today
  ).length;
  const visitorsLast7Days = rows.filter(
    (row) => row.path === "__site__" && row.visit_date >= lastSevenDaysString
  ).length;

  const pageCounts = rows
    .filter((row) => row.path !== "__site__")
    .reduce<Record<string, number>>((accumulator, row) => {
      accumulator[row.path] = (accumulator[row.path] || 0) + 1;
      return accumulator;
    }, {});

  const topPages = Object.entries(pageCounts)
    .map(([path, visits]) => ({ path, visits }))
    .sort((left, right) => right.visits - left.visits)
    .slice(0, 5);

  return {
    totalVisitors,
    visitorsToday,
    visitorsLast7Days,
    topPages
  };
}
