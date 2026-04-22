import { useState } from "react";

const courses = [
  {
    id: "ecn001",
    code: "ECN001",
    title: "Principles of Economics I",
    semester: "First Semester",
    emoji: "📘",
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
  {
    id: "ecn002",
    code: "ECN002",
    title: "Principles of Economics II",
    semester: "First Semester",
    emoji: "📗",
    topics: [
      { id: "circular", label: "Circular Flow of Income" },
      { id: "national_acc", label: "National Income Accounting" },
      { id: "national_det", label: "Theory of National Income Determination" },
      { id: "money", label: "Money and Banking" },
      { id: "inflation", label: "Inflation and Unemployment" },
      { id: "public", label: "Public Finance" },
    ],
  },
  {
    id: "ecn003",
    code: "ECN003",
    title: "Applied Economics I",
    semester: "Second Semester",
    emoji: "📙",
    topics: [
      { id: "west_africa", label: "Economic Structure of West Africa" },
      { id: "growth", label: "Growth and Development" },
      { id: "agric", label: "Agriculture and Industry" },
      { id: "intl_trade", label: "International Trade" },
    ],
  },
  {
    id: "ecn004",
    code: "ECN004",
    title: "Applied Economics II",
    semester: "Second Semester",
    emoji: "📕",
    topics: [
      { id: "macro_meas", label: "Measurement & Application in Macroeconomics" },
      { id: "labour", label: "Applied Issues in Labour Economics" },
      { id: "stabilize", label: "Stabilization Policies in Developing Countries" },
      { id: "intl_inst", label: "International Economic Institutions" },
    ],
  },
];

const notes = {
  intro: [
    { title: "Definition of Economics", body: "Economics is a social science that studies how individuals, firms, and governments allocate scarce resources to satisfy unlimited wants. Key definitions: Adam Smith — 'Economics is the science of wealth.' Alfred Marshall — 'Economics is a study of mankind in the ordinary business of life.' Lionel Robbins — 'Economics is the science which studies human behaviour as a relationship between ends and scarce means which have alternative uses.' Robbins' definition is the most widely accepted in modern economics." },
    { title: "Economics as a Social Science", body: "Economics is a social science because it studies human behaviour and social interactions. Like other social sciences (sociology, psychology, political science), it deals with people and society. Unlike natural sciences (physics, chemistry), economics cannot conduct controlled laboratory experiments. Instead, economists use models, assumptions, and statistical data to study economic behaviour. Social sciences study society; natural sciences study the physical world." },
    { title: "Micro vs Macroeconomics", body: "Microeconomics studies individual economic units — households, firms, and markets. It examines how prices are determined, how consumers make choices, and how firms decide on output. Examples of microeconomic variables: price of rice, output of a firm, wage of a worker. Macroeconomics studies the economy as a whole. It examines aggregate variables such as national income, inflation, unemployment, and economic growth. Examples: GDP, national price level, total employment." },
    { title: "Nature of Economic Problems", body: "All economies face four basic questions: WHAT to produce (which goods and services)? HOW to produce (which methods/technology)? WHERE to produce (location of production)? FOR WHOM to produce (who gets the goods — distribution)? These questions arise because of the fundamental economic problem: unlimited human wants vs. limited resources (scarcity). Every society must answer these questions through its economic system." },
  ],
  basic: [
    { title: "Scarcity, Choice & Opportunity Cost", body: "Scarcity means that resources (land, labour, capital) are limited while human wants are unlimited. Because of scarcity, choices must be made. Whenever a choice is made, something else must be given up — this is opportunity cost. Opportunity cost: the value of the next best alternative forgone. Example: If the Nigerian government uses ₦10 billion to build roads instead of schools, the opportunity cost is the education that would have been provided. Opportunity cost applies to individuals, firms, and governments." },
    { title: "Production Possibility Curve (PPC)", body: "The PPC (also called Production Possibility Frontier — PPF) shows the maximum combinations of two goods an economy can produce given fixed resources and technology. Key points: Points ON the curve = productively efficient (resources fully used). Points INSIDE the curve = inefficiency (unemployment or waste). Points OUTSIDE = currently unattainable. The curve is concave (bowed outward) due to increasing opportunity costs. The PPC shifts OUTWARD with: technological improvement, discovery of new resources, improved education/skills. It shifts INWARD with: natural disasters, war, disease." },
    { title: "Economic Systems", body: "Market Economy (Capitalism): Resources allocated by the price mechanism — demand and supply. Private ownership of resources. Examples: USA. Planned Economy (Socialism/Communism): Government owns and controls all resources. Central planning determines what, how, and for whom to produce. Example: former USSR. Mixed Economy: Combines features of market and planned economies. Both private sector and government play roles. Example: Nigeria — government controls NNPC, infrastructure, while private firms operate freely. Traditional Economy: Customs and traditions determine production and distribution. Found in rural/tribal communities." },
    { title: "Factors of Production", body: "Land: All natural resources — gifts of nature. Reward = Rent. Examples: farmland, rivers, mineral deposits. Labour: All human effort — physical and mental — used in production. Reward = Wages/Salaries. Capital: Man-made resources used in further production. Reward = Interest. Examples: machinery, buildings, tools. Note: money is NOT capital in economics — it is finance. Enterprise (Entrepreneurship): Organises the other three factors, takes risks, makes decisions. Reward = Profit. Division of Labour: Breaking production into specialised tasks. Advantages: increased productivity, skill development, saves time. Disadvantage: monotony, over-dependence." },
    { title: "Positive vs Normative Statements", body: "Positive statements are factual, objective, and can be tested/verified. They describe what IS. Example: 'Nigeria's inflation rate is 28%.' 'A rise in price leads to a fall in quantity demanded.' Normative statements are value judgements — they express opinions about what OUGHT to be. They cannot be proven right or wrong. Example: 'The government should reduce inflation.' 'Income should be distributed equally.' Economists try to make positive statements, but policy recommendations are often normative." },
  ],
  tools: [
    { title: "Functional Relationships & Economic Models", body: "Economics uses mathematical and graphical tools to express relationships between variables. A functional relationship shows how one variable depends on another. Example: Qd = f(P) — quantity demanded is a function of price. This can be expressed algebraically: Qd = 100 - 5P, or geometrically (as a graph). Endogenous variables: determined within the model (e.g. price, quantity). Exogenous variables: determined outside the model (e.g. government policy, weather)." },
    { title: "Statistical Data & Methods", body: "Economists use statistical data to understand and solve economic problems. Types of data: time series (data over time), cross-sectional (data across units at one time). Nigeria-specific data sources: National Bureau of Statistics (NBS), Central Bank of Nigeria (CBN), World Bank. Inductive method: draws general conclusions from specific observations (bottom-up). Deductive method: applies general theories to specific cases (top-down). Both methods have advantages and limitations. Mathematical tools help precision but may oversimplify real-world complexity." },
  ],
  price: [
    { title: "Demand — Definition & Law", body: "Demand is the quantity of a good or service consumers are willing AND able to purchase at various prices over a given time period. Note: willingness alone is not demand — purchasing power is required. Effective demand = willingness + ability to pay. Law of Demand: Ceteris paribus, as price rises, quantity demanded falls (inverse relationship). This gives the demand curve a downward slope. Exceptions: Giffen goods (basic inferior goods — demand rises as price rises), Veblen/prestige goods (luxury goods demanded more at higher prices), speculation (buying more expecting further price rises)." },
    { title: "Shifts in Demand", body: "A change in PRICE causes movement ALONG the demand curve (extension or contraction). A change in any OTHER factor causes a SHIFT of the entire demand curve. Factors that shift demand (determinants): (1) Income — rise in income increases demand for normal goods; decreases for inferior goods. (2) Price of related goods — substitutes (tea/coffee), complements (car/fuel). (3) Tastes and preferences. (4) Population size. (5) Expectations of future prices. (6) Advertising. Rightward shift = increase in demand. Leftward shift = decrease in demand." },
    { title: "Elasticity of Demand", body: "Price Elasticity of Demand (PED) = % change in Qty Demanded / % change in Price. PED > 1: Elastic (luxury goods, many substitutes — e.g. designer bags). PED < 1: Inelastic (necessities, few substitutes — e.g. salt, insulin). PED = 1: Unit elastic. Income Elasticity (YED) = % change in Qd / % change in Income. Positive YED = normal good. Negative YED = inferior good. YED > 1 = luxury. Cross Elasticity (XED) = % change in Qd of A / % change in P of B. Positive XED = substitutes. Negative XED = complements." },
    { title: "Supply — Definition, Law & Shifts", body: "Supply is the quantity of a good producers are willing and able to offer for sale at various prices. Law of Supply: Ceteris paribus, as price rises, quantity supplied increases (direct relationship). Upward-sloping supply curve. Shifts in supply (determinants): (1) Cost of production — higher costs reduce supply. (2) Technology — improvement increases supply. (3) Government subsidies — increase supply. (4) Taxes on producers — decrease supply. (5) Weather — affects agriculture. (6) Number of firms in market. Price change = movement along curve. Other factor change = shift of curve." },
    { title: "Equilibrium & Government Intervention", body: "Market equilibrium: where quantity demanded = quantity supplied. No tendency for price to change. Surplus (excess supply): price above equilibrium — price falls back. Shortage (excess demand): price below equilibrium — price rises back. Government intervention: Price ceiling (maximum price set BELOW equilibrium) — causes shortage (e.g. rent control). Price floor (minimum price set ABOVE equilibrium) — causes surplus (e.g. minimum wage). Subsidies — reduce production costs, increase supply, lower prices. Taxes — increase costs, reduce supply, raise prices. Direct provision — government supplies goods/services directly." },
  ],
  consumer: [
    { title: "Utility Theory", body: "Utility is the satisfaction derived from consuming a good or service. Total Utility (TU): total satisfaction from consuming all units. Marginal Utility (MU): extra satisfaction from consuming one more unit. Law of Diminishing Marginal Utility: As more units of a good are consumed, MU eventually decreases. Consumer equilibrium (Cardinal/Marshallian approach): Maximize utility by consuming up to the point where MU/P is equal for all goods: MUx/Px = MUy/Py. Limitations of marginal utility theory: utility cannot be measured precisely; ignores interdependence of utilities; ignores income effects." },
    { title: "Indifference Curves & Budget Line", body: "Ordinal approach (Hicks/Allen): ranks preferences without measuring utility. Indifference curve: shows all combinations of two goods giving equal satisfaction. Properties: (1) Downward sloping. (2) Convex to origin (diminishing MRS). (3) Higher curves = more satisfaction. (4) Curves never cross. MRS (Marginal Rate of Substitution): rate at which consumer gives up one good for another while staying equally satisfied. Budget line: shows all affordable combinations given income and prices. Consumer equilibrium: where HIGHEST indifference curve is TANGENT to budget line. At this point: MRS = Price ratio (Px/Py)." },
    { title: "Income & Substitution Effects", body: "When price of a good changes, TWO effects occur simultaneously: Substitution effect: The good becomes relatively cheaper/dearer compared to substitutes — consumer substitutes toward the cheaper good. Income effect: Change in price changes real purchasing power (real income). For normal goods: both effects reinforce each other (price fall → more purchased). For inferior goods: income and substitution effects work in opposite directions. For Giffen goods: income effect outweighs substitution effect — demand rises as price rises (very rare)." },
  ],
  firm: [
    { title: "Production in the Short Run", body: "Short run: at least one factor of production is fixed (usually capital). Law of Diminishing Returns (Law of Variable Proportions): as more of a variable factor (labour) is added to a fixed factor (capital), marginal product eventually falls. Three stages: Stage 1 — MP rising (increasing returns). Stage 2 — MP falling but positive (diminishing returns). Stage 3 — MP negative (negative returns). Total Product (TP), Average Product (AP = TP/L), Marginal Product (MP = ΔTP/ΔL). When MP > AP: AP rises. When MP = AP: AP at maximum. When MP < AP: AP falls." },
    { title: "Costs of Production", body: "Economist's cost includes opportunity cost (implicit costs). Accountant's cost only includes explicit (actual) payments. Short-run costs: Fixed Cost (FC): does not change with output (rent, insurance). Variable Cost (VC): changes with output (raw materials, labour). Total Cost (TC) = FC + VC. Average Fixed Cost (AFC) = FC/Q. Average Variable Cost (AVC) = VC/Q. Average Total Cost (ATC) = TC/Q. Marginal Cost (MC) = ΔTC/ΔQ. The MC curve cuts both AVC and ATC at their minimum points. Short-run average cost (SRAC) is U-shaped due to diminishing returns." },
    { title: "Long-Run Costs & Economies of Scale", body: "Long run: all factors are variable — no fixed costs. Long-run average cost (LRAC) curve is also called the 'envelope curve' — it encompasses all short-run average cost curves. Economies of scale (falling LRAC as output increases): Internal: technical, managerial, financial, risk-bearing, marketing economies. External: localization, urbanization economies (benefits from industry growth). Diseconomies of scale (rising LRAC): management difficulties, communication problems, worker alienation. Minimum Efficient Scale (MES): output level at which LRAC is minimized." },
    { title: "Revenue & Profit Maximisation", body: "Total Revenue (TR) = Price × Quantity. Average Revenue (AR) = TR/Q = Price. Marginal Revenue (MR) = ΔTR/ΔQ. For a perfectly competitive firm: AR = MR = Price (horizontal demand curve). For a monopolist/downward-sloping demand: MR < AR. Profit maximisation rule: produce where MC = MR. If MC < MR: increase output. If MC > MR: reduce output. Normal profit: minimum return to keep entrepreneur in the industry (included in costs). Abnormal/supernormal profit: revenue exceeds all costs including normal profit." },
  ],
  market: [
    { title: "Perfect Competition", body: "Features: Very many buyers and sellers. Homogeneous (identical) products. Perfect information — all buyers and sellers know prices. Free entry and exit. No transport costs. Each firm is a price TAKER (too small to influence price). Demand curve for firm: perfectly elastic (horizontal) at market price. Short run: can make supernormal, normal, or loss. Long run: only normal profit (supernormal profit attracts new entrants; losses cause exits). Efficiency: both productive (MC = min ATC) and allocative (P = MC) efficiency achieved in long run. Profit maximised where MC = MR." },
    { title: "Monopoly", body: "One seller, no close substitutes. Firm = Industry. Barriers to entry: patents, legal barriers, high capital costs, control of raw materials, economies of scale (natural monopoly). Price MAKER — sets price OR quantity (not both). Downward-sloping demand curve. MR is below AR. Produces less and charges higher price than perfect competition. Can earn supernormal profit in LONG RUN (protected by barriers). Criticisms: Productive and allocative inefficiency (P > MC, output below optimum). Price discrimination: charging different prices to different consumers for the same product — 1st, 2nd, 3rd degree." },
    { title: "Monopolistic Competition & Oligopoly", body: "Monopolistic Competition: Many firms. Differentiated products (branding, quality, style). Some price control. Free entry and exit. Short run: supernormal profit possible. Long run: normal profit only (entry erodes profit). Examples: restaurants, clothing shops, salons in Nigeria. Oligopoly: Few large firms dominate. High interdependence — each firm considers rivals' reactions before acting. High barriers to entry. Examples in Nigeria: MTN, Airtel, Glo (telecoms); Dangote, BUA (cement). Price rigidity (kinked demand curve model). Collusion: firms may form a cartel (agree to fix prices/output). Non-price competition: advertising, quality." },
    { title: "Contestable Markets", body: "A contestable market is one where there are no barriers to entry or exit — even if only one or few firms operate, they behave competitively because of the THREAT of new entrants. Key concept: Hit-and-run entry — firms enter when profit exists and exit freely when it disappears. A market can be perfectly contestable with just one firm if entry/exit is free. Implications: incumbents keep prices at competitive levels to deter entry. Policy relevance: regulators should focus on reducing barriers rather than just number of firms." },
  ],
  income_dist: [
    { title: "Demand & Supply of Labour", body: "Demand for labour is a DERIVED demand — it arises from demand for the final product. Firm's demand for labour is determined by Marginal Revenue Product (MRP) = MR × MP. Firm hires labour up to the point where MRP = Wage (W). Factors affecting demand for labour: wage rate, productivity, price of final product, price of capital (substitutes). Supply of labour: depends on wage rate, number of workers, hours willing to work, non-monetary factors (working conditions, status). Backward-bending supply curve of labour: at very high wages, workers may choose more leisure over more work." },
    { title: "Wage Determination & Differentials", body: "In a competitive labour market, wage is determined by demand and supply of labour — equilibrium wage clears the market. Wage differentials (why wages differ): skill and education levels, unpleasant working conditions (compensating differentials), geographical immobility, gender discrimination, strength of trade unions, productivity differences. Role of Trade Unions: push wages above competitive equilibrium, may cause unemployment. Role of Government: minimum wage legislation (e.g. Nigeria's national minimum wage), equal pay laws. Economic Rent: payment to a factor ABOVE its transfer earnings (minimum required to keep it in current use)." },
  ],
  govt: [
    { title: "Market Failure & Government Intervention", body: "Market failure occurs when the free market fails to allocate resources efficiently. Sources: Externalities (spillover effects on third parties), public goods, merit/demerit goods, information failure, monopoly power. Externalities: Negative externality (e.g. factory pollution) — private cost < social cost; market overproduces. Positive externality (e.g. education) — private benefit < social benefit; market underproduces. Government corrects via: taxes (on negative externalities), subsidies (for positive externalities), regulation, direct provision. Social cost = Private cost + External cost. Social benefit = Private benefit + External benefit." },
    { title: "Public, Merit & Demerit Goods", body: "Private goods: excludable and rival (e.g. food, clothes). Public goods: non-excludable (cannot prevent anyone from consuming) and non-rival (consumption by one does not reduce availability to others). Examples: national defence, street lighting, public roads. Problem: Free-rider problem — people consume without paying. Market UNDERPROVIDES public goods — government must provide them. Merit goods: socially desirable but underprovided by market (e.g. education, healthcare). Government subsidises or provides directly. Demerit goods: socially undesirable but overprovided (e.g. cigarettes, alcohol). Government taxes or bans." },
    { title: "Privatisation & Policy Effectiveness", body: "Privatisation: transfer of state-owned enterprises to private ownership. Arguments for: increased efficiency (profit motive), reduces government financial burden, wider share ownership, better management. Arguments against: private monopoly exploitation, loss of public service, job losses, short-termism. Nigeria examples: privatisation of NITEL, NEPA (now PHCN/DisCos), refineries. Government microeconomic policy objectives: efficiency (optimal resource allocation) and equity (fair distribution of income and wealth). Effectiveness depends on: accuracy of information, time lags, political will, unintended consequences." },
  ],
  circular: [
    { title: "Circular Flow of Income", body: "The circular flow shows the movement of money, goods, and services between households and firms. Simple (2-sector) model: Households supply factors to firms; firms pay factor incomes (wages, rent, interest, profit); households spend income on goods; firms receive revenue. INJECTIONS into the circular flow: Investment (I), Government expenditure (G), Exports (X). WITHDRAWALS (leakages) from circular flow: Savings (S), Taxes (T), Imports (M). Equilibrium condition: Total injections = Total withdrawals. I + G + X = S + T + M." },
    { title: "Aggregate Demand & Supply", body: "Aggregate Demand (AD): total spending in the economy. AD = C + I + G + (X-M). C = Consumption (largest component), I = Investment, G = Government spending, X-M = Net exports. Aggregate Supply (AS): total output produced in the economy at various price levels. Short-run AS is upward sloping. Long-run AS is vertical (at full employment output). Macroeconomic equilibrium: where AD = AS. Factors shifting AD: changes in consumer confidence, interest rates, government policy, exchange rates. Factors shifting AS: changes in input costs, technology, productivity." },
  ],
  national_acc: [
    { title: "National Income Concepts", body: "Gross Domestic Product (GDP): market value of all final goods and services produced within a country in one year. Gross National Product (GNP): GDP + Net income from abroad (income earned by nationals abroad minus income earned by foreigners domestically). Net National Product (NNP): GNP - Depreciation (capital consumption). National Income (NI) at factor cost: NNP - indirect taxes + subsidies. Disposable Income: NI - direct taxes + transfer payments. GDP per capita = GDP / population — used to compare living standards between countries." },
    { title: "Methods of Measuring National Income", body: "Three methods — all should give the same result: (1) Output/Product Method: sum of value added at each stage of production. Value added = Output value - Input value. Avoids double counting. (2) Income Method: sum of all factor incomes — wages, rent, interest, profit. Excludes transfer payments (pensions, unemployment benefits) — these are not payments for production. (3) Expenditure Method: GDP = C + I + G + (X-M). Problems of measurement: hidden/informal economy (Nigeria's large informal sector), non-marketed goods, subsistence production, data inaccuracy." },
    { title: "Uses & Limitations of National Income Data", body: "Uses: Compare living standards over time. Compare between countries. Guide government policy. Assess economic growth. Limitations: Ignores income distribution (high GDP may hide inequality). Excludes informal/subsistence economy (very significant in Nigeria). Ignores externalities (pollution, environmental damage). Does not measure quality of life. Purchasing power differs between countries — need PPP (Purchasing Power Parity) for fair comparison. Nigeria's GDP is large but GDP per capita is relatively low due to large population." },
  ],
  national_det: [
    { title: "Keynesian Theory of Income Determination", body: "John Maynard Keynes argued that the economy can be in equilibrium BELOW full employment. Aggregate Demand (AD) determines the equilibrium level of national income. Equilibrium national income: where AD = National Output (Y), or equivalently where Injections = Withdrawals. Consumption function: C = a + bY. Where 'a' = autonomous consumption, 'b' = Marginal Propensity to Consume (MPC). MPC = change in consumption / change in income. MPS = 1 - MPC (Marginal Propensity to Save). Average Propensity to Consume (APC) = C/Y. Investment is assumed autonomous (independent of income) in basic Keynesian model." },
    { title: "The Multiplier & Accelerator", body: "Multiplier: an initial change in spending leads to a LARGER final change in national income. Multiplier (k) = 1 / MPS = 1 / (1 - MPC). Example: MPC = 0.8, MPS = 0.2. Multiplier = 1/0.2 = 5. A ₦1 billion increase in government spending → ₦5 billion increase in national income. This works through successive rounds of spending. Accelerator principle: investment depends on the RATE OF CHANGE of national income (not just its level). When income grows faster, investment rises more than proportionately. Together, multiplier and accelerator can cause economic booms and recessions." },
    { title: "Inflationary & Deflationary Gaps", body: "Full employment level of income (Yf): national income when all resources fully employed. Equilibrium income may be above or below Yf. Inflationary gap: equilibrium income ABOVE full employment level. AD is too high — causes demand-pull inflation. Policy: reduce AD — raise taxes, cut government spending, raise interest rates. Deflationary gap (Recessionary gap): equilibrium income BELOW full employment level. AD is too low — causes unemployment. Policy: increase AD — cut taxes, increase government spending, lower interest rates (expansionary/Keynesian policy)." },
  ],
  money: [
    { title: "Nature & Functions of Money", body: "Barter system problems: Double coincidence of wants, indivisibility of goods, lack of store of value. Money evolved to solve these problems. Functions of money: (1) Medium of exchange — most important function; eliminates double coincidence. (2) Store of value — money retains value over time. (3) Unit of account — provides common measure of value (prices in Naira). (4) Standard of deferred payment — enables credit and loans. Properties of good money: durable, portable, divisible, scarce/limited supply, generally acceptable, homogeneous, stable value. Motives for holding money (Keynes): Transactions, Precautionary, Speculative." },
    { title: "Money Supply & Quantity Theory", body: "Money supply: total amount of money in an economy. Narrow money (M1): notes, coins, current account deposits. Broad money (M2/M3): M1 + savings deposits + time deposits. Quantity Theory of Money (Fisher): MV = PT. M = money supply, V = velocity of circulation, P = price level, T = volume of transactions. Monetarists argue: increasing money supply (M) leads to proportional increase in prices (P) — inflation. Central Bank controls money supply through: Open Market Operations (buying/selling government securities), Cash Reserve Ratio (CRR), Monetary Policy Rate (MPR — Nigeria's benchmark interest rate)." },
    { title: "Banking System in Nigeria", body: "Central Bank of Nigeria (CBN): apex bank. Functions: issues currency (Naira), banker to the government, lender of last resort, regulates/supervises banks, implements monetary policy, manages foreign exchange reserves, maintains financial system stability. Commercial Banks (e.g. GTBank, Zenith, UBA, Access, First Bank): accept deposits, grant loans, create credit through fractional reserve banking. Development Banks: provide long-term development finance (Bank of Industry, Bank of Agriculture). Money market: short-term lending/borrowing (Treasury bills, commercial paper). Capital market: long-term funds (Nigerian Stock Exchange — NSE/NGX)." },
  ],
  inflation: [
    { title: "Inflation — Definition, Types & Causes", body: "Inflation: a sustained general rise in the price level, causing fall in the purchasing power of money. Measured using Consumer Price Index (CPI). Types: Demand-pull inflation (AD > AS at full employment — too much money chasing too few goods). Cost-push inflation (rise in production costs — e.g. wages, oil prices push up prices). Imported inflation (rise in price of imports). Hyperinflation: extremely rapid inflation (Zimbabwe 2008, Germany 1923). Stagflation: simultaneous inflation and unemployment (contradicts traditional Phillips Curve). Nigeria has struggled with high inflation — driven largely by fuel prices, exchange rate depreciation, food supply shocks." },
    { title: "Effects & Remedies of Inflation", body: "Effects of inflation: Reduces real income and purchasing power. Harms savers (money loses value). Benefits debtors (repay with cheaper money). Harms creditors. Creates uncertainty — discourages investment. Can reduce international competitiveness (exports become expensive). Remedies: Monetary policy — raise interest rates, reduce money supply (CBN's MPR). Fiscal policy — raise taxes, reduce government spending. Supply-side policies — increase production capacity. Index-linking (wages/pensions adjusted for inflation). Exchange rate appreciation (reduces import prices). The Phillips Curve shows inverse relationship between inflation and unemployment — but stagflation breaks this relationship." },
    { title: "Unemployment — Definition, Types & Causes", body: "Unemployment: when people who are willing and able to work cannot find jobs. Unemployment rate = (unemployed / labour force) × 100. Types: Frictional (between jobs — short-term). Structural (skills mismatch — technology/industry change). Cyclical/Demand-deficient (low AD during recession — most serious). Seasonal (certain times of year — e.g. agriculture). Voluntary (choosing not to work at prevailing wages). Nigeria-specific causes: rapid population growth, mismatch between graduates and market needs, decline in manufacturing, oil sector dominance (capital-intensive, few jobs), poor infrastructure. Youth unemployment is particularly severe in Nigeria." },
  ],
  public: [
    { title: "Government Revenue & Taxation", body: "Sources of government revenue in Nigeria: Oil revenue (largest — petroleum profit tax, royalties, NNPC dividends). Non-oil tax revenue (VAT, company income tax, personal income tax, customs duties). Non-tax revenue (fees, fines, licenses). Borrowing (domestic and foreign). Principles of taxation (Adam Smith's canons): Equity (ability to pay), Certainty, Convenience, Economy (cost-effective to collect). Types of tax: Direct taxes — paid directly to government (income tax, company tax). Indirect taxes — collected by intermediary (VAT, excise duties, tariffs). Progressive tax: tax rate rises with income. Regressive tax: rate falls as income rises. Proportional: flat rate." },
    { title: "Government Expenditure & Budget", body: "Government expenditure types: Current expenditure (salaries, debt interest, subsidies). Capital expenditure (roads, schools, hospitals). Transfer payments (pensions, unemployment benefits — not included in GDP). Growth of government expenditure in Nigeria: Wagner's Law — government spending tends to rise as economy develops. Budget: a financial statement of planned revenue and expenditure. Balanced budget: revenue = expenditure. Surplus budget: revenue > expenditure. Deficit budget: revenue < expenditure (most common in Nigeria). Budget deficit leads to national/public debt. Revenue allocation in Nigeria: vertical (federal-state-local) and horizontal (among states) allocation using RMAFC formula." },
  ],
  west_africa: [
    { title: "Economic Structure of West Africa", body: "West African economies are characterised by: Dependence on primary sector (agriculture, mining). Underdeveloped manufacturing sector. Large informal economy. High dependence on commodity exports (Nigeria — oil; Ghana — cocoa, gold; Côte d'Ivoire — cocoa). Production sectors: Primary sector: Agriculture (food crops, cash crops), mining, fishing. Contribution to GDP has fallen over time (especially in Nigeria with oil). Secondary sector: Manufacturing — very underdeveloped in most of West Africa. Tertiary sector: Services — growing (banking, telecoms, trade). Public vs private sector: government still plays major role in most West African economies." },
    { title: "Agriculture in Nigeria", body: "Agriculture was Nigeria's dominant sector before oil discovery. Contributions: food supply, raw materials for industry, foreign exchange (groundnuts, cocoa, palm oil), employment (still employs ~35% of workforce). Problems: low technology/mechanisation, land tenure system (restricts land use), inadequate finance, poor infrastructure, rural-urban migration, climate change/desertification (northern Nigeria). Policies: Green Revolution, Operation Feed the Nation, Agricultural Development Programmes. Cash crops: cocoa (SW), groundnuts (N), palm oil (S), cotton (N). Food crops: yam, cassava, maize, millet, sorghum." },
  ],
  growth: [
    { title: "Economic Growth vs Development", body: "Economic Growth: increase in a country's real GDP over time — purely quantitative measure. Measured as percentage change in real GDP. Economic Development: broader concept — improvement in quality of life, reduction of poverty, structural transformation, reduction of inequality. Development involves: rising living standards, better healthcare and education, reduced unemployment, political freedom. Underdevelopment: characterised by low per capita income, high unemployment, dependence on primary products, low technology, poor infrastructure, rapid population growth, high inequality. Nigeria — classified as a lower-middle income developing country." },
    { title: "Indicators of Development", body: "GDP per capita — basic measure but limited. Human Development Index (HDI): composite of life expectancy, education (mean and expected years of schooling), and GNI per capita. Nigeria's HDI rank is low despite large GDP. Other indicators: Poverty rate, Gini coefficient (measures inequality — 0 = perfect equality, 1 = perfect inequality), infant mortality rate, literacy rate, access to clean water/sanitation. Physical Quality of Life Index (PQLI). Factors affecting growth and development: natural resources, human capital (education, skills), capital accumulation, technology, good governance, stable institutions, trade." },
    { title: "Population & Development in Nigeria", body: "Nigeria is Africa's most populous country (~220 million people, 2023). Rapid population growth (rate ~2.5% per annum) poses development challenges: strain on resources, infrastructure, education, healthcare. Malthus's population theory: population grows geometrically, food grows arithmetically — leading to poverty. Effects of HIV/AIDS on labour force: reduces working-age population, increases healthcare costs, reduces productivity. Gender and productivity: improving women's education and workforce participation significantly boosts economic growth. Population control measures: family planning, education, women's empowerment." },
  ],
  agric: [
    { title: "Industrialisation in West Africa", body: "Industry in West Africa remains underdeveloped due to: limited capital, small domestic markets, inadequate infrastructure (power, roads), competition from imports, low technology, colonial legacy (raw material exporters). Import Substitution Industrialisation (ISI): producing domestically what was previously imported. Nigeria tried this in the 1970s–80s (e.g. vehicle assembly, textiles). Problems: inefficiency, high costs, dependence on imported inputs. Export-led growth: Asia (South Korea, Taiwan) succeeded by exporting manufactured goods. Nigeria's industrial policy: NIRP (National Industrial Revolution Plan), diversification away from oil." },
  ],
  intl_trade: [
    { title: "Theories of International Trade", body: "Absolute Advantage (Adam Smith): a country should export goods it produces MORE EFFICIENTLY than other countries. Example: Nigeria produces oil more efficiently than Denmark; Denmark produces machinery more efficiently than Nigeria — both benefit from trade. Comparative Advantage (David Ricardo): even if one country is better at producing EVERYTHING, trade still benefits both — each specialises where its opportunity cost is LOWEST. This is the basis of modern international trade theory. Real-world limitations: assumes no transport costs, perfect factor mobility, constant returns — unrealistic. Other determinants of trade: factor endowments (Heckscher-Ohlin theory), product differentiation, economies of scale." },
    { title: "Balance of Payments", body: "The Balance of Payments (BOP) records all economic transactions between a country and the rest of the world over a period. Structure: Current Account: trade in goods (visible balance), trade in services (invisible balance), income (wages, dividends), current transfers. Capital Account: capital transfers, acquisition/disposal of non-produced assets. Financial Account: foreign direct investment, portfolio investment, loans. A current account surplus means exports > imports (favourable). Current account deficit: imports > exports (unfavourable — Nigeria runs a deficit in non-oil trade). BOP must balance overall (surplus in one account = deficit in another)." },
    { title: "Exchange Rates & Protection", body: "Exchange rate: price of one currency in terms of another. Floating exchange rate: determined by market forces (demand and supply of currency). Fixed rate: government pegs currency to another. Managed float: government intervenes occasionally. Naira depreciation: makes exports cheaper, imports more expensive — can improve trade balance but causes inflation. Protectionism: restricting imports to protect domestic industries. Methods: Tariffs (import taxes), Quotas (quantity limits), Embargoes (complete bans), Subsidies to domestic producers. Arguments for protection: infant industry, employment, strategic industries, dumping. Arguments against: reduces efficiency, retaliatory trade wars, higher prices for consumers." },
  ],
  macro_meas: [
    { title: "Measuring & Comparing Economic Performance", body: "Real GDP growth rate: % change in real GDP from year to year. Nominal GDP uses current prices; Real GDP adjusts for inflation. To compare countries: use GDP per capita (PPP-adjusted). PPP (Purchasing Power Parity): adjusts for different price levels between countries — gives fairer comparison. Other measures: HDI (combines income, health, education), Gini coefficient (inequality), Multidimensional Poverty Index (MPI). Keynesian view: AD determines output; fiscal policy most effective. Monetarist view: money supply is key; monetary policy (CBN) most effective. Supply-side view: focus on improving productive capacity (deregulation, education, infrastructure)." },
    { title: "Aggregate Expenditure & Income Determination", body: "Aggregate Expenditure (AE) = C + I + G + (X-M). Equilibrium national income: where AE = Y (output). Injection-Withdrawal approach: Equilibrium where I + G + X = S + T + M. Inflationary gap: AE > full employment output — too much spending. Policy: reduce AD (deflationary policy). Deflationary gap: AE < full employment output — too little spending. Policy: increase AD (reflationary policy). Full employment income (Yf) vs Equilibrium income (Ye): economy may be in equilibrium below full employment (Keynesian insight — justifies government intervention)." },
  ],
  labour: [
    { title: "Labour Market in Nigeria", body: "Labour force: all individuals of working age (15-64 in Nigeria) who are employed or actively seeking work. Employment statistics: Nigeria's unemployment rate has been rising — youth unemployment is particularly severe. Underemployment: working fewer hours than desired or in jobs below qualification level. Labour productivity: output per worker. Low in Nigeria due to: poor education/skills, poor health, inadequate capital and technology, poor infrastructure. Improving labour productivity requires: investment in human capital (education, healthcare), better technology, infrastructure development." },
    { title: "Unemployment in Nigeria", body: "Nigeria's unemployment rate (NBS definition since 2021): 33%+ — one of the highest globally. Definition: working less than 20 hours per week OR not working and actively seeking. Patterns: higher in urban areas, higher among youth (15-34 years), higher among graduates (skill mismatch). Causes: rapid population growth, dependence on capital-intensive oil sector, collapse of manufacturing, inadequate private sector investment, poor infrastructure. Measures to reduce: diversification of economy, investment in education/skills, small business support (Bank of Industry loans), public works programmes, improving ease of doing business." },
  ],
  stabilize: [
    { title: "Macroeconomic Policy Objectives", body: "Governments pursue four main macroeconomic objectives: (1) Economic growth — rising real GDP. (2) Low inflation — price stability (CBN targets ~6-9% in Nigeria; actual has been much higher). (3) Low unemployment — full employment. (4) Balance of payments equilibrium. Policy instruments: Fiscal policy (government spending and taxation — controlled by FG budget). Monetary policy (money supply and interest rates — controlled by CBN). Exchange rate policy (managed by CBN). Supply-side policy (long-term structural reforms). Conflicts between objectives: reducing inflation may increase unemployment (Phillips Curve trade-off). Achieving growth may worsen BOP." },
    { title: "Fiscal & Monetary Policy", body: "Fiscal Policy: government uses spending (G) and taxation (T) to influence the economy. Expansionary fiscal policy: increase G or cut T → increases AD → boosts growth but may cause inflation. Contractionary fiscal policy: cut G or raise T → reduces AD → controls inflation but may cause recession. Nigeria's fiscal challenges: oil revenue dependence, subsidy spending, large recurrent expenditure, high debt servicing. Monetary Policy (CBN): Expansionary: cut MPR (reduce interest rates), reduce CRR → cheaper borrowing → more spending. Contractionary: raise MPR → higher borrowing costs → reduce inflation. Open Market Operations: CBN buys (expands money supply) or sells (contracts money supply) government securities." },
  ],
  intl_inst: [
    { title: "International Economic Institutions", body: "ECOWAS (Economic Community of West African States): regional integration body of 15 West African states including Nigeria. Aims: free trade, common external tariff, free movement of people and goods. OPEC (Organisation of Petroleum Exporting Countries): cartel of oil-producing nations — Nigeria is a member. Controls oil production quotas to influence global oil prices. World Bank: provides loans and grants to developing countries for capital projects and development. IMF (International Monetary Fund): provides short-term balance of payments support, economic stabilization advice. African Development Bank (ADB): finances development projects in Africa." },
    { title: "Globalisation & Foreign Investment", body: "Globalisation: increasing integration of the world's economies through trade, investment, and movement of people. Benefits for developing countries: access to capital, technology transfer, market access, competition. Challenges: vulnerability to global shocks, exploitation by multinationals, displacement of local industries. FDI (Foreign Direct Investment): investment by foreign firms in productive assets (factories, businesses) in another country. Provides capital, jobs, technology. Nigeria attracts FDI mainly in oil sector. Portfolio investment: purchase of financial assets (shares, bonds) — more volatile. Economic integration stages: Free Trade Area → Customs Union → Common Market → Economic Union → Monetary Union." },
  ],
};

const questions = {
  intro: [
    { year: "2023", q: "Which economist defined economics as 'the science which studies human behaviour as a relationship between ends and scarce means which have alternative uses'?", options: ["A. Adam Smith", "B. Alfred Marshall", "C. Lionel Robbins", "D. John Maynard Keynes"], answer: "C", exp: "Lionel Robbins gave this famous scarcity-based definition in his 1932 essay. It is the most widely accepted modern definition of economics." },
    { year: "2023", q: "Microeconomics is BEST described as the study of:", options: ["A. The general price level in the economy", "B. Individual economic units such as households and firms", "C. Unemployment and economic growth", "D. The money supply and interest rates"], answer: "B", exp: "Microeconomics focuses on individual units — consumers, firms, and specific markets. Macroeconomics studies the economy as a whole." },
    { year: "2022", q: "Which of the following is a POSITIVE economic statement?", options: ["A. The government should reduce poverty", "B. Income should be equally distributed", "C. A rise in price leads to a fall in quantity demanded", "D. Nigeria should produce more food"], answer: "C", exp: "Positive statements are factual and testable (what IS). Normative statements express value judgements (what SHOULD be). Options A, B, and D are normative." },
    { year: "2022", q: "The basic economic problem arises because:", options: ["A. Governments fail to plan properly", "B. Human wants are unlimited while resources are scarce", "C. Technology is insufficient", "D. People are greedy"], answer: "B", exp: "Scarcity — the gap between unlimited wants and limited resources — is the fundamental economic problem that forces all economies to make choices." },
    { year: "2021", q: "Which of the following is a MACROECONOMIC variable?", options: ["A. The price of garri in Kano market", "B. The output of a Dangote cement factory", "C. The national unemployment rate", "D. The wage of a teacher in Lagos"], answer: "C", exp: "National unemployment rate is an aggregate variable — it refers to the entire economy. The other options are microeconomic (individual prices, outputs, wages)." },
  ],
  basic: [
    { year: "2023", q: "Opportunity cost is BEST defined as:", options: ["A. The total money spent on a good", "B. The value of the next best alternative forgone", "C. The profit lost by a firm", "D. The cost of producing one more unit"], answer: "B", exp: "Opportunity cost is not about money — it is the value of the best alternative you sacrificed when making a choice. It applies to all economic agents." },
    { year: "2023", q: "A point INSIDE the Production Possibility Curve (PPC) represents:", options: ["A. Full employment of resources", "B. An unattainable level of output", "C. Productive inefficiency", "D. Technological advancement"], answer: "C", exp: "Inside the PPC means resources are not fully utilised — some are idle or misallocated. This is productive inefficiency. Points on the curve represent efficiency." },
    { year: "2022", q: "The PPC shifts OUTWARD when there is:", options: ["A. A rise in consumer demand", "B. Technological advancement", "C. A fall in the price level", "D. Increased government spending"], answer: "B", exp: "The PPC shifts outward when the economy's productive capacity increases — through better technology, discovery of new resources, or improvement in education and skills." },
    { year: "2022", q: "In a mixed economy like Nigeria:", options: ["A. Only private firms produce goods", "B. The government controls all resources", "C. Both government and private sector allocate resources", "D. Resources are allocated by tradition and custom"], answer: "C", exp: "Nigeria is a mixed economy — the private sector operates freely in most markets while the government controls key sectors (e.g. NNPC, infrastructure) and provides public goods." },
    { year: "2021", q: "The reward for LAND as a factor of production is:", options: ["A. Wages", "B. Interest", "C. Profit", "D. Rent"], answer: "D", exp: "The four factors of production and their rewards: Land → Rent, Labour → Wages, Capital → Interest, Enterprise → Profit." },
  ],
  price: [
    { year: "2023", q: "A rise in the price of Pepsi leads to an increase in demand for Coca-Cola. This is because they are:", options: ["A. Complementary goods", "B. Substitute goods", "C. Inferior goods", "D. Public goods"], answer: "B", exp: "Substitute goods compete with each other. When the price of one rises, consumers switch to the cheaper alternative, increasing demand for the substitute." },
    { year: "2023", q: "If PED = 0.3, demand is:", options: ["A. Elastic", "B. Unit elastic", "C. Inelastic", "D. Perfectly elastic"], answer: "C", exp: "PED < 1 means inelastic demand — quantity demanded is not very responsive to price change. Common for necessities like salt, fuel, and medicine." },
    { year: "2022", q: "A price CEILING set below equilibrium will cause:", options: ["A. A surplus of the good", "B. A shortage of the good", "C. No change in quantity demanded", "D. An increase in supply"], answer: "B", exp: "Price ceiling (maximum price) set below equilibrium keeps price too low — quantity demanded exceeds quantity supplied — causing a shortage. Example: rent control." },
    { year: "2022", q: "Which of the following will shift the demand curve for beef to the RIGHT?", options: ["A. A fall in the price of beef", "B. A rise in consumer income (beef is a normal good)", "C. A fall in population", "D. A rise in the price of a complementary good"], answer: "B", exp: "Rising income increases demand for normal goods — shifting the curve right. A price change causes movement ALONG the curve, not a shift of it." },
    { year: "2021", q: "Cross elasticity of demand measures:", options: ["A. How demand responds to a change in income", "B. How demand for one good responds to a change in the price of another", "C. How supply responds to a price change", "D. The responsiveness of demand to advertising"], answer: "B", exp: "XED = % change in Qd of A / % change in Price of B. Positive XED = substitutes. Negative XED = complements. Zero XED = unrelated goods." },
    { year: "2020", q: "The demand for tractors by Nigerian farmers is an example of:", options: ["A. Joint demand", "B. Composite demand", "C. Derived demand", "D. Effective demand"], answer: "C", exp: "Demand for tractors is derived from the demand for agricultural products. Factors of production are demanded because of demand for the final good they help produce." },
  ],
  consumer: [
    { year: "2023", q: "When Total Utility is at its maximum, Marginal Utility is:", options: ["A. Rising", "B. Equal to average utility", "C. Negative", "D. Zero"], answer: "D", exp: "Total utility is maximised at the point where consuming one more unit adds nothing — MU = 0. Beyond this, MU becomes negative and TU falls." },
    { year: "2022", q: "An indifference curve is CONVEX to the origin because of:", options: ["A. The law of demand", "B. Diminishing marginal rate of substitution", "C. Increasing returns to scale", "D. The income effect"], answer: "B", exp: "As more of good X is consumed, the consumer gives up less and less of good Y for each additional unit of X — diminishing MRS causes the convex shape." },
    { year: "2022", q: "Consumer equilibrium using indifference curve analysis is achieved where:", options: ["A. The budget line cuts the indifference curve", "B. Total utility is at its minimum", "C. The highest attainable indifference curve is tangent to the budget line", "D. MU = price of the good"], answer: "C", exp: "The tangency point — not intersection — gives the highest satisfaction attainable given the consumer's budget. At this point, MRS = price ratio (Px/Py)." },
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
    { year: "2021", q: "Price discrimination refers to:", options: ["A. Charging higher prices for better quality goods", "B. Charging different prices to different consumers for the same good", "C. Setting price equal to marginal cost", "D. Pricing based on cost of production"], answer: "B", exp: "Price discrimination: selling the same good at different prices to different consumers (e.g. student discounts, peak/off-peak pricing) — possible when markets can be separated." },
  ],
  income_dist: [
    { year: "2023", q: "The demand for labour is described as a 'derived demand' because:", options: ["A. Labour can substitute for capital", "B. It is demanded for producing other goods and services", "C. Workers demand higher wages", "D. Labour has a fixed supply"], answer: "B", exp: "Firms don't demand labour for its own sake — they demand it to produce goods/services. This is derived demand. MRP theory underpins this." },
    { year: "2022", q: "Economic rent is defined as:", options: ["A. Payment for the use of land only", "B. The payment above a factor's transfer earnings", "C. The market wage rate", "D. Payment to capital"], answer: "B", exp: "Economic rent = actual earnings - transfer earnings (minimum required to keep factor in current use). It is the surplus above what is necessary." },
    { year: "2021", q: "Which of the following would increase the wage rate in a competitive labour market?", options: ["A. An increase in labour supply", "B. A decrease in demand for the final product", "C. An increase in labour productivity", "D. A reduction in trade union power"], answer: "C", exp: "Higher labour productivity raises MRP (Marginal Revenue Product), shifting labour demand curve right — increasing the equilibrium wage." },
  ],
  govt: [
    { year: "2023", q: "A negative externality occurs when:", options: ["A. A firm's production benefits third parties", "B. The social cost of production exceeds private cost", "C. A consumer pays less than the true value", "D. Government subsidises a good"], answer: "B", exp: "Negative externality: production/consumption imposes costs on third parties not reflected in the market price. Social cost > private cost — market overproduces. Example: factory pollution." },
    { year: "2022", q: "Which of the following is a PUBLIC good?", options: ["A. A bottle of water", "B. A university lecture", "C. National defence", "D. A cinema ticket"], answer: "C", exp: "National defence is non-excludable and non-rival — the defining features of a public good. The free-rider problem means the market will not provide it — government must." },
    { year: "2021", q: "Merit goods are:", options: ["A. Goods that are overconsumed by society", "B. Goods provided by the private sector for profit", "C. Goods that are underprovided by the market because their social benefit exceeds private benefit", "D. Goods with no positive externalities"], answer: "C", exp: "Merit goods (education, healthcare) generate positive externalities — society benefits more than the individual consumer. Markets underprovide them — government subsidises or directly provides." },
  ],
  circular: [
    { year: "2023", q: "In the circular flow of income, which of the following is an INJECTION?", options: ["A. Savings", "B. Taxation", "C. Imports", "D. Government expenditure"], answer: "D", exp: "Injections ADD money into the circular flow: Investment (I), Government expenditure (G), Exports (X). Withdrawals/leakages REMOVE money: Savings (S), Taxes (T), Imports (M)." },
    { year: "2022", q: "Equilibrium in the circular flow requires that:", options: ["A. Exports equal imports", "B. Government spending equals taxation", "C. Total injections equal total withdrawals", "D. Consumption equals income"], answer: "C", exp: "Macroeconomic equilibrium: I + G + X = S + T + M. When total injections equal total withdrawals, national income is in equilibrium — no tendency to change." },
    { year: "2021", q: "The Marginal Propensity to Consume (MPC) measures:", options: ["A. Total consumption as a proportion of income", "B. The change in consumption from a change in income", "C. Savings as a proportion of income", "D. Government spending relative to GDP"], answer: "B", exp: "MPC = change in consumption / change in income. If income rises by ₦1,000 and consumption rises by ₦800, MPC = 0.8. MPC + MPS = 1." },
  ],
  national_acc: [
    { year: "2023", q: "GNP differs from GDP in that GNP includes:", options: ["A. Government expenditure", "B. Net factor income from abroad", "C. Depreciation of capital", "D. Transfer payments"], answer: "B", exp: "GNP = GDP + net income from abroad. GDP measures production within the country's borders; GNP measures production by the country's nationals, wherever located." },
    { year: "2022", q: "The expenditure approach to GDP is expressed as:", options: ["A. GDP = C + S + G + X", "B. GDP = W + R + I + P", "C. GDP = C + I + G + (X-M)", "D. GDP = Output - Depreciation"], answer: "C", exp: "GDP (expenditure) = Consumption + Investment + Government spending + Net exports (Exports minus Imports). This is the most commonly used formula in macroeconomics." },
    { year: "2021", q: "Depreciation in national income accounting refers to:", options: ["A. A general fall in prices", "B. Reduction in export earnings", "C. Capital consumption — wear and tear of capital goods", "D. A rise in government debt"], answer: "C", exp: "Depreciation (capital consumption allowance) measures the fall in value of capital goods through wear and tear. NNP = GNP - Depreciation." },
  ],
  national_det: [
    { year: "2023", q: "If MPC = 0.75, the value of the Keynesian multiplier is:", options: ["A. 0.75", "B. 1.33", "C. 4", "D. 7.5"], answer: "C", exp: "MPS = 1 - MPC = 1 - 0.75 = 0.25. Multiplier = 1/MPS = 1/0.25 = 4. A ₦1 increase in government spending increases national income by ₦4." },
    { year: "2022", q: "An inflationary gap occurs when:", options: ["A. Aggregate demand is below full employment output", "B. Aggregate demand exceeds full employment output", "C. Government spending exceeds taxation", "D. Imports exceed exports"], answer: "B", exp: "Inflationary gap: equilibrium income ABOVE full employment level — too much spending relative to productive capacity — causes demand-pull inflation." },
    { year: "2021", q: "The accelerator principle states that:", options: ["A. Investment depends on the level of national income", "B. Investment depends on the rate of change of national income", "C. Consumption depends on interest rates", "D. Savings always equal investment"], answer: "B", exp: "The accelerator: investment rises more than proportionately when national income is growing quickly. When income growth slows, investment may fall sharply — amplifying the economic cycle." },
  ],
  money: [
    { year: "2023", q: "Which of the following is NOT a function of the Central Bank of Nigeria (CBN)?", options: ["A. Issuing currency", "B. Accepting deposits from the general public", "C. Acting as lender of last resort", "D. Implementing monetary policy"], answer: "B", exp: "The CBN is a banker's bank — it does NOT accept deposits from the public. Commercial banks (GTBank, Zenith, UBA) perform this function." },
    { year: "2022", q: "The Quantity Theory of Money (MV = PT) suggests that an increase in money supply will lead to:", options: ["A. A fall in prices", "B. A rise in real output", "C. A proportional rise in prices", "D. A fall in velocity of money"], answer: "C", exp: "Monetarists argue that if V and T are constant, increasing M causes proportional increase in P (price level) — i.e., inflation. This is the basis of monetarist anti-inflation policy." },
    { year: "2021", q: "Money eliminates the problem of double coincidence of wants through its function as:", options: ["A. Store of value", "B. Unit of account", "C. Medium of exchange", "D. Standard of deferred payment"], answer: "C", exp: "As a medium of exchange, money replaces barter. In barter, you need someone who has what you want AND wants what you have — money eliminates this difficulty." },
  ],
  inflation: [
    { year: "2023", q: "Cost-push inflation is caused by:", options: ["A. Excessive consumer spending", "B. An increase in money supply", "C. Rising production costs passed on to consumers", "D. A fall in imports"], answer: "C", exp: "Cost-push inflation: higher input costs (wages, fuel, raw materials) raise firms' costs — these are passed on as higher prices. Nigeria experiences this through rising fuel and exchange rate costs." },
    { year: "2022", q: "The Phillips Curve shows the relationship between:", options: ["A. Inflation and economic growth", "B. Inflation and unemployment", "C. Unemployment and interest rates", "D. Money supply and prices"], answer: "B", exp: "The original Phillips Curve: inverse relationship between inflation and unemployment — low unemployment tends to come with high inflation and vice versa. Stagflation (1970s) challenged this." },
    { year: "2021", q: "Structural unemployment arises from:", options: ["A. A general fall in aggregate demand", "B. Workers between jobs", "C. Mismatch between workers' skills and available jobs", "D. Seasonal changes in production"], answer: "C", exp: "Structural unemployment: when industrial change or technological advancement makes certain skills obsolete — workers lack skills needed for available jobs. A major problem in Nigeria (graduate-job mismatch)." },
  ],
  public: [
    { year: "2023", q: "Which of the following is a DIRECT tax?", options: ["A. Value Added Tax (VAT)", "B. Excise duty", "C. Import tariff", "D. Personal income tax"], answer: "D", exp: "Direct taxes are paid directly to the government by the individual (income tax, company tax). Indirect taxes (VAT, excise duty, tariffs) are collected by an intermediary (seller)." },
    { year: "2022", q: "A PROGRESSIVE tax system means:", options: ["A. The tax rate is the same for everyone", "B. The tax rate falls as income rises", "C. The tax rate rises as income rises", "D. The government collects less tax over time"], answer: "C", exp: "Progressive taxation: higher income earners pay a higher percentage of their income in tax. Designed to reduce inequality. Nigeria's personal income tax uses progressive rates." },
    { year: "2021", q: "A budget DEFICIT occurs when:", options: ["A. Government revenue exceeds expenditure", "B. Government expenditure exceeds revenue", "C. Exports exceed imports", "D. The national debt is fully paid"], answer: "B", exp: "Budget deficit: government spends more than it earns. This is very common in Nigeria, typically financed by borrowing (issuing bonds, external loans from World Bank, IMF)." },
  ],
  intl_trade: [
    { year: "2023", q: "The principle of COMPARATIVE ADVANTAGE states that a country should specialise in goods where it has:", options: ["A. The highest absolute output", "B. The lowest opportunity cost", "C. The most natural resources", "D. The largest labour force"], answer: "B", exp: "Comparative advantage is about relative efficiency — specialise in what you produce at the LOWEST opportunity cost relative to others, even if you're not the absolute best at it." },
    { year: "2022", q: "A TARIFF is best described as:", options: ["A. A limit on the quantity of imports allowed", "B. A tax imposed on imported goods", "C. A complete ban on certain imports", "D. A subsidy given to domestic exporters"], answer: "B", exp: "Tariff = import tax. Raises price of imported goods, making domestic alternatives relatively cheaper. Generates government revenue. Used to protect Nigerian industries." },
    { year: "2021", q: "A favourable balance of trade occurs when:", options: ["A. Imports exceed exports", "B. The exchange rate appreciates", "C. Exports exceed imports", "D. Foreign aid is received"], answer: "C", exp: "Favourable (surplus) balance of trade: export earnings > import spending. Nigeria typically runs an oil trade surplus but an overall current account that fluctuates with oil prices." },
  ],
  west_africa: [
    { year: "2022", q: "The PRIMARY sector of the economy includes:", options: ["A. Manufacturing and construction", "B. Banking, insurance and trade", "C. Agriculture, fishing and mining", "D. Transport and communication"], answer: "C", exp: "Primary sector: extraction of natural resources — agriculture, forestry, fishing, mining. Secondary sector: manufacturing and construction. Tertiary sector: services." },
    { year: "2021", q: "Nigeria's economy is best described as:", options: ["A. Heavily industrialised", "B. Largely dependent on oil exports", "C. A purely agricultural economy", "D. A planned economy"], answer: "B", exp: "Nigeria earns the majority of its government revenue and foreign exchange from crude oil exports, making it heavily dependent on oil — despite oil employing relatively few workers." },
  ],
  growth: [
    { year: "2023", q: "The Human Development Index (HDI) measures development using:", options: ["A. GDP per capita alone", "B. Life expectancy, education, and GNI per capita", "C. Inflation rate and unemployment", "D. Population growth and urbanisation"], answer: "B", exp: "HDI combines three dimensions: (1) Life expectancy (health), (2) Education (mean years of schooling + expected years), (3) GNI per capita (income). Used by UNDP annually." },
    { year: "2022", q: "Economic DEVELOPMENT differs from economic GROWTH in that development:", options: ["A. Only measures change in GDP", "B. Refers exclusively to industrial output", "C. Encompasses improvement in quality of life and structural change", "D. Requires foreign aid"], answer: "C", exp: "Growth = quantitative (rising real GDP). Development = qualitative (improved living standards, reduced poverty, better healthcare and education, structural transformation)." },
  ],
  macro_meas: [
    { year: "2023", q: "Keynesian economists believe that in a recession, the most effective policy is:", options: ["A. Reducing the money supply", "B. Raising interest rates", "C. Increasing government spending", "D. Cutting the minimum wage"], answer: "C", exp: "Keynesians argue that in recession (deflationary gap), the government should increase spending to boost AD — since private sector demand is insufficient. This is fiscal/demand-management policy." },
    { year: "2022", q: "Purchasing Power Parity (PPP) is used to:", options: ["A. Calculate a country's trade balance", "B. Compare living standards across countries adjusting for price differences", "C. Measure inflation within a country", "D. Determine exchange rate policy"], answer: "B", exp: "PPP adjusts for the fact that prices differ between countries — $1 buys more in Nigeria than in the UK. PPP comparison gives a fairer picture of real living standards." },
  ],
  labour: [
    { year: "2023", q: "Underemployment refers to:", options: ["A. People who have given up looking for work", "B. Working fewer hours than desired or in jobs below qualification level", "C. People not in the labour force", "D. Seasonal workers"], answer: "B", exp: "Underemployment is a major problem in Nigeria — many graduates work in jobs far below their qualification level, or work part-time when they want full-time work." },
    { year: "2022", q: "Which of the following best describes STRUCTURAL unemployment?", options: ["A. Unemployment caused by a general fall in aggregate demand", "B. Workers moving between jobs", "C. Unemployment due to skills mismatch with available jobs", "D. Unemployment during harvest periods"], answer: "C", exp: "Structural unemployment: mismatch between workers' skills and employer requirements — often due to technology or industry change. Requires retraining, not just demand stimulus." },
  ],
  stabilize: [
    { year: "2023", q: "Contractionary monetary policy involves:", options: ["A. Reducing taxes", "B. Increasing government spending", "C. Raising the Monetary Policy Rate (MPR)", "D. Printing more money"], answer: "C", exp: "Raising MPR increases cost of borrowing — reduces money supply, credit, and spending — which brings down inflation. This is contractionary (tight) monetary policy used by the CBN." },
    { year: "2022", q: "Supply-side policies aim to:", options: ["A. Reduce aggregate demand", "B. Increase productive capacity and efficiency of the economy", "C. Raise interest rates", "D. Control the exchange rate"], answer: "B", exp: "Supply-side policies improve the economy's long-run productive potential: education and training, deregulation, tax incentives for investment, privatisation, reducing trade union power." },
  ],
  intl_inst: [
    { year: "2023", q: "ECOWAS was established primarily to:", options: ["A. Coordinate oil production among West African states", "B. Promote regional economic integration and trade in West Africa", "C. Manage foreign aid to West African countries", "D. Provide military security in West Africa"], answer: "B", exp: "ECOWAS (1975): promotes free trade, movement of people, and economic integration among 15 West African member states including Nigeria, Ghana, Senegal." },
    { year: "2022", q: "The International Monetary Fund (IMF) primarily provides:", options: ["A. Long-term development loans for infrastructure", "B. Short-term balance of payments support and economic policy advice", "C. Military assistance to developing countries", "D. Agricultural development grants"], answer: "B", exp: "The IMF provides short-term financial assistance to countries with balance of payments problems — often with conditions (structural adjustment). The World Bank provides longer-term development finance." },
  ],
};

const grading = [
  { marks: "70-100", grade: "A", points: 5, remark: "Excellent" },
  { marks: "60-69", grade: "B", points: 4, remark: "Very Good" },
  { marks: "50-59", grade: "C", points: 3, remark: "Good" },
  { marks: "45-49", grade: "D", points: 2, remark: "Merit" },
  { marks: "40-44", grade: "E", points: 1, remark: "Pass" },
  { marks: "0-39", grade: "F", points: 0, remark: "Fail" },
];

const S = {
  wrap: { minHeight: "100vh", background: "#0a0f0a", fontFamily: "Georgia, serif", color: "#f0ece0", overflowX: "hidden" },
  hdr: { background: "linear-gradient(135deg,#1a3a1a,#0d2b0d)", borderBottom: "2px solid #c8a84b", padding: "16px 20px", display: "flex", alignItems: "center", gap: 12, position: "sticky", top: 0, zIndex: 100 },
  back: { background: "none", border: "none", color: "#c8a84b", fontSize: 22, cursor: "pointer", padding: 0 },
  goldBtn: { width: "100%", background: "#c8a84b", border: "none", borderRadius: 10, color: "#0a0f0a", fontSize: 14, fontWeight: "bold", padding: 14, cursor: "pointer", display: "block", marginBottom: 10 },
  ghostBtn: { width: "100%", background: "transparent", border: "1px solid #2a3a2a", borderRadius: 10, color: "#8a9a8a", fontSize: 13, padding: 12, cursor: "pointer", display: "block" },
  card: { background: "#141f14", border: "1px solid #2a3a2a", borderRadius: 16, padding: "18px 16px", marginBottom: 14 },
  tag: { fontSize: 10, color: "#c8a84b", letterSpacing: 2, textTransform: "uppercase" },
  exp: { marginTop: 12, background: "#0d2b0d", borderRadius: 10, padding: "12px 14px", fontSize: 13, color: "#90c890", lineHeight: 1.6, borderLeft: "3px solid #5cb85c" },
};

function Header({ onBack, title, sub }) {
  return (
    <div style={S.hdr}>
      {onBack && <button onClick={onBack} style={S.back}>←</button>}
      <div>
        <div style={S.tag}>StudyNaija · JUPEB Economics</div>
        <div style={{ fontSize: 16, fontWeight: "bold", color: "#f0ece0" }}>{title}</div>
        {sub && <div style={{ fontSize: 11, color: "#8a9a8a" }}>{sub}</div>}
      </div>
    </div>
  );
}

export default function App() {
  const [screen, setScreen] = useState("home");
  const [activeCourse, setActiveCourse] = useState(null);
  const [activeTopic, setActiveTopic] = useState(null);
  const [tab, setTab] = useState("questions");
  const [revealed, setRevealed] = useState({});
  const [selected, setSelected] = useState({});
  const [quizActive, setQuizActive] = useState(false);
  const [qIdx, setQIdx] = useState(0);
  const [qSel, setQSel] = useState(null);
  const [qRev, setQRev] = useState(false);
  const [qScore, setQScore] = useState(0);
  const [qDone, setQDone] = useState(false);

  const openCourse = (c) => { setActiveCourse(c); setActiveTopic(null); setScreen("course"); };
  const openTopic = (t) => { setActiveTopic(t); setScreen("topic"); setTab("questions"); setRevealed({}); setSelected({}); };
  const startQuiz = () => { setQuizActive(true); setQIdx(0); setQSel(null); setQRev(false); setQScore(0); setQDone(false); setScreen("quiz"); };

  const topicNotes = activeTopic ? (notes[activeTopic.id] || []) : [];
  const topicQs = activeTopic ? (questions[activeTopic.id] || []) : [];

  // Quiz screen
  if (screen === "quiz" && quizActive) {
    const qs = topicQs;
    const q = qs[qIdx];
    if (qDone) {
      const pct = Math.round((qScore / qs.length) * 100);
      const g = pct >= 70 ? "Excellent! 🎉" : pct >= 60 ? "Very Good! 💪" : pct >= 50 ? "Good! 📚" : "Keep Studying! 🔁";
      return (
        <div style={S.wrap}>
          <Header onBack={() => { setQuizActive(false); setScreen("topic"); }} title="Quiz Result" />
          <div style={{ padding: "40px 20px", textAlign: "center" }}>
            <div style={{ fontSize: 56, marginBottom: 12 }}>📊</div>
            <div style={{ fontSize: 20, fontWeight: "bold", marginBottom: 6 }}>{g}</div>
            <div style={{ fontSize: 44, fontWeight: "bold", color: "#c8a84b", marginBottom: 4 }}>{pct}%</div>
            <div style={{ color: "#8a9a8a", marginBottom: 8 }}>{qScore} / {qs.length} correct</div>
            <div style={{ fontSize: 12, color: "#c8a84b", marginBottom: 28 }}>
              {pct >= 70 ? "Grade A — Excellent" : pct >= 60 ? "Grade B — Very Good" : pct >= 50 ? "Grade C — Good" : pct >= 45 ? "Grade D — Merit" : pct >= 40 ? "Grade E — Pass" : "Grade F — Fail"}
            </div>
            <button onClick={startQuiz} style={S.goldBtn}>Retry Quiz</button>
            <button onClick={() => { setQuizActive(false); setScreen("topic"); }} style={S.ghostBtn}>Back to Topic</button>
          </div>
        </div>
      );
    }
    return (
      <div style={S.wrap}>
        <Header onBack={() => { setQuizActive(false); setScreen("topic"); }} title={activeTopic?.label} sub={`Question ${qIdx + 1} of ${qs.length}`} />
        <div style={{ padding: "16px" }}>
          <div style={{ background: "#1e2e1e", borderRadius: 6, height: 5, marginBottom: 16 }}>
            <div style={{ background: "#c8a84b", height: 5, borderRadius: 6, width: `${(qIdx / qs.length) * 100}%`, transition: "width 0.3s" }} />
          </div>
          <div style={{ ...S.card, marginBottom: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
              <span style={S.tag}>JUPEB {q.year}</span>
              <span style={{ fontSize: 12, color: "#c8a84b" }}>Score: {qScore}</span>
            </div>
            <div style={{ fontSize: 14, lineHeight: 1.7, color: "#e8e4d0", marginBottom: 16 }}>{q.q}</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {q.options.map((opt) => {
                const l = opt[0];
                const isSel = qSel === l, isRight = l === q.answer;
                let bg = "#1e2e1e", border = "#2a3a2a", col = "#c8c4b0";
                if (qRev && isRight) { bg = "#1e4a1e"; border = "#5cb85c"; col = "#90ee90"; }
                else if (qRev && isSel && !isRight) { bg = "#4a1e1e"; border = "#dc3545"; col = "#ff9999"; }
                else if (!qRev && isSel) { bg = "#2a3a1e"; border = "#c8a84b"; col = "#f0ece0"; }
                return <button key={opt} onClick={() => { if (!qRev) setQSel(l); }} style={{ background: bg, border: `1px solid ${border}`, borderRadius: 10, padding: "11px 14px", textAlign: "left", color: col, fontSize: 13, cursor: qRev ? "default" : "pointer" }}>{opt}</button>;
              })}
            </div>
          </div>
          {qRev && <div style={S.exp}>💡 {q.exp}</div>}
          {!qRev && qSel && <button onClick={() => { setQRev(true); if (qSel === q.answer) setQScore(s => s + 1); }} style={{ ...S.goldBtn, marginTop: 12 }}>Check Answer</button>}
          {qRev && <button onClick={() => { if (qIdx + 1 >= qs.length) setQDone(true); else { setQIdx(i => i + 1); setQSel(null); setQRev(false); } }} style={{ ...S.goldBtn, marginTop: 12 }}>{qIdx + 1 >= qs.length ? "See Results" : "Next →"}</button>}
        </div>
      </div>
    );
  }

  // Topic screen
  if (screen === "topic" && activeTopic) {
    return (
      <div style={S.wrap}>
        <Header onBack={() => setScreen("course")} title={activeTopic.label} sub={activeCourse?.code} />
        <div style={{ display: "flex", borderBottom: "1px solid #2a3a2a", background: "#0d1a0d" }}>
          {["questions", "notes"].map(t => (
            <button key={t} onClick={() => setTab(t)} style={{ flex: 1, padding: "13px 0", background: "none", border: "none", borderBottom: tab === t ? "3px solid #c8a84b" : "3px solid transparent", color: tab === t ? "#c8a84b" : "#666", fontSize: 13, fontWeight: "bold", cursor: "pointer" }}>
              {t === "questions" ? "📝 Past Questions" : "📖 Notes"}
            </button>
          ))}
        </div>
        <div style={{ padding: "16px" }}>
          {tab === "questions" && (
            <>
              {topicQs.length > 0 && <button onClick={startQuiz} style={S.goldBtn}>🎯 Start Quiz Mode ({topicQs.length} questions)</button>}
              {topicQs.length === 0 && <div style={{ ...S.card, textAlign: "center", color: "#666" }}>Questions being added for this topic soon 🔄</div>}
              {topicQs.map((q, qi) => {
                const isRev = revealed[qi], userAns = selected[qi];
                return (
                  <div key={qi} style={{ ...S.card, border: `1px solid ${isRev ? "#3a7a3a" : "#2a3a2a"}` }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                      <span style={S.tag}>JUPEB {q.year}</span>
                      {isRev && <span style={{ fontSize: 11, color: "#5cb85c" }}>✓ Ans: {q.answer}</span>}
                    </div>
                    <div style={{ fontSize: 14, lineHeight: 1.7, color: "#e8e4d0", marginBottom: 14 }}>{q.q}</div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                      {q.options.map((opt) => {
                        const l = opt[0], isSel = userAns === l, isRight = l === q.answer;
                        let bg = "#1e2e1e", border = "#2a3a2a", col = "#c8c4b0";
                        if (isRev && isRight) { bg = "#1e4a1e"; border = "#5cb85c"; col = "#90ee90"; }
                        else if (isRev && isSel && !isRight) { bg = "#4a1e1e"; border = "#dc3545"; col = "#ff9999"; }
                        else if (!isRev && isSel) { bg = "#2a3a1e"; border = "#c8a84b"; col = "#f0ece0"; }
                        return <button key={opt} onClick={() => { if (!isRev) setSelected(s => ({ ...s, [qi]: l })); }} style={{ background: bg, border: `1px solid ${border}`, borderRadius: 10, padding: "10px 14px", textAlign: "left", color: col, fontSize: 13, cursor: isRev ? "default" : "pointer" }}>{opt}</button>;
                      })}
                    </div>
                    {!isRev && <button onClick={() => setRevealed(r => ({ ...r, [qi]: true }))} style={{ marginTop: 12, background: "transparent", border: "1px solid #c8a84b", borderRadius: 8, color: "#c8a84b", fontSize: 12, padding: "8px 18px", cursor: "pointer", width: "100%" }}>Show Answer & Explanation</button>}
                    {isRev && <div style={S.exp}>💡 {q.exp}</div>}
                  </div>
                );
              })}
            </>
          )}
          {tab === "notes" && (
            <>
              {topicNotes.length === 0 && <div style={{ ...S.card, textAlign: "center", color: "#666" }}>Notes being added for this topic soon 🔄</div>}
              {topicNotes.map((n, i) => (
                <div key={i} style={S.card}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                    <div style={{ width: 30, height: 30, borderRadius: 8, background: "#c8a84b22", border: "1px solid #c8a84b55", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, color: "#c8a84b", fontWeight: "bold" }}>{i + 1}</div>
                    <div style={{ fontSize: 15, fontWeight: "bold", color: "#e8e4d0" }}>{n.title}</div>
                  </div>
                  <div style={{ fontSize: 13, lineHeight: 1.9, color: "#a8b8a8" }}>{n.body}</div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    );
  }

  // Course screen
  if (screen === "course" && activeCourse) {
    return (
      <div style={S.wrap}>
        <Header onBack={() => setScreen("home")} title={activeCourse.title} sub={`${activeCourse.code} · ${activeCourse.semester}`} />
        <div style={{ padding: "16px" }}>
          <div style={{ fontSize: 11, color: "#666", letterSpacing: 2, textTransform: "uppercase", marginBottom: 12 }}>Topics</div>
          {activeCourse.topics.map((t) => (
            <button key={t.id} onClick={() => openTopic(t)} style={{ ...S.card, display: "flex", alignItems: "center", gap: 14, cursor: "pointer", width: "100%", textAlign: "left", border: "1px solid #2a3a2a" }}
              onMouseEnter={e => e.currentTarget.style.border = "1px solid #c8a84b"}
              onMouseLeave={e => e.currentTarget.style.border = "1px solid #2a3a2a"}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: "bold", color: "#e8e4d0" }}>{t.label}</div>
                <div style={{ fontSize: 11, color: "#c8a84b", marginTop: 4 }}>
                  {(questions[t.id] || []).length} questions · {(notes[t.id] || []).length} notes
                </div>
              </div>
              <div style={{ color: "#c8a84b", fontSize: 18 }}>›</div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Grading screen
  if (screen === "grading") {
    return (
      <div style={S.wrap}>
        <Header onBack={() => setScreen("home")} title="JUPEB Grading System" />
        <div style={{ padding: "16px" }}>
          <div style={S.card}>
            <div style={{ fontSize: 13, color: "#a8b8a8", lineHeight: 1.8, marginBottom: 16 }}>
              JUPEB uses a 5-point grading scale. Maximum points = AAA = 15 + 1 (bonus for no F) = 16 points.
            </div>
            {grading.map((g) => (
              <div key={g.grade} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: "1px solid #1e2e1e" }}>
                <div style={{ fontSize: 22, fontWeight: "bold", color: "#c8a84b", width: 32 }}>{g.grade}</div>
                <div style={{ fontSize: 13, color: "#e8e4d0" }}>{g.marks}</div>
                <div style={{ fontSize: 13, color: "#a8b8a8" }}>{g.points} pts</div>
                <div style={{ fontSize: 13, color: g.remark === "Fail" ? "#dc3545" : g.remark === "Excellent" ? "#5cb85c" : "#c8a84b" }}>{g.remark}</div>
              </div>
            ))}
            <div style={{ marginTop: 16, fontSize: 12, color: "#666", lineHeight: 1.8 }}>
              Example: CCC = 3+3+3+1 = 10 pts{"\n"}Maximum AAA = 5+5+5+1 = 16 pts
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Home screen
  const totalQ = Object.values(questions).reduce((a, arr) => a + arr.length, 0);
  const totalN = Object.values(notes).reduce((a, arr) => a + arr.length, 0);
  return (
    <div style={S.wrap}>
      <div style={{ background: "linear-gradient(135deg,#1a3a1a,#0d2b0d)", borderBottom: "2px solid #c8a84b", padding: "18px 20px" }}>
        <div style={S.tag}>StudyNaija</div>
        <div style={{ fontSize: 22, fontWeight: "bold", color: "#f0ece0", marginTop: 4 }}>JUPEB Economics</div>
        <div style={{ fontSize: 12, color: "#8a9a8a", marginTop: 2 }}>Free • No subscription</div>
      </div>
      <div style={{ padding: "20px 16px" }}>
        <div style={{ background: "linear-gradient(135deg,#1e4d1e,#2d6a2d)", borderRadius: 18, padding: "22px 20px", marginBottom: 22, border: "1px solid #3a7a3a" }}>
          <div style={{ fontSize: 11, color: "#c8a84b", letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>ECN001 · ECN002 · ECN003 · ECN004</div>
          <div style={{ fontSize: 24, fontWeight: "bold", lineHeight: 1.3, marginBottom: 10 }}>Full Syllabus<br />Coverage 📊</div>
          <div style={{ fontSize: 13, color: "#b0c8b0", lineHeight: 1.6 }}>All 23 official JUPEB Economics topics — notes, past questions, quiz mode. 100% free.</div>
        </div>
        <div style={{ display: "flex", gap: 10, marginBottom: 22 }}>
          {[{ n: 23, l: "Topics" }, { n: totalQ, l: "Questions" }, { n: totalN, l: "Notes" }].map(({ n, l }) => (
            <div key={l} style={{ flex: 1, background: "#141f14", border: "1px solid #2a3a2a", borderRadius: 12, padding: "14px 8px", textAlign: "center" }}>
              <div style={{ fontSize: 22, fontWeight: "bold", color: "#c8a84b" }}>{n}</div>
              <div style={{ fontSize: 11, color: "#666", marginTop: 2 }}>{l}</div>
            </div>
          ))}
        </div>
        <div style={{ fontSize: 11, color: "#666", letterSpacing: 2, textTransform: "uppercase", marginBottom: 12 }}>Courses</div>
        {courses.map((c) => (
          <button key={c.id} onClick={() => openCourse(c)} style={{ ...S.card, display: "flex", alignItems: "center", gap: 14, cursor: "pointer", width: "100%", textAlign: "left" }}
            onMouseEnter={e => e.currentTarget.style.border = "1px solid #c8a84b"}
            onMouseLeave={e => e.currentTarget.style.border = "1px solid #2a3a2a"}>
            <div style={{ fontSize: 28 }}>{c.emoji}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 11, color: "#c8a84b", marginBottom: 2 }}>{c.code} · {c.semester}</div>
              <div style={{ fontSize: 14, fontWeight: "bold", color: "#e8e4d0" }}>{c.title}</div>
              <div style={{ fontSize: 11, color: "#666", marginTop: 3 }}>{c.topics.length} topics</div>
            </div>
            <div style={{ color: "#c8a84b", fontSize: 18 }}>›</div>
          </button>
        ))}
        <button onClick={() => setScreen("grading")} style={{ ...S.card, display: "flex", alignItems: "center", gap: 14, cursor: "pointer", width: "100%", textAlign: "left", border: "1px solid #2a3a2a" }}
          onMouseEnter={e => e.currentTarget.style.border = "1px solid #c8a84b"}
          onMouseLeave={e => e.currentTarget.style.border = "1px solid #2a3a2a"}>
          <div style={{ fontSize: 28 }}>🏆</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: "bold", color: "#e8e4d0" }}>JUPEB Grading System</div>
            <div style={{ fontSize: 11, color: "#666", marginTop: 3 }}>A=5pts · B=4pts · C=3pts · Max 16pts</div>
          </div>
          <div style={{ color: "#c8a84b", fontSize: 18 }}>›</div>
        </button>
        <div style={{ textAlign: "center", color: "#3a4a3a", fontSize: 11, marginTop: 24, lineHeight: 1.8 }}>
          Built from official JUPEB syllabus<br />More subjects coming based on your feedback
        </div>
      </div>
    </div>
  );
}
