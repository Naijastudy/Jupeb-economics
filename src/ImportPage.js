import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebase";
import { useState } from "react";

// ← CHANGE ONLY THIS
const SUBJECT = "government";

// ← ADD QUESTIONS UNDER EACH TOPIC
const allQuestions = {
  elections: [
  { year:"2025", q:"Universal adult suffrage means ______.", options:["A. Only educated people can vote","B. All adults have the right to vote","C. Only men can vote","D. Voting is compulsory"], answer:"B", exp:"Universal adult suffrage grants voting rights to all qualifying adults regardless of gender, education, or wealth." },
  { year:"2025", q:"The conduct of free and fair elections in Nigeria is the responsibility of ______.", options:["A. Supreme Court","B. National Assembly","C. INEC","D. Police"], answer:"C", exp:"INEC (Independent National Electoral Commission) is constitutionally responsible for organizing Nigeria's elections." },
  { year:"2025", q:"Electoral College has been criticised because it ______.", options:["A. Is very expensive","B. Creates more seats in the legislature","C. Sometimes negates the wishes of the electorate","D. Makes the legislature too responsive"], answer:"C", exp:"The Electoral College system is criticized because a candidate can win without the popular vote, negating citizens' wishes." },
  { year:"2025", q:"The principle of separation of powers in a presidential system can be enhanced through ______.", options:["A. Cheek and balances","B. Checks and balances","C. Cheeks and balances","D. Choice and balances"], answer:"B", exp:"Checks and balances are the mechanism through which separation of powers is made effective." },
  { year:"2025", q:"The abrogation of delegated legislation in a state may undermine the ______.", options:["A. Constituency of the legislature","B. Efficiency of the legislature","C. Bureaucracy of the legislature","D. Autocracy of the legislature"], answer:"B", exp:"Removing delegated legislation can burden the legislature and reduce its overall efficiency." },
  { year:"2025", q:"Why is the Igbo political system described as fragmented?", options:["A. The political system depends on the village as a political unit","B. The system deals mainly with civil cases","C. It was a war-ridden society","D. Political authority was exercised by many institutions"], answer:"D", exp:"The Igbo system is described as fragmented because political authority was dispersed across many institutions — age grades, village assemblies, title holders — rather than concentrated in one ruler." },
  { year:"2025", q:"Which of the following hinders the practice of democracy in Africa?", options:["A. High level of literacy","B. Mass poverty","C. Over population","D. Multi-party system"], answer:"B", exp:"Mass poverty undermines democracy because poor citizens are more vulnerable to manipulation and less able to participate meaningfully." },
  { year:"2025", q:"The application of Rule of Law in a democracy is usually constrained by which of the following?", options:["A. Executive oversight","B. Legislative oversight","C. Judicial review","D. Emergency powers"], answer:"D", exp:"Emergency powers can legitimately suspend or restrict the normal application of rule of law." },
  { year:"2025", q:"In John Locke's analysis of sovereignty, all rights are ______.", options:["A. Partially surrendered to the leviathan","B. Partially surrendered to the community","C. Fully surrendered to the community","D. Fully surrendered to the leviathan"], answer:"B", exp:"Locke argued that people partially surrender rights to the community/government to protect their natural rights, retaining some rights." },
  { year:"2025", q:"The activities of Nigeria in the international community are primarily influenced by ______.", options:["A. Diplomacy","B. Propaganda","C. National interest","D. Military power"], answer:"C", exp:"National interest is the primary driver of Nigeria's foreign policy and international activities." },

    ],
  
  basic: [
    // paste basic questions here
  ],
  tools: [],
  price: [],
  consumer: [],
  firm: [],
  market: [],
  income_dist: [],
  govt: [],
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
    // count total questions across all topics
    const allEntries = Object.entries(allQuestions).filter(
      ([, qs]) => qs.length > 0
    );
    const totalCount = allEntries.reduce((sum, [, qs]) => sum + qs.length, 0);
    setTotal(totalCount);
    setStatus("loading");

    let added = 0;
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
    </div>
  );
      }
