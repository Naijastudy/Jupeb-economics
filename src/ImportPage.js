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
  { year:"2025", q:"A major characteristic of Fascism is that the government is ______.", options:["A. Democratic","B. Autocratic","C. Popular","D. Decentralized"], answer:"B", exp:"Fascism is characterized by autocratic, dictatorial leadership and suppression of opposition." },
],

military_africa: [
  { year:"2025", q:"Military rule in Africa often results in ______.", options:["A. Democracy","B. Suspension of constitution","C. Free elections","D. Separation of powers"], answer:"B", exp:"Military regimes typically suspend constitutions and rule by decrees upon seizing power." },
  { year:"2025", q:"One of the following is NOT a characteristic of military rule in Africa ______.", options:["A. Dictatorship","B. Centralized authority","C. Rule by constitution","D. Using instrument of violence to quell opposition"], answer:"C", exp:"Military governments rule by decree and suspend constitutions; rule by constitution is a feature of civilian democratic governments." },
  { year:"2025", q:"Military intervention in Africa often results in ______.", options:["A. Democracy","B. Suspension of constitution","C. Free elections","D. Separation of powers"], answer:"B", exp:"Military governments typically suspend the constitution and rule through decrees." },
  { year:"2025", q:"______ was not the appropriate reason for military intervention and coup d'état in Africa.", options:["A. Socio-economic and political instability","B. Centrality of the military","C. Need for democratization","D. Corruption and mismanagement"], answer:"C", exp:"The need for democratization is actually an argument AGAINST military intervention, not a justification for it." },
  { year:"2025", q:"Military intervention occurs when the armed forces take over government power. Which of the following is NOT a cause?", options:["A. Weak institutions","B. Strong democratic culture","C. Political crises","D. Poor governance"], answer:"B", exp:"A strong democratic culture prevents military intervention rather than causing it." },
],

colonial_africa: [
  { year:"2025", q:"Indirect rule in Africa relied on ______.", options:["A. Foreign officials only","B. Traditional rulers","C. Military leaders","D. Elected leaders"], answer:"B", exp:"Indirect rule depended on traditional rulers to administer colonial territories on behalf of colonial powers." },
  { year:"2025", q:"The process of direct political and economic domination of one country by another is called ______.", options:["A. Imperialism","B. Nationalism","C. Colonialism","D. Territorialism"], answer:"C", exp:"Colonialism is the direct political and economic control and exploitation of one country by another." },
  { year:"2025", q:"Europeans needed African markets during colonialism because ______.", options:["A. European buyers were stingy","B. Africans had more money","C. European market was not profitable","D. Manufacturers engaged in excess production"], answer:"D", exp:"The Industrial Revolution caused excess production in Europe, making African markets essential outlets." },
  { year:"2025", q:"Resistance to colonial invasion in Africa can best be described as ______.", options:["A. Violent and aggressive","B. Violent and non-violent","C. Violent and combative","D. Violent, non-violent and complex"], answer:"D", exp:"African resistance took diverse forms — armed uprisings, passive resistance, legal challenges — making it complex." },
  { year:"2025", q:"One negative effect of the British colonial policy of excluding educated elites was that it ______.", options:["A. Increased traditional rulers' power","B. Led to constant violence","C. Slowed constitutional and economic development","D. Encouraged political participation"], answer:"C", exp:"Excluding educated elites from governance slowed modernization and constitutional development in the colonies." },
  { year:"2025", q:"The major strategy of African response to European colonization was ______.", options:["A. Political parties","B. Resistance","C. Mass media","D. Conquests"], answer:"B", exp:"The primary African response to colonization was resistance, both armed and non-violent." },
  { year:"2025", q:"One of the most probable reasons for the colonization of Africa by Europe was ______.", options:["A. Political","B. Cultural","C. Economic","D. Religious"], answer:"C", exp:"Economic motives — raw materials and new markets — were the primary drivers of European colonization." },
  { year:"2025", q:"African societies where Europeans were forcibly settled at the expense of the inhabitants is called ______.", options:["A. Surrogate colony","B. Exploitation colony","C. Plantation colony","D. Settler colony"], answer:"D", exp:"Colonies where Europeans permanently settled displacing indigenous peoples are called settler colonies." },
  { year:"2025", q:"The European's scramble and partitioning of Africa was concluded at the ______.", options:["A. London conference","B. Berlin conference","C. Vienna conference","D. Versailles conference"], answer:"B", exp:"The Berlin Conference of 1884-85 formalized the Scramble for Africa among European powers." },
  { year:"2025", q:"As at 1914, the two countries that were not under European colonial control were ______.", options:["A. Tunisia and Algeria","B. Kenya and Botswana","C. Liberia and Ethiopia","D. Sudan and Zimbabwe"], answer:"C", exp:"Liberia and Ethiopia were the only African countries that remained independent throughout the colonial period." },
  { year:"2025", q:"Which of the following was NOT part of British colonial administrative divisions?", options:["A. Native administration","B. Native treasury","C. Central administration","D. Indigenat court"], answer:"D", exp:"The Indigenat court was a French colonial institution, not a British one." },
  { year:"2025", q:"The Apartheid official policy was introduced in South Africa in ______.", options:["A. 1942","B. 1944","C. 1946","D. 1948"], answer:"D", exp:"Apartheid was officially introduced in 1948 when the National Party won power in South Africa." },
  { year:"2025", q:"The 1970 abolition of non-white political representation in Apartheid South Africa implies that blacks ______.", options:["A. Are to vacate all the lands in South Africa","B. No longer have citizenship status like the whites","C. Are free to rule themselves","D. Are as free as the Whites in their separate lands"], answer:"B", exp:"The 1970 legislation stripped Black South Africans of their citizenship and political rights." },
  { year:"2025", q:"The Portuguese arrived in Africa in the ______.", options:["A. 13th Century","B. 14th Century","C. 15th Century","D. 16th Century"], answer:"C", exp:"The Portuguese reached the African coast in the 15th century during the Age of Exploration." },
],

