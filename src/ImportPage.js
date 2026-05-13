import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebase";
import { useState } from "react";

// ← CHANGE ONLY THIS
const SUBJECT = "economics";

// ← ADD QUESTIONS UNDER EACH TOPIC
const allQuestions = {
  
  
  basic: [
  ],
  tools: [],
  price: [],
  consumer: [],
  firm: [],
  market: [],
  income_dist: [],
  govt: [
    { year: "2025", q: "Which of the following BEST describes fiscal policy?", options: ["A. The use of interest rates and money supply to influence the economy", "B. The use of government spending and taxation to influence aggregate demand", "C. The use of exchange rate adjustments to correct trade imbalances", "D. The use of wage controls to reduce cost-push inflation"], answer: "B", exp: "Fiscal policy involves the use of government expenditure (G) and taxation (T) to influence macroeconomic conditions — particularly aggregate demand, output, employment, and inflation. It is managed by the government's ministry of finance, unlike monetary policy which is controlled by the central bank." },
{ year: "2025", q: "Monetary policy is MOST effective in controlling which of the following?", options: ["A. Structural unemployment caused by skills mismatch", "B. Demand-pull inflation caused by excessive money supply", "C. Cost-push inflation caused by rising oil prices", "D. Seasonal unemployment caused by harvest cycles"], answer: "B", exp: "Monetary policy (raising interest rates, reducing money supply) is most effective against demand-pull inflation — where excessive spending fuels price rises. It is less effective against cost-push inflation (which originates from the supply side) or structural/seasonal unemployment, which require supply-side or fiscal interventions." },
{ year: "2025", q: "Which of the following policies would BEST address a deflationary gap in the Nigerian economy?", options: ["A. Increasing the Monetary Policy Rate (MPR) to reduce inflation", "B. Raising taxes to reduce government budget deficit", "C. Increasing government spending on infrastructure and social services", "D. Reducing money supply through open market operations"], answer: "C", exp: "A deflationary (recessionary) gap means actual GDP is below potential GDP — the economy is operating below full employment. The Keynesian remedy is expansionary fiscal policy: increasing government spending directly boosts aggregate demand, raises output and employment, and closes the gap. Raising MPR or reducing money supply would worsen the situation." },
  ],
  circular: [],
  national_acc: [],
  national_det: [],
  money: [{ year: "2025", q: "Which of the following is NOT a function of the Central Bank of Nigeria (CBN)?", options: ["A. Issuing currency on behalf of the federal government", "B. Acting as lender of last resort to commercial banks", "C. Accepting savings deposits from the general public", "D. Managing Nigeria's foreign exchange reserves"], answer: "C", exp: "The CBN is a banker's bank — it provides services to commercial banks and the government, NOT the general public. Accepting deposits from the public is the function of commercial banks (GTBank, Zenith, UBA, etc.). The CBN's functions include currency issuance, monetary policy, lender of last resort, and foreign reserve management." },],
  inflation: [],
  public: [],
  west_africa: [],
  growth: [{ year: "2025", q: "Which of the following BEST describes economic growth?", options: ["A. An improvement in the quality of life of citizens", "B. A sustained increase in a country's real GDP over time", "C. A reduction in poverty and inequality", "D. Structural transformation of the economy"], answer: "B", exp: "Economic growth refers specifically to a sustained increase in the real output (real GDP) of an economy over time. It is measured as the percentage change in real GDP from one period to the next." },],
  agric: [],
  intl_trade: [
    { year: "2025", q: "Which of the following BEST describes currency depreciation?", options: ["A. A deliberate government reduction of a fixed exchange rate", "B. An automatic fall in the value of a currency under a floating exchange rate system", "C. An increase in the value of a currency relative to others", "D. A government decision to peg its currency to gold"], answer: "B", exp: "Currency depreciation occurs automatically under a floating exchange rate when market forces (supply and demand) reduce the currency's value. It differs from devaluation, which is a deliberate government decision to reduce a fixed exchange rate." },
{ year: "2025", q: "A country has a comparative advantage in producing a good when:", options: ["A. It can produce the good using fewer resources than any other country", "B. It produces the good at a lower opportunity cost than other countries", "C. It has the largest labour force to produce the good", "D. It has the most advanced technology for producing the good"], answer: "B", exp: "Comparative advantage (David Ricardo) is about relative efficiency — a country should specialise in goods where its opportunity cost is lowest compared to trading partners, even if it is less efficient in absolute terms. This is the basis of mutually beneficial international trade." },
{ year: "2025", q: "The balance of trade is said to be favourable when:", options: ["A. Imports exceed exports of goods", "B. Government revenue exceeds expenditure", "C. Exports of goods exceed imports of goods", "D. Capital inflows exceed capital outflows"], answer: "C", exp: "A favourable (surplus) balance of trade occurs when the value of a country's visible exports (physical goods) exceeds its visible imports. This means the country earns more foreign exchange from selling goods abroad than it spends importing goods." },
{ year: "2025", q: "Which of the following is an example of an invisible trade item?", options: ["A. Crude oil exports", "B. Machinery imports", "C. Insurance services", "D. Agricultural produce exports"], answer: "C", exp: "Invisible trade refers to services rather than physical goods. Insurance, banking, tourism, transportation, and education are invisible trade items. Crude oil, machinery, and agricultural produce are visible trade items — tangible physical goods that can be seen and counted." },
{ year: "2025", q: "Which of the following would cause the balance of trade to improve for Nigeria?", options: ["A. A rise in domestic inflation making exports more expensive", "B. An increase in consumer income boosting import demand", "C. Devaluation of the naira making exports cheaper for foreign buyers", "D. Removal of export subsidies reducing export competitiveness"], answer: "C", exp: "Devaluation of the naira makes Nigerian exports cheaper in foreign currency terms, boosting export demand. At the same time, imports become more expensive in naira terms, reducing import demand. Both effects work together to improve the balance of trade." },
  ],
  macro_meas: [],
  labour: [],
  stabilize: [],
  intl_inst: [{ year: "2025", q: "Which of the following is an objective of ECOWAS?", options: ["A. To coordinate global oil production quotas among member states", "B. To promote free movement of persons, goods, services and capital within West Africa", "C. To provide long-term development loans to African countries", "D. To regulate international monetary affairs globally"], answer: "B", exp: "ECOWAS (Economic Community of West African States), established in 1975, aims to promote economic integration through: free movement of people and goods, common external tariff, monetary cooperation, and political stability among its 15 West African member states." },],
};

