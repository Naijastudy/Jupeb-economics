export const courses = [
  {
    id: "bus001",
    code: "BUS001",
    title: "Business and Its Environment",
    semester: "First Semester",
    emoji: "🏢",
    topics: [
      { id: "enterprise", label: "Enterprise" },
      { id: "business_enterprise", label: "Business Enterprise" },
      { id: "size_of_business", label: "Size of a Business" },
      { id: "stakeholders", label: "Stakeholders in a Business" },
      { id: "business_objectives", label: "Business Objectives" },
      { id: "organizations", label: "Organizations" },
      { id: "communication", label: "Communication" },
    ],
  },
  {
    id: "bus002",
    code: "BUS002",
    title: "Finance and Accounting",
    semester: "First Semester",
    emoji: "💰",
    topics: [
      { id: "business_finance", label: "Business Finance" },
      { id: "working_capital", label: "Working Capital Management" },
      { id: "cost", label: "Cost" },
      { id: "accounting_fundamentals", label: "Accounting Fundamentals" },
      { id: "budgeting", label: "Budgeting" },
    ],
  },
  {
    id: "bus003",
    code: "BUS003",
    title: "Management I",
    semester: "Second Semester",
    emoji: "📋",
    topics: [
      { id: "management_leadership", label: "Management and Leadership" },
      { id: "motivation", label: "Motivation" },
      { id: "hrm", label: "Human Resource Management (HRM)" },
      { id: "marketing", label: "Marketing" },
    ],
  },
  {
    id: "bus004",
    code: "BUS004",
    title: "Management II",
    semester: "Second Semester",
    emoji: "⚙️",
    topics: [
      { id: "operations", label: "Operations" },
      { id: "strategic_management", label: "Strategic Management" },
    ],
  },
];
export const grading = [
  { marks: "70-100", grade: "A", points: 5, remark: "Excellent" },
  { marks: "60-69", grade: "B", points: 4, remark: "Very Good" },
  { marks: "50-59", grade: "C", points: 3, remark: "Good" },
  { marks: "45-49", grade: "D", points: 2, remark: "Merit" },
  { marks: "40-44", grade: "E", points: 1, remark: "Pass" },
  { marks: "0-39",  grade: "F", points: 0, remark: "Fail" },
];