africa_pre: [
  { year:"2025", q:"Pre-colonial African political systems were mostly ______.", options:["A. Democratic","B. Diverse","C. Centralized only","D. Military"], answer:"B", exp:"Pre-colonial African political systems were diverse, ranging from centralized kingdoms to decentralized stateless societies." },
  { year:"2025", q:"Which of the following traditional political systems was decentralized?", options:["A. Igbo","B. Kanem-Bornu","C. Hausa-Fulani","D. Yoruba"], answer:"A", exp:"The Igbo system was decentralized with no central authority; decisions were made through village assemblies." },
  { year:"2025", q:"The Hausa society in pre-colonial West Africa was an example of a ______ society.", options:["A. Decentralized","B. Centralized","C. Militarized","D. Federalized"], answer:"B", exp:"The Hausa states had centralized political systems with power concentrated in the Emir." },
  { year:"2025", q:"Some pre-colonial Nigerian societies are described as stateless because ______.", options:["A. They had no formal governmental institution","B. They had no formal political boundaries","C. Their population was small","D. They were not dependent"], answer:"A", exp:"Stateless societies lacked formal governmental institutions; authority was diffused through kinship and community structures." },
  { year:"2025", q:"The action group was the product of ______.", options:["A. Egbe Omo Oduduwa","B. Yoruba elite club","C. Yoruba youth movement","D. Egbe Omo Yoruba"], answer:"A", exp:"The Action Group grew out of Egbe Omo Oduduwa, a Yoruba cultural and political organization." },
  { year:"2025", q:"The official in charge of the emirate police in the pre-colonial Hausa/Fulani political administration was the ______.", options:["A. Dogari","B. Waziri","C. Maaji","D. Gaaladima"], answer:"A", exp:"The Dogari served as the official police force under the Emir in the Hausa-Fulani emirate administration." },
  { year:"2025", q:"The judicial administration of Hausa-Fulani was based on the Islamic legal system called ______.", options:["A. Islamiyyat","B. Jihad","C. Sharia","D. Caliphate"], answer:"C", exp:"The Hausa-Fulani judicial system was based on Sharia (Islamic law) administered through the emirate structure." },
  { year:"2025", q:"The emirate system in the administration of the Hausa/Fulani society was ______.", options:["A. Democratic","B. Stoical","C. Hierarchical","D. Secular"], answer:"C", exp:"The emirate system was strictly hierarchical with the Emir at the apex and various ranked officials below." },
  { year:"2025", q:"Why is the Igbo political system described as fragmented?", options:["A. The political system depends on the village as a political unit","B. The system deals mainly with civil cases","C. It was a war-ridden society","D. Political authority was exercised by many institutions"], answer:"D", exp:"The Igbo system is fragmented because authority was dispersed across many institutions — age grades, village assemblies, and title holders." },
],

