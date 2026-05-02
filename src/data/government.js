export const courses = [
    { id: "ecn001", code: "ECN001", title: "Principles of Economics I", semester: "First Semester", emoji: "📘",
      topics: [
        { id: "intro", label: "Introduction to Economics" },
        { id: "basic", label: "Basic Economic Principles" },
        { id: "tools", label: "Tools & Methods of Analysis" },
        { id: "price", label: "The Price System" },
        { id: "consumer", label: "Theory of Consumer Behaviour" },
        { id: "firm", label: "Theory of the Firm" },
        { id: "market", label: "Market Structure" },
        { id: "income_dist", label: "Theory of Income Distribution" },
        { id: "govt", label: "Government Intervention" },
      ],
    },
];
export const notes = {
    intro: [
        { title: "Definition of Economics", key: "Economics is the study of how individuals, businesses, and governments allocate scarce resources to satisfy unlimited wants and needs.", body: "It involves analyzing choices and trade-offs. Key concepts include scarcity, choice, and opportunity cost. Economics is a social science because it applies scientific methods to study human behavior and social interactions across individuals, firms, and governments." },
        { title: "Micro vs Macroeconomics", key: "Microeconomics focuses on individual agents (consumers, firms); Macroeconomics examines the economy as a whole (aggregate variables).", body: "Micro deals with supply/demand in specific markets, consumer choice, and market structures. Macro explores national GDP, inflation, unemployment, fiscal and monetary policies, and the overall health of the national economy." },
        { title: "Nature of Economic Problems", key: "Fundamental questions: What to produce? How to produce? For whom to produce?", body: "These arise because resources are limited while wants are unlimited. 'What' concerns resource allocation to industries; 'How' involves production methods and efficiency; 'For whom' relates to income distribution and social welfare." },
        { title: "Positive vs Normative Statements", key: "Positive = objective/factual (what IS). Normative = subjective/value judgements (what SHOULD BE).", body: "Positive statements can be tested or rejected by evidence (e.g., 'The current interest rate is 12%'). Normative statements are based on opinions about what is fair or better for society (e.g., 'The government should provide free healthcare')." },
        ],  
};
export const questions = {
    intro: [
        {
  year: "2025",
  q: "Liquidity trap implies that:",
  options: ["A. increasing the money stock might not decrease zero-bound interest rates", "B. people would be less liquid when interest rates are very low", "C. demand for money is perfectly inelastic at ultra-low interest rates", "D. interest rates cannot be pegged by the central bank"],
  answer: "A",
  exp: "A liquidity trap occurs when interest rates are so low that monetary policy becomes ineffective; people prefer to hold cash rather than invest, meaning increasing the money supply fails to lower interest rates further."
},
    ],
};
export const grading = [
    { marks: "70-100", grade: "A", points: 5, remark: "Excellent" },
    { marks: "60-69", grade: "B", points: 4, remark: "Very Good" },
    { marks: "50-59", grade: "C", points: 3, remark: "Good" },
    { marks: "45-49", grade: "D", points: 2, remark: "Merit" },
    { marks: "40-44", grade: "E", points: 1, remark: "Pass" },
    { marks: "0-39",  grade: "F", points: 0, remark: "Fail" },
];