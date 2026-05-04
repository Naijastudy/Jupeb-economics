export const courses = [
   
       { id: "gov001", code: "GOV 001", title: "Elements of Government", semester: "First Semester", emoji: "🏛️",
    topics: [
      { id: "nature", label: "Nature of Government and Politics" },
      { id: "basic_concepts", label: "Basic Concepts of Government" },
      { id: "state_structure", label: "The State, Structure and Types of Government" },
      { id: "constitution", label: "Constitution and Constitutionalism" },
      { id: "governance", label: "Governance and Citizenship" },
    ],
  },
  { 
    id: "gov002", code: "GOV 002", title: "Fundamentals of Government", semester: "First Semester", emoji: "⚖️",
    topics: [
      { id: "political_ideas", label: "Political Ideas and Thoughts" },
      { id: "parties_groups", label: "Political Parties, Party System and Pressure Groups" },
      { id: "opinion_propaganda", label: "Public Opinion and Propaganda" },
      { id: "elections", label: "Elections and Electoral System" },
      { id: "social_change", label: "Political and Social Change" },
      { id: "public_admin", label: "Public Administration" },
      { id: "intl_relations", label: "International Relations" },
    ],
  },
  { 
    id: "gov003", code: "GOV 003", title: "Nigerian Government and Politics", semester: "Second Semester", emoji: "🇳🇬",
    topics: [
      { id: "pre_colonial", label: "Pre-Colonial Systems of Government in Nigeria" },
      { id: "colonial_admin", label: "Colonial Administration in Nigeria" },
      { id: "party_dev", label: "Development of Political Parties in Nigeria" },
      { id: "electoral_process", label: "Elections and Electoral Process in Nigeria" },
      { id: "political_crisis", label: "Major Political Crisis in Nigeria" },
      { id: "military_rule", label: "Military Rule and Coup d'état in Nigeria" },
      { id: "foreign_policy", label: "Nigerian Foreign Policy" },
    ],
  },
  { 
    id: "gov004", code: "GOV 004", title: "African Government and Politics", semester: "Second Semester", emoji: "🌍",
    topics: [
      { id: "pre_invasion", label: "Africa Before European Invasion" },
      { id: "colonial_africa", label: "Colonial Systems of Administration in Africa" },
      { id: "west_africa_const", label: "Constitutional Development of Selected West African Countries" },
      { id: "nationalist_move", label: "The Nationalist Movement in West Africa" },
      { id: "military_africa", label: "Military Intervention in Africa" },
      { id: "democratization", label: "Democratization and Political Process in Africa" },
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