foreign: [
  { year:"2025", q:"The following factors enhanced Nigeria's foreign relations EXCEPT ______.", options:["A. Economic dependence","B. Non-interference","C. Peaceful co-existence","D. Respect for territoriality"], answer:"A", exp:"Economic dependence weakens foreign relations; the others are positive principles that enhance them." },
  { year:"2025", q:"A major factor which determines a country's foreign policy is ______.", options:["A. National interest","B. Leadership preference","C. World peace","D. Governance process"], answer:"A", exp:"National interest is the primary determinant of any country's foreign policy decisions." },
  { year:"2025", q:"Nigeria's relations with African countries is underscored by its policy of ______.", options:["A. Non-alignment","B. Centrism","C. Political diplomacy","D. Peaceful co-existence"], answer:"D", exp:"Peaceful co-existence and non-interference are cornerstone principles of Nigeria's Africa policy." },
  { year:"2025", q:"The foreign policy thrust of the Babangida administration was ______.", options:["A. Military might","B. Economic diplomacy","C. Military aggression","D. African generosity"], answer:"B", exp:"Economic diplomacy was the defining feature of the Babangida administration's foreign policy." },
  { year:"2025", q:"Nigeria's departure from pro-west policy during the Murtala-Mohammed regime was as a result of ______.", options:["A. The growing interest of the West in Nigeria","B. Nigeria's increased international influence","C. The growing economic interest of the West in Nigeria","D. Increased concern for decolonization in Africa"], answer:"D", exp:"Murtala Mohammed shifted from pro-Western policy due to strong commitment to African decolonization and liberation movements." },
  { year:"2025", q:"The activities of Nigeria in the international community are primarily influenced by ______.", options:["A. Diplomacy","B. Propaganda","C. National interest","D. Military power"], answer:"C", exp:"National interest is the primary driver of Nigeria's foreign policy and engagement in the international community." },
  { year:"2025", q:"Nigerians opposed the Defense Pact with Britain at independence because it ______.", options:["A. Was forced on Nigeria by the British","B. Was very ambiguous","C. Was of no benefit to Nigeria","D. Offended their pride at independence"], answer:"C", exp:"Nigerians rejected the Defense Pact as it was seen as offering no real benefit while compromising Nigeria's sovereignty." },
  { year:"2025", q:"Non-alignment in foreign policy means ______.", options:["A. Joining alliances","B. Neutrality between power blocs","C. Military dominance","D. Economic isolation"], answer:"B", exp:"Non-alignment is a policy where a country avoids siding with any major power bloc, maintaining independence." },
],

party_dev: [
  { year:"2025", q:"Early political parties in Nigeria were largely ______.", options:["A. National","B. Regional","C. Military","D. Religious"], answer:"B", exp:"Early Nigerian political parties were regionally based, reflecting ethnic and regional divisions in the country." },
  { year:"2025", q:"The Nigerian National Democratic Party (NNDP) was established by ______.", options:["A. Herbert Macaulay","B. Tafawa Balewa","C. Nnamdi Azikiwe","D. Obafemi Awolowo"], answer:"A", exp:"Herbert Macaulay founded the NNDP in 1923, making it Nigeria's first modern political party." },
  { year:"2025", q:"The Action Group was the product of ______.", options:["A. Egbe Omo Oduduwa","B. Yoruba elite club","C. Yoruba youth movement","D. Egbe Omo Yoruba"], answer:"A", exp:"The Action Group grew out of Egbe Omo Oduduwa, a Yoruba cultural organization founded by Obafemi Awolowo." },
  { year:"2025", q:"One of these political parties did NOT contest the 1979 General Elections in Nigeria ______.", options:["A. UPN","B. GNPP","C. PRP","D. NAP"], answer:"D", exp:"The NAP (Nigerian Advance Party) was not among the five parties that contested the 1979 elections." },
  { year:"2025", q:"The three political parties registered by INEC to contest the 1999 elections were ______.", options:["A. PDP, ANPP, APC","B. APP, PDP, AD","C. PDP, ANPP, AD","D. PDP, CAN, AD"], answer:"C", exp:"INEC registered PDP, APP (later ANPP), and AD for the 1999 general elections." },
  { year:"2025", q:"The two main figures at the center of the Action Group crisis were ______.", options:["A. Chief Obafemi Awolowo and Nnamdi Azikiwe","B. Chief Obafemi Awolowo and Chief S.L. Akintola","C. Chief Obafemi Awolowo and Sir Ahmadu Bello","D. Chief Obafemi Awolowo and Alhaji Ibrahim Babangida"], answer:"B", exp:"The Action Group crisis of 1962 was driven by the clash between Chief Obafemi Awolowo and his deputy Chief S.L. Akintola." },
  { year:"2025", q:"Which of the following is NOT a function of the Colonial Governor?", options:["A. Appointment of public officers","B. Law making","C. Prerogative of mercy","D. Appointment of secretary of colonies"], answer:"D", exp:"The appointment of secretary of colonies was a metropolitan function carried out in London, not by the colonial governor." },
],

