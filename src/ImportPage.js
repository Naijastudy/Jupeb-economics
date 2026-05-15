import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebase";
import { useState } from "react";

// ← CHANGE ONLY THIS
const SUBJECT = "government";

// ← ADD QUESTIONS UNDER EACH TOPIC
const allQuestions = {
  democracy_africa: [
  { year:"2025", q:"A major challenge to democracy in Africa is ______.", options:["A. Stability","B. Electoral malpractice","C. Unity","D. Participation"], answer:"B", exp:"Electoral malpractice undermines democratic processes and reduces public trust in governance." },
  { year:"2025", q:"Which of the following hinders the practice of democracy in Africa?", options:["A. High level of literacy","B. Mass poverty","C. Over population","D. Multi-party system"], answer:"B", exp:"Mass poverty makes citizens vulnerable to manipulation and weakens meaningful democratic participation." },
],

military_africa: [
  { year:"2025", q:"Military rule in Africa often results in ______.", options:["A. Democracy","B. Suspension of constitution","C. Free elections","D. Separation of powers"], answer:"B", exp:"Military regimes typically suspend constitutions and rule by decrees upon seizing power." },
  { year:"2025", q:"Which of the following is NOT a cause of military intervention?", options:["A. Weak institutions","B. Strong democratic culture","C. Political crises","D. Poor governance"], answer:"B", exp:"A strong democratic culture prevents military intervention rather than causing it." },
],

colonial_africa: [
  { year:"2025", q:"Indirect rule in Africa relied on ______.", options:["A. Foreign officials only","B. Traditional rulers","C. Military leaders","D. Elected leaders"], answer:"B", exp:"Indirect rule depended on traditional rulers to administer colonial territories on behalf of colonial powers." },
  { year:"2025", q:"The European's scramble and partitioning of Africa was concluded at the ______.", options:["A. London conference","B. Berlin conference","C. Vienna conference","D. Versailles conference"], answer:"B", exp:"The Berlin Conference of 1884-85 formalized the Scramble for Africa among European powers." },
],

africa_pre: [
  { year:"2025", q:"The emirate system in the administration of the Hausa/Fulani society was ______.", options:["A. Democratic","B. Stoical","C. Hierarchical","D. Secular"], answer:"C", exp:"The emirate system was strictly hierarchical with the Emir at the apex and various ranked officials below." },
  { year:"2025", q:"Why is the Igbo political system described as fragmented?", options:["A. The political system depends on the village as a political unit","B. The system deals mainly with civil cases","C. It was a war-ridden society","D. Political authority was exercised by many institutions"], answer:"D", exp:"The Igbo system is fragmented because authority was dispersed across many institutions — age grades, village assemblies, and title holders." },
],

foreign: [
  { year:"2025", q:"Non-alignment in foreign policy means ______.", options:["A. Joining alliances","B. Neutrality between power blocs","C. Military dominance","D. Economic isolation"], answer:"B", exp:"Non-alignment is a policy where a country avoids siding with any major power bloc, maintaining independence." },
],

party_dev: [
  { year:"2025", q:"The Nigerian National Democratic Party (NNDP) was established by ______.", options:["A. Herbert Macaulay","B. Tafawa Balewa","C. Nnamdi Azikiwe","D. Obafemi Awolowo"], answer:"A", exp:"Herbert Macaulay founded the NNDP in 1923, making it Nigeria's first modern political party." },
  { year:"2025", q:"Early political parties in Nigeria were largely ______.", options:["A. National","B. Regional","C. Military","D. Religious"], answer:"B", exp:"Early Nigerian political parties were regionally based, reflecting ethnic and regional divisions." },
],

electoral_ng: [
  { year:"2025", q:"The major cause of the 1993 General Election Crisis in Nigeria was the ______.", options:["A. Annulment of the June 12 elections","B. Introduction of two-party system","C. Refusal of the winner to let go his mandate","D. Death of Chief M.K.O Abiola"], answer:"A", exp:"The annulment of the June 12 1993 presidential election by Babangida triggered Nigeria's gravest political crisis." },
  { year:"2025", q:"Which electoral system is commonly used in Nigeria?", options:["A. Proportional representation","B. Simple majority","C. Referendum","D. Indirect voting"], answer:"B", exp:"Nigeria primarily uses the simple majority (first-past-the-post) system in its elections." },
],

crisis: [
  { year:"2025", q:"The 1962 political crisis in the Western Region was aggravated by the conflict between ______.", options:["A. Obafemi Awolowo and D.S Majekodunmi","B. D.S Majekodunmi and S.L Akintola","C. Kofo Abayomi and Samuel Akinsanya","D. S.L Akintola and Obafemi Awolowo"], answer:"D", exp:"The 1962 Western Region crisis was the power struggle between Chief Awolowo and Chief Akintola over control of the Action Group." },
],
 
  basic: [
  ],
  tools: [],
  price: [],
  consumer: [],
  firm: [],
  market: [],
  income_dist: [],
  govt: [
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
  intl_trade: [
   ],
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
