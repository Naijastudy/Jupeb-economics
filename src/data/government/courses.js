export const courses = [
  { id: "gov001", code: "GOV001", title: "Elements of Government", semester: "First Semester", emoji: "🏛️",
    topics: [
      { id: "nature", label: "Nature of Government and Politics" },
      { id: "concepts", label: "Basic Concepts of Government" },
      { id: "state", label: "The State, Structure and Types of Government" },
      { id: "constitution", label: "Constitution and Constitutionalism" },
      { id: "governance", label: "Governance and Citizenship" },
    ],
  },

  {id: "gov002", code: "GOV002", title: "Fundamentals of Government", semester: "First Semester", emoji: "⚖️",
    topics: [
      { id: "ideas", label: "Political Ideas and Thoughts" },
      { id: "parties", label: "Political Parties, Party Systems and Pressure Groups" },
      { id: "opinion", label: "Public Opinion and Propaganda" },
      { id: "elections", label: "Elections and Electoral Systems" },
      { id: "change", label: "Political and Social Change" },
      { id: "admin", label: "Public Administration" },
      { id: "intl", label: "International Relations" },
    ],
  },

  { id: "gov003", code: "GOV003", title: "Nigerian Government and Politics", semester: "Second Semester",  emoji: "🇳🇬",
    topics: [
      { id: "precolonial", label: "Pre-Colonial Systems of Government in Nigeria" },
      { id: "colonial", label: "Colonial Administration in Nigeria" },
      { id: "party_dev", label: "Development of Political Parties in Nigeria" },
      { id: "electoral_ng", label: "Elections and Electoral Process in Nigeria" },
      { id: "crisis", label: "Major Political Crises in Nigeria" },
      { id: "military", label: "Military Rule in Nigeria" },
      { id: "foreign", label: "Nigerian Foreign Policy" },
    ],
  },

  {
    id: "gov004",  code: "GOV004", title: "African Government and Politics", semester: "Second Semester", emoji: "🌍",
    topics: [
      { id: "africa_pre", label: "Africa Before European Invasion" },
      { id: "colonial_africa", label: "Colonial Systems of Administration in Africa" },
      { id: "constitution_africa", label: "Constitutional Development of Selected West African Countries" },
      { id: "nationalism", label: "Nationalist Movements in West Africa" },
      { id: "military_africa", label: "Military Intervention in Africa" },
      { id: "democracy_africa", label: "Democratization and Political Processes in Africa" },
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
