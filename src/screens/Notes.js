import React from "react";
import PPCDiagram from "./diagrams/PPC";
import DemandCurveDiagram from "./diagrams/DemandCurve";
import PriceElasticityDiagram from "./diagrams/PricElasticity";
import LawOfDemandDiagram from "./diagrams/LawOfDemand";
import EquilibriumDiagram from "./diagrams/Equilibrium";
import UtilityDiagram from "./diagrams/Utility";

const noteColors = ["#0d9488", "#2563eb", "#ea580c", "#7c3aed"];

export function NotesCourses({ t, data, activeSubject, onSelectCourse, onBack }) {
  return (
    <div style={{ minHeight: "100vh", background: t.bg, fontFamily: "Georgia, serif", color: t.text }}>
      <div style={{ background: t.bgHeader, borderBottom: `2px solid ${t.gold}`, padding: "14px 16px", display: "flex", alignItems: "center", gap: 10, position: "sticky", top: 0, zIndex: 100 }}>
        <button onClick={onBack} style={{ background: "none", border: "none", color: "#fff", fontSize: 22, cursor: "pointer", padding: 0 }}>←</button>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 9, color: t.gold, letterSpacing: 3, textTransform: "uppercase" }}>StudyNaija</div>
          <div style={{ fontSize: 15, fontWeight: "bold", color: "#fff" }}>Study Notes</div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.6)" }}>{activeSubject?.name}</div>
        </div>
      </div>
      <div style={{ padding: "16px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {data.courses.map((c, ci) => (
            <button key={c.id} onClick={() => onSelectCourse(c)}
              style={{ background: noteColors[ci % noteColors.length], border: "none", borderRadius: 16, padding: "20px 14px", cursor: "pointer", textAlign: "left" }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{c.emoji}</div>
              <div style={{ fontSize: 14, fontWeight: "bold", color: "#fff" }}>{c.code}</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.8)", marginTop: 4, lineHeight: 1.4 }}>{c.title}</div>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.6)", marginTop: 6 }}>{c.topics.length} topics</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export function NotesTopics({ t, data, noteCourse, onSelectTopic, onBack }) {
  return (
    <div style={{ minHeight: "100vh", background: t.bg, fontFamily: "Georgia, serif", color: t.text }}>
      <div style={{ background: t.bgHeader, borderBottom: `2px solid ${t.gold}`, padding: "14px 16px", display: "flex", alignItems: "center", gap: 10, position: "sticky", top: 0, zIndex: 100 }}>
        <button onClick={onBack} style={{ background: "none", border: "none", color: "#fff", fontSize: 22, cursor: "pointer", padding: 0 }}>←</button>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 9, color: t.gold, letterSpacing: 3, textTransform: "uppercase" }}>StudyNaija</div>
          <div style={{ fontSize: 15, fontWeight: "bold", color: "#fff" }}>{noteCourse.title}</div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.6)" }}>{noteCourse.code}</div>
        </div>
      </div>
      <div style={{ padding: "16px" }}>
        {noteCourse.topics.map((tp, i) => {
          const count = (data.notes[tp.id] || []).length;
          return (
            <button key={tp.id} onClick={() => { if (count > 0) onSelectTopic(tp); }}
              style={{ background: t.bgCard, border: `1px solid ${t.border}`, borderRadius: 14, padding: "14px 16px", display: "flex", alignItems: "center", gap: 14, cursor: count > 0 ? "pointer" : "default", width: "100%", textAlign: "left", marginBottom: 10, opacity: count > 0 ? 1 : 0.5 }}
              onMouseEnter={e => { if (count > 0) e.currentTarget.style.border = `1px solid ${t.borderHover}`; }}
              onMouseLeave={e => e.currentTarget.style.border = `1px solid ${t.border}`}>
              <div style={{ width: 34, height: 34, borderRadius: 10, background: `${t.gold}22`, border: `1px solid ${t.gold}55`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, color: t.gold, fontWeight: "bold" }}>{i + 1}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: "bold", color: t.heading }}>{tp.label}</div>
                <div style={{ fontSize: 11, color: t.textMuted, marginTop: 3 }}>{count > 0 ? `${count} notes` : "Coming soon"}</div>
              </div>
              <div style={{ color: t.gold, fontSize: 18 }}>›</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function NotesView({ t, data, noteTopic, onBack, card }) {
  const topicNotes = data.notes[noteTopic.id] || [];
  return (
    <div style={{ minHeight: "100vh", background: t.bg, fontFamily: "Georgia, serif", color: t.text }}>
      <div style={{ background: t.bgHeader, borderBottom: `2px solid ${t.gold}`, padding: "14px 16px", display: "flex", alignItems: "center", gap: 10, position: "sticky", top: 0, zIndex: 100 }}>
        <button onClick={onBack} style={{ background: "none", border: "none", color: "#fff", fontSize: 22, cursor: "pointer", padding: 0 }}>←</button>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 9, color: t.gold, letterSpacing: 3, textTransform: "uppercase" }}>StudyNaija</div>
          <div style={{ fontSize: 15, fontWeight: "bold", color: "#fff" }}>{noteTopic.label}</div>
        </div>
      </div>
      <div style={{ padding: "16px" }}>
        {topicNotes.map((n, i) => (
          <div key={i} style={{ ...card }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <div style={{ width: 34, height: 34, borderRadius: 10, background: `${t.gold}22`, border: `1px solid ${t.gold}55`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, color: t.gold, fontWeight: "bold" }}>{i + 1}</div>
              <div style={{ fontSize: 15, fontWeight: "bold", color: t.heading }}>{n.title}</div>
            </div>
            <div style={{ background: t.keyBg, border: `1px solid ${t.keyBorder}`, borderRadius: 12, padding: "14px 16px", marginBottom: 12 }}>
              <div style={{ fontSize: 11, color: t.keyText, fontWeight: "bold", letterSpacing: 1, textTransform: "uppercase", marginBottom: 8 }}>🔑 Key Point</div>
              <div style={{ fontSize: 13, color: t.keyText, lineHeight: 1.8 }}>{n.key}</div>
            </div>
            <div style={{ background: t.exBg, border: `1px solid ${t.exBorder}`, borderRadius: 12, padding: "14px 16px" }}>
              <div style={{ fontSize: 11, color: t.exText, fontWeight: "bold", letterSpacing: 1, textTransform: "uppercase", marginBottom: 8 }}>📝 Full Explanation</div>
              <div style={{ fontSize: 13, color: t.exText, lineHeight: 1.9 }}>{n.body}</div>
            {n.image && (
  <img src={n.image} alt={n.title}
    style={{ width: "100%", borderRadius: 10, marginTop: 14, border: `1px solid ${t.border}` }}
    onError={e => e.target.style.display = "none"} />
)}
{n.diagram === "ppc" && <PPCDiagram t={t} />}
  {n.diagram === "demand" && <DemandCurveDiagram t={t} />}
    {n.diagram === "ped" && <PriceElasticityDiagram t={t} />}
{n.diagram === "law_demand" && <LawOfDemandDiagram t={t} />}
  {n.diagram === "equilibrium" && <EquilibriumDiagram t={t} />}
    {n.diagram === "utility" && <UtilityDiagram t={t} />}
  
            </div>
          </div>
        ))}
      </div>
    </div>
  );
                      }