electoral_ng: [
  { year:"2025", q:"The conduct of free and fair elections in Nigeria is the responsibility of ______.", options:["A. Supreme Court","B. National Assembly","C. INEC","D. Police"], answer:"C", exp:"INEC (Independent National Electoral Commission) is constitutionally mandated to organize Nigeria's elections." },
  { year:"2025", q:"The election management body in Nigeria's Fourth Republic is ______.", options:["A. Independent Nigeria Electoral Commission","B. Independent National Electoral Commission","C. National Electoral Commission","D. Federal Electoral Commission"], answer:"B", exp:"INEC manages elections in Nigeria's Fourth Republic, established under the 1999 Constitution." },
  { year:"2025", q:"The major cause of the 1993 General Election Crisis in Nigeria was the ______.", options:["A. Annulment of the June 12 elections","B. Introduction of two-party system for the first time in Nigeria","C. Refusal of the winner of the election to let go his mandate","D. Death of Chief M.K.O Abiola"], answer:"A", exp:"The annulment of the June 12, 1993 presidential election by General Babangida triggered Nigeria's gravest political crisis." },
  { year:"2025", q:"The option A4 model was used in the conduct of the ______.", options:["A. 1983 elections","B. 1993 elections","C. 1999 elections","D. 2007 elections"], answer:"B", exp:"The Option A4 open ballot system was introduced by the Babangida regime for the 1993 elections." },
  { year:"2025", q:"The history of elections in Nigeria started in ______.", options:["A. 1914","B. 1923","C. 1953","D. 1960"], answer:"B", exp:"Nigeria's electoral history began in 1923 when the Clifford Constitution introduced the elective principle." },
  { year:"2025", q:"The manipulation of electoral constituencies in order to win more seats is called ______.", options:["A. Autonomization","B. Rigging","C. Gerrymandering","D. Delimitation"], answer:"C", exp:"Gerrymandering is the deliberate manipulation of constituency boundaries to give a party an electoral advantage." },
  { year:"2025", q:"Electoral College has been criticised because it ______.", options:["A. Is very expensive","B. Creates more seats in the legislature","C. Sometimes negates the wishes of the electorate","D. Makes the legislature too responsive"], answer:"C", exp:"The Electoral College is criticized because a candidate can win without the popular vote, thus negating the will of the majority." },
  { year:"2025", q:"Which electoral system is commonly used in Nigeria?", options:["A. Proportional representation","B. Simple majority","C. Referendum","D. Indirect voting"], answer:"B", exp:"Nigeria primarily uses the simple majority (first-past-the-post) system in its elections." },
],

crisis: [
  { year:"2025", q:"Which of the following contributed to the Nigerian Civil War?", options:["A. Unity","B. Ethnic tensions","C. Stability","D. Cooperation"], answer:"B", exp:"Ethnic tensions, political instability, and the declaration of Biafra's secession led to the Nigerian Civil War." },
  { year:"2025", q:"The 1962 political crisis in the Western Region was aggravated by the ideological differences between ______.", options:["A. Obafemi Awolowo and D.S Majekodunmi","B. D.S Majekodunmi and S.L Akintola","C. Kofo Abayomi and Samuel Akinsanya","D. S.L Akintola and Obafemi Awolowo"], answer:"D", exp:"The 1962 Western Region crisis was primarily the conflict between Chief Awolowo and Chief Akintola over control of the Action Group." },
  { year:"2025", q:"Allegations of corruption, nepotism and sectionalism could result in ______.", options:["A. Military interventions in politics","B. Low level of economic development","C. Politicization of the economy","D. National integration"], answer:"A", exp:"Corruption and nepotism are among the most cited justifications for military intervention in politics." },
  { year:"2025", q:"The major cause of the 1993 General Election Crisis in Nigeria was the ______.", options:["A. Annulment of the June 12 elections","B. Introduction of two-party system for the first time in Nigeria","C. Refusal of the winner to let go his mandate","D. Death of Chief M.K.O Abiola"], answer:"A", exp:"Babangida's annulment of the June 12 1993 election results sparked Nigeria's most serious post-independence political crisis." },
  { year:"2025", q:"Nigeria's departure from pro-west policy during the Murtala-Mohammed regime was as a result of ______.", options:["A. The growing interest of the West in Nigeria","B. Nigeria's increased international influence","C. The growing economic interest of the West","D. Increased concern for decolonization in Africa"], answer:"D", exp:"The Murtala regime's support for liberation movements in Angola and other African states marked the shift from pro-Western alignment." },
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
