export const courses = [
    { id: "ecn001", code: "ECN001", title: "Principles of Economics I", semester: "First Semester", emoji: "📘",
      topics: [
        { id: "intro", label: "Introduction to Economics" },
        { id: "basic", label: "Basic Economic Principles" },
        { id: "tools", label: "Tools & Methods of Analysis" },
        { id: "price", label: "The Price System" },
        { id: "consumer", label: "Theory of Consumer Behaviour" },
        { id: "firm", label: "Theory of the Firm" },
        { id: "market", label: "Market Structure" },
        { id: "income_dist", label: "Theory of Income Distribution" },
        { id: "govt", label: "Government Intervention" },
      ],
    },
    { id: "ecn002", code: "ECN002", title: "Principles of Economics II", semester: "First Semester", emoji: "📗",
      topics: [
        { id: "circular", label: "Circular Flow of Income" },
        { id: "national_acc", label: "National Income Accounting" },
        { id: "national_det", label: "Theory of National Income Determination" },
        { id: "money", label: "Money and Banking" },
        { id: "inflation", label: "Inflation and Unemployment" },
        { id: "public", label: "Public Finance" },
      ],
    },
    { id: "ecn003", code: "ECN003", title: "Applied Economics I", semester: "Second Semester", emoji: "📙",
      topics: [
        { id: "west_africa", label: "Economic Structure of West Africa" },
        { id: "growth", label: "Growth and Development" },
        { id: "agric", label: "Agriculture and Industry" },
        { id: "intl_trade", label: "International Trade" },
      ],
    },
    { id: "ecn004", code: "ECN004", title: "Applied Economics II", semester: "Second Semester", emoji: "📕",
      topics: [
        { id: "macro_meas", label: "Measurement & Application in Macroeconomics" },
        { id: "labour", label: "Applied Issues in Labour Economics" },
        { id: "stabilize", label: "Stabilization Policies in Developing Countries" },
        { id: "intl_inst", label: "International Economic Institutions" },
      ],
    },
  ];
  
  export const notes = {
    intro: [
      { title: "Definition of Economics", key: "Lionel Robbins' definition (most accepted): 'Economics is the science which studies human behaviour as a relationship between ends and scarce means which have alternative uses.'", body: "Other definitions: Adam Smith — 'Science of wealth.' Alfred Marshall — 'Study of mankind in the ordinary business of life.' Economics is a SOCIAL science — it studies human behaviour and social interactions, unlike natural sciences (physics, chemistry) which study the physical world." },
      { title: "Micro vs Macroeconomics", key: "Microeconomics = individual units. Macroeconomics = the whole economy.", body: "Microeconomic variables: price of garri, wage of a single worker, output of one factory. Macroeconomic variables: national GDP, inflation rate, total unemployment, money supply. Both are needed to understand the full picture of an economy like Nigeria." },
      { title: "Nature of Economic Problems", key: "Every economy must answer: WHAT to produce? HOW to produce? FOR WHOM to produce?", body: "These questions arise because of scarcity — unlimited wants vs limited resources. Every household, firm, and government faces these questions daily. The answers depend on the type of economic system in place." },
      { title: "Positive vs Normative Statements", key: "Positive = factual, testable (what IS). Normative = opinion, value judgement (what SHOULD BE).", body: "Example positive: 'Nigeria's inflation is 28%.' Example normative: 'The government should reduce inflation.' Economists try to make positive statements, but policy recommendations are often normative. Examiners love asking you to identify which type a statement is." },
    ],
    basic: [
      { title: "Scarcity & Opportunity Cost", key: "Opportunity cost = the value of the NEXT BEST alternative forgone when a choice is made.", body: "Scarcity means resources (land, labour, capital) are limited while wants are unlimited — forcing choices. Example: If Nigeria uses ₦10 billion to build roads instead of schools, the opportunity cost is the education lost. Applies to individuals, firms, and governments equally." },
      { title: "Production Possibility Curve (PPC)", key: "ON the curve = efficiency. INSIDE = inefficiency. OUTSIDE = unattainable. Shifts OUTWARD with technology or new resources.", body: "The PPC is concave (bowed outward) due to increasing opportunity costs — resources are not equally suited to all uses. JUPEB examiners frequently ask about shifts and what points on/inside/outside the curve represent." },
      { title: "Economic Systems", key: "Market economy = price mechanism. Planned = government controls. Mixed = both (Nigeria). Traditional = customs.", body: "Nigeria is a MIXED economy — NNPC (government), private firms (Dangote, banks) and market prices all coexist. Understanding these systems and their advantages/disadvantages is a common JUPEB essay question." },
      { title: "Factors of Production", key: "Land → Rent. Labour → Wages. Capital → Interest. Enterprise → Profit.", body: "Division of Labour: breaking production into specialised tasks. Advantages: higher productivity, skill development, time saving. Disadvantage: monotony, worker becomes dependent on one task. Adam Smith illustrated this with the pin factory example." },
    ],
    tools: [
      { title: "Functional Relationships", key: "Qd = f(P) means quantity demanded is a function of price. Can be written algebraically or shown as a graph.", body: "Endogenous variables: determined WITHIN the model (e.g. price, quantity). Exogenous variables: determined OUTSIDE the model (e.g. government policy, weather, technology). Economists use models to simplify reality and isolate relationships between variables." },
      { title: "Methods of Economic Analysis", key: "Inductive = specific observations to general conclusions. Deductive = general theory to specific predictions.", body: "Statistical data sources in Nigeria: National Bureau of Statistics (NBS), CBN Annual Reports, World Bank data. Advantages of mathematical tools: precision, testability. Limitations: oversimplification, ignores human behaviour complexities." },
    ],
    price: [
      { title: "Law of Demand", key: "Ceteris paribus: as price rises, quantity demanded falls (inverse relationship). Exceptions: Giffen goods, Veblen goods, speculation.", body: "Movement ALONG the curve = price change. SHIFT of the curve = change in any other determinant (income, taste, related goods prices, population, expectations). Rightward shift = increase in demand. Leftward shift = decrease in demand." },
      { title: "Elasticity of Demand", key: "PED = % change in Qd divided by % change in P. Greater than 1 is elastic, less than 1 is inelastic, equal to 1 is unit elastic.", body: "YED (income elasticity): positive = normal good, negative = inferior good, greater than 1 = luxury. XED (cross elasticity): positive = substitutes (Pepsi/Coke), negative = complements (car/fuel). Factors affecting PED: substitutes available, necessity vs luxury, proportion of income, time period, habit." },
      { title: "Supply & Equilibrium", key: "Law of Supply: ceteris paribus, as price rises, quantity supplied rises (direct relationship).", body: "Supply shifters: production costs, technology, subsidies, taxes, weather, number of firms. Equilibrium: Qd = Qs. Price ceiling BELOW equilibrium causes shortage. Price floor ABOVE equilibrium causes surplus. Government also intervenes via taxes, subsidies, and direct provision." },
    ],
    consumer: [
      { title: "Utility Theory (Cardinal)", key: "TU is maximised when MU = 0. Consumer equilibrium: MUx/Px = MUy/Py (equi-marginal principle).", body: "Law of Diminishing Marginal Utility: as more units are consumed, additional satisfaction (MU) eventually falls. Limitation: utility cannot be precisely measured; assumes rational behaviour; ignores interdependence of goods." },
      { title: "Indifference Curves (Ordinal)", key: "IC is convex to origin due to diminishing MRS. Consumer equilibrium: highest IC tangent to budget line. MRS = Px/Py.", body: "Properties of ICs: (1) Downward sloping (2) Convex to origin (3) Higher = more satisfaction (4) Never cross. Budget line shifts outward with income rise. Rotates with price change of one good. Income effect + substitution effect explain consumer response to price change." },
    ],
    firm: [
      { title: "Production & Costs", key: "Short run: one factor fixed. Law of diminishing returns applies. MC cuts AVC and ATC at their minimum points.", body: "TP, AP (=TP/L), MP (=change in TP / change in L). When MP > AP: AP rises. When MP = AP: AP at max. When MP < AP: AP falls. Fixed costs (rent, insurance) unchanged with output. Variable costs (raw materials, labour) change with output. TC = FC + VC." },
      { title: "Long Run & Revenue", key: "Economies of scale: LRAC falls as output rises. Profit maximised where MC = MR.", body: "Internal economies of scale: technical, managerial, financial, risk-bearing, marketing. Diseconomies of scale: management problems, communication breakdown. Revenue: TR = P x Q. AR = TR/Q = Price. MR = change in TR / change in Q. Normal profit = minimum to keep entrepreneur in industry. Supernormal profit = TR exceeds all costs including normal profit." },
    ],
    market: [
      { title: "Perfect Competition & Monopoly", key: "Perfect competition: price taker, many firms, homogeneous product, free entry/exit. Long run: normal profit only.", body: "Monopoly: one seller, price maker, barriers to entry (patents, capital, legal). Supernormal profit in long run. Produces less, charges more than perfect competition. Price discrimination: charging different prices to different consumers. Monopoly criticised for inefficiency (P > MC)." },
      { title: "Monopolistic Competition & Oligopoly", key: "Oligopoly: few large interdependent firms. High barriers. Examples: MTN, Airtel, Glo (Nigeria telecoms).", body: "Monopolistic competition: many firms, differentiated products, free entry/exit. Short run: supernormal profit. Long run: normal profit. Oligopoly features: interdependence, price rigidity, possible collusion (cartel). Contestable markets: threat of entry keeps incumbents competitive even with few firms." },
    ],
    income_dist: [
      { title: "Labour Market", key: "Demand for labour is DERIVED demand — from demand for the final product. MRP = MR x MP.", body: "Firm hires until MRP = Wage. Supply of labour depends on: wage rate, population, non-monetary factors, hours of work. Backward-bending supply curve: at very high wages, workers prefer leisure over more work. Wage differentials: skill levels, conditions, geography, discrimination, trade union power, productivity." },
      { title: "Economic Rent & Wages", key: "Economic rent = actual earnings MINUS transfer earnings (minimum to keep factor in current use).", body: "Wages determined by demand and supply of labour in competitive market. Trade unions push wages above equilibrium — may cause unemployment. Government sets minimum wage (Nigeria's national minimum wage). Role of trade unions: collective bargaining, improving working conditions." },
    ],
    govt: [
      { title: "Market Failure & Externalities", key: "Negative externality: Social cost > Private cost, market overproduces. Positive externality: Social benefit > Private benefit, market underproduces.", body: "Social cost = Private cost + External cost. Social benefit = Private benefit + External benefit. Corrections: tax on negative externalities, subsidies for positive externalities, regulation, direct provision. Cost-benefit analysis weighs social costs against social benefits for public projects." },
      { title: "Public, Merit & Demerit Goods", key: "Public goods: non-excludable + non-rival, free rider problem, government must provide.", body: "Examples of public goods: national defence, street lighting. Merit goods (education, healthcare): underprovided by market — government subsidises. Demerit goods (cigarettes, alcohol): overprovided — government taxes or bans. Privatisation: transfer from public to private ownership — increases efficiency but risks exploitation." },
    ],
    circular: [
      { title: "Circular Flow of Income", key: "Injections: Investment (I), Government spending (G), Exports (X). Withdrawals: Savings (S), Taxes (T), Imports (M).", body: "Equilibrium condition: I + G + X = S + T + M. Money flows from households to firms (spending) and back (factor incomes). Aggregate Demand: AD = C + I + G + (X-M). Factors shifting AD: consumer confidence, interest rates, government policy, exchange rates." },
      { title: "MPC, MPS & Multiplier", key: "MPC = change in C / change in Y. MPS = 1 - MPC. Multiplier = 1/MPS. A rise in spending leads to a LARGER rise in national income.", body: "Example: MPC = 0.8, MPS = 0.2, Multiplier = 5. So 1 billion government spending leads to 5 billion rise in national income. Accelerator: investment depends on RATE OF CHANGE of income — amplifies economic cycles. Together, multiplier and accelerator cause booms and recessions." },
    ],
    national_acc: [
      { title: "National Income Concepts", key: "GDP = total output within borders. GNP = GDP + net income from abroad. NNP = GNP - depreciation.", body: "Expenditure method: GDP = C + I + G + (X-M). Income method: sum of wages, rent, interest, profit. Output method: sum of value added (avoids double counting). Problems: informal economy (huge in Nigeria), subsistence farming, data inaccuracy, excludes quality of life." },
    ],
    national_det: [
      { title: "Keynesian Theory & Gaps", key: "Inflationary gap: AD > full employment output, causes demand-pull inflation. Deflationary gap: AD < full employment, causes unemployment.", body: "Keynesian consumption function: C = a + bY. Equilibrium: AD = Y (output). Policy responses: Inflationary gap, reduce AD (raise taxes, cut spending, raise interest rates). Deflationary gap, increase AD (cut taxes, raise spending, lower interest rates). Keynes showed economy can be stuck below full employment — justifying government intervention." },
    ],
    money: [
      { title: "Money, Banking & Monetary Policy", key: "Functions of money: medium of exchange, store of value, unit of account, standard of deferred payment.", body: "Properties: durable, portable, divisible, scarce, acceptable. Quantity Theory: MV = PT. More money leads to higher prices (inflation) if V and T constant. CBN tools: MPR (benchmark rate), CRR (cash reserve ratio), Open Market Operations. Expansionary policy: cut MPR leads to more spending. Contractionary: raise MPR leads to less spending and reduces inflation." },
    ],
    inflation: [
      { title: "Inflation & Unemployment", key: "Demand-pull: too much money chasing too few goods. Cost-push: rising production costs. Phillips Curve: inverse relationship between inflation and unemployment.", body: "Stagflation (simultaneous inflation + unemployment) breaks the Phillips Curve relationship. Nigeria's inflation: driven by fuel prices, exchange rate depreciation, food supply shocks. Types of unemployment: frictional (between jobs), structural (skills mismatch), cyclical (low AD), seasonal. Nigeria: youth unemployment is a major structural problem." },
    ],
    public: [
      { title: "Public Finance", key: "Direct taxes: income tax, company tax. Indirect taxes: VAT, customs duties. Progressive tax: rate rises with income.", body: "Canons of taxation (Adam Smith): Equity, Certainty, Convenience, Economy. Budget deficit (most common in Nigeria): government spends more than it earns — financed by borrowing. Wagner's Law: government spending rises as economy develops. Revenue allocation in Nigeria: RMAFC formula distributes oil revenue between federal, state, and local governments." },
    ],
    west_africa: [
      { title: "Economic Structure of West Africa", key: "Primary sector: agriculture, mining. Secondary: manufacturing (underdeveloped). Tertiary: services (growing).", body: "Nigeria: oil dominates exports and government revenue. Agriculture employs about 35% of workforce but GDP share has fallen. Cash crops: cocoa (SW), groundnuts (N), palm oil (S), cotton (N). Problems: low technology, land tenure issues, poor infrastructure, rural-urban migration. Other West African economies: Ghana (cocoa, gold), Cote d'Ivoire (cocoa)." },
    ],
    growth: [
      { title: "Growth, Development & Population", key: "Growth = rising real GDP (quantitative). Development = improved quality of life, reduced poverty, structural change (qualitative).", body: "HDI measures: life expectancy, education, GNI per capita. Gini coefficient measures inequality (0 = perfect equality, 1 = perfect inequality). Nigeria: lower-middle income, large population around 220 million, rapid growth rate around 2.5% per annum strains resources. HIV/AIDS reduces labour force productivity. Women's empowerment significantly boosts economic growth." },
    ],
    agric: [
      { title: "Industrialisation in West Africa", key: "Import Substitution Industrialisation (ISI): produce domestically what was previously imported.", body: "Nigeria tried ISI in 1970s-80s (vehicle assembly, textiles) — largely failed due to inefficiency and import-dependent inputs. Asia succeeded through export-led growth. Nigeria's industrial challenges: poor power supply, weak infrastructure, competition from cheap imports, limited capital. Current policy: diversification away from oil dependence." },
    ],
    intl_trade: [
      { title: "International Trade Theory", key: "Absolute advantage (Adam Smith): export where you produce most efficiently. Comparative advantage (Ricardo): specialise where opportunity cost is LOWEST.", body: "Protectionism methods: tariff (import tax), quota (quantity limit), embargo (ban), subsidies. Arguments for protection: infant industry, employment, strategic industries. Arguments against: inefficiency, retaliation, higher consumer prices. Balance of Payments: Current account (goods, services, income), Capital account, Financial account. Favourable BOP: exports > imports." },
    ],
    macro_meas: [
      { title: "Macroeconomic Measurement", key: "PPP (Purchasing Power Parity) adjusts GDP for price differences between countries — fairer comparison of living standards.", body: "Keynesian view: AD determines output; fiscal policy most effective. Monetarist view: money supply is key; monetary policy most effective. Supply-side: improve productive capacity (education, deregulation, infrastructure). AE = C + I + G + (X-M). Inflationary gap: AE > Yf. Deflationary gap: AE < Yf. Yf = full employment income." },
    ],
    labour: [
      { title: "Labour Economics in Nigeria", key: "Nigeria unemployment rate: 33% and above (NBS). Youth unemployment is especially severe — skills mismatch with available jobs.", body: "Underemployment: working fewer hours than desired OR in jobs below qualification level. Labour productivity low due to: poor education, poor health, inadequate capital, poor infrastructure. Solutions: diversify economy, invest in education and skills, support SMEs (Bank of Industry), improve ease of doing business." },
    ],
    stabilize: [
      { title: "Stabilization Policies", key: "Four macroeconomic objectives: growth, low inflation, low unemployment, BOP equilibrium. Fiscal + Monetary + Exchange rate + Supply-side policies.", body: "Fiscal (expansionary): cut taxes or raise spending boosts AD. Fiscal (contractionary): raise taxes or cut spending reduces inflation. Monetary (expansionary): cut MPR makes borrowing cheaper. Monetary (contractionary): raise MPR reduces money supply and fights inflation. Conflicts: reducing inflation may increase unemployment (Phillips Curve trade-off). Application to Nigeria: oil revenue dependence, subsidy spending, high debt servicing." },
    ],
    intl_inst: [
      { title: "International Economic Institutions", key: "ECOWAS: West African regional integration. OPEC: oil cartel (Nigeria is member). IMF: short-term BOP support. World Bank: long-term development finance.", body: "ADB: African Development Bank — funds African development projects. Globalisation: integration of world economies through trade, investment, movement of people. FDI (Foreign Direct Investment): productive assets investment — provides capital, jobs, technology. Portfolio investment: financial assets — more volatile. Economic integration stages: Free Trade Area, Customs Union, Common Market, Economic Union, Monetary Union." },
    ],
  };
  
  export const questions = {
    intro: [
      { year: "2023", q: "Which economist defined economics as 'the science which studies human behaviour as a relationship between ends and scarce means which have alternative uses'?", options: ["A. Adam Smith", "B. Alfred Marshall", "C. Lionel Robbins", "D. John Maynard Keynes"], answer: "C", exp: "Lionel Robbins gave this famous scarcity-based definition in his 1932 essay. It is the most widely accepted modern definition of economics." },
      { year: "2023", q: "Which of the following is a POSITIVE economic statement?", options: ["A. The government should reduce poverty", "B. Income should be equally distributed", "C. A rise in price leads to a fall in quantity demanded", "D. Nigeria should produce more food"], answer: "C", exp: "Positive statements are factual and testable (what IS). Options A, B, and D are normative — they express value judgements about what SHOULD be." },
      { year: "2022", q: "The basic economic problem arises because:", options: ["A. Governments fail to plan properly", "B. Human wants are unlimited while resources are scarce", "C. Technology is insufficient", "D. People are greedy"], answer: "B", exp: "Scarcity — the gap between unlimited wants and limited resources — is the fundamental economic problem that forces all economies to make choices." },
      { year: "2021", q: "Which of the following is a MACROECONOMIC variable?", options: ["A. The price of garri in Kano market", "B. The output of a Dangote cement factory", "C. The national unemployment rate", "D. The wage of a teacher in Lagos"], answer: "C", exp: "National unemployment rate is an aggregate variable covering the entire economy. The other options are microeconomic (individual prices, outputs, wages)." },
    ],
    basic: [
      { year: "2023", q: "Opportunity cost is BEST defined as:", options: ["A. The total money spent on a good", "B. The value of the next best alternative forgone", "C. The profit lost by a firm", "D. The cost of producing one more unit"], answer: "B", exp: "Opportunity cost is not about money — it is the value of the best alternative you sacrificed when making a choice. It applies to all economic agents." },
      { year: "2023", q: "A point INSIDE the Production Possibility Curve (PPC) represents:", options: ["A. Full employment of resources", "B. An unattainable level of output", "C. Productive inefficiency", "D. Technological advancement"], answer: "C", exp: "Inside the PPC means resources are not fully utilised — some are idle or misallocated. This is productive inefficiency. Points on the curve represent efficiency." },
      { year: "2022", q: "The PPC shifts OUTWARD when there is:", options: ["A. A rise in consumer demand", "B. Technological advancement", "C. A fall in the price level", "D. Increased government spending"], answer: "B", exp: "The PPC shifts outward when the economy's productive capacity increases — through better technology, discovery of new resources, or improvement in education and skills." },
      { year: "2022", q: "In a mixed economy like Nigeria:", options: ["A. Only private firms produce goods", "B. The government controls all resources", "C. Both government and private sector allocate resources", "D. Resources are allocated by tradition and custom"], answer: "C", exp: "Nigeria is a mixed economy — the private sector operates freely in most markets while the government controls key sectors (e.g. NNPC, infrastructure) and provides public goods." },
      { year: "2021", q: "The reward for LAND as a factor of production is:", options: ["A. Wages", "B. Interest", "C. Profit", "D. Rent"], answer: "D", exp: "The four factors and their rewards: Land = Rent, Labour = Wages, Capital = Interest, Enterprise = Profit." },
    ],
    price: [
      { year: "2023", q: "A rise in the price of Pepsi leads to an increase in demand for Coca-Cola. This is because they are:", options: ["A. Complementary goods", "B. Substitute goods", "C. Inferior goods", "D. Public goods"], answer: "B", exp: "Substitute goods compete with each other. When the price of one rises, consumers switch to the cheaper alternative, increasing demand for the substitute." },
      { year: "2023", q: "If PED = 0.3, demand is:", options: ["A. Elastic", "B. Unit elastic", "C. Inelastic", "D. Perfectly elastic"], answer: "C", exp: "PED less than 1 means inelastic demand — quantity demanded is not very responsive to price change. Common for necessities like salt, fuel, and medicine." },
      { year: "2022", q: "A price CEILING set below equilibrium will cause:", options: ["A. A surplus of the good", "B. A shortage of the good", "C. No change in quantity demanded", "D. An increase in supply"], answer: "B", exp: "Price ceiling (maximum price) set below equilibrium keeps price too low — quantity demanded exceeds quantity supplied — causing a shortage. Example: rent control." },
      { year: "2022", q: "Which of the following will shift the demand curve for beef to the RIGHT?", options: ["A. A fall in the price of beef", "B. A rise in consumer income (beef is a normal good)", "C. A fall in population", "D. A rise in the price of a complementary good"], answer: "B", exp: "Rising income increases demand for normal goods — shifting the curve right. A price change causes movement ALONG the curve, not a shift of it." },
      { year: "2021", q: "The demand for tractors by Nigerian farmers is an example of:", options: ["A. Joint demand", "B. Composite demand", "C. Derived demand", "D. Effective demand"], answer: "C", exp: "Demand for tractors is derived from demand for agricultural products. Factors of production are demanded because of demand for the final good they help produce." },
    ],
    consumer: [
      { year: "2023", q: "When Total Utility is at its maximum, Marginal Utility is:", options: ["A. Rising", "B. Equal to average utility", "C. Negative", "D. Zero"], answer: "D", exp: "Total utility is maximised at the point where consuming one more unit adds nothing — MU = 0. Beyond this, MU becomes negative and TU falls." },
      { year: "2022", q: "An indifference curve is CONVEX to the origin because of:", options: ["A. The law of demand", "B. Diminishing marginal rate of substitution", "C. Increasing returns to scale", "D. The income effect"], answer: "B", exp: "As more of good X is consumed, the consumer gives up less and less of good Y for each additional unit of X — diminishing MRS causes the convex shape." },
      { year: "2022", q: "Consumer equilibrium using indifference curve analysis is achieved where:", options: ["A. The budget line cuts the indifference curve", "B. Total utility is at its minimum", "C. The highest attainable indifference curve is tangent to the budget line", "D. MU = price of the good"], answer: "C", exp: "The tangency point gives the highest satisfaction attainable given the consumer's budget. At this point, MRS = price ratio (Px/Py)." },
      { year: "2021", q: "The equi-marginal principle states that consumer equilibrium is achieved when:", options: ["A. MU of all goods is zero", "B. MU/P is equal for all goods consumed", "C. Total expenditure equals income", "D. The budget line shifts outward"], answer: "B", exp: "Consumer maximises utility when the MU per Naira spent is equal for all goods: MUx/Px = MUy/Py. This is the equi-marginal or equal-marginal principle." },
    ],
    firm: [
      { year: "2023", q: "The law of diminishing returns states that as more variable input is added to a fixed factor:", options: ["A. Total product falls immediately", "B. Marginal product eventually falls", "C. Fixed costs increase", "D. Average cost falls continuously"], answer: "B", exp: "Eventually adding more labour to fixed capital causes overcrowding — each extra worker adds less to output than the previous one. MP eventually falls." },
      { year: "2022", q: "When Marginal Product (MP) exceeds Average Product (AP):", options: ["A. AP is at its maximum", "B. AP is falling", "C. AP is rising", "D. TP is falling"], answer: "C", exp: "When MP > AP, each new worker is above average — pulling the average up. AP rises. AP only falls when MP < AP. MP = AP at AP's maximum." },
      { year: "2022", q: "Which of the following is a FIXED cost?", options: ["A. Cost of raw materials", "B. Workers' overtime pay", "C. Factory rent", "D. Electricity used in production"], answer: "C", exp: "Fixed costs don't change with output — factory rent is paid whether or not production occurs. Raw materials, overtime, and electricity are variable costs." },
      { year: "2021", q: "Profit maximisation occurs where:", options: ["A. TR is greatest", "B. TC is lowest", "C. MC = MR", "D. AC = AR"], answer: "C", exp: "Firms maximise profit at the output level where MC = MR. If MC < MR, increasing output adds more to revenue than cost. If MC > MR, output should be reduced." },
      { year: "2020", q: "Economies of scale lead to:", options: ["A. Rising short-run marginal cost", "B. Falling long-run average cost", "C. Increasing fixed costs", "D. Falling marginal product"], answer: "B", exp: "Economies of scale occur when increasing output reduces long-run average cost — making large-scale production more efficient than small-scale production." },
    ],
    market: [
      { year: "2023", q: "In perfect competition, a firm is a price TAKER because:", options: ["A. It sells a unique product", "B. The government controls prices", "C. It is too small relative to the market to influence price", "D. Its demand curve is downward sloping"], answer: "C", exp: "Each perfectly competitive firm is so small relative to the total market that selling more or less does not affect the market price." },
      { year: "2023", q: "Which market structure is characterised by a few large interdependent firms?", options: ["A. Perfect competition", "B. Monopoly", "C. Monopolistic competition", "D. Oligopoly"], answer: "D", exp: "Oligopoly has few large firms — each decision by one firm affects others. Examples: MTN, Airtel, Glo in Nigerian telecoms; Dangote, BUA in cement." },
      { year: "2022", q: "A monopolist can maintain supernormal profit in the long run because of:", options: ["A. Lower costs of production", "B. Barriers to entry", "C. Government subsidies", "D. Low prices charged to consumers"], answer: "B", exp: "Barriers to entry (patents, capital costs, legal protection) prevent new firms from entering and competing away the monopolist's profit." },
      { year: "2021", q: "Price discrimination refers to:", options: ["A. Charging higher prices for better quality goods", "B. Charging different prices to different consumers for the same good", "C. Setting price equal to marginal cost", "D. Pricing based on cost of production"], answer: "B", exp: "Price discrimination: selling the same good at different prices to different consumers (e.g. student discounts, peak/off-peak pricing)." },
    ],
    income_dist: [
      { year: "2023", q: "The demand for labour is described as a 'derived demand' because:", options: ["A. Labour can substitute for capital", "B. It is demanded for producing other goods and services", "C. Workers demand higher wages", "D. Labour has a fixed supply"], answer: "B", exp: "Firms don't demand labour for its own sake — they demand it to produce goods/services. This is derived demand. MRP theory underpins this." },
      { year: "2022", q: "Economic rent is defined as:", options: ["A. Payment for the use of land only", "B. The payment above a factor's transfer earnings", "C. The market wage rate", "D. Payment to capital"], answer: "B", exp: "Economic rent = actual earnings minus transfer earnings (minimum required to keep factor in current use). It is the surplus above what is necessary." },
      { year: "2021", q: "Which of the following would increase the wage rate in a competitive labour market?", options: ["A. An increase in labour supply", "B. A decrease in demand for the final product", "C. An increase in labour productivity", "D. A reduction in trade union power"], answer: "C", exp: "Higher labour productivity raises MRP (Marginal Revenue Product), shifting labour demand curve right — increasing the equilibrium wage." },
    ],
    govt: [
      { year: "2023", q: "A negative externality occurs when:", options: ["A. A firm's production benefits third parties", "B. The social cost of production exceeds private cost", "C. A consumer pays less than the true value", "D. Government subsidises a good"], answer: "B", exp: "Negative externality: production/consumption imposes costs on third parties not reflected in the market price. Social cost > private cost — market overproduces. Example: factory pollution." },
      { year: "2022", q: "Which of the following is a PUBLIC good?", options: ["A. A bottle of water", "B. A university lecture", "C. National defence", "D. A cinema ticket"], answer: "C", exp: "National defence is non-excludable and non-rival — the defining features of a public good. The free-rider problem means the market will not provide it." },
      { year: "2021", q: "Merit goods are:", options: ["A. Goods that are overconsumed by society", "B. Goods provided by the private sector for profit", "C. Goods underprovided by the market because social benefit exceeds private benefit", "D. Goods with no positive externalities"], answer: "C", exp: "Merit goods (education, healthcare) generate positive externalities — society benefits more than the individual consumer. Markets underprovide them." },
    ],
    circular: [
      { year: "2023", q: "In the circular flow of income, which of the following is an INJECTION?", options: ["A. Savings", "B. Taxation", "C. Imports", "D. Government expenditure"], answer: "D", exp: "Injections ADD money into the circular flow: Investment (I), Government expenditure (G), Exports (X). Withdrawals remove money: Savings (S), Taxes (T), Imports (M)." },
      { year: "2022", q: "Equilibrium in the circular flow requires that:", options: ["A. Exports equal imports", "B. Government spending equals taxation", "C. Total injections equal total withdrawals", "D. Consumption equals income"], answer: "C", exp: "Macroeconomic equilibrium: I + G + X = S + T + M. When total injections equal total withdrawals, national income is stable." },
      { year: "2021", q: "If MPC = 0.75, the Keynesian multiplier is:", options: ["A. 0.75", "B. 1.33", "C. 4", "D. 7.5"], answer: "C", exp: "MPS = 1 - 0.75 = 0.25. Multiplier = 1/MPS = 1/0.25 = 4. A 1 billion Naira increase in government spending increases national income by 4 billion Naira." },
    ],
    national_acc: [
      { year: "2023", q: "GNP differs from GDP in that GNP includes:", options: ["A. Government expenditure", "B. Net factor income from abroad", "C. Depreciation of capital", "D. Transfer payments"], answer: "B", exp: "GNP = GDP + net income from abroad. GDP measures production within borders; GNP measures production by the country's nationals, wherever located." },
      { year: "2022", q: "The expenditure approach to GDP is expressed as:", options: ["A. GDP = C + S + G + X", "B. GDP = W + R + I + P", "C. GDP = C + I + G + (X-M)", "D. GDP = Output - Depreciation"], answer: "C", exp: "GDP (expenditure) = Consumption + Investment + Government spending + Net exports (Exports minus Imports). This is the most commonly used formula." },
      { year: "2021", q: "Depreciation in national income accounting refers to:", options: ["A. A general fall in prices", "B. Reduction in export earnings", "C. Capital consumption — wear and tear of capital goods", "D. A rise in government debt"], answer: "C", exp: "Depreciation (capital consumption) measures the fall in value of capital goods through wear and tear. NNP = GNP - Depreciation." },
    ],
    national_det: [
      { year: "2023", q: "An inflationary gap occurs when:", options: ["A. Aggregate demand is below full employment output", "B. Aggregate demand exceeds full employment output", "C. Government spending exceeds taxation", "D. Imports exceed exports"], answer: "B", exp: "Inflationary gap: equilibrium income ABOVE full employment level — too much spending relative to productive capacity — causes demand-pull inflation." },
      { year: "2022", q: "The accelerator principle states that:", options: ["A. Investment depends on the level of national income", "B. Investment depends on the rate of change of national income", "C. Consumption depends on interest rates", "D. Savings always equal investment"], answer: "B", exp: "The accelerator: investment rises more than proportionately when national income is growing quickly. When income growth slows, investment may fall sharply." },
    ],
    money: [
      { year: "2023", q: "Which of the following is NOT a function of the Central Bank of Nigeria (CBN)?", options: ["A. Issuing currency", "B. Accepting deposits from the general public", "C. Acting as lender of last resort", "D. Implementing monetary policy"], answer: "B", exp: "The CBN is a banker's bank — it does NOT accept deposits from the public. Commercial banks (GTBank, Zenith, UBA) perform this function." },
      { year: "2022", q: "The Quantity Theory of Money (MV = PT) suggests that an increase in money supply will lead to:", options: ["A. A fall in prices", "B. A rise in real output", "C. A proportional rise in prices", "D. A fall in velocity of money"], answer: "C", exp: "Monetarists argue that if V and T are constant, increasing M causes proportional increase in P (price level) — i.e., inflation." },
      { year: "2021", q: "Money eliminates the problem of double coincidence of wants through its function as:", options: ["A. Store of value", "B. Unit of account", "C. Medium of exchange", "D. Standard of deferred payment"], answer: "C", exp: "As a medium of exchange, money replaces barter. In barter, you need someone who has what you want AND wants what you have — money eliminates this difficulty." },
    ],
    inflation: [
      { year: "2023", q: "Cost-push inflation is caused by:", options: ["A. Excessive consumer spending", "B. An increase in money supply", "C. Rising production costs passed on to consumers", "D. A fall in imports"], answer: "C", exp: "Cost-push inflation: higher input costs (wages, fuel, raw materials) raise firms' costs — passed on as higher prices. Nigeria experiences this through rising fuel and exchange rate costs." },
      { year: "2022", q: "The Phillips Curve shows the relationship between:", options: ["A. Inflation and economic growth", "B. Inflation and unemployment", "C. Unemployment and interest rates", "D. Money supply and prices"], answer: "B", exp: "The original Phillips Curve: inverse relationship between inflation and unemployment. Stagflation (1970s) challenged this relationship." },
      { year: "2021", q: "Structural unemployment arises from:", options: ["A. A general fall in aggregate demand", "B. Workers between jobs", "C. Mismatch between workers' skills and available jobs", "D. Seasonal changes in production"], answer: "C", exp: "Structural unemployment: when industrial change or technological advancement makes certain skills obsolete. A major problem in Nigeria (graduate-job mismatch)." },
    ],
    public: [
      { year: "2023", q: "Which of the following is a DIRECT tax?", options: ["A. Value Added Tax (VAT)", "B. Excise duty", "C. Import tariff", "D. Personal income tax"], answer: "D", exp: "Direct taxes are paid directly to the government by the individual (income tax, company tax). Indirect taxes (VAT, excise duty, tariffs) are collected by an intermediary (seller)." },
      { year: "2022", q: "A PROGRESSIVE tax system means:", options: ["A. The tax rate is the same for everyone", "B. The tax rate falls as income rises", "C. The tax rate rises as income rises", "D. The government collects less tax over time"], answer: "C", exp: "Progressive taxation: higher income earners pay a higher percentage of their income in tax. Designed to reduce inequality. Nigeria's personal income tax uses progressive rates." },
      { year: "2021", q: "A budget DEFICIT occurs when:", options: ["A. Government revenue exceeds expenditure", "B. Government expenditure exceeds revenue", "C. Exports exceed imports", "D. The national debt is fully paid"], answer: "B", exp: "Budget deficit: government spends more than it earns. Very common in Nigeria, typically financed by borrowing (bonds, World Bank, IMF loans)." },
    ],
    intl_trade: [
      { year: "2023", q: "The principle of COMPARATIVE ADVANTAGE states that a country should specialise in goods where it has:", options: ["A. The highest absolute output", "B. The lowest opportunity cost", "C. The most natural resources", "D. The largest labour force"], answer: "B", exp: "Comparative advantage is about relative efficiency — specialise in what you produce at the LOWEST opportunity cost relative to others." },
      { year: "2022", q: "A TARIFF is best described as:", options: ["A. A limit on the quantity of imports allowed", "B. A tax imposed on imported goods", "C. A complete ban on certain imports", "D. A subsidy given to domestic exporters"], answer: "B", exp: "Tariff = import tax. Raises price of imported goods, making domestic alternatives relatively cheaper. Generates government revenue." },
      { year: "2021", q: "A favourable balance of trade occurs when:", options: ["A. Imports exceed exports", "B. The exchange rate appreciates", "C. Exports exceed imports", "D. Foreign aid is received"], answer: "C", exp: "Favourable (surplus) balance of trade: export earnings > import spending." },
    ],
    west_africa: [
      { year: "2022", q: "The PRIMARY sector of the economy includes:", options: ["A. Manufacturing and construction", "B. Banking, insurance and trade", "C. Agriculture, fishing and mining", "D. Transport and communication"], answer: "C", exp: "Primary sector: extraction of natural resources — agriculture, forestry, fishing, mining. Secondary: manufacturing. Tertiary: services." },
      { year: "2021", q: "Nigeria's economy is best described as:", options: ["A. Heavily industrialised", "B. Largely dependent on oil exports", "C. A purely agricultural economy", "D. A planned economy"], answer: "B", exp: "Nigeria earns the majority of its government revenue and foreign exchange from crude oil exports." },
    ],
    growth: [
      { year: "2023", q: "The Human Development Index (HDI) measures development using:", options: ["A. GDP per capita alone", "B. Life expectancy, education, and GNI per capita", "C. Inflation rate and unemployment", "D. Population growth and urbanisation"], answer: "B", exp: "HDI combines: (1) Life expectancy, (2) Education (mean + expected years of schooling), (3) GNI per capita. Used by UNDP annually." },
      { year: "2022", q: "Economic DEVELOPMENT differs from economic GROWTH in that development:", options: ["A. Only measures change in GDP", "B. Refers exclusively to industrial output", "C. Encompasses improvement in quality of life and structural change", "D. Requires foreign aid"], answer: "C", exp: "Growth = quantitative (rising real GDP). Development = qualitative (improved living standards, reduced poverty, better healthcare and education)." },
    ],
    macro_meas: [
      { year: "2023", q: "Keynesian economists believe that in a recession, the most effective policy is:", options: ["A. Reducing the money supply", "B. Raising interest rates", "C. Increasing government spending", "D. Cutting the minimum wage"], answer: "C", exp: "Keynesians argue that in recession (deflationary gap), the government should increase spending to boost AD — since private sector demand is insufficient." },
      { year: "2022", q: "Purchasing Power Parity (PPP) is used to:", options: ["A. Calculate a country's trade balance", "B. Compare living standards across countries adjusting for price differences", "C. Measure inflation within a country", "D. Determine exchange rate policy"], answer: "B", exp: "PPP adjusts for the fact that prices differ between countries. PPP comparison gives a fairer picture of real living standards." },
    ],
    labour: [
      { year: "2023", q: "Underemployment refers to:", options: ["A. People who have given up looking for work", "B. Working fewer hours than desired or in jobs below qualification level", "C. People not in the labour force", "D. Seasonal workers"], answer: "B", exp: "Underemployment is a major problem in Nigeria — many graduates work in jobs far below their qualification level, or work part-time when they want full-time work." },
      { year: "2022", q: "Which of the following best describes STRUCTURAL unemployment?", options: ["A. Unemployment caused by a general fall in aggregate demand", "B. Workers moving between jobs", "C. Unemployment due to skills mismatch with available jobs", "D. Unemployment during harvest periods"], answer: "C", exp: "Structural unemployment: mismatch between workers' skills and employer requirements — often due to technology or industry change." },
    ],
    stabilize: [
      { year: "2023", q: "Contractionary monetary policy involves:", options: ["A. Reducing taxes", "B. Increasing government spending", "C. Raising the Monetary Policy Rate (MPR)", "D. Printing more money"], answer: "C", exp: "Raising MPR increases cost of borrowing — reduces money supply, credit, and spending — which brings down inflation. This is contractionary (tight) monetary policy used by the CBN." },
      { year: "2022", q: "Supply-side policies aim to:", options: ["A. Reduce aggregate demand", "B. Increase productive capacity and efficiency of the economy", "C. Raise interest rates", "D. Control the exchange rate"], answer: "B", exp: "Supply-side policies improve the economy's long-run productive potential: education and training, deregulation, tax incentives for investment, privatisation." },
    ],
    intl_inst: [
      { year: "2023", q: "ECOWAS was established primarily to:", options: ["A. Coordinate oil production among West African states", "B. Promote regional economic integration and trade in West Africa", "C. Manage foreign aid to West African countries", "D. Provide military security in West Africa"], answer: "B", exp: "ECOWAS (1975): promotes free trade, movement of people, and economic integration among 15 West African member states including Nigeria, Ghana, Senegal." },
      { year: "2022", q: "The International Monetary Fund (IMF) primarily provides:", options: ["A. Long-term development loans for infrastructure", "B. Short-term balance of payments support and economic policy advice", "C. Military assistance to developing countries", "D. Agricultural development grants"], answer: "B", exp: "The IMF provides short-term financial assistance to countries with balance of payments problems. The World Bank provides longer-term development finance." },
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