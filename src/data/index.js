import * as economics from "./economics";
import * as government from "./government/index";
import * as business_studies from "./business_studies/index";
import * as accounting from "./accounting/index";

export const subjects = [
{
  id: "economics",
  name: "Economics",
  emoji: "📈",
  color: "#2563EB",
  available: true,
  data: economics,
},
{
  id: "government",
  name: "Government",
  emoji: "🏛️",
  color: "#1E3A8A", 
  available: true,
  data: government,
},
{
  id: "business_studies",
  name: "Business studies",
  emoji: "💼",
  color: "#7C3AED",
  available: true,
  data: business_studies,
},
{
  id: "accounting",
  name: "Accounting",
  emoji: "🏢",
  color: "#059669",
  available: false,
  data: accounting,
},
];
