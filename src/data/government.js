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
    
  nature: [
    { title: "Definition of Government", key: "Government as an institution of the state, a process, or an academic field.", body: "As an institution, it consists of the executive, legislature, and judiciary. As a process, it is the art of governing. As a field of study, it involves the systematic study of political institutions and behavior. It is essential for maintaining order, providing security, and promoting social welfare." },
    { title: "Politics and its Methods", key: "Politics is the struggle for power; studied through various analytical 'lenses'.", body: "David Easton defines it as the 'authoritative allocation of values.' Approaches include the Philosophical (ideal states), Institutional (formal laws), and Behavioral (scientific study of human actions). Understanding these helps students analyze how decisions are made in society." },
    { title: "Interdisciplinary Links", key: "Government relates to Economics, Sociology, and Law.", body: "It connects to Economics through resource allocation and public policy; to Sociology through social structures and group behavior; and to Law through the legal frameworks that define state power." },
  ],
  basic_concepts: [
    { title: "Power, Authority, and Influence", key: "Power is the capacity to compel; Authority is the legal right to rule.", body: "Power can be coercive (force) or influential (persuasion). Authority is 'legitimate power,' meaning it is recognized as rightful by the citizens. Influence relies on prestige or charisma rather than legal mandates or physical force." },
    { title: "Legitimacy and Sovereignty", key: "Legitimacy is popular acceptance; Sovereignty is supreme authority.", body: "Legitimacy is vital for stability; without it, governments must rely on force. Sovereignty (internal and external) means a state has the final word on laws within its borders and is independent from foreign control. Factors like the Rule of Law and good governance boost legitimacy." },
    { title: "Political Culture and Socialization", key: "The beliefs of a society and how they are learned.", body: "Political culture is the pattern of individual attitudes and orientations toward politics. Socialization is the process (via family, schools, and media) by which these attitudes are transmitted from one generation to the next, ensuring the continuity of the political system." },
  ],
  state_structure: [
    { title: "The Modern State", key: "Defined by four elements: Population, Territory, Government, and Sovereignty.", body: "A state is a permanent political entity, while a government is a temporary administration that manages the state. Unlike a nation (which is a cultural unit), a state is a legal and political unit." },
    { title: "Federal vs Unitary Systems", key: "Federalism divides power; Unitary systems centralize it.", body: "In a Federation (like Nigeria), power is constitutionally shared between central and state governments. In a Unitary system (like Britain), all authority flows from the central government. Confederation is a loose alliance where the center is weak." },
    { title: "Separation of Powers", key: "Dividing government into Executive, Legislative, and Judicial arms.", body: "Proposed by Montesquieu to prevent tyranny. It is complemented by 'Checks and Balances,' where each arm monitors the others (e.g., the President's power to veto laws or the Judiciary’s power of Judicial Review)." },
  ],
  constitution: [
    { title: "Constitutionalism", key: "The principle that government power is limited by law.", body: "It ensures that those who govern do not have absolute power and must act according to the constitution. It is the foundation of the Rule of Law and the protection of individual liberties." },
    { title: "Types of Constitutions", key: "Written vs Unwritten; Rigid vs Flexible.", body: "A Written constitution is a single document (Nigeria); Unwritten relies on statutes and conventions (UK). Rigid constitutions require special, difficult procedures to amend, whereas Flexible ones can be changed like ordinary laws." },
  ],
  governance: [
    { title: "Rule of Law", key: "The supremacy of law over all individuals and the government.", body: "Coined by A.V. Dicey, it consists of three pillars: Supremacy of the Law, Equality before the law, and the protection of Fundamental Human Rights. It fails when there is executive lawlessness or a corrupt judiciary." },
    { title: "Citizenship and Rights", key: "The legal status of a person in a state and their protected liberties.", body: "Citizenship can be acquired by birth, registration, or naturalization. Duties of a citizen include paying taxes and voting. Rights are entitlements guaranteed by the constitution, such as freedom of speech and assembly." },
  ],
  political_ideas: [
    { title: "Political Ideologies", key: "Blueprints for social and economic organization.", body: "Includes Capitalism (private ownership), Socialism (public ownership), and Communism (stateless/classless society). Other ideas include Fascism (extreme nationalism) and Totalitarianism (absolute state control)." },
    { title: "Social Contract Theory", key: "Philosophical explanations for why people form governments.", body: "Thomas Hobbes argued for an absolute ruler to escape a 'nasty/brutish' state of nature. John Locke focused on protecting 'Life, Liberty, and Property.' Rousseau emphasized the 'General Will' of the people." },
  ],
  parties_groups: [
    { title: "Political Parties", key: "Groups seeking to control government through elections.", body: "Functions include interest aggregation, political education, and recruitment of leaders. Party systems can be one-party, two-party, or multi-party (like Nigeria)." },
    { title: "Pressure Groups", key: "Groups seeking to influence policy without taking office.", body: "Also called interest groups. They use lobbying, strikes, and petitions. Unlike parties, they focus on specific interests (e.g., ASUU for lecturers, NLC for workers)." },
  ],
  opinion_propaganda: [
    { title: "Public Opinion", key: "The collective beliefs of people on public issues.", body: "It is measured through polls and media feedback. It guides the government in making decisions. Factors like mass media, peer groups, and education influence public opinion." },
    { title: "Propaganda", key: "Information used to promote a particular political cause or point of view.", body: "It can be used by governments to mobilize support or by opposition groups to criticize policies. Common techniques include name-calling, 'plain folks' appeal, and bandwagon effects." },
  ],
  elections: [
    { title: "Electoral Systems", key: "The rules governing how votes translate into seats.", body: "The 'First-Past-The-Post' (Simple Majority) system awards victory to the candidate with the most votes. 'Proportional Representation' ensures parties get seats based on their total percentage of the national vote." },
    { title: "Free and Fair Elections", key: "The standards for a credible democratic transition.", body: "Requires an independent electoral commission (INEC), secret ballots, regular intervals for voting, and an environment free from violence or intimidation. Rigging and thuggery are major obstacles in developing nations." },
  ],
  social_change: [
    { title: "Political and Social Change", key: "How societies evolve through reform or revolution.", body: "Change can be gradual (evolutionary) or sudden (revolutionary). Factors include technological advancement, economic shifts, and social movements. It often leads to the modernization of political structures." },
  ],
  public_admin: [
    { title: "The Civil Service", key: "The administrative arm of the executive.", body: "Characterized by permanence, neutrality, anonymity, and meritocracy. Civil servants implement government policies. Issues like 'red tape' (bureaucracy) and corruption can hinder their efficiency." },
    { title: "Public Corporations", key: "Government-owned enterprises providing essential services.", body: "Examples include water boards or electricity companies. They are created to provide services that the private sector might find unprofitable, though many are being privatized due to inefficiency." },
  ],
  intl_relations: [
    { title: "Foreign Policy", key: "A state’s strategy in dealing with other nations.", body: "Determined by national interest, geographical location, and economic strength. It involves diplomacy, treaties, and participation in international organizations." },
    { title: "International Organizations", key: "Bodies like the UN, AU, and ECOWAS.", body: "The United Nations (UN) focuses on global peace; the African Union (AU) handles continental issues; ECOWAS promotes regional economic integration in West Africa." },
  ],
  pre_colonial: [
    { title: "Pre-Colonial Systems in Nigeria", key: "Hausa/Fulani, Yoruba, and Igbo systems.", body: "The Hausa/Fulani used a highly centralized Emirate system (Caliphate). The Yoruba had a constitutional monarchy with checks and balances (Oyo Empire). The Igbo used a decentralized, acephalous (stateless) system based on village assemblies and title societies." },
  ],
  colonial_admin: [
    { title: "British Colonial Policy", key: "Indirect Rule and the search for efficiency.", body: "Lord Lugard used Indirect Rule to govern through traditional rulers. It was successful in the North but failed in the East (Igbo land) due to the absence of centralized chiefs, leading to the Warrant Chief system and subsequent riots like the Aba Women's Riot." },
  ],
  party_dev: [
    { title: "Political Party History in Nigeria", key: "From the first republic to the present.", body: "The first parties (NNDP, NYM) were followed by regional parties like the NPC (North), NCNC (East), and AG (West). Modern parties like the PDP and APC are national in outlook but often face internal challenges regarding zoning and godfatherism." },
  ],
  electoral_process: [
    { title: "Nigerian Electoral History", key: "The evolution of INEC and voting procedures.", body: "Covers the history of electoral bodies from FEDECO to INEC. It discusses the challenges of election management in Nigeria, including logistics, voter education, and the use of technology like the Bimodal Voter Accreditation System (BVAS)." },
  ],
  political_crisis: [
    { title: "Major Political Crises", key: "Events that threatened the stability of the Nigerian state.", body: "Includes the Census Crisis of 1963, the Action Group Crisis of 1962, the 1964/65 Election Crisis, and the June 12, 1993, election annulment. These crises often paved the way for military interventions." },
  ],
  military_rule: [
    { title: "Military in Nigerian Politics", key: "Causes and consequences of coups d'état.", body: "The first coup occurred in January 1966. Reasons for intervention include corruption, tribalism, and election rigging. While the military built infrastructure, their rule was often characterized by the suspension of the constitution and human rights abuses." },
  ],
  foreign_policy: [
    { title: "Nigeria’s Foreign Policy", key: "Afrocentricism as the centerpiece.", body: "Nigeria prioritizes African interests, including decolonization, ending apartheid, and regional peacekeeping (ECOMOG). It also balances relations with world powers and international organizations like OPEC." },
  ],
  pre_invasion: [
    { title: "Africa Before Colonialism", key: "Ancient empires and diverse political systems.", body: "Africa had sophisticated systems like the Mali and Songhai empires. Societies ranged from centralized kingdoms to egalitarian communities, refuting the colonial myth that Africa had no history or government before the Europeans arrived." },
  ],
  colonial_africa: [
    { title: "Colonial Administrative Styles", key: "Indirect Rule (British) vs Assimilation (French).", body: "The British used existing structures (Indirect Rule). The French tried to turn Africans into 'Black Frenchmen' (Assimilation), later shifting to 'Association.' These styles deeply influenced the post-colonial political culture of African states." },
  ],
  west_africa_const: [
    { title: "Constitutional Milestones", key: "The path to independence in West Africa.", body: "Traces the development from early legislative councils to full self-government. Focuses on key figures like Kwame Nkrumah (Ghana) and Nnamdi Azikiwe (Nigeria) and the legal documents that shaped their nations." },
  ],
  nationalist_move: [
    { title: "Nationalism in West Africa", key: "The struggle for self-determination.", body: "Driven by factors like the return of WWII veterans, Western education, and the influence of Pan-Africanism. Nationalists used newspapers, strikes, and political parties to demand an end to colonial rule." },
  ],
  military_africa: [
    { title: "Military Rule Across Africa", key: "A continental trend of political instability.", body: "Many African nations experienced 'contagion coups' after independence. The military often presented themselves as 'corrective regimes' but struggled with the transition back to democracy and the management of diverse ethnic interests." },
  ],
  democratization: [
    { title: "Democratic Transitions", key: "The move toward multi-party democracy in the 1990s.", body: "Following the end of the Cold War, many African states shifted from one-party or military rule to democracy. This 'Third Wave' of democratization remains a work in progress, facing challenges like election malpractice and 'third-term' bids by leaders." },
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
