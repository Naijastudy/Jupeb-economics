import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebase";
import { useState } from "react";

// ← CHANGE ONLY THIS
const SUBJECT = "economics";

// ← ADD QUESTIONS UNDER EACH TOPIC
const allQuestions = {
  
  
  basic: [
    // paste basic questions here
  ],
  tools: [],
  price: [],
  consumer: [],
  firm: [],
  market: [],
  income_dist: [],
  govt: [
    { year: "2025", q: "Which of the following is NOT a component of economic development?", options: ["A. Increase in real output with attitudinal change", "B. Improvements in institutional frameworks", "C. Increase in military expenditure", "D. Reduction in poverty and inequality"], answer: "C", exp: "Economic development encompasses qualitative improvements in society — rising living standards, institutional reform, poverty reduction, better healthcare and education, and structural transformation. Increase in military expenditure is not a component of development and may actually divert resources away from development goals." },
{ year: "2025", q: "Globalization can contribute to economic development in developing countries through all of the following EXCEPT:", options: ["A. Access to foreign capital and investment", "B. Technology transfer from developed countries", "C. Guaranteed protection of domestic infant industries", "D. Access to larger international export markets"], answer: "C", exp: "Globalization actually reduces protection for domestic industries by exposing them to international competition. While it brings benefits — foreign capital, technology transfer, and market access — it can harm infant industries that cannot yet compete globally, which is why developing countries sometimes need selective protectionist policies." },
  ],
  circular: [],
  national_acc: [],
  national_det: [],
  money: [],
  inflation: [],
  public: [],
  west_africa: [],
  growth: [],
  agric: [],
  intl_trade: [],
  macro_meas: [],
  labour: [],
  stabilize: [],
  intl_inst: [],
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