export default function ImportPage({ onBack }) {
  const [status, setStatus] = useState("idle");
  const [count, setCount] = useState(0);
  const [total, setTotal] = useState(0);

 async function handleImport() {
    const allEntries = Object.entries(allQuestions).filter(([, qs]) => qs.length > 0);
    const totalCount = allEntries.reduce((sum, [, qs]) => sum + qs.length, 0);
    setTotal(totalCount);
    setStatus("loading");

    let added = 0;
    try {
      for (const [topic, questions] of allEntries) {
        for (const question of questions) {
          await addDoc(collection(db, "questions"), {
            ...question,
            topic,
            subject: SUBJECT,
          });
          added++;
          setCount(added);
        }
      }
      setStatus("done");
    } catch (err) {
      setStatus("error");
      alert("Error: " + err.message);
    }
  }
  
  // show which topics have questions
  const topicSummary = Object.entries(allQuestions)
    .filter(([, qs]) => qs.length > 0)
    .map(([topic, qs]) => `${topic} (${qs.length})`)
    .join(", ");

  return (
    <div style={{ padding: 24, textAlign: "center", maxWidth: 400, margin: "0 auto" }}>
      <button onClick={onBack} style={{ marginBottom: 20 }}>← Back</button>

      <h2 style={{ marginBottom: 8 }}>Import Questions</h2>
      <p style={{ marginBottom: 4 }}>
        <strong>Subject:</strong> {SUBJECT}
      </p>

      {topicSummary ? (
        <p style={{ fontSize: 13, color: "#666", marginBottom: 20 }}>
          <strong>Topics ready:</strong> {topicSummary}
        </p>
      ) : (
        <p style={{ fontSize: 13, color: "red", marginBottom: 20 }}>
          ⚠️ No questions added yet
        </p>
      )}

      {status === "idle" && (
        <button
          onClick={handleImport}
          disabled={!topicSummary}
          style={{
            padding: "12px 24px",
            background: topicSummary ? "#0d9488" : "#ccc",
            color: "#fff",
            border: "none",
            borderRadius: 10,
            fontSize: 16,
            cursor: topicSummary ? "pointer" : "not-allowed",
          }}
        >
          Start Import
        </button>
      )}

      {status === "loading" && (
        <p>⏳ Adding... {count} / {total}</p>
      )}

      {status === "done" && (
        <p style={{ color: "green", fontSize: 18 }}>
          ✅ Done! {count} questions added to Firestore.
        </p>
      )}
        {status === "error" && (
  <p style={{ color: "red" }}>
    ❌ Import failed. Check your Firestore rules.
  </p>
)}
    </div>
  );
      }
