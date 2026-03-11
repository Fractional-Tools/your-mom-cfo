export type MetricId = "revenue" | "utilization" | "switching" | "balance" | "client-value" | "client-health" | "vacation" | "growth" | "engagement";

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
  { id: "growth", label: "Growth Capacity", description: "Do you have room for more clients?" },
  { id: "engagement", label: "Client Retention", description: "How long do your clients stick around?" },
];

export const SLIDE_METRIC_MAP: MetricId[] = [
  "revenue", "utilization", "switching", "balance", "client-value", "client-health", "vacation", "growth", "engagement"
];
