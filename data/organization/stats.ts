export interface Stat {
  value: string;
  label: string;
  variant?: "primary" | "default";
}

export const organizationStats: Stat[] = [
  { value: "21,165+", label: "TOTAL RAISED (USD)" },
  { value: "3", label: "ACTIVE PROJECTS" },
  { value: "500+", label: "STUDENTS IMPACTED" },
];

export const jiweStats: Stat[] = [
  { value: "21,165+", label: "Total Raised" },
  { value: "501(c)(3)", label: "Certified", variant: "primary" },
  { value: "2026", label: "Year" },
  { value: "8,000", label: "2026 Target" },
];