export type MetricId = "revenue" | "utilization" | "switching" | "balance" | "client-value" | "client-health" | "vacation";

export interface MetricInfo {
  id: MetricId;
  label: string;
  description: string;
}

export const ALL_METRICS: MetricInfo[] = [
  { id: "revenue", label: "Revenue Pace", description: "Are you on track to hit your annual goal?" },
  { id: "utilization", label: "Utilization Rate", description: "What % of your time is billable?" },
  { id: "switching", label: "Switch Tax", description: "Hours lost jumping between clients" },
  { id: "balance", label: "Work-Life Balance", description: "How much work bleeds outside 9–5?" },
  { id: "client-value", label: "Client Value", description: "Which clients pay the most per hour?" },
  { id: "client-health", label: "Client Health", description: "Which clients are easiest to work with?" },
  { id: "vacation", label: "Time Off", description: "Are you taking enough breaks to stay sharp?" },
];

// Map slide index to metric id
export const SLIDE_METRIC_MAP: MetricId[] = [
  "revenue", "utilization", "switching", "balance", "client-value", "client-health", "vacation"
];
