export const courses = [
  {
    id: "acc001", code: "ACC001", title: "Basic Financial Accounting", semester: "First Semester", emoji: "📒",
    topics: [
      { id: "intro_acc",   label: "Introduction to Accounting" },
      { id: "iasb",        label: "Introduction to the Structure of IASB" },
      { id: "bookkeeping", label: "Basic Steps in Bookkeeping up to Trial Balance" },
      { id: "debit_credit",label: "Debit and Credit Entries in Accounting" },
      { id: "errors",      label: "Accounting Errors and Corrections" },
      { id: "bank_rec",    label: "Bank Reconciliation Statement" },
      { id: "end_period",  label: "End of Period Adjustment" },
      { id: "sole_prop",   label: "Financial Statement of Sole Proprietorship" },
      { id: "manufacturing",label: "Manufacturing Accounts" },
      { id: "partnership", label: "Partnership Accounts" },
      { id: "incomplete",  label: "Incomplete Records" },
      { id: "clubs",       label: "Accounts of Clubs and Society" },
      { id: "limited_co",  label: "Financial Statement of Limited Liability Companies" },
    ],
  },
  {
    id: "acc002", code: "ACC002", title: "Basic Cost and Management Accounting", semester: "First Semester", emoji: "🏭",
    topics: [
      { id: "cost_intro",    label: "Introduction to Cost and Management Accounting" },
      { id: "cost_elements", label: "Basic Elements of Cost" },
      { id: "material_cost", label: "Material Costing" },
      { id: "stock_control", label: "Quantitative Model for Material and Stock Controls" },
      { id: "labour_cost",   label: "Labour Costing" },
      { id: "overhead",      label: "Overhead Cost" },
      { id: "job_costing",   label: "Job Costing" },
      { id: "costing_tech",  label: "Costing Techniques" },
      { id: "cvp",           label: "Cost Volume Profit Analysis" },
      { id: "budgeting",     label: "Budgeting" },
      { id: "investment",    label: "Investment Appraisal" },
    ],
  },
  {
    id: "acc003", code: "ACC003", title: "Basic Auditing", semester: "Second Semester", emoji: "🔍",
    topics: [
      { id: "audit_history",   label: "History of Auditing" },
      { id: "audit_nature",    label: "Nature and Scope of Auditing" },
      { id: "audit_framework", label: "Audit Framework" },
      { id: "audit_comm",      label: "Audit Communication" },
      { id: "audit_report",    label: "Audit Report" },
      { id: "audit_issues",    label: "Contemporary Issues in Auditing" },
    ],
  },
  {
    id: "acc004", code: "ACC004", title: "Basic Principles of Nigerian Taxation", semester: "Second Semester", emoji: "🧾",
    topics: [
      { id: "tax_history",     label: "History of Tax and Taxation in Nigeria" },
      { id: "tax_auth",        label: "Tax Authorities in Nigeria" },
      { id: "tax_admin",       label: "Tax Administration in Nigeria" },
      { id: "basis_periods",   label: "Basis Periods" },
      { id: "tax_computation", label: "Computation of Tax Liabilities" },
    ],
  },
];

export const notes = {

  /* ═══════════════════════════════════════════════════════════
     ACC001 — BASIC FINANCIAL ACCOUNTING
  ═══════════════════════════════════════════════════════════ */

  intro_acc: [
    {
      title: "Nature and Definition of Accounting",
      key: "Accounting is the systematic process of recording, classifying, summarising, and communicating financial information to help users make informed economic decisions.",
      body: `Accounting is often called the "language of business." It involves four key stages:

1. RECORDING – Writing down every financial transaction as it occurs (e.g., Alhaji Musa's shop records every sale of tomatoes and onions).
2. CLASSIFYING – Grouping similar transactions into categories (e.g., all sales in a Sales Account, all rent payments in a Rent Expense Account).
3. SUMMARISING – Condensing classified data into financial statements (Income Statement, Balance Sheet).
4. COMMUNICATING – Presenting the results to users such as owners, banks, and the government (e.g., submitting accounts to FIRS for tax purposes).

Accounting is governed by principles, standards, and conventions to ensure that financial information is reliable and comparable across businesses and periods.`,
    },
    {
      title: "Distinction Between Book-Keeping and Financial Accounting",
      key: "Book-keeping is the mechanical recording of transactions, while Financial Accounting covers the broader process of classifying, summarising, interpreting, and reporting financial information.",
      body: `Many students confuse book-keeping with accounting. The table below shows the key differences:`,
      table: {
        headers: ["BASIS", "BOOK-KEEPING", "FINANCIAL ACCOUNTING"],
        rows: [
          ["Definition", "Mechanical recording of financial transactions in the books of original entry", "Complete process of recording, classifying, summarising, interpreting, and reporting"],
          ["Scope", "Narrower — focuses only on recording transactions", "Broader — includes analysis, interpretation, and preparation of final accounts"],
          ["Who does it?", "Book-keeper (e.g., Emeka the cashier at Dangote Flour Mills)", "Accountant (e.g., an ICAN-qualified Chartered Accountant at GTBank Plc)"],
          ["Output produced", "Day books, cash books, ledger entries", "Income Statement, Balance Sheet, Cash Flow Statement"],
          ["Decision-making", "Not directly used for business decisions", "Directly used by management, investors, and creditors for decisions"],
          ["Analytical skill", "Basic numeracy and recording skills required", "High-level analytical and professional judgement required"],
        ],
      },
    },
    {
      title: "Importance of Financial Accounting and Users of Financial Information",
      key: "Financial accounting is important because it provides reliable information to various stakeholders — owners, creditors, government, employees — who use it for different decision-making purposes.",
      body: `Financial accounting serves different groups (called users) who need financial information for different reasons:`,
      table: {
        headers: ["USER", "NIGERIAN EXAMPLE", "WHY THEY NEED THE INFORMATION"],
        rows: [
          ["Owners / Shareholders", "Shareholders of Access Bank Plc on the Nigerian Stock Exchange", "To assess profitability and decide whether to invest more or sell shares"],
          ["Management", "Board of Directors of Dangote Cement Plc", "To make operational, budgetary, and strategic decisions"],
          ["Creditors / Banks", "First Bank of Nigeria evaluating a loan application", "To assess the borrower's ability to repay — liquidity and solvency check"],
          ["Government (Tax Authority)", "Federal Inland Revenue Service (FIRS)", "To determine the correct tax liability of the business"],
          ["Employees", "Staff of MTN Nigeria Plc", "To assess job security, profitability for wage negotiations, and pension fund safety"],
          ["Investors (Potential)", "New investors considering shares on NGX (Nigerian Exchange Group)", "To decide whether to buy shares in a listed company"],
          ["Customers", "Distributors buying from a FMCG company like Unilever Nigeria", "To assess whether the business will continue to operate and supply goods reliably"],
          ["General Public / Regulators", "Nigerian citizens, CBN, SEC", "To understand the firm's contribution to the economy and ensure compliance"],
        ],
      },
    },
    {
      title: "Types of Not-For-Profit (NFP) Organisations",
      key: "Not-for-profit organisations are set up to provide services rather than make profit. Any surplus generated is retained for the organisation's objectives and not distributed to members.",
      body: `Unlike Aliko Dangote's businesses which aim at profit, NFP organisations exist to serve members or the community. Examples in Nigeria include:

1. CLUBS AND ASSOCIATIONS – e.g., Lagos Country Club, Ikeja Golf Club, university alumni associations.
2. CHARITABLE ORGANISATIONS – e.g., Fate Foundation, Nigerian Red Cross Society.
3. RELIGIOUS BODIES – e.g., Deeper Life Bible Church, Jamatu Nasril Islam (JNI), Catholic Diocese of Lagos.
4. EDUCATIONAL INSTITUTIONS – e.g., public universities and government secondary schools running non-commercial programmes.
5. PROFESSIONAL BODIES – e.g., ICAN (Institute of Chartered Accountants of Nigeria), CIBN (Chartered Institute of Bankers of Nigeria), NMA (Nigerian Medical Association).
6. GOVERNMENT AGENCIES – e.g., NAFDAC, SON (Standards Organisation of Nigeria), National Health Insurance Authority (NHIA).

KEY FINANCIAL STATEMENTS prepared by NFPs:
- Receipts and Payments Account (cash-based summary of all money received and paid)
- Income and Expenditure Account (equivalent of the Profit and Loss Account)
- Statement of Financial Position (Balance Sheet)

NOTE: The excess of income over expenditure is a SURPLUS (not profit); the reverse is called a DEFICIT.`,
    },
    {
      title: "The Accounting Equation",
      key: "The accounting equation states: ASSETS = LIABILITIES + OWNER'S EQUITY. Every business transaction affects at least two elements of this equation, and the equation always remains balanced.",
      body: `The accounting equation is the foundation of all double-entry bookkeeping. It shows that everything a business owns (assets) is financed either by creditors (liabilities) or by the owner (capital/equity).

FORMULA:
  Assets = Liabilities + Owner's Equity
  OR: Owner's Equity = Assets − Liabilities

EXAMPLE — Chidi's Electronics Store, Onitsha (Opening Position):`,
      table: {
        headers: ["ITEM", "AMOUNT (₦)"],
        rows: [
          ["Cash at hand", "200,000"],
          ["Inventory (phones and accessories)", "500,000"],
          ["Shop equipment (shelves, counter)", "300,000"],
          ["TOTAL ASSETS", "1,000,000"],
          ["Bank loan — Union Bank (liability)", "400,000"],
          ["Trade creditors — Alaba suppliers (liability)", "100,000"],
          ["TOTAL LIABILITIES", "500,000"],
          ["Owner's Equity / Capital (Chidi)", "500,000"],
          ["CHECK: Assets = Liabilities + Equity → ₦1,000,000 = ₦500,000 + ₦500,000", "✓ BALANCED"],
        ],
      },
    },
    {
      title: "Business Transactions and Their Impact on the Accounting Equation",
      key: "Every business transaction changes at least two items in the accounting equation, but the equation always remains balanced — total assets always equal total liabilities plus equity.",
      body: `Using Chidi's Electronics Store above, observe how each transaction below changes the equation while keeping it balanced:`,
      table: {
        headers: ["#", "TRANSACTION", "EFFECT ON ASSETS (₦)", "EFFECT ON LIABILITIES (₦)", "EFFECT ON EQUITY (₦)", "EQUATION STILL BALANCED?"],
        rows: [
          ["1", "Chidi invested additional ₦200,000 cash", "+200,000 Cash", "—", "+200,000 Capital", "✓ Both sides +200,000"],
          ["2", "Bought goods ₦80,000 on credit from Alaba supplier", "+80,000 Inventory", "+80,000 Creditor", "—", "✓ Both sides +80,000"],
          ["3", "Sold goods costing ₦40,000 for ₦60,000 cash", "+60,000 Cash; −40,000 Inventory (net +20,000)", "—", "+20,000 Profit", "✓ Both sides +20,000"],
          ["4", "Paid ₦50,000 cash to Alaba supplier", "−50,000 Cash", "−50,000 Creditor", "—", "✓ Both sides −50,000"],
          ["5", "Chidi withdrew ₦30,000 cash for personal use (drawings)", "−30,000 Cash", "—", "−30,000 Equity", "✓ Both sides −30,000"],
        ],
      },
    },
  ],
  iasb: [
    {
      title: "Structure of the International Accounting Standards Board (IASB)",
      key: "The IASB is the independent body responsible for developing and issuing International Financial Reporting Standards (IFRS). Nigeria adopted IFRS for publicly listed companies and significant public interest entities from 2012.",
      body: `The IASB operates under the oversight of the IFRS Foundation. Here is the full governance structure:`,
      table: {
        headers: ["BODY", "ROLE / FUNCTION"],
        rows: [
          ["IFRS Foundation (Trustees)", "Oversees the entire standard-setting process; appoints IASB members; ensures funding and public accountability"],
          ["Monitoring Board", "Public accountability layer — links the IASB to capital market regulators worldwide (e.g., SEC Nigeria, US SEC)"],
          ["IASB (International Accounting Standards Board)", "The core body — develops and publishes IAS and IFRS standards; has 14 members with diverse geographical representation"],
          ["IFRS Advisory Council (now IFRS Foundation Advisory Council)", "Advises the IASB on agenda priorities, major projects, and the impact of proposed standards"],
          ["IFRS Interpretations Committee (IFRIC)", "Issues interpretations (IFRIC Interpretations) clarifying how to apply specific IAS/IFRS where ambiguity exists"],
          ["Accounting Standards Advisory Forum (ASAF)", "A group of standard-setting bodies (including national bodies like FRCN in Nigeria) that advises the IASB"],
        ],
      },
    },
    {
      title: "The IASB Conceptual Framework",
      key: "The Conceptual Framework (2018) sets out the concepts underlying the preparation and presentation of financial statements for external users. It is not a standard, but it guides both standard-setters and preparers of accounts.",
      body: `The Conceptual Framework covers the following key areas:

1. OBJECTIVE OF FINANCIAL STATEMENTS
To provide financial information about the reporting entity that is useful to existing and potential investors, lenders, and other creditors in making decisions about providing resources to the entity.

2. QUALITATIVE CHARACTERISTICS OF FINANCIAL INFORMATION:
Two fundamental characteristics must be present, supported by four enhancing characteristics:`,
      table: {
        headers: ["CHARACTERISTIC", "TYPE", "MEANING", "NIGERIAN EXAMPLE"],
        rows: [
          ["Relevance", "Fundamental", "Information capable of making a difference to the decisions of users", "Zenith Bank's profit figures must genuinely help investors decide whether to buy or sell shares"],
          ["Faithful Representation", "Fundamental", "Information must be complete, neutral, and free from material error", "Dangote Cement's asset values must not be inflated to mislead potential investors"],
          ["Comparability", "Enhancing", "Users can compare statements across reporting periods or across different entities", "An investor can compare MTN Nigeria's 2022 and 2023 income statements reliably"],
          ["Verifiability", "Enhancing", "Independent observers should be able to reach the same conclusion", "KPMG Nigeria or Deloitte can re-examine First Bank's accounts and arrive at similar figures"],
          ["Timeliness", "Enhancing", "Information must be available before it loses its usefulness for decisions", "NNPC Ltd should publish annual reports promptly — a 3-year delay makes information irrelevant"],
          ["Understandability", "Enhancing", "Information must be presented clearly for a reasonably knowledgeable user", "Flour Mills Nigeria's balance sheet should be readable by any knowledgeable director or investor"],
        ],
      },
    },
    {
      title: "International Accounting Standards (IAS) and IFRS — Key Standards to Know",
      key: "IAS are older standards issued by the IASC (before 2001). IFRS are newer standards issued by the IASB (from 2001). Nigeria replaced its old SAS (Statements of Accounting Standards) with IFRS/IAS from 2012.",
      body: `Key standards commonly tested in JUPEB Accounting:`,
      table: {
        headers: ["STANDARD", "TITLE", "KEY REQUIREMENT / WHAT IT COVERS"],
        rows: [
          ["IAS 1", "Presentation of Financial Statements", "Sets out the minimum content and format of financial statements (Statement of Financial Position, Income Statement, etc.)"],
          ["IAS 2", "Inventories", "Stocks (inventory) must be valued at the lower of COST and NET REALISABLE VALUE (NRV). LIFO method is not permitted under IFRS."],
          ["IAS 7", "Statement of Cash Flows", "Requires entities to present a statement of cash flows classified under operating, investing, and financing activities"],
          ["IAS 16", "Property, Plant and Equipment (PPE)", "Covers recognition, measurement, and depreciation of fixed assets (e.g., Nestlé Nigeria's factory equipment)"],
          ["IAS 36", "Impairment of Assets", "Assets must not be carried at more than their recoverable amount — an impairment review may be needed"],
          ["IAS 37", "Provisions, Contingent Liabilities and Assets", "When to recognise provisions (e.g., Oando Plc setting aside funds for an ongoing legal case)"],
          ["IFRS 15", "Revenue from Contracts with Customers", "When and how to recognise revenue from the sale of goods or services"],
          ["IFRS 16", "Leases", "Lessees must recognise most leases on the balance sheet — no longer 'off-balance-sheet' financing"],
        ],
      },
    },
  ],
  bookkeeping: [
    {
      title: "Source Documents",
      key: "Source documents are the original business papers that provide evidence that a transaction has taken place. They are the starting point for entering transactions into the books of accounts.",
      body: `Every transaction must be backed by a source document before it can be recorded. In Nigerian business practice:`,
      table: {
        headers: ["SOURCE DOCUMENT", "PREPARED BY", "PURPOSE / NIGERIAN EXAMPLE"],
        rows: [
          ["Invoice (Sales Invoice)", "Seller (e.g., ABC Distributors Ltd, Kano)", "Details goods sold on credit — used to record in Sales Day Book and debtor's account"],
          ["Receipt", "Seller (e.g., Shoprite Ikeja cash receipt)", "Confirms cash received — used to record cash sales in the Cash Book"],
          ["Credit Note", "Seller (e.g., supplier of goods)", "Issued when the buyer returns goods — reduces the amount the buyer owes"],
          ["Debit Note", "Buyer", "Sent to supplier to request a credit note when goods are returned or overcharged"],
          ["Cheque Counterfoil (Stub)", "Buyer (e.g., GTBank cheque book stub)", "Evidence of payment by cheque — used to post payment in Cash Book"],
          ["Bank Statement", "Bank (e.g., First Bank monthly statement)", "Shows all transactions through the bank account — used for bank reconciliation"],
          ["Petty Cash Voucher", "Internal (e.g., office assistant buying stamps, airtime)", "Authorises and records small cash expenses under the imprest system"],
          ["Goods Received Note (GRN)", "Buyer's warehouse team (e.g., Nestlé Nigeria store keeper)", "Confirms quantity and condition of goods received from a supplier"],
          ["Payslip", "Employer (e.g., Flour Mills Nigeria monthly payroll)", "Evidence of salary paid — used to post wages/salaries expense"],
          ["Statement of Account", "Supplier / Creditor", "Summary of all amounts owed by the buyer — used to reconcile creditor balances"],
        ],
      },
    },
    {
      title: "Books of Original Entry (Subsidiary Books / Day Books)",
      key: "Books of original entry are where transactions are first recorded from source documents before being transferred (posted) to the ledger. They provide a chronological record of all transactions.",
      body: ``,
      table: {
        headers: ["BOOK OF ORIGINAL ENTRY", "WHAT IT RECORDS", "SOURCE DOCUMENT USED", "POSTED TO"],
        rows: [
          ["Sales Day Book (Sales Journal)", "All credit sales only (not cash sales)", "Sales invoices sent to customers", "Debtors' accounts (Dr) and Sales Account (Cr)"],
          ["Purchases Day Book (Purchases Journal)", "All credit purchases only (not cash purchases)", "Purchase invoices received from suppliers", "Creditors' accounts (Cr) and Purchases Account (Dr)"],
          ["Sales Returns Day Book (Returns Inward Journal)", "Goods returned by customers (returns inward)", "Credit notes issued to customers", "Customers' accounts (Cr) and Sales Returns Account (Dr)"],
          ["Purchases Returns Day Book (Returns Outward Journal)", "Goods returned to suppliers (returns outward)", "Debit notes sent / credit notes received", "Suppliers' accounts (Dr) and Purchases Returns Account (Cr)"],
          ["Cash Book", "All cash and bank receipts and payments", "Receipts, cheque counterfoils, bank statements", "Acts as both a book of original entry AND the Cash/Bank ledger account"],
          ["Petty Cash Book (Imprest System)", "Small cash expenses below a set limit", "Petty cash vouchers", "Individual expense accounts in the general ledger"],
          ["General Journal (Journal Proper)", "Unusual transactions not catered for by other books: opening entries, depreciation, corrections, bad debts, purchases of fixed assets on credit", "Accountant's instructions, board resolutions", "Relevant ledger accounts as per the journal entry"],
        ],
      },
    },
    {
      title: "The Ledger — Principal Book of Accounts",
      key: "The ledger is the principal book of accounts where all transactions are classified into individual T-accounts. Every account has a debit (Dr) side on the left and a credit (Cr) side on the right.",
      body: `There are three types of ledger:

1. SALES LEDGER (Debtors Ledger) — Contains the individual accounts of each customer who owes money to the business (e.g., Bola Pharmacy owes ₦50,000 to a drug distributor in Lagos).

2. PURCHASES LEDGER (Creditors Ledger) — Contains the accounts of each supplier the business owes money to (e.g., Kano Textile Suppliers is owed ₦120,000).

3. GENERAL LEDGER (Nominal Ledger) — Contains all other accounts: income, expenses, assets, liabilities, and capital.

EXAMPLE — Cash Account T-Format for Adaeze Stores, Enugu (January):`,
      table: {
        headers: ["Dr   CASH ACCOUNT   Cr", ""],
        rows: [
          ["Date       | Details              | ₦", "Date       | Details              | ₦"],
          ["1 Jan      | Capital — Adaeze     | 500,000", "5 Jan      | Purchases            | 200,000"],
          ["10 Jan     | Sales (cash)         | 150,000", "15 Jan     | Rent paid            | 50,000"],
          ["           |                      |", "31 Jan     | Balance c/d          | 400,000"],
          ["           | TOTAL                | 650,000", "           | TOTAL                | 650,000"],
          ["1 Feb      | Balance b/d          | 400,000", "           |                      |"],
        ],
      },
    },
    {
      title: "The Trial Balance",
      key: "A trial balance is a statement listing all ledger account balances at a specific date — debit balances in one column, credit balances in another. If correctly posted, both columns must equal.",
      body: `IMPORTANT: The trial balance is NOT a financial statement. It only checks the arithmetical accuracy of the double-entry records — it does not guarantee that the accounts are free from all errors (see Errors topic).

EXAMPLE — Trial Balance of Adaeze Stores as at 31 January:`,
      table: {
        headers: ["ACCOUNT NAME", "Dr (₦)", "Cr (₦)"],
        rows: [
          ["Capital — Adaeze", "", "500,000"],
          ["Cash", "400,000", ""],
          ["Purchases", "200,000", ""],
          ["Sales", "", "150,000"],
          ["Rent Expense", "50,000", ""],
          ["TOTAL", "650,000", "650,000 ✓"],
        ],
      },
    },
    {
      title: "Classification of Accounts (Types of Accounts)",
      key: "All ledger accounts are classified into three types: Personal Accounts (for persons and organisations), Real Accounts (for assets), and Nominal Accounts (for income and expenses). This determines where they appear in final accounts.",
      body: ``,
      table: {
        headers: ["TYPE OF ACCOUNT", "WHAT IT COVERS", "NIGERIAN EXAMPLES", "APPEARS IN"],
        rows: [
          ["Personal Account", "Accounts of individuals, companies, or institutions", "Emeka Obi (debtor), GTBank Plc (creditor), FIRS (tax payable), Kano Supplier", "Balance Sheet — as Debtors (asset) or Creditors (liability)"],
          ["Real Account", "Accounts of tangible and intangible assets", "Land and Building, Motor Vehicle, Cash, Bank, Machinery, Trademark, Goodwill", "Balance Sheet — as assets (fixed or current)"],
          ["Nominal Account", "Accounts of income, expenses, gains, and losses", "Sales Revenue, Rent Expense, Electricity (EKEDC bill), Wages, Discount Allowed, Commission Received", "Income Statement (Profit & Loss Account)"],
        ],
      },
    },
  ],
  debit_credit: [
    {
      title: "The Principle of Double Entry Bookkeeping",
      key: "The double entry principle states that every financial transaction has two equal and opposite effects — a debit (Dr) entry in one account and a credit (Cr) entry in another, so total debits always equal total credits.",
      body: `This principle was formalised by Luca Pacioli in 1494 and underpins all accounting systems used by Nigerian businesses, banks, and government agencies today. The golden rules are:`,
      table: {
        headers: ["TYPE OF ACCOUNT", "DEBIT (Dr) MEANS …", "CREDIT (Cr) MEANS …"],
        rows: [
          ["Real Account (Assets)", "Asset INCREASES (e.g., cash received, machinery purchased)", "Asset DECREASES (e.g., cash paid, asset disposed of)"],
          ["Personal Account (Debtors / Creditors)", "The person or company RECEIVES value — becomes a debtor to us", "The person or company GIVES value — becomes a creditor to us"],
          ["Nominal Account (Expenses)", "Expense or loss INCREASES (debit all expenses and losses)", "Expense decreases or is reversed"],
          ["Nominal Account (Income)", "Income decreases or is reversed", "Income or gain INCREASES (credit all income and gains)"],
        ],
      },
    },
    {
      title: "Practical Journalising — Adeola Supermarket, Lagos (January Transactions)",
      key: "A journal entry records the debit and credit accounts affected by each transaction, together with the amount and a brief narration. This is the formal instruction for the ledger.",
      body: `Adeola Supermarket in Lagos carried out the following transactions. Record them in journal form:`,
      table: {
        headers: ["TRANSACTION", "DEBIT ACCOUNT (Dr)", "₦", "CREDIT ACCOUNT (Cr)", "₦", "REASONING"],
        rows: [
          ["Adeola invested ₦1,000,000 cash to start the business", "Cash / Bank", "1,000,000", "Capital — Adeola", "1,000,000", "Asset (cash) increases; owner's equity (capital) increases"],
          ["Bought goods worth ₦300,000 on credit from Fatima Wholesale, Kano", "Purchases", "300,000", "Fatima Wholesale (Creditor)", "300,000", "Expense/asset (stock) increases; creditor (personal) created"],
          ["Sold goods for ₦200,000 cash", "Cash / Bank", "200,000", "Sales", "200,000", "Asset (cash) increases; income (sales) increases"],
          ["Paid rent of ₦50,000 by cheque (UBA)", "Rent Expense", "50,000", "Bank (UBA)", "50,000", "Expense increases; asset (bank) decreases"],
          ["Customer Bola returned goods worth ₦20,000 — refunded in cash", "Sales Returns (Returns Inward)", "20,000", "Cash", "20,000", "Income is reversed; asset (cash) decreases"],
          ["Returned goods worth ₦30,000 to Fatima Wholesale", "Fatima Wholesale (Creditor)", "30,000", "Purchases Returns (Returns Outward)", "30,000", "Creditor balance reduced; expense (purchases) reversed"],
          ["Adeola withdrew ₦40,000 cash for personal use", "Drawings — Adeola", "40,000", "Cash", "40,000", "Owner reduces equity (drawings); asset (cash) decreases"],
        ],
      },
    },
    {
      title: "T-Account Posting Example — Cash Account and Fatima Wholesale Account",
      key: "After writing journal entries, each debit and credit is posted to its respective T-account in the ledger. The balance is then calculated and carried down at the end of the period.",
      body: `Using the transactions above, the Cash Account and Fatima Wholesale Creditor Account would appear as follows:`,
      table: {
        headers: ["Dr   CASH ACCOUNT   Cr", ""],
        rows: [
          ["Date | Details | ₦", "Date | Details | ₦"],
          ["Jan 1  | Capital — Adeola  | 1,000,000", "Jan 4  | Rent (UBA cheque)  | 50,000"],
          ["Jan 3  | Sales             | 200,000", "Jan 6  | Sales Returns — Bola | 20,000"],
          ["       |                   |", "Jan 15 | Drawings — Adeola | 40,000"],
          ["       |                   |", "Jan 31 | Balance c/d       | 1,090,000"],
          ["TOTAL  |                   | 1,200,000", "TOTAL  |                   | 1,200,000"],
          ["Feb 1  | Balance b/d       | 1,090,000", ""],
        ],
      },
    },
  ],
  errors: [
    {
      title: "Types of Errors That Do NOT Affect the Trial Balance",
      key: "Six types of errors leave the trial balance in agreement (both sides equal) even though the accounts are wrong. These errors are harder to detect and require a careful review of the records.",
      body: `These errors are sometimes called 'errors of agreement.' A perfectly balanced trial balance does NOT mean the accounts are error-free.`,
      table: {
        headers: ["ERROR TYPE", "DESCRIPTION", "NIGERIAN EXAMPLE"],
        rows: [
          ["Error of Omission", "A transaction is completely left out of the books — both debit and credit are missing", "The ₦80,000 purchase from Alhaji Ismaila's Warehouse, Kano, was never entered anywhere"],
          ["Error of Commission", "Correct amount posted to the correct side but to the wrong person's account", "Sales of ₦50,000 to Chidi (debtor) were posted to Chinwe's account instead — both are debtors"],
          ["Error of Principle", "A transaction posted to the wrong class of account (capital vs. revenue)", "Buying a delivery van for ₦2,500,000 debited to 'Motor Vehicle Expenses' instead of 'Motor Vehicle Asset'"],
          ["Error of Original Entry (Error of First Entry)", "Wrong amount entered in both the debit and credit sides", "A ₦45,000 invoice from supplier recorded as ₦54,000 in both Purchases and Creditor accounts"],
          ["Compensating Error", "Two separate errors of equal amount cancel each other out — one on each side", "Sales overstated by ₦10,000 AND Wages also overstated by ₦10,000 — the trial balance still agrees"],
          ["Complete Reversal of Entries", "Correct accounts used but debit and credit are swapped", "Cash received from debtor Emeka ₦30,000: Cash Account debited ✓ but Emeka's account also debited ✗ instead of credited"],
        ],
      },
    },
    {
      title: "Errors That DO Cause the Trial Balance to Disagree",
      key: "Some errors cause one side of the trial balance to be larger than the other. These are more immediately obvious and must be corrected before finalising the accounts.",
      body: ``,
      table: {
        headers: ["ERROR TYPE", "DESCRIPTION", "EXAMPLE"],
        rows: [
          ["Single-Sided Entry", "Only one side of the double entry was recorded", "Purchased goods ₦60,000 on credit — only Purchases (Dr) was posted; creditor account was forgotten"],
          ["Posting to Wrong Side", "An entry posted to the wrong side of the correct account", "A cash receipt of ₦25,000 from debtor Ngozi posted to the credit of Cash Account instead of the debit"],
          ["Wrong Amount on One Side", "Debit and credit recorded with different amounts", "Purchase of ₦70,000 debited correctly but creditor account credited as ₦7,000 only"],
          ["Account Balance Incorrectly Extracted", "A ledger balance copied incorrectly to the trial balance", "Cash balance of ₦150,000 written as ₦15,000 in the trial balance"],
        ],
      },
    },
    {
      title: "The Suspense Account",
      key: "When the trial balance fails to agree, a suspense account is opened for the difference to allow work to continue. As each error is found and corrected, the suspense account is reduced until its balance becomes zero.",
      body: `PROCEDURE:
1. Calculate the difference between Dr and Cr columns of the trial balance.
2. Open a Suspense Account — enter the difference on whichever side is SMALLER to make the trial balance agree.
3. Investigate until all errors are found.
4. Post correcting journal entries — each entry partly or fully closes the suspense account.
5. When all errors are corrected, the Suspense Account balance = ₦0.

EXAMPLE — Olabisi Trading Company (Ibadan):
Trial balance: Credit side exceeds Debit side by ₦12,000 → open Suspense Account with a DEBIT of ₦12,000.

Two errors are later discovered:
- Error 1: Rent payment of ₦8,000 was debited to Sales Account instead of Rent Expense Account.
- Error 2: Cash received from debtor Akin ₦4,000 was entered in the Cash Book but not posted to Akin's account.

CORRECTING JOURNAL ENTRIES:`,
      table: {
        headers: ["JOURNAL ENTRY", "Dr (₦)", "Cr (₦)", "NARRATION"],
        rows: [
          ["Rent Expense Account", "8,000", "", "Correction: Rent debited to correct account"],
          ["  Sales Account", "", "8,000", "Remove incorrect debit from Sales Account"],
          ["  Suspense Account", "", "8,000", "Error 1 closes ₦8,000 of the suspense balance"],
          ["Suspense Account", "4,000", "", "Error 2: Akin's account omitted"],
          ["  Akin (Debtor) Account", "", "4,000", "Correct posting of cash received from Akin"],
        ],
      },
    },
    {
      title: "Control Accounts (Total Accounts)",
      key: "A control account is a summary account in the general ledger that holds the TOTAL of all individual debtor or creditor accounts. Its balance should always agree with the total of the subsidiary ledger it controls.",
      body: `Two main control accounts:
1. SALES LEDGER CONTROL ACCOUNT (Debtors Control Account) — total of all individual customer (debtor) accounts.
2. PURCHASES LEDGER CONTROL ACCOUNT (Creditors Control Account) — total of all individual supplier (creditor) accounts.

PURPOSE:
- Acts as an independent check on the accuracy of the subsidiary ledger.
- Allows early detection of errors (e.g., if Gbenga Electronics' individual debtor balances total ₦320,000 but the control account shows ₦315,000, there is a ₦5,000 error to find).
- Reduces fraud risk — the control account is maintained by a different person from the subsidiary ledger.

EXAMPLE — Sales Ledger Control Account of Gbenga Electronics, Ibadan (January):`,
      table: {
        headers: ["Dr   SALES LEDGER CONTROL ACCOUNT   Cr", ""],
        rows: [
          ["Details | ₦", "Details | ₦"],
          ["Balance b/d (opening debtors) | 150,000", "Cash received from debtors | 300,000"],
          ["Credit Sales (from Sales Day Book) | 500,000", "Discount Allowed to debtors | 10,000"],
          ["Dishonoured cheques (returned) | 5,000", "Sales Returns (Returns Inward) | 20,000"],
          ["", "Bad Debts Written Off | 5,000"],
          ["", "Balance c/d (closing debtors) | 320,000"],
          ["TOTAL | 655,000", "TOTAL | 655,000"],
          ["Balance b/d (Feb 1) | 320,000", ""],
        ],
      },
    },
  ],
  bank_rec: [
    {
      title: "Why the Cash Book and Bank Statement Disagree",
      key: "A bank reconciliation statement explains the difference between the Cash Book balance and the Bank Statement balance on the same date. They rarely agree because of timing differences and bank-initiated transactions.",
      body: `Common reasons for the difference (using Nigerian banking practice):`,
      table: {
        headers: ["REASON", "EXPLANATION", "NIGERIAN EXAMPLE"],
        rows: [
          ["Unpresented Cheques (Outstanding Cheques)", "Cheques issued by the business that have NOT yet been presented to the bank for payment", "Gbenga issued a cheque to his Alaba supplier on 28 January; supplier presented it to GTBank on 3 February — it is in the cash book but not the January bank statement"],
          ["Outstanding Lodgements (Uncredited Deposits)", "Cash or cheques paid into the bank but NOT yet credited on the bank statement", "Adeola deposited ₦200,000 cash at First Bank on 31 January; bank only credited it on 1 February"],
          ["Bank Charges / Commission on Turnover (COT)", "Charges deducted by the bank but NOT yet recorded in the cash book", "GTBank deducted ₦2,000 COT — not yet entered in the business cash book"],
          ["Standing Orders / Direct Debits", "Regular payments made automatically by the bank that the business has not yet recorded in the cash book", "Monthly electricity levy (EKEDC) or insurance premium of ₦5,000 paid automatically by UBA"],
          ["Bank Interest Received", "Interest credited by the bank that the business has not yet recorded", "Access Bank credited ₦3,500 interest on deposit — not yet in the cash book"],
          ["Dishonoured (Bounced) Cheques", "A cheque previously deposited was returned unpaid by the bank (e.g., insufficient funds)", "Emeka's ₦50,000 cheque was returned unpaid by Zenith Bank — the earlier credit in the cash book must be reversed"],
          ["Errors", "Errors made by either the business or the bank", "First Bank entered ₦55,000 instead of ₦5,500 — must be reported to the bank; or business made an error in cash book"],
        ],
      },
    },
    {
      title: "Updating the Cash Book Before Reconciliation",
      key: "Before preparing the reconciliation statement, the cash book must be updated for all items that appear on the bank statement but have not yet been entered in the cash book (bank charges, interest, standing orders, bounced cheques).",
      body: `UPDATED CASH BOOK METHOD — only items already in the cash book but not on the bank statement (unpresented cheques and outstanding lodgements) go into the reconciliation statement.

EXAMPLE — Chukwuemeka Enterprises, Onitsha (March):
Before updating: Cash Book balance = ₦190,000

Items on bank statement NOT in the cash book:
- GTBank COT (Commission on Turnover): ₦1,500 (debit — bank took it out)
- Standing order — AIICO Insurance: ₦5,000 (debit)
- Interest received from GTBank: ₦3,000 (credit)

Updated Cash Book:`,
      table: {
        headers: ["Dr   CASH BOOK (Bank Column) — UPDATED   Cr", ""],
        rows: [
          ["Details | ₦", "Details | ₦"],
          ["Balance b/d (before update) | 190,000", "GTBank — COT charges | 1,500"],
          ["Interest received (GTBank) | 3,000", "Standing order — AIICO Insurance | 5,000"],
          ["", "Balance c/d (updated) | 186,500"],
          ["TOTAL | 193,000", "TOTAL | 193,000"],
          ["Balance b/d (updated) | 186,500", ""],
        ],
      },
    },
    {
      title: "Preparing the Bank Reconciliation Statement",
      key: "The bank reconciliation statement starts from the Bank Statement balance and adjusts for outstanding lodgements (add) and unpresented cheques (deduct) to arrive at the updated Cash Book balance.",
      body: `EXAMPLE — Chukwuemeka Enterprises as at 31 March (continuing from above):

After updating the cash book, the Updated Cash Book balance = ₦186,500
Bank Statement balance = ₦240,000

Remaining timing differences:
- Outstanding lodgement: ₦12,000 (deposited 31 March, not yet on bank statement)
- Unpresented cheques: ₦65,500 (issued but not yet presented to GTBank)

FORMAT — Starting from Bank Statement Balance (most common in Nigerian exams):`,
      table: {
        headers: ["BANK RECONCILIATION STATEMENT — Chukwuemeka Enterprises as at 31 March", "₦", "₦"],
        rows: [
          ["Balance as per Bank Statement (GTBank)", "", "240,000"],
          ["ADD: Outstanding Lodgement (deposited 31 March, not yet credited)", "12,000", ""],
          ["", "", "252,000"],
          ["LESS: Unpresented Cheques (issued but not yet presented)", "(65,500)", ""],
          ["Balance as per Updated Cash Book", "", "186,500 ✓"],
        ],
      },
    },
    {
      title: "Alternative Format — Starting from Cash Book Balance",
      key: "An alternative (less common) format for the bank reconciliation starts from the Cash Book balance and adjusts to arrive at the Bank Statement balance.",
      body: `Using the same Chukwuemeka Enterprises example:`,
      table: {
        headers: ["BANK RECONCILIATION STATEMENT (Alternative Format) as at 31 March", "₦", "₦"],
        rows: [
          ["Balance as per Updated Cash Book", "", "186,500"],
          ["ADD: Unpresented Cheques (not yet deducted by bank)", "65,500", ""],
          ["", "", "252,000"],
          ["LESS: Outstanding Lodgement (not yet credited by bank)", "(12,000)", ""],
          ["Balance as per Bank Statement (GTBank)", "", "240,000 ✓"],
        ],
      },
    },
  ],
  end_period: [
    {
      title: "The Periodicity Concept and the Matching (Accruals) Concept",
      key: "The Periodicity Concept divides the life of a business into equal reporting periods. The Matching Concept requires that expenses be matched against the revenues they helped generate in the same accounting period — regardless of when cash moves.",
      body: `THE PERIODICITY CONCEPT:
Businesses do not wait until they close down before preparing accounts. Accounts are prepared at regular intervals — usually every 12 months. This allows stakeholders to compare performance across periods and comply with tax obligations to FIRS.

THE MATCHING (ACCRUALS) CONCEPT:
Income and expenses are recognised when they are earned or incurred, NOT when cash is received or paid.

ACCRUALS AND PREPAYMENTS — the four key adjustments:`,
      table: {
        headers: ["ADJUSTMENT", "MEANING", "INCOME STATEMENT EFFECT", "BALANCE SHEET EFFECT", "NIGERIAN EXAMPLE"],
        rows: [
          ["Accrued Expense (Expense Owing)", "Expense incurred but not yet paid by year-end", "ADD to expense in I/S", "Current Liability — Accrual", "December electricity bill of ₦15,000 not yet paid to EKEDC — must still be charged to this year"],
          ["Prepaid Expense (Expense in Advance)", "Expense paid this year but partly for next year", "DEDUCT from expense in I/S", "Current Asset — Prepayment", "Annual insurance ₦120,000 paid October — 3 months (₦30,000) belongs to next year"],
          ["Accrued Income (Income Owing)", "Income earned but not yet received in cash", "ADD to income in I/S", "Current Asset — Accrued Income", "Commission of ₦20,000 earned in December not yet received"],
          ["Deferred Income (Income in Advance)", "Cash received for a future period", "DEDUCT from income in I/S", "Current Liability — Deferred Income", "Rent of ₦60,000 received for Jan–Mar next year must be deferred"],
        ],
      },
    },
    {
      title: "Capital Expenditure vs Revenue Expenditure",
      key: "Capital Expenditure acquires or improves a non-current asset giving multi-year benefit — it goes to the Balance Sheet. Revenue Expenditure is day-to-day spending consumed in one period — it goes to the Income Statement.",
      body: `This distinction is critical. Treating capital expenditure as revenue (or vice versa) is an Error of Principle, which distorts both the Income Statement and Balance Sheet.`,
      table: {
        headers: ["BASIS", "CAPITAL EXPENDITURE", "REVENUE EXPENDITURE"],
        rows: [
          ["Nature", "Acquiring, constructing, or improving a fixed asset", "Day-to-day costs of operating the business"],
          ["Benefit period", "More than one accounting year", "Consumed within one accounting year"],
          ["Recorded in", "Balance Sheet — as a Non-Current Asset", "Income Statement — as an Expense"],
          ["Nigerian Examples", "Buying a delivery truck ₦5,000,000; building a factory in Ogun State; purchasing land in Abuja; installing solar panels on office roof", "Fuel for the truck; rent of market stall; salaries; advertising on Channels TV; repair of broken window"],
          ["Tricky borderline", "Extension to a building increases capacity → Capital", "Repair of building restores original condition → Revenue"],
        ],
      },
    },
    {
      title: "Depreciation — Meaning, Causes, and Straight Line Method",
      key: "Depreciation is the systematic allocation of the cost of a non-current asset over its useful economic life. It matches the cost of using the asset against the revenue it helps generate in each accounting period.",
      body: `CAUSES OF DEPRECIATION:
1. WEAR AND TEAR — Physical deterioration through use (e.g., a delivery van of Flour Mills Nigeria).
2. OBSOLESCENCE — Asset becomes outdated due to technology (e.g., old computers replaced by new systems).
3. EFFLUXION OF TIME — Some assets expire over time (e.g., a 10-year leasehold on a Lagos office building).
4. DEPLETION — Quantity reduces with use (e.g., an oil well or quarry operated in Rivers State).

STRAIGHT LINE METHOD (Fixed Instalment):
Annual Depreciation = (Cost − Residual Value) ÷ Useful Life in Years

EXAMPLE — Emeka Transport Ltd buys a delivery truck:
Cost: ₦4,000,000 | Useful life: 5 years | Residual (scrap) value: ₦500,000
Annual depreciation = (₦4,000,000 − ₦500,000) ÷ 5 = ₦700,000 per year`,
      table: {
        headers: ["YEAR", "Cost (₦)", "Annual Depreciation (₦)", "Accumulated Depreciation (₦)", "Net Book Value (₦)"],
        rows: [
          ["Year 1", "4,000,000", "700,000", "700,000", "3,300,000"],
          ["Year 2", "4,000,000", "700,000", "1,400,000", "2,600,000"],
          ["Year 3", "4,000,000", "700,000", "2,100,000", "1,900,000"],
          ["Year 4", "4,000,000", "700,000", "2,800,000", "1,200,000"],
          ["Year 5", "4,000,000", "700,000", "3,500,000", "500,000 (Residual Value)"],
        ],
      },
    },
    {
      title: "Depreciation — Reducing Balance Method and Balance Sheet Presentation",
      key: "The Reducing Balance Method applies a fixed percentage to the Net Book Value (NBV) at the start of each year, giving higher depreciation charges early in the asset's life and lower charges later.",
      body: `REDUCING BALANCE METHOD:
Annual Depreciation = Fixed % × NBV at start of year

EXAMPLE — same truck, using 30% reducing balance:`,
      table: {
        headers: ["YEAR", "NBV at Start (₦)", "Depreciation @ 30% (₦)", "NBV at End (₦)"],
        rows: [
          ["Year 1", "4,000,000", "1,200,000", "2,800,000"],
          ["Year 2", "2,800,000", "840,000", "1,960,000"],
          ["Year 3", "1,960,000", "588,000", "1,372,000"],
          ["Year 4", "1,372,000", "411,600", "960,400"],
          ["Year 5", "960,400", "288,120", "672,280"],
        ],
      },
    },
    {
      title: "Provision for Bad and Doubtful Debts (Allowance for Receivables)",
      key: "A provision for doubtful debts is a prudent estimate of the amount of trade receivables (debtors) that may not be collected. Changes in the provision are charged or credited to the Income Statement each year.",
      body: `DISTINCTION:
- BAD DEBT WRITTEN OFF: A debt confirmed irrecoverable — removed from debtors.
  Journal: Dr Bad Debts Expense    Cr Debtor's Account

- PROVISION FOR DOUBTFUL DEBTS: An estimate of debts that MIGHT not be collected.
  Journal (creating/increasing provision): Dr Bad Debts Expense    Cr Provision for Doubtful Debts
  Journal (decreasing provision): Dr Provision for Doubtful Debts    Cr Bad Debts Recovered (income)

EXAMPLE — Bisi Superstore, Ibadan (5% provision on year-end debtors):`,
      table: {
        headers: ["YEAR", "Debtors (₦)", "Required Provision (5%) (₦)", "Movement (₦)", "Income Statement Effect", "Debtors — Net on Balance Sheet (₦)"],
        rows: [
          ["Year 1", "500,000", "25,000", "+25,000 (new)", "Charge ₦25,000 as expense", "475,000"],
          ["Year 2", "600,000", "30,000", "+5,000 (increase)", "Charge ₦5,000 as expense", "570,000"],
          ["Year 3", "400,000", "20,000", "−10,000 (decrease)", "Credit ₦10,000 (reduces expense)", "380,000"],
        ],
      },
    },
  ],
  sole_prop: [
    {
      title: "Structure of the Financial Statements of a Sole Trader",
      key: "A sole trader prepares two main financial statements: (1) The Income Statement (Trading, Profit and Loss Account) — shows profitability; and (2) The Balance Sheet (Statement of Financial Position) — shows the financial position on a given date.",
      body: `A sole trader (one-man business) is the simplest form of business ownership in Nigeria — e.g., Mama Ngozi's provision store in Enugu, Bisi's tailoring shop in Ibadan, or Alhaji Musa's wholesale goods depot in Kano.

THE INCOME STATEMENT has two sections:
Section 1 — TRADING ACCOUNT: calculates GROSS PROFIT (Sales minus Cost of Goods Sold).
Section 2 — PROFIT & LOSS ACCOUNT: deducts operating expenses from Gross Profit to arrive at NET PROFIT.

COST OF GOODS SOLD (COGS) FORMULA:
Opening Stock + Purchases (net of returns) + Carriage Inwards − Closing Stock = COGS`,
    },
    {
      title: "Preparing the Income Statement (Trading, Profit and Loss Account)",
      key: "The Trading Account calculates Gross Profit; the Profit and Loss Account deducts all operating expenses to arrive at Net Profit or Net Loss for the period.",
      body: `EXAMPLE — Chukwuemeka Trading, Onitsha (for the year ended 31 December):`,
      table: {
        headers: ["INCOME STATEMENT OF CHUKWUEMEKA TRADING for the year ended 31 December", "₦", "₦"],
        rows: [
          ["REVENUE (Sales)", "", "800,000"],
          ["Less: Sales Returns (Returns Inward)", "", "(20,000)"],
          ["NET REVENUE / TURNOVER", "", "780,000"],
          ["Less: COST OF GOODS SOLD:", "", ""],
          ["  Opening Stock (1 Jan)", "50,000", ""],
          ["  Add: Purchases", "400,000", ""],
          ["  Less: Purchases Returns", "(15,000)", ""],
          ["  Add: Carriage Inwards", "10,000", ""],
          ["  Net Purchases", "395,000", ""],
          ["  Cost of Goods Available for Sale", "445,000", ""],
          ["  Less: Closing Stock (31 Dec)", "(80,000)", ""],
          ["COST OF GOODS SOLD", "", "(365,000)"],
          ["GROSS PROFIT", "", "415,000"],
          ["Add: Other Income:", "", ""],
          ["  Discount Received", "", "5,000"],
          ["  Commission Received", "", "10,000"],
          ["TOTAL INCOME", "", "430,000"],
          ["Less: OPERATING EXPENSES:", "", ""],
          ["  Salaries and Wages", "120,000", ""],
          ["  Rent and Rates", "60,000", ""],
          ["  Electricity (EKEDC)", "18,000", ""],
          ["  Depreciation — Motor Vehicle", "50,000", ""],
          ["  Bad Debts Written Off", "5,000", ""],
          ["  Increase in Provision for Doubtful Debts", "3,000", ""],
          ["  Discount Allowed", "4,000", ""],
          ["  Carriage Outwards", "7,000", ""],
          ["  General Expenses", "12,000", ""],
          ["TOTAL EXPENSES", "", "(279,000)"],
          ["NET PROFIT for the year", "", "151,000"],
        ],
      },
    },
    {
      title: "Preparing the Balance Sheet (Statement of Financial Position)",
      key: "The Balance Sheet shows what a business owns (assets), what it owes (liabilities), and the owner's net worth (capital) at a specific date. It must always balance: Assets = Capital + Liabilities.",
      body: `Continuing from Chukwuemeka Trading above — Balance Sheet as at 31 December:`,
      table: {
        headers: ["BALANCE SHEET OF CHUKWUEMEKA TRADING as at 31 December", "Cost (₦)", "Accum. Depn (₦)", "NBV (₦)"],
        rows: [
          ["NON-CURRENT ASSETS:", "", "", ""],
          ["Motor Vehicle", "500,000", "(150,000)", "350,000"],
          ["Furniture and Fittings", "200,000", "(40,000)", "160,000"],
          ["TOTAL NON-CURRENT ASSETS", "", "", "510,000"],
          ["CURRENT ASSETS:", "", "", ""],
          ["Closing Stock (Inventory)", "", "", "80,000"],
          ["Trade Debtors", "120,000", "", ""],
          ["  Less: Provision for Doubtful Debts", "(8,000)", "", "112,000"],
          ["Prepaid Expenses", "", "", "5,000"],
          ["Cash at Bank (GTBank)", "", "", "95,000"],
          ["Cash in Hand", "", "", "10,000"],
          ["TOTAL CURRENT ASSETS", "", "", "302,000"],
          ["TOTAL ASSETS", "", "", "812,000"],
          ["FINANCED BY:", "", "", ""],
          ["CAPITAL ACCOUNT:", "", "", ""],
          ["Opening Capital (1 Jan)", "", "", "560,000"],
          ["Add: Net Profit for the year", "", "", "151,000"],
          ["Less: Drawings", "", "", "(120,000)"],
          ["CLOSING CAPITAL", "", "", "591,000"],
          ["NON-CURRENT LIABILITIES:", "", "", ""],
          ["Bank Loan (Union Bank — 3 years)", "", "", "100,000"],
          ["CURRENT LIABILITIES:", "", "", ""],
          ["Trade Creditors", "", "", "85,000"],
          ["Accrued Expenses (EKEDC accrual)", "", "", "15,000"],
          ["VAT Payable (FIRS)", "", "", "21,000"],
          ["TOTAL CAPITAL AND LIABILITIES", "", "", "812,000 ✓"],
        ],
      },
    },
  ],
  manufacturing: [
    {
      title: "Nature of Manufacturing Accounts",
      key: "A manufacturing account is prepared by businesses that produce goods rather than simply buy and resell them. It calculates the total cost of goods manufactured during a period before transferring that cost to the Trading Account.",
      body: `A manufacturing account is needed by businesses such as:
- A soap-making company in Aba producing bar soap.
- A garment factory in Lagos sewing school uniforms.
- A bakery in Abuja producing bread and pastries.
- A small-scale cassava processing plant in Oyo producing garri and starch.

Unlike a trader who buys finished goods to resell, a manufacturer buys RAW MATERIALS, incurs FACTORY LABOUR and FACTORY OVERHEADS to convert them into finished goods.

KEY COST CONCEPTS:`,
      table: {
        headers: ["COST CONCEPT", "MEANING", "EXAMPLE (Aba Soap Company)"],
        rows: [
          ["Direct Materials (Raw Materials)", "Materials that become part of the finished product", "Palm oil, caustic soda, perfume, colouring"],
          ["Direct Labour", "Wages of workers directly involved in production", "Factory floor workers mixing and moulding soap"],
          ["Direct Expenses", "Other costs directly traceable to the product", "Royalties paid per unit; special dies or moulds"],
          ["PRIME COST", "Direct Materials + Direct Labour + Direct Expenses", "All three above combined"],
          ["Factory (Manufacturing) Overhead", "Indirect factory costs not directly traceable to individual units", "Factory rent, factory electricity, factory supervisor's salary, depreciation of machinery"],
          ["FACTORY COST OF PRODUCTION", "Prime Cost + Factory Overhead (adjusted for WIP)", "Total cost incurred to manufacture all completed units"],
          ["Work-in-Progress (WIP)", "Partially completed units at the start or end of the period", "Soap batches still in mixing tanks at year-end"],
        ],
      },
    },
    {
      title: "Preparing the Manufacturing Account",
      key: "The Manufacturing Account starts with raw materials consumed, adds direct labour and factory overheads to get to Factory Cost of Production, adjusted for opening and closing Work-in-Progress.",
      body: `EXAMPLE — Aba Soap Company Ltd (for the year ended 31 December):`,
      table: {
        headers: ["MANUFACTURING ACCOUNT OF ABA SOAP COMPANY LTD for the year ended 31 December", "₦", "₦"],
        rows: [
          ["RAW MATERIALS CONSUMED:", "", ""],
          ["  Opening Stock of Raw Materials", "30,000", ""],
          ["  Add: Purchases of Raw Materials", "250,000", ""],
          ["  Less: Closing Stock of Raw Materials", "(20,000)", ""],
          ["COST OF RAW MATERIALS CONSUMED", "", "260,000"],
          ["Add: DIRECT LABOUR (Factory Workers' Wages)", "", "180,000"],
          ["Add: DIRECT EXPENSES (Royalties)", "", "10,000"],
          ["PRIME COST", "", "450,000"],
          ["Add: FACTORY (MANUFACTURING) OVERHEAD:", "", ""],
          ["  Factory Rent and Rates", "40,000", ""],
          ["  Factory Electricity (BEDC)", "25,000", ""],
          ["  Factory Supervisor's Salary", "60,000", ""],
          ["  Depreciation — Factory Machinery", "30,000", ""],
          ["  Factory Insurance", "5,000", ""],
          ["TOTAL FACTORY OVERHEAD", "", "160,000"],
          ["FACTORY COST (before WIP adjustment)", "", "610,000"],
          ["Add: Opening Work-in-Progress (WIP)", "", "15,000"],
          ["Less: Closing Work-in-Progress (WIP)", "", "(20,000)"],
          ["FACTORY COST OF FINISHED GOODS (transferred to Trading Account)", "", "605,000"],
        ],
      },
    },
    {
      title: "The Full Financial Statement Flow for a Manufacturer",
      key: "The Factory Cost of Production from the Manufacturing Account replaces 'Purchases' in the Trading Account. The Trading Account then calculates Gross Profit, followed by the Profit and Loss Account for Net Profit.",
      body: `EXTRACT — Trading Account of Aba Soap Company Ltd (continuing from above):`,
      table: {
        headers: ["TRADING ACCOUNT — ABA SOAP COMPANY LTD (extract)", "₦", "₦"],
        rows: [
          ["Sales (Net Revenue)", "", "1,200,000"],
          ["Less: COST OF GOODS SOLD:", "", ""],
          ["  Opening Stock of Finished Goods", "50,000", ""],
          ["  Add: Factory Cost of Finished Goods (from Mfg Account)", "605,000", ""],
          ["  Cost of Goods Available for Sale", "655,000", ""],
          ["  Less: Closing Stock of Finished Goods", "(75,000)", ""],
          ["COST OF GOODS SOLD", "", "(580,000)"],
          ["GROSS PROFIT (→ to Profit & Loss Account)", "", "620,000"],
        ],
      },
    },
  ],
  partnership: [
    {
      title: "Introduction to Partnership — Features and the Partnership Agreement",
      key: "A partnership is a business owned by two to twenty persons (two to fifty for professional partnerships) who share profits, losses, and responsibilities according to their agreement.",
      body: `In Nigeria, partnerships are common among traders, law firms, medical practices, and accounting firms (e.g., Deloitte Nigeria, KPMG Nigeria are structured as partnerships at the professional level).

KEY FEATURES OF A PARTNERSHIP:
1. 2 to 20 members (up to 50 for professional practices — legal, medical, accounting).
2. Governed by the Partnership Act and by the Partnership Deed (agreement).
3. Partners have unlimited liability (except in a Limited Liability Partnership).
4. Profits and losses shared in agreed ratio.

THE PARTNERSHIP DEED (Agreement) typically covers:`,
      table: {
        headers: ["ITEM COVERED BY THE DEED", "DESCRIPTION", "EXAMPLE"],
        rows: [
          ["Profit-sharing Ratio (PSR)", "The agreed ratio for sharing net profits and losses", "Amaka and Bode share profits 3:2"],
          ["Interest on Capital", "A reward given to partners for investing more capital — charged before profit sharing", "18% per annum on capital balances"],
          ["Interest on Drawings", "A charge against partners for withdrawing money during the year — added back before sharing", "10% per annum on drawings"],
          ["Partners' Salaries", "Salary paid to a working partner (e.g., managing partner) — NOT an employment salary; it is an appropriation", "Amaka receives a salary of ₦120,000 p.a. for managing the firm"],
          ["Interest on Loan by Partner", "If a partner lends money to the firm beyond their capital, interest is charged as an expense (Income Statement)", "Bode lent extra ₦500,000 — interest at 15% p.a. = ₦75,000 expense"],
        ],
      },
    },
    {
      title: "The Appropriation Account",
      key: "The Partnership Appropriation Account shows how the Net Profit (from the Profit and Loss Account) is divided between partners after accounting for salaries, interest on capital, interest on drawings, and any other agreed appropriations.",
      body: `EXAMPLE — Amaka and Bode Partnership, Lagos (year ended 31 December):

Net Profit (from P&L Account) = ₦500,000
Appropriations:
- Amaka's salary: ₦120,000
- Interest on Capital: Amaka ₦30,000; Bode ₦20,000 (at 10% on their capitals of ₦300,000 and ₦200,000)
- Interest on Drawings: Amaka ₦12,000; Bode ₦8,000
- Profit-sharing ratio: Amaka:Bode = 3:2`,
      table: {
        headers: ["APPROPRIATION ACCOUNT OF AMAKA AND BODE for the year ended 31 December", "₦", "₦"],
        rows: [
          ["Net Profit (from P&L Account)", "", "500,000"],
          ["Add: Interest on Drawings:", "", ""],
          ["  Amaka", "12,000", ""],
          ["  Bode", "8,000", ""],
          ["", "", "20,000"],
          ["PROFIT AVAILABLE FOR APPROPRIATION", "", "520,000"],
          ["Less: Partners' Salary — Amaka", "", "(120,000)"],
          ["Less: Interest on Capital:", "", ""],
          ["  Amaka (10% × ₦300,000)", "30,000", ""],
          ["  Bode (10% × ₦200,000)", "20,000", "(50,000)"],
          ["RESIDUAL PROFIT (shared 3:2)", "", "350,000"],
          ["Share of Residual Profit — Amaka (3/5 × ₦350,000)", "", "210,000"],
          ["Share of Residual Profit — Bode (2/5 × ₦350,000)", "", "140,000"],
          ["TOTAL ALLOCATED", "", "520,000 ✓"],
        ],
      },
    },
    {
      title: "Partners' Capital and Current Accounts",
      key: "The Capital Account records each partner's permanent investment in the firm. The Current Account records each partner's share of profits, salaries, interest, and drawings during the year. They are usually kept as separate accounts.",
      body: `WHY SEPARATE ACCOUNTS?
- The Capital Account is fixed (changes only when new capital is introduced or capital is withdrawn permanently).
- The Current Account fluctuates each year with profits earned, drawings taken, and other adjustments.

PARTNERS' CURRENT ACCOUNTS (Continuing Amaka and Bode example):`,
      table: {
        headers: ["Dr   CURRENT ACCOUNTS   Cr", "", "", ""],
        rows: [
          ["Details", "Amaka (₦)", "Bode (₦)", "Details | Amaka (₦) | Bode (₦)"],
          ["Drawings", "150,000", "100,000", "Balance b/d (opening) | 20,000 | 15,000"],
          ["Interest on Drawings", "12,000", "8,000", "Salary — Amaka | 120,000 | —"],
          ["Balance c/d", "218,000", "67,000", "Interest on Capital | 30,000 | 20,000"],
          ["", "", "", "Share of Residual Profit | 210,000 | 140,000"],
          ["TOTAL", "380,000", "175,000", "TOTAL | 380,000 | 175,000"],
          ["", "", "", "Balance b/d | 218,000 | 67,000"],
        ],
      },
    },
    {
      title: "Partnership Balance Sheet",
      key: "The partnership Balance Sheet is similar to a sole trader's but has a CAPITAL SECTION showing the Capital Account and Current Account balances of each partner separately.",
      body: `EXTRACT — Balance Sheet (Capital Section) of Amaka and Bode Partnership:`,
      table: {
        headers: ["FINANCED BY (CAPITAL SECTION)", "Amaka (₦)", "Bode (₦)", "Total (₦)"],
        rows: [
          ["Capital Accounts", "300,000", "200,000", "500,000"],
          ["Current Accounts", "218,000", "67,000", "285,000"],
          ["TOTAL PARTNERS' FUNDS", "518,000", "267,000", "785,000"],
        ],
      },
    },
  ],
  incomplete: [
    {
      title: "Nature of Incomplete Records",
      key: "Incomplete records occur when a business has not kept a full double-entry system. Accounts are reconstructed from available information — bank statements, receipts, invoices, and memory. Common among small traders in Nigeria.",
      body: `Many small Nigerian businesses — market traders in Onitsha, roadside mechanics in Oshodi, petty traders in Balogun Market Lagos — do not keep formal double-entry books. When they need to prepare accounts (e.g., for a bank loan application or FIRS tax assessment), accounts must be reconstructed from incomplete data.

TWO MAIN METHODS:
1. STATEMENT OF AFFAIRS METHOD — used when only opening and closing net worth figures are available; profit is estimated from the change in capital.
2. RECONSTRUCTING THE TRADING ACCOUNT — used when partial records exist; T-accounts are rebuilt to find missing figures (e.g., total sales, total purchases, debtors, creditors).

FORMULA FOR PROFIT USING STATEMENT OF AFFAIRS:
Net Profit = Closing Capital − Opening Capital + Drawings − Additional Capital Introduced`,
    },
    {
      title: "Statement of Affairs Method",
      key: "A Statement of Affairs is like a simple Balance Sheet prepared from a list of assets and liabilities. The difference between assets and liabilities gives the Capital (net worth) at that date.",
      body: `EXAMPLE — Mama Chidinma's Foodstuff Business, Onitsha:

Opening position (1 January):
Assets: Cash ₦50,000; Stock ₦200,000; Market stall equipment ₦80,000; Debtors ₦30,000
Liabilities: Creditors ₦60,000; Loan from cooperative ₦40,000

Closing position (31 December):
Assets: Cash ₦80,000; Stock ₦280,000; Equipment ₦60,000 (after depreciation); Debtors ₦50,000
Liabilities: Creditors ₦70,000; Loan ₦30,000

During the year: Drawings = ₦150,000; Additional capital introduced = ₦0

STEP 1 — Statement of Affairs (Opening):`,
      table: {
        headers: ["OPENING STATEMENT OF AFFAIRS (1 January)", "₦", "₦"],
        rows: [
          ["ASSETS:", "", ""],
          ["Cash", "", "50,000"],
          ["Stock (Inventory)", "", "200,000"],
          ["Market Stall Equipment", "", "80,000"],
          ["Debtors", "", "30,000"],
          ["TOTAL ASSETS", "", "360,000"],
          ["LESS LIABILITIES:", "", ""],
          ["Creditors", "60,000", ""],
          ["Loan — Cooperative", "40,000", "(100,000)"],
          ["OPENING CAPITAL (Net Worth)", "", "260,000"],
        ],
      },
    },
    {
      title: "Calculating Profit from Incomplete Records",
      key: "Net Profit = Closing Capital − Opening Capital + Drawings − Additional Capital Introduced. This method estimates profit purely from changes in the owner's net worth.",
      body: `STEP 2 — Statement of Affairs (Closing):`,
      table: {
        headers: ["CLOSING STATEMENT OF AFFAIRS (31 December)", "₦", "₦"],
        rows: [
          ["ASSETS:", "", ""],
          ["Cash", "", "80,000"],
          ["Stock (Inventory)", "", "280,000"],
          ["Equipment (net of depreciation)", "", "60,000"],
          ["Debtors", "", "50,000"],
          ["TOTAL ASSETS", "", "470,000"],
          ["LESS LIABILITIES:", "", ""],
          ["Creditors", "70,000", ""],
          ["Loan — Cooperative", "30,000", "(100,000)"],
          ["CLOSING CAPITAL", "", "370,000"],
        ],
      },
    },
    {
      title: "Net Profit Calculation and Reconstructing Missing Figures",
      key: "Once opening and closing capital are known, net profit is calculated by formula. Incomplete records also require reconstructing total sales, total purchases, and cash flows using T-accounts.",
      body: `NET PROFIT CALCULATION:

Closing Capital:          ₦370,000
Less: Opening Capital:   (₦260,000)
Increase in Capital:       ₦110,000
Add: Drawings:             ₦150,000
Less: Additional Capital:       ₦0
NET PROFIT FOR THE YEAR:  ₦260,000

RECONSTRUCTING TOTAL CREDIT SALES (using Debtors T-account):`,
      table: {
        headers: ["Dr   DEBTORS (TOTAL DEBTORS) ACCOUNT   Cr", ""],
        rows: [
          ["Details | ₦", "Details | ₦"],
          ["Balance b/d (opening debtors) | 30,000", "Cash received from debtors | 180,000"],
          ["Credit Sales (MISSING — balancing figure) | 200,000", "Bad debts written off | 0"],
          ["", "Balance c/d (closing debtors) | 50,000"],
          ["TOTAL | 230,000", "TOTAL | 230,000"],
          ["∴ Total Credit Sales = ₦200,000", ""],
        ],
      },
    },
  ],
  clubs: [
    {
      title: "Nature of Clubs, Societies, and Not-For-Profit Organisations",
      key: "Clubs and societies are not-for-profit (NFP) organisations formed to provide services to members rather than generate profit. Any excess of income over expenditure is a surplus, not profit.",
      body: `Examples of clubs and societies in Nigeria:
- Lagos Country Club, Ikeja Golf Club (social/sports clubs)
- University of Lagos Students' Union (student association)
- Ijele Age Grade Society, Onitsha (community organisation)
- ICAN (professional body — accounting)
- Esusu / Cooperative thrift societies (community savings groups)

THREE KEY FINANCIAL STATEMENTS for clubs:
1. RECEIPTS AND PAYMENTS ACCOUNT — a cash summary (similar to a cash book summary). Shows all cash/bank receipts and payments regardless of which accounting period they relate to.
2. INCOME AND EXPENDITURE ACCOUNT — the equivalent of the Profit and Loss Account. Shows income earned and expenses incurred during the period on an accruals basis.
3. BALANCE SHEET (STATEMENT OF FINANCIAL POSITION) — shows assets, liabilities, and accumulated fund (equivalent of capital for a club).

KEY TERM: ACCUMULATED FUND = equivalent of capital. It is the excess of assets over liabilities at any point.`,
    },
    {
      title: "Receipts and Payments Account",
      key: "The Receipts and Payments Account is a summary of all cash and bank receipts on the left (debit) side and all cash and bank payments on the right (credit) side for a period. It always starts and ends with a cash/bank balance.",
      body: `EXAMPLE — Ikeja Community Sports Club (for the year ended 31 December):`,
      table: {
        headers: ["Dr   RECEIPTS AND PAYMENTS ACCOUNT   Cr", ""],
        rows: [
          ["RECEIPTS | ₦", "PAYMENTS | ₦"],
          ["Balance b/d (cash + bank) | 120,000", "Rent of sports ground | 80,000"],
          ["Subscriptions received | 350,000", "Salaries — groundskeeper | 60,000"],
          ["Entrance Fees (new members) | 40,000", "Sports equipment purchased | 90,000"],
          ["Bar takings (cash sales) | 180,000", "Bar purchases | 100,000"],
          ["Fundraising event proceeds | 60,000", "Electricity (EKEDC) | 18,000"],
          ["Donation received | 25,000", "Printing and stationery | 5,000"],
          ["", "Balance c/d (cash + bank) | 422,000"],
          ["TOTAL | 775,000", "TOTAL | 775,000"],
        ],
      },
    },
    {
      title: "Subscriptions Account — Finding Income from Subscriptions",
      key: "Subscriptions received in cash are NOT the same as subscription income for the year. Some may be in arrears (owed but not paid) or in advance (paid for next year). The subscriptions account reconciles these.",
      body: `EXAMPLE (same club):
Opening subscriptions in arrears: ₦15,000
Opening subscriptions in advance: ₦8,000
Cash subscriptions received in the year: ₦350,000
Closing subscriptions in arrears: ₦20,000
Closing subscriptions in advance: ₦12,000`,
      table: {
        headers: ["Dr   SUBSCRIPTIONS ACCOUNT   Cr", ""],
        rows: [
          ["Details | ₦", "Details | ₦"],
          ["Balance b/d — arrears (owed from last year) | 15,000", "Balance b/d — advance (received last year for this year) | 8,000"],
          ["Income & Expenditure (balancing — INCOME this year) | 355,000", "Cash received | 350,000"],
          ["Balance c/d — advance (received this year for next) | 12,000", "Balance c/d — arrears (owed by members, not yet paid) | 20,000"],
          ["Unrecoverable arrears written off | 4,000", ""],
          ["TOTAL | 386,000 (adj) → use correct balance", "TOTAL | 378,000 (adj) → reconcile carefully"],
          ["∴ Subscription INCOME for I&E Account = ₦355,000", ""],
        ],
      },
    },
    {
      title: "Income and Expenditure Account",
      key: "The Income and Expenditure Account is the NFP equivalent of the Profit and Loss Account. It records income earned and expenses incurred on an accruals basis, resulting in a Surplus or Deficit for the year.",
      body: `EXAMPLE — Ikeja Community Sports Club Income and Expenditure Account (year ended 31 December):`,
      table: {
        headers: ["INCOME AND EXPENDITURE ACCOUNT for the year ended 31 December", "₦", "₦"],
        rows: [
          ["INCOME:", "", ""],
          ["Subscriptions (adjusted, per subscriptions account)", "", "355,000"],
          ["Bar Profit (Bar Takings ₦180,000 − Bar Purchases ₦100,000)", "", "80,000"],
          ["Fundraising Event Surplus", "", "60,000"],
          ["Donations", "", "25,000"],
          ["TOTAL INCOME", "", "520,000"],
          ["EXPENDITURE:", "", ""],
          ["Rent of Sports Ground", "80,000", ""],
          ["Salaries — Groundskeeper", "60,000", ""],
          ["Electricity (EKEDC)", "18,000", ""],
          ["Depreciation — Sports Equipment", "15,000", ""],
          ["Printing and Stationery", "5,000", ""],
          ["TOTAL EXPENDITURE", "", "(178,000)"],
          ["SURPLUS for the year (added to Accumulated Fund)", "", "342,000"],
        ],
      },
    },
    {
      title: "Balance Sheet of a Club — Accumulated Fund",
      key: "The Balance Sheet of a club shows its assets, liabilities, and Accumulated Fund. The Accumulated Fund (not 'capital') represents the members' collective ownership — it grows each year a surplus is earned.",
      body: `EXTRACT — Balance Sheet of Ikeja Community Sports Club as at 31 December:`,
      table: {
        headers: ["BALANCE SHEET as at 31 December", "₦", "₦"],
        rows: [
          ["NON-CURRENT ASSETS:", "", ""],
          ["Sports Equipment (net of depreciation)", "", "75,000"],
          ["CURRENT ASSETS:", "", ""],
          ["Cash at Bank and in Hand", "422,000", ""],
          ["Subscriptions in Arrears", "20,000", ""],
          ["TOTAL CURRENT ASSETS", "", "442,000"],
          ["TOTAL ASSETS", "", "517,000"],
          ["ACCUMULATED FUND:", "", ""],
          ["Opening Accumulated Fund", "", "175,000"],
          ["Add: Surplus for the year", "", "342,000"],
          ["CLOSING ACCUMULATED FUND", "", "517,000"],
          ["CURRENT LIABILITIES:", "", ""],
          ["Subscriptions in Advance", "", "12,000"],
          ["TOTAL ACCUMULATED FUND AND LIABILITIES", "", "529,000 (adjusted for all items)"],
        ],
      },
    },
  ],
  limited_co: [
    {
      title: "Introduction to Limited Liability Companies in Nigeria",
      key: "A limited liability company is a legal entity separate from its owners (shareholders). Shareholders' liability is limited to the amount they invested. Companies are incorporated and regulated by CAMA (Companies and Allied Matters Act) and the CAC (Corporate Affairs Commission) in Nigeria.",
      body: `TYPES OF COMPANIES in Nigeria (under CAMA 2020):
1. PRIVATE COMPANY LIMITED BY SHARES (Ltd) — minimum 1 shareholder, maximum 50 (excluding employees). Cannot offer shares to the public. E.g., Adeola Ventures Ltd.
2. PUBLIC COMPANY LIMITED BY SHARES (Plc) — minimum 2 shareholders, no maximum. Can offer shares to the public and list on the Nigerian Exchange Group (NGX). E.g., Dangote Cement Plc, MTN Nigeria Plc, Zenith Bank Plc.
3. COMPANY LIMITED BY GUARANTEE — no share capital; liability limited to a guaranteed amount. Common for NFPs. E.g., many NGOs and professional bodies.
4. UNLIMITED COMPANY — members have unlimited liability; rare.

KEY SHARE CAPITAL CONCEPTS:`,
      table: {
        headers: ["TERM", "MEANING", "EXAMPLE"],
        rows: [
          ["Authorised Share Capital", "Maximum amount of share capital a company is permitted to issue, as stated in its Memorandum of Association", "Dangote Sugar Plc has authorised capital of ₦10,000,000,000 (10 billion shares of ₦1 each)"],
          ["Issued Share Capital", "The portion of authorised capital that has actually been issued to shareholders", "Only ₦6,000,000,000 worth of shares have actually been issued so far"],
          ["Called-Up Capital", "The amount the company has formally asked shareholders to pay on their issued shares", "Shareholders called to pay ₦0.80 per ₦1 share = called-up capital ₦4,800,000,000"],
          ["Paid-Up Capital", "The amount shareholders have actually paid", "All shareholders paid = paid-up capital equals called-up capital"],
          ["Calls in Arrears", "Called-up amounts not yet paid by some shareholders", "Shareholders owe ₦20,000,000 not yet paid"],
          ["Ordinary Shares", "Main class of shares — holders receive variable dividends and vote at AGM", "Most shares on NGX are ordinary shares"],
          ["Preference Shares", "Fixed dividend paid before ordinary shareholders; usually no voting rights", "6% Preference Shares — holders receive 6% of nominal value annually first"],
        ],
      },
    },
    {
      title: "Income Statement and Appropriation Account of a Limited Company",
      key: "A limited company's Income Statement follows the same structure as a sole trader's, but below the Net Profit line, an Appropriation Account shows how profit is distributed — corporation tax, preference dividend, ordinary dividend, and retained earnings (General Reserve, Retained Profit).",
      body: `EXAMPLE — Sunshine Foods Plc, Lagos (year ended 31 December):`,
      table: {
        headers: ["INCOME STATEMENT AND APPROPRIATION ACCOUNT — SUNSHINE FOODS PLC for the year ended 31 December", "₦'000", "₦'000"],
        rows: [
          ["Revenue (Turnover)", "", "5,200"],
          ["Less: Cost of Goods Sold", "", "(3,100)"],
          ["GROSS PROFIT", "", "2,100"],
          ["Add: Other Income (Discount Received, etc.)", "", "50"],
          ["Less: Distribution Costs (Marketing, Delivery)", "", "(300)"],
          ["Less: Administrative Expenses (Salaries, Rent, Depreciation)", "", "(450)"],
          ["Less: Finance Costs (Loan Interest)", "", "(100)"],
          ["PROFIT BEFORE TAX", "", "1,300"],
          ["Less: Corporation Tax @ 30% (FIRS)", "", "(390)"],
          ["PROFIT AFTER TAX", "", "910"],
          ["APPROPRIATION:", "", ""],
          ["Transfer to General Reserve", "(200)", ""],
          ["Preference Dividend (6% on ₦1,000,000 preference shares)", "(60)", ""],
          ["Ordinary Dividend Proposed (₦0.10 per share on 3,000,000 shares)", "(300)", ""],
          ["RETAINED PROFIT FOR THE YEAR", "", "350"],
          ["Add: Retained Profit brought forward (prior year)", "", "180"],
          ["RETAINED PROFIT CARRIED FORWARD", "", "530"],
        ],
      },
    },
    {
      title: "Balance Sheet (Statement of Financial Position) of a Limited Company",
      key: "A company's Balance Sheet uses the vertical format under IFRS (IAS 1). The Capital Section shows share capital, share premium, reserves, and retained earnings — together called Shareholders' Equity.",
      body: `EXAMPLE — Sunshine Foods Plc Balance Sheet as at 31 December:`,
      table: {
        headers: ["STATEMENT OF FINANCIAL POSITION — SUNSHINE FOODS PLC as at 31 December", "₦'000", "₦'000"],
        rows: [
          ["NON-CURRENT ASSETS:", "", ""],
          ["Property, Plant and Equipment (PPE)", "3,200", ""],
          ["Less: Accumulated Depreciation", "(800)", "2,400"],
          ["Intangible Assets (Trademark, Goodwill)", "", "200"],
          ["TOTAL NON-CURRENT ASSETS", "", "2,600"],
          ["CURRENT ASSETS:", "", ""],
          ["Inventories (Stock)", "", "600"],
          ["Trade Receivables (Debtors)", "500", ""],
          ["Less: Allowance for Doubtful Debts", "(25)", "475"],
          ["Cash and Cash Equivalents (GTBank)", "", "350"],
          ["Prepayments", "", "30"],
          ["TOTAL CURRENT ASSETS", "", "1,455"],
          ["TOTAL ASSETS", "", "4,055"],
          ["SHAREHOLDERS' EQUITY:", "", ""],
          ["Ordinary Share Capital (₦1 each — 3,000,000 shares)", "", "3,000"],
          ["6% Preference Share Capital (₦1 each)", "", "1,000"],
          ["Share Premium Account", "", "200"],
          ["General Reserve", "", "200"],
          ["Retained Earnings (Profit c/f)", "", "530"],
          ["TOTAL EQUITY", "", "4,930 (adjusted)"],
          ["NON-CURRENT LIABILITIES:", "", ""],
          ["Bank Loan (Union Bank — 5-year term loan)", "", "500"],
          ["CURRENT LIABILITIES:", "", ""],
          ["Trade Payables (Creditors)", "", "380"],
          ["Corporation Tax Payable (FIRS)", "", "390"],
          ["Ordinary Dividend Payable", "", "300"],
          ["Accruals", "", "55"],
          ["TOTAL CURRENT LIABILITIES", "", "1,125"],
          ["TOTAL EQUITY AND LIABILITIES", "", "6,555 (self-check: recalculate totals in exam)"],
        ],
      },
    },
    {
      title: "Key Differences Between a Sole Trader and a Limited Company",
      key: "Understanding the differences between a sole trader and a limited company is essential for JUPEB, especially in relation to liability, taxation, profit distribution, and financial statement presentation.",
      body: ``,
      table: {
        headers: ["BASIS", "SOLE TRADER", "LIMITED LIABILITY COMPANY (e.g., Plc)"],
        rows: [
          ["Legal status", "Not a separate legal entity from owner", "Separate legal entity from its shareholders (Salomon v Salomon)"],
          ["Liability", "Unlimited — owner personally liable for all debts", "Limited — shareholders only lose what they invested"],
          ["Ownership", "One person (e.g., Alhaji Musa)", "Shareholders (e.g., thousands of shareholders in Zenith Bank Plc)"],
          ["Profit distribution", "Owner takes all profit (or bears all losses)", "Profit distributed as dividends; balance retained in company"],
          ["Taxation", "Owner pays personal income tax on profits (FIRS — PITA)", "Company pays corporation tax on profits (FIRS — CITA)"],
          ["Accounts filed with", "Only FIRS for tax", "CAC (Corporate Affairs Commission) + NGX (if listed) + FIRS"],
          ["Capital section", "Capital Account + Drawings", "Ordinary Shares + Preference Shares + Reserves + Retained Earnings"],
        ],
      },
    },
  ],

  /* ═══════════════════════════════════════════════════════════
     ACC002 — BASIC COST AND MANAGEMENT ACCOUNTING
  ═══════════════════════════════════════════════════════════ */

  cost_intro: [
    {
      title: "Nature and Scope of Cost Accounting",
      key: "Cost Accounting is the branch of accounting concerned with recording, classifying, analysing, and controlling the costs of producing goods or providing services. Its primary purpose is to help management make informed decisions about pricing, production, and efficiency.",
      body: `Cost accounting is used internally — by management — unlike financial accounting which is prepared for external users. It answers questions like:
- How much does it cost Aba Soap Company to produce one carton of soap?
- Is Emeka Transport Ltd making a profit on its Onitsha–Lagos route?
- Should Dangote Flour Mills expand production or outsource?

SCOPE OF COST ACCOUNTING:
1. COST ASCERTAINMENT — finding the actual cost of a product, job, or process.
2. COST ANALYSIS — breaking costs into components (material, labour, overhead).
3. COST CONTROL — comparing actual costs to budgeted/standard costs and investigating differences.
4. COST REDUCTION — systematically finding ways to reduce costs without reducing quality.
5. DECISION SUPPORT — providing data for pricing, make-or-buy decisions, shutdown decisions.`,
    },
    {
      title: "Comparison of Cost Accounting, Management Accounting, and Financial Accounting",
      key: "Cost Accounting focuses on cost data for products and services. Management Accounting is broader — it uses cost data alongside other information to support all management decisions. Financial Accounting reports historical financial performance to external stakeholders.",
      body: ``,
      table: {
        headers: ["BASIS", "FINANCIAL ACCOUNTING", "COST ACCOUNTING", "MANAGEMENT ACCOUNTING"],
        rows: [
          ["Primary users", "External — shareholders, banks, FIRS, CAC", "Internal — production managers, factory supervisors", "Internal — all levels of management (directors, departmental heads)"],
          ["Purpose", "Report financial performance and position for a past period", "Ascertain and control cost of products/services", "Support planning, decision-making, and control across the business"],
          ["Nature of reports", "Mandatory — must follow IFRS/IAS and CAMA; audited", "Voluntary — no legal requirement; follows internal needs", "Voluntary — entirely tailored to what management needs"],
          ["Time focus", "Historical (past) — what happened last year", "Historical and some forward-looking (standard costs)", "Forward-looking — budgets, forecasts, what-if analysis"],
          ["Format", "Standardised (IAS 1 formats)", "Flexible — varies by business type", "Highly flexible — dashboards, reports, models"],
          ["Frequency", "Annual (sometimes quarterly for listed Plcs on NGX)", "Continuous / daily / weekly as needed", "Continuous — monthly management accounts, weekly KPIs"],
          ["Nigerian regulatory body", "Financial Reporting Council of Nigeria (FRC); CAC; FIRS", "No specific regulator", "No specific regulator"],
          ["Nigerian professional body", "ICAN, ACCA (for preparers)", "ICAN, CIMA", "ICAN, CIMA, CPA"],
        ],
      },
    },
    {
      title: "Objectives of Cost Accounting",
      key: "Cost accounting has six main objectives: ascertaining costs, controlling costs, determining selling prices, measuring efficiency, aiding decision-making, and facilitating preparation of financial statements.",
      body: ``,
      table: {
        headers: ["OBJECTIVE", "EXPLANATION", "NIGERIAN EXAMPLE"],
        rows: [
          ["Ascertaining Cost", "Determine the actual cost of producing each unit, batch, or job", "Aba Soap Company calculates it costs ₦85 to produce one bar of soap"],
          ["Controlling Cost", "Compare actual costs with budgeted/standard costs; investigate and correct variances", "If actual material cost per bar is ₦90 vs budget of ₦85, management investigates the ₦5 adverse variance"],
          ["Pricing Decisions", "Cost data is the basis for setting selling prices to ensure profitability", "Aba Soap adds a 40% mark-up on cost → sells each bar at ₦119"],
          ["Measuring Efficiency", "Identify wasteful operations and measure worker or machine productivity", "Factory output per machine hour at Flour Mills Nigeria — is output declining?"],
          ["Aiding Decision-Making", "Provide relevant cost data for make-or-buy, shutdown, and special order decisions", "Should Nestlé Nigeria make its own packaging in-house or outsource to a Lagos packaging firm?"],
          ["Financial Statement Preparation", "Provide closing stock valuations needed for the Income Statement and Balance Sheet", "Cost accountant values closing finished goods stock at ₦2,400,000 for year-end accounts"],
        ],
      },
    },
  ],
  cost_elements: [
    {
      title: "Introduction to Cost — The Three Elements",
      key: "Every product cost is made up of three elements: Direct Materials, Direct Labour, and Overhead (indirect costs). Understanding how to classify costs is the foundation of all cost accounting.",
      body: `TOTAL COST STRUCTURE:`,
      table: {
        headers: ["COST ELEMENT", "DESCRIPTION", "NIGERIAN EXAMPLE (Aba Soap Company)"],
        rows: [
          ["Direct Materials", "Raw materials that physically become part of the finished product and can be traced to each unit", "Palm kernel oil, caustic soda, perfume, colouring per bar of soap"],
          ["Direct Labour", "Wages of workers who physically work on the product and can be directly traced to each unit", "Factory floor workers mixing, moulding, and cutting soap bars"],
          ["Direct Expenses", "Other costs directly attributable to specific units (not materials or labour)", "Royalty paid per bar of soap produced; special machine hired for a specific batch"],
          ["PRIME COST", "= Direct Materials + Direct Labour + Direct Expenses", "All the direct costs above combined"],
          ["Manufacturing Overhead (Factory Overhead)", "All indirect factory costs — cannot be traced to individual units", "Factory rent in Aba, factory electricity (EEDC), factory supervisor's salary, machinery depreciation"],
          ["FACTORY (WORKS) COST", "= Prime Cost + Manufacturing Overhead (adjusted for WIP)", "Total cost of producing completed soap bars"],
          ["Selling and Distribution Overhead", "Costs of marketing and delivering the finished product", "Sales team salaries, advertising on NTA, delivery truck fuel to Lagos"],
          ["Administrative Overhead", "General management costs not related to factory or sales", "CEO's salary, office rent in Victoria Island, accountant's fees"],
          ["TOTAL COST", "= Factory Cost + Selling & Distribution Overhead + Administrative Overhead", "Total cost before profit mark-up"],
        ],
      },
    },
    {
      title: "Cost Terminology and Key Meanings",
      key: "Cost accounting uses precise terminology. Understanding these terms is essential for correctly classifying and calculating costs in any exam or practical scenario.",
      body: ``,
      table: {
        headers: ["TERM", "MEANING", "EXAMPLE"],
        rows: [
          ["Cost Unit", "A unit of product or service for which cost is measured", "One bar of soap; one tonne of cement (Dangote); one passenger-kilometre (Arik Air); one patient-day (Lagos University Teaching Hospital)"],
          ["Cost Centre", "A department, location, or function to which costs are charged before being absorbed into products", "Mixing Department, Moulding Department, and Packing Department in Aba Soap Company"],
          ["Cost Object", "Anything for which a separate cost measurement is required", "A product line, project, contract, customer, or department"],
          ["Profit Centre", "A cost centre that also generates revenue — performance measured by profit", "The Northern Region sales branch of a FMCG company like Unilever Nigeria"],
          ["Investment Centre", "A unit evaluated on return on capital employed (ROCE)", "A subsidiary company or major division like Nestle Nigeria's infant nutrition division"],
          ["Sunk Cost", "A cost already incurred and cannot be recovered — irrelevant for future decisions", "₦5,000,000 already spent on a factory extension that has been abandoned"],
          ["Opportunity Cost", "The benefit forgone by choosing one alternative over the next best alternative", "If Emeka uses his truck for personal travel, the opportunity cost is the freight income he could have earned"],
          ["Relevant Cost", "A future, incremental cash cost that will change as a result of a decision", "Extra materials needed if a special order is accepted"],
          ["Avoidable Cost", "A cost that can be eliminated if a particular activity is discontinued", "Factory electricity saved if the night shift is cancelled"],
          ["Unavoidable Cost", "A cost that will continue regardless of the decision made", "Factory lease payments remaining even if production stops temporarily"],
        ],
      },
    },
    {
      title: "Cost Classification — By Nature, By Function, By Behaviour",
      key: "Costs can be classified in three main ways: by their nature (materials, labour, expenses), by their function (production, selling, administration), or by their behaviour in relation to changes in output (fixed, variable, semi-variable).",
      body: `CLASSIFICATION BY BEHAVIOUR is the most important for decision-making:`,
      table: {
        headers: ["COST BEHAVIOUR", "DEFINITION", "TOTAL COST AS OUTPUT CHANGES", "COST PER UNIT AS OUTPUT CHANGES", "NIGERIAN EXAMPLE"],
        rows: [
          ["Fixed Cost", "Remains constant in TOTAL regardless of output level (within a relevant range)", "Stays the same", "DECREASES as output increases (fixed cost spread over more units)", "Factory rent of ₦200,000/month whether Aba Soap produces 10,000 or 50,000 bars"],
          ["Variable Cost", "Changes in TOTAL in direct proportion to output", "Increases proportionally", "STAYS THE SAME per unit", "Palm kernel oil — if it costs ₦30 per bar, total material cost doubles when output doubles"],
          ["Semi-Variable Cost (Mixed Cost)", "Has both a fixed component and a variable component", "Increases with output but not in direct proportion", "Decreases then levels off", "Electricity bill: ₦10,000 fixed standing charge + ₦5 per machine hour used"],
          ["Stepped Fixed Cost", "Fixed within a range; jumps to a new level when output exceeds a threshold", "Stays fixed then jumps", "Decreases in steps", "One supervisor can manage up to 20 workers; a second supervisor needed when output requires worker 21"],
        ],
      },
    },
    {
      title: "Cost Estimation Techniques",
      key: "Cost estimation techniques are used to separate mixed (semi-variable) costs into their fixed and variable components, so that cost behaviour can be predicted at different output levels.",
      body: `TWO MAIN TECHNIQUES:

1. HIGH-LOW METHOD (most common in JUPEB):
Steps:
(a) Identify the highest and lowest output levels and their total costs.
(b) Variable Cost per unit = (Cost at High Level − Cost at Low Level) ÷ (High Units − Low Units)
(c) Fixed Cost = Total Cost at High Level − (Variable Cost per unit × High Units)

EXAMPLE — Kano Textile Mill electricity costs:
- Highest output: 10,000 machine hours → ₦80,000 total cost
- Lowest output: 4,000 machine hours → ₦56,000 total cost`,
      table: {
        headers: ["HIGH-LOW METHOD — KANO TEXTILE MILL", "Machine Hours", "Total Electricity Cost (₦)"],
        rows: [
          ["Highest Level", "10,000", "80,000"],
          ["Lowest Level", "4,000", "56,000"],
          ["DIFFERENCE", "6,000", "24,000"],
          ["Variable Cost per machine hour = ₦24,000 ÷ 6,000 hours", "=", "₦4 per machine hour"],
          ["Fixed Cost = ₦80,000 − (₦4 × 10,000)", "=", "₦40,000 per period"],
          ["COST FORMULA: Total Electricity Cost = ₦40,000 + (₦4 × machine hours)", "", ""],
          ["Predicted cost at 7,000 hours = ₦40,000 + (₦4 × 7,000)", "=", "₦68,000"],
        ],
      },
    },
  ],
  material_cost: [
    {
      title: "The Material Cycle — Purchasing, Receiving, Storage, and Issuance",
      key: "Effective material costing requires tight control at every stage: purchasing (ordering), receiving (inspecting and accepting), storing (warehousing), and issuing (releasing to production). Each stage has its own documents and controls.",
      body: ``,
      table: {
        headers: ["STAGE", "ACTIVITY", "DOCUMENT USED", "CONTROL PURPOSE"],
        rows: [
          ["1. PURCHASING", "Production department raises a request for materials; purchasing department places an order with a supplier", "Purchase Requisition → Purchase Order", "Ensures only authorised purchases are made; avoids over-ordering"],
          ["2. RECEIVING", "Goods arrive from supplier (e.g., raw materials delivered to Aba Soap's Aba factory from a Kano supplier); stores staff inspect quantity and quality", "Goods Received Note (GRN) matched with Purchase Order and Supplier Invoice", "Confirms correct quantity received, condition checked, no over-delivery accepted"],
          ["3. STORAGE", "Materials stored in the warehouse/stores department; stock records updated; safety stock maintained", "Bin Card (physical store record) and Stores Ledger Card (accounting record)", "Prevents theft, damage, and obsolescence; ensures materials are available when needed"],
          ["4. ISSUANCE", "Production department requests materials; storekeeper releases them to the factory floor", "Materials Requisition Note (MRN) authorised by production manager", "Ensures only authorised withdrawals; provides the basis for charging material cost to specific jobs or processes"],
        ],
      },
    },
    {
      title: "Stores Records — The Bin Card and Stores Ledger Card",
      key: "The Bin Card is kept physically in the store beside each item and records quantity only. The Stores Ledger Card is kept by the accounts department and records quantity AND value. Both must always agree on quantity.",
      body: `EXAMPLE — Aba Soap Company: Raw Material — Palm Kernel Oil (drums)

BIN CARD (Stores, Aba Factory — quantity only):`,
      table: {
        headers: ["BIN CARD — Palm Kernel Oil | Maximum: 100 drums | Minimum: 20 drums | Reorder Level: 30 drums", "", "", ""],
        rows: [
          ["Date", "Receipts (drums)", "Issues (drums)", "Balance (drums)"],
          ["1 Jan (b/d)", "", "", "40"],
          ["5 Jan", "50", "", "90"],
          ["10 Jan", "", "30", "60"],
          ["18 Jan", "", "25", "35"],
          ["25 Jan", "40", "", "75"],
          ["31 Jan", "", "20", "55"],
        ],
      },
    },
    {
      title: "Methods of Pricing Material Issues (Inventory Valuation)",
      key: "When materials are issued to production, they must be priced (valued). Three methods are used: FIFO (First In First Out), LIFO (Last In First Out — not permitted under IFRS/IAS 2), and AVCO (Weighted Average Cost). Each gives a different closing stock value and material cost.",
      body: `EXAMPLE — Lagos Chemical Suppliers Ltd: Material X

Opening stock 1 Jan: 100 units @ ₦200 each
Purchases 8 Jan: 200 units @ ₦220 each
Issues to production 15 Jan: 250 units
Purchases 20 Jan: 150 units @ ₦250 each
Issues to production 28 Jan: 120 units

METHOD 1 — FIFO (First In, First Out): Issues are priced at the cost of the oldest stock first.

Issue on 15 Jan (250 units):
  100 units @ ₦200 = ₦20,000 (from opening stock)
  150 units @ ₦220 = ₦33,000 (from 8 Jan purchase)
  Total Issue Cost = ₦53,000 | Balance: 50 units @ ₦220 = ₦11,000`,
      table: {
        headers: ["FIFO STORES LEDGER — Material X (Lagos Chemical Suppliers)", "", "", "", "", "", ""],
        rows: [
          ["Date", "Receipts Qty", "Receipts Price (₦)", "Receipts Value (₦)", "Issues Qty", "Issues Value (₦)", "Balance Value (₦)"],
          ["1 Jan b/d", "", "", "", "", "", "100 × ₦200 = 20,000"],
          ["8 Jan", "200", "220", "44,000", "", "", "20,000 + 44,000 = 64,000"],
          ["15 Jan", "", "", "", "250", "53,000", "50 × ₦220 = 11,000"],
          ["20 Jan", "150", "250", "37,500", "", "", "11,000 + 37,500 = 48,500"],
          ["28 Jan", "", "", "", "120", "50×₦220=11,000 + 70×₦250=17,500 = 28,500", "80 × ₦250 = 20,000"],
          ["CLOSING STOCK (FIFO)", "", "", "", "", "", "₦20,000 (80 units @ ₦250)"],
        ],
      },
    },
    {
      title: "AVCO (Weighted Average Cost) Method",
      key: "Under AVCO (also called Weighted Average), a new average unit cost is calculated after each new purchase. All issues are priced at this running average. AVCO is permitted under IAS 2.",
      body: `Using the same Material X example:

After 8 Jan purchase:
Total units = 100 + 200 = 300 units
Total value = ₦20,000 + ₦44,000 = ₦64,000
Average cost = ₦64,000 ÷ 300 = ₦213.33 per unit

Issue 15 Jan: 250 units × ₦213.33 = ₦53,333
Balance after issue: 50 units × ₦213.33 = ₦10,667

After 20 Jan purchase:
Total units = 50 + 150 = 200 units
Total value = ₦10,667 + ₦37,500 = ₦48,167
New average = ₦48,167 ÷ 200 = ₦240.83 per unit

Issue 28 Jan: 120 units × ₦240.83 = ₦28,900
Closing stock: 80 units × ₦240.83 = ₦19,267`,
      table: {
        headers: ["COMPARISON OF METHODS — Material X (January)"],
        rows: [
          ["METHOD | Material Cost (Issues) (₦) | Closing Stock Value (₦)"],
          ["FIFO | 53,000 + 28,500 = 81,500 | 20,000"],
          ["AVCO | 53,333 + 28,900 = 82,233 | 19,267"],
          ["LIFO (for reference only — not allowed under IFRS) | Higher issue cost in rising prices | Lower closing stock"],
          ["NOTE: Under IAS 2 (IFRS), LIFO is PROHIBITED in Nigeria for listed companies and significant public interest entities.", "", ""],
        ],
      },
    },
  ],
  stock_control: [
    {
      title: "Costs of Holding and Ordering Inventory",
      key: "Every business holding inventory incurs two competing types of cost: Holding Costs (costs of keeping stock) and Ordering Costs (costs of placing orders). The goal of inventory management is to minimise the total of both costs.",
      body: ``,
      table: {
        headers: ["COST TYPE", "COMPONENTS", "NIGERIAN EXAMPLE"],
        rows: [
          ["Holding Costs (Carrying Costs)", "Warehouse rent, insurance, deterioration/wastage, obsolescence, opportunity cost of capital tied up, security staff wages, handling equipment", "Aba Soap Company: cost of renting a warehouse in Aba to store drums of palm kernel oil; cost of oil going rancid; insurance premium with AIICO Insurance"],
          ["Ordering Costs (Procurement Costs)", "Cost of placing each order: admin staff time, telephone calls, delivery/transport costs, inspection costs per delivery", "Purchasing manager's time and communication costs each time Aba Soap sends a purchase order to a Kano supplier"],
          ["RELATIONSHIP", "As order quantity increases → Holding cost increases; Ordering cost decreases (fewer orders needed)", "TRADE-OFF: order large quantities less often (lower ordering cost, higher holding cost) OR order small quantities more often (higher ordering cost, lower holding cost)"],
          ["Stock-out Costs", "Lost contribution from lost sales, emergency purchase premiums, production disruption costs, loss of customer goodwill", "Aba Soap runs out of caustic soda — production stops, orders are lost to a competitor, emergency purchase at a premium price from a Lagos supplier"],
        ],
      },
    },
    {
      title: "Economic Order Quantity (EOQ)",
      key: "The Economic Order Quantity (EOQ) is the order quantity that minimises the total annual cost of ordering and holding inventory. It balances ordering costs against holding costs.",
      body: `FORMULA:
EOQ = √(2 × D × Co / Ch)

Where:
  D  = Annual demand (units)
  Co = Cost per order (₦)
  Ch = Annual holding cost per unit (₦)

EXAMPLE — Kano Food Processing Ltd:
Annual demand (D) = 40,000 units of flour bags
Cost per order (Co) = ₦500
Annual holding cost per unit (Ch) = ₦2

EOQ = √(2 × 40,000 × 500 / 2)
     = √(40,000,000)
     = 6,325 units (approximately 6,325 flour bags per order)

Number of orders per year = 40,000 ÷ 6,325 ≈ 6.3 orders per year (approximately every 8 weeks)`,
      table: {
        headers: ["EOQ COST VERIFICATION — Kano Food Processing Ltd", "₦"],
        rows: [
          ["Annual Ordering Cost = (D / EOQ) × Co = (40,000 / 6,325) × 500", "≈ 3,162"],
          ["Annual Holding Cost = (EOQ / 2) × Ch = (6,325 / 2) × 2", "≈ 6,325 (at minimum = EOQ/2 × Ch holds when avg stock = EOQ/2)"],
          ["NOTE: At EOQ, Annual Ordering Cost ≈ Annual Holding Cost (they are equal at the optimal point)", ""],
          ["Total Annual Inventory Cost at EOQ = Ordering Cost + Holding Cost", "≈ ₦12,650"],
        ],
      },
    },
    {
      title: "Inventory Control Levels — Reorder Level, Maximum Stock, Minimum Stock, Reorder Quantity",
      key: "Inventory control levels are predetermined stock quantities that trigger action (reordering, investigating over/under-stocking) to ensure the business never runs out of stock and never holds excessive stock.",
      body: `FORMULAE:

REORDER LEVEL = Maximum Usage × Maximum Lead Time
(When stock falls to this level, place an order immediately)

MINIMUM STOCK LEVEL (Buffer/Safety Stock) = Reorder Level − (Average Usage × Average Lead Time)
(Below this level, there is a risk of stock-out)

MAXIMUM STOCK LEVEL = Reorder Level + Reorder Quantity − (Minimum Usage × Minimum Lead Time)
(Above this level, too much capital is tied up in stock)

AVERAGE STOCK = (Maximum Stock + Minimum Stock) / 2

EXAMPLE — Aba Soap Company (caustic soda):`,
      table: {
        headers: ["STOCK CONTROL LEVEL CALCULATION — Caustic Soda (Aba Soap Company)", ""],
        rows: [
          ["Maximum usage per week", "600 kg"],
          ["Minimum usage per week", "300 kg"],
          ["Average usage per week", "450 kg"],
          ["Maximum lead time (weeks — time from ordering to delivery from Kano supplier)", "4 weeks"],
          ["Minimum lead time (weeks)", "2 weeks"],
          ["Average lead time", "3 weeks"],
          ["Reorder Quantity (EOQ or agreed)", "4,000 kg"],
          ["", ""],
          ["REORDER LEVEL = 600 × 4", "= 2,400 kg"],
          ["MINIMUM STOCK LEVEL = 2,400 − (450 × 3)", "= 2,400 − 1,350 = 1,050 kg"],
          ["MAXIMUM STOCK LEVEL = 2,400 + 4,000 − (300 × 2)", "= 6,400 − 600 = 5,800 kg"],
          ["AVERAGE STOCK = (5,800 + 1,050) / 2", "= 3,425 kg"],
        ],
      },
    },
    {
      title: "Inventory Valuation — IAS 2 and the Lower of Cost and NRV Rule",
      key: "Under IAS 2 (Inventories), stock must be valued at the LOWER of Cost and Net Realisable Value (NRV). This applies the Prudence Concept — never overstate assets. Losses are recognised immediately; gains are not recognised until realised.",
      body: `NET REALISABLE VALUE (NRV) = Estimated Selling Price − Estimated Costs of Completion and Sale

EXAMPLE — Sunshine Foods Plc has three product lines at year-end:`,
      table: {
        headers: ["PRODUCT", "Cost (₦)", "Estimated Selling Price (₦)", "Costs to Complete & Sell (₦)", "NRV (₦)", "Value at Lower of Cost/NRV (₦)", "WRITE-DOWN needed?"],
        rows: [
          ["Noodles (fast-selling)", "120,000", "200,000", "10,000", "190,000", "120,000 (Cost)", "No — Cost < NRV"],
          ["Biscuits (near expiry)", "80,000", "70,000", "15,000", "55,000", "55,000 (NRV)", "Yes — write down ₦25,000"],
          ["Rice (bumper harvest — price fell)", "300,000", "320,000", "30,000", "290,000", "290,000 (NRV)", "Yes — write down ₦10,000"],
          ["TOTAL INVENTORY", "500,000", "", "", "", "465,000", "Total write-down = ₦35,000"],
        ],
      },
    },
    {
      title: "Efficiency in Managing Material Costs — Waste, Scrap, and Spoilage",
      key: "Material losses during production are classified as Normal Loss (expected and unavoidable) or Abnormal Loss (unexpected and avoidable). Normal loss is absorbed into the cost of good output; abnormal loss is reported separately as a cost of inefficiency.",
      body: `CLASSIFICATIONS:`,
      table: {
        headers: ["TERM", "MEANING", "ACCOUNTING TREATMENT", "NIGERIAN EXAMPLE"],
        rows: [
          ["Normal Loss / Waste", "Expected, unavoidable loss during production — industry standard", "Absorbed into unit cost of good output (cost shared over fewer good units)", "In garri processing, cassava loses 30% moisture during drying — this is normal evaporation loss"],
          ["Abnormal Loss", "Loss in excess of normal (avoidable — due to inefficiency, accidents, negligence)", "Charged separately to the Abnormal Loss Account — shown as a cost in the Income Statement", "If cassava loses 40% instead of the normal 30%, the extra 10% is abnormal — perhaps due to machine fault or poor handling at the Oyo cassava mill"],
          ["Scrap", "Low-value residue from production that can be sold", "Scrap sales proceeds reduce the cost of production", "Metal off-cuts at a Lagos fabrication workshop sold to Alaba market scrap dealers"],
          ["Spoilage", "Damaged goods during production — may be reworkable or irreparable", "Normal spoilage: absorbed into cost. Abnormal spoilage: written off as a loss", "Biscuits broken on the production line at Beloxxi Biscuits, Agbara — normal vs excessive breakage"],
        ],
      },
    },
  ],
  labour_cost: [
    {
      title: "Introduction to Labour Costing — Classification of Labour",
      key: "Labour cost is the cost of human effort used in producing goods or services. It is classified as Direct Labour (traceable to specific units of output) or Indirect Labour (cannot be traced to individual units — part of overhead).",
      body: ``,
      table: {
        headers: ["LABOUR TYPE", "DESCRIPTION", "NIGERIAN EXAMPLE", "ACCOUNTING TREATMENT"],
        rows: [
          ["Direct Labour", "Workers who physically work on the product and whose time can be traced to specific jobs or units", "Factory floor soap-makers at Aba Soap Company; garment sewers at a Lagos fashion house; welders at an Nnewi auto-parts factory", "Charged directly to the product/job cost as Prime Cost"],
          ["Indirect Labour", "Factory workers whose work cannot be traced to specific products", "Factory cleaners, storekeepers, factory security guards, maintenance engineers, production supervisors at Flour Mills Nigeria", "Treated as Manufacturing Overhead — absorbed into product cost via overhead absorption"],
          ["Non-production Labour", "Staff outside the factory whose labour is not part of product cost", "Sales representatives, accountants, company driver for the MD, receptionists at head office in Victoria Island", "Charged to Selling & Distribution or Administrative Overhead in the Income Statement"],
        ],
      },
    },
    {
      title: "Labour Remuneration Methods — Time Rate, Piece Rate, and Differential Piece Rate",
      key: "Workers in Nigerian manufacturing businesses can be paid using different methods. The method chosen affects worker motivation, production speed, quality, and the total labour cost for the business.",
      body: ``,
      table: {
        headers: ["REMUNERATION METHOD", "HOW IT WORKS", "ADVANTAGES", "DISADVANTAGES", "NIGERIAN EXAMPLE"],
        rows: [
          ["Time Rate (Day Rate)", "Worker paid a fixed rate per hour worked, regardless of output", "Simple to calculate; quality not sacrificed for speed; worker income is predictable", "No incentive for workers to be more productive; business still pays even for slow workers", "Office staff and supervisors at Nestlé Nigeria paid ₦1,500 per hour"],
          ["Basic Piece Rate", "Worker paid a fixed amount for every unit produced, regardless of time taken", "Incentivises high output; business only pays for output produced", "Quality may suffer (workers rush); workers earn nothing when machines break down or materials run out", "Garment sewers at a Kano textile factory paid ₦200 per shirt completed"],
          ["Differential Piece Rate", "A higher rate per unit is paid once the worker exceeds a standard output level", "Strongly incentivises workers to exceed targets; efficient workers earn significantly more", "Complex to administer; can cause tension between fast and slow workers", "Aba Soap: ₦5/bar for first 500 bars/day; ₦8/bar for every bar above 500"],
          ["Guaranteed Minimum Wage", "Piece-rate workers are guaranteed a minimum weekly/monthly wage even if output is low", "Reduces worker risk; prevents extreme income fluctuations", "Business may pay more than output justifies during slow periods", "Nigerian labour law requires compliance with the national minimum wage (₦70,000/month as of recent legislation)"],
        ],
      },
    },
    {
      title: "Bonus Schemes — Halsey Bonus and Rowan Bonus",
      key: "Bonus schemes reward workers who complete jobs in less than the standard time allowed. The employer and worker share the time saved. The Halsey scheme gives 50% of time saved; the Rowan scheme gives a proportion based on time saved as a fraction of standard time.",
      body: `STANDARD TIME = the time a job is expected to take at normal efficiency.
TIME SAVED = Standard Time − Actual Time taken.

HALSEY BONUS:
Bonus = 50% × Time Saved × Hourly Rate

ROWAN BONUS:
Bonus = (Time Saved / Standard Time) × Actual Time × Hourly Rate

EXAMPLE — Emeka (machinist at a Lagos Engineering Works):
Hourly Rate = ₦400/hour
Standard Time for Job 101 = 10 hours
Actual Time taken by Emeka = 7 hours
Time Saved = 10 − 7 = 3 hours`,
      table: {
        headers: ["CALCULATION", "HALSEY SCHEME", "ROWAN SCHEME"],
        rows: [
          ["Basic Wages (Actual Time × Rate)", "7 × ₦400 = ₦2,800", "7 × ₦400 = ₦2,800"],
          ["Bonus Calculation", "50% × 3 hours × ₦400 = ₦600", "(3/10) × 7 × ₦400 = ₦840"],
          ["TOTAL EARNINGS", "₦2,800 + ₦600 = ₦3,400", "₦2,800 + ₦840 = ₦3,640"],
          ["Effective Hourly Rate for Emeka", "₦3,400 / 7 hours = ₦485.71/hr", "₦3,640 / 7 hours = ₦520/hr"],
          ["Labour Cost per Standard Hour for Employer", "₦3,400 / 10 hrs = ₦340/hr (cheaper than ₦400)", "₦3,640 / 10 hrs = ₦364/hr (cheaper than ₦400)"],
          ["INSIGHT", "Both schemes save the employer money vs paying time rate for the full 10 hours (10 × ₦400 = ₦4,000)", "Rowan pays the worker more than Halsey when time saved < 50% of standard time"],
        ],
      },
    },
    {
      title: "Labour Turnover — Meaning, Causes, and Cost",
      key: "Labour turnover is the rate at which employees leave and are replaced in an organisation. High labour turnover is costly and disruptive — it must be measured, monitored, and controlled.",
      body: `LABOUR TURNOVER RATE FORMULA:
Labour Turnover Rate = (Number of Employees who Left and were Replaced / Average Number of Employees) × 100

EXAMPLE: If Sunshine Garments Ltd, Lagos had 200 workers on average during the year, and 30 workers left (all replaced):
Labour Turnover Rate = (30 / 200) × 100 = 15%

COSTS OF HIGH LABOUR TURNOVER:`,
      table: {
        headers: ["COST CATEGORY", "SPECIFIC COSTS", "NIGERIAN CONTEXT"],
        rows: [
          ["Preventable (Avoidable) Costs", "Separation costs: exit interview time, final payroll processing; Replacement costs: advertising vacancy (Guardian, Vanguard newspapers, LinkedIn Nigeria), recruitment agency fees, interview time, medical screening", "Advertising a skilled factory position in Lagos can cost ₦50,000–₦200,000 in recruitment fees alone"],
          ["Training Costs", "Induction training, on-the-job training for new recruits, lost productivity while new employee learns the job", "A new quality control technician at a beverage company may take 3–6 months to reach full productivity"],
          ["Hidden Costs", "Lower morale among remaining staff, loss of institutional knowledge, quality defects during transition period, customer dissatisfaction", "If experienced workers at Cadbury Nigeria leave, product consistency may suffer during the transition period"],
        ],
      },
    },
    {
      title: "Payroll Accounting and Labour Cost Control Documents",
      key: "Payroll accounting involves recording wages accurately, deducting statutory obligations (PAYE tax, pension), and ensuring labour costs are correctly charged to jobs or departments.",
      body: `KEY DOCUMENTS IN LABOUR COST CONTROL:`,
      table: {
        headers: ["DOCUMENT", "PURPOSE", "NIGERIAN CONTEXT"],
        rows: [
          ["Clock Card / Attendance Card", "Records time of arrival and departure — basis for calculating total hours worked and overtime", "Manual clocking-in systems or biometric attendance machines used in most Lagos factories"],
          ["Job Time Sheet (Time Ticket)", "Records how long each worker spent on each specific job or operation — basis for charging direct labour to jobs", "Worker fills in: Job No. 206 — 4 hours; Machine maintenance (overhead) — 2 hours"],
          ["Payroll / Wages Sheet", "Summary of all employees' gross pay, deductions (PAYE, NHF, pension — PFA contribution), and net pay for the period", "Dangote Flour Mills Lagos payroll: lists all 500 workers, gross pay, PAYE to FIRS, NHF to FMBN, pension to chosen PFA, net pay"],
          ["Wages Analysis Sheet", "Splits total wages between direct labour (charged to production) and indirect labour (charged to overhead)", "₦1,200,000 total wages this week: ₦900,000 direct (charged to job costs); ₦300,000 indirect (charged to overhead)"],
        ],
      },
    },
  ],
  overhead: [
    {
      title: "Nature of Overhead and the Three-Stage Overhead Absorption Process",
      key: "Overhead (indirect cost) cannot be traced directly to a product or job. It must be shared among products through a three-stage process: Allocation → Apportionment → Absorption.",
      body: `STAGE 1 — ALLOCATION: Overheads that belong entirely to one cost centre are charged directly to that centre (e.g., the salary of the Mixing Department supervisor is allocated 100% to the Mixing Department).

STAGE 2 — APPORTIONMENT: Overheads shared between several cost centres are spread using a fair basis (e.g., factory rent split by floor area occupied by each department).

STAGE 3 — ABSORPTION (Recovery): The overhead accumulated in each production cost centre is charged to products/jobs using a predetermined overhead absorption rate (OAR).

COMMON BASES FOR APPORTIONMENT:`,
      table: {
        headers: ["OVERHEAD ITEM", "FAIR BASIS FOR APPORTIONMENT", "REASON"],
        rows: [
          ["Factory Rent and Rates", "Floor area (square metres) occupied by each department", "Rent is related to space occupied"],
          ["Building Insurance", "Floor area (square metres)", "Insurance relates to space and building value"],
          ["Factory Electricity (machines)", "Machine hours or kilowatt-hour consumption", "Power consumption relates to machine usage"],
          ["Factory Electricity (lighting)", "Floor area or number of light points", "Lighting relates to space"],
          ["Plant and Machinery Depreciation", "Cost of machinery or net book value in each department", "Depreciation relates to assets held"],
          ["Canteen / Welfare Costs", "Number of employees in each department", "Canteen usage relates to number of workers"],
          ["Factory Manager's Salary", "Number of employees, or equally divided", "Manager supervises all staff equally"],
          ["Stores / Materials Handling Costs", "Number or value of materials requisitions raised", "Stores work relates to how much material each dept uses"],
        ],
      },
    },
    {
      title: "Overhead Apportionment — Worked Example with Service Cost Centres",
      key: "After primary apportionment (spreading general overheads to all cost centres), the costs of service cost centres (e.g., maintenance, stores) must be re-apportioned to the production cost centres that use their services. This is called secondary apportionment.",
      body: `EXAMPLE — Nnewi Auto Parts Ltd has two production departments (Machining and Assembly) and two service departments (Maintenance and Stores):

Primary Overhead Totals (after allocation and apportionment):
Machining: ₦300,000 | Assembly: ₦200,000 | Maintenance: ₦80,000 | Stores: ₦40,000

Service dept re-apportionment basis:
- Maintenance: Machining 60% / Assembly 40%
- Stores: Machining 50% / Assembly 50%

SECONDARY APPORTIONMENT (Repeated Distribution / Step-Down):`,
      table: {
        headers: ["OVERHEAD DISTRIBUTION SUMMARY — Nnewi Auto Parts Ltd", "Machining (₦)", "Assembly (₦)", "Maintenance (₦)", "Stores (₦)"],
        rows: [
          ["Primary Overhead Totals", "300,000", "200,000", "80,000", "40,000"],
          ["Re-apportion Maintenance (60:40)", "+48,000", "+32,000", "(80,000)", "—"],
          ["Re-apportion Stores (50:50)", "+20,000", "+20,000", "—", "(40,000)"],
          ["TOTAL OVERHEAD IN PRODUCTION DEPTS", "368,000", "252,000", "—", "—"],
          ["Grand Total = ₦368,000 + ₦252,000", "=", "₦620,000 ✓", "(equals total primary overhead)", ""],
        ],
      },
    },
    {
      title: "Overhead Absorption Rates (OAR) — Calculation and Application",
      key: "The Overhead Absorption Rate (OAR) is the rate at which overhead is charged to products or jobs. It is calculated by dividing budgeted overhead by a budgeted activity level. The most common bases are machine hours and direct labour hours.",
      body: `FORMULA:
OAR = Budgeted Overhead ÷ Budgeted Activity Level

COMMON BASES AND WHEN TO USE EACH:`,
      table: {
        headers: ["OAR BASIS", "FORMULA", "BEST USED WHEN …", "EXAMPLE"],
        rows: [
          ["Direct Labour Hour Rate", "Budgeted Overhead ÷ Budgeted Direct Labour Hours", "Production is labour-intensive (manual work dominates)", "Tailoring workshop where workers hand-sew garments"],
          ["Machine Hour Rate", "Budgeted Overhead ÷ Budgeted Machine Hours", "Production is machine-intensive (automated factory)", "Bottling plant at 7UP Nigeria — machines dominate"],
          ["Percentage of Direct Labour Cost", "(Budgeted Overhead ÷ Budgeted Direct Labour Cost) × 100", "Labour rates are uniform across the department", "Simple workshop where all workers earn the same rate"],
          ["Percentage of Prime Cost", "(Budgeted Overhead ÷ Budgeted Prime Cost) × 100", "Mix of labour and material costs — useful as a rough overall rate", "Small production units with mixed resources"],
          ["Per Unit Rate", "Budgeted Overhead ÷ Budgeted Units of Output", "Single product factories where all units are identical", "A cement factory producing one standard bag of cement"],
        ],
      },
    },
    {
      title: "Under-Absorption and Over-Absorption of Overhead",
      key: "Under-absorption occurs when actual overhead exceeds the overhead absorbed (charged to products). Over-absorption occurs when overhead absorbed exceeds actual overhead incurred. Both differences must be written off to the Income Statement.",
      body: `FORMULA:
Overhead Absorbed = OAR × Actual Activity Level
Under/Over Absorption = Overhead Absorbed − Actual Overhead Incurred
(Positive = Over-absorbed; Negative = Under-absorbed)

EXAMPLE — Nnewi Auto Parts Ltd, Machining Department:
Budgeted overhead: ₦368,000 | Budgeted machine hours: 4,000 hours
OAR = ₦368,000 ÷ 4,000 = ₦92 per machine hour

Actual results for the period:
Actual overhead incurred: ₦380,000
Actual machine hours worked: 3,900 hours`,
      table: {
        headers: ["UNDER / OVER-ABSORPTION CALCULATION — Machining Dept", "₦"],
        rows: [
          ["Overhead Absorbed (3,900 hrs × ₦92 OAR)", "358,800"],
          ["Actual Overhead Incurred", "(380,000)"],
          ["UNDER-ABSORPTION (Absorbed < Actual — shortfall)", "(21,200)"],
          ["Treatment: Debit ₦21,200 to Income Statement as an additional cost (under-recovery)", ""],
          ["Had actual hours been 4,200 and actual overhead ₦368,000:", ""],
          ["Overhead Absorbed (4,200 × ₦92) = ₦386,400 vs Actual ₦368,000", ""],
          ["OVER-ABSORPTION = ₦386,400 − ₦368,000 = ₦18,400 → Credit to Income Statement (reduces cost)", ""],
        ],
      },
    },
  ],
  job_costing: [
    {
      title: "Features of Job Costing",
      key: "Job costing is a method used when each unit of output (job) is unique and made to a customer's specific requirements. A separate cost record (Job Cost Card) is maintained for each job, accumulating direct materials, direct labour, and absorbed overhead.",
      body: `JOB COSTING IS USED BY:
- Engineering workshops (e.g., Nnewi auto-parts fabricators making custom engine parts)
- Printing companies (e.g., Longman Nigeria Plc printing a unique textbook order)
- Construction companies (e.g., Julius Berger Nigeria building a specific road or bridge)
- Repair and maintenance firms (e.g., an IT company servicing specific client computers)
- Advertising agencies (e.g., a campaign created specifically for MTN Nigeria)
- Hospitals (e.g., the specific cost of treating one patient at Lagos University Teaching Hospital)

KEY FEATURES OF JOB COSTING:`,
      table: {
        headers: ["FEATURE", "EXPLANATION"],
        rows: [
          ["Each job is unique", "Every job differs in specification, materials needed, and time required — unlike mass production"],
          ["Separate Job Cost Card for each job", "All costs (direct materials, direct labour, overhead absorbed) are recorded job by job"],
          ["Customer-driven production", "Work does not begin until a customer order is received"],
          ["Cost ascertained at completion", "Total job cost is calculated when all materials are issued and all labour time is posted"],
          ["Profit calculated per job", "Selling price minus total job cost gives the profit (or loss) on that specific job"],
          ["Wide cost variation between jobs", "Job A (simple repair) may cost ₦5,000; Job B (complex fabrication) may cost ₦500,000"],
        ],
      },
    },
    {
      title: "The Job Cost Card — Structure and Preparation",
      key: "The Job Cost Card (Job Cost Sheet) is the central document in job costing. It accumulates all costs charged to a specific job — direct materials (from Materials Requisition Notes), direct labour (from Time Sheets), and overhead (calculated using OAR × actual activity).",
      body: `EXAMPLE — Lagos Engineering Works Ltd
Job Number: 206 (Custom steel frame for a construction company)
Customer: Razzaq Construction Ltd, Victoria Island, Lagos
Date Started: 3 January | Date Completed: 18 January`,
      table: {
        headers: ["JOB COST CARD — JOB NO. 206 | Lagos Engineering Works Ltd", "₦", "₦"],
        rows: [
          ["DIRECT MATERIALS:", "", ""],
          ["  Steel rods — MRN 041 (150 kg @ ₦800/kg)", "120,000", ""],
          ["  Welding rods — MRN 042 (20 kg @ ₦500/kg)", "10,000", ""],
          ["  Paint and primer — MRN 043", "5,000", ""],
          ["TOTAL DIRECT MATERIALS", "", "135,000"],
          ["DIRECT LABOUR:", "", ""],
          ["  Dept E — Fabrication: 40 hours @ ₦600/hr", "24,000", ""],
          ["  Dept F — Finishing: 20 hours @ ₦500/hr", "10,000", ""],
          ["TOTAL DIRECT LABOUR", "", "34,000"],
          ["PRIME COST", "", "169,000"],
          ["MANUFACTURING OVERHEAD ABSORBED:", "", ""],
          ["  Dept E — 40 machine hrs @ OAR ₦300/hr", "12,000", ""],
          ["  Dept F — 20 labour hrs @ OAR ₦200/hr", "4,000", ""],
          ["TOTAL OVERHEAD ABSORBED", "", "16,000"],
          ["FACTORY COST OF JOB 206", "", "185,000"],
          ["Add: Selling and Admin Overhead (10% of Factory Cost)", "", "18,500"],
          ["TOTAL COST OF JOB 206", "", "203,500"],
          ["Agreed Selling Price (quoted to Razzaq Construction)", "", "280,000"],
          ["PROFIT ON JOB 206", "", "76,500"],
          ["Profit Margin = ₦76,500 / ₦280,000 × 100", "", "27.3%"],
        ],
      },
    },
    {
      title: "Batch Costing — A Variant of Job Costing",
      key: "Batch costing is used when identical units are produced in groups (batches) rather than individually. The total cost of the batch is calculated first, then divided by the number of units to get the cost per unit.",
      body: `BATCH COSTING IS USED BY:
- Pharmaceutical companies (e.g., Emzor Pharmaceutical producing 10,000 paracetamol tablets per batch)
- Bakeries (e.g., Supreme Bread Nig. Ltd baking 500 loaves per batch)
- Clothing factories (e.g., a Kano garment factory producing 200 uniforms per school order)
- Electronics assemblers (producing a batch of 50 transformers to a customer's specification)

EXAMPLE — Emzor Pharmaceutical, Lagos: Batch of 10,000 paracetamol tablets (Batch No. P-114)`,
      table: {
        headers: ["BATCH COST CARD — BATCH P-114 | 10,000 Paracetamol Tablets | Emzor Pharmaceutical", "₦"],
        rows: [
          ["Direct Materials (paracetamol powder, excipients, packaging)", "45,000"],
          ["Direct Labour (mixing, tablet pressing, quality check)", "18,000"],
          ["Manufacturing Overhead Absorbed (OAR × machine hours)", "12,000"],
          ["TOTAL BATCH COST", "75,000"],
          ["Cost per tablet = ₦75,000 ÷ 10,000 tablets", "₦7.50 per tablet"],
          ["Selling price per tablet (mark-up 60%)", "₦12.00 per tablet"],
          ["Profit per tablet", "₦4.50 per tablet"],
        ],
      },
    },
  ],
  costing_tech: [
    {
      title: "Absorption Costing — Meaning and Principles",
      key: "Absorption costing (also called full costing or total costing) charges BOTH fixed and variable production costs to each unit of output. All manufacturing costs — direct and indirect — are absorbed into product cost.",
      body: `Under absorption costing, the cost per unit includes:
1. Direct Materials
2. Direct Labour
3. Variable Manufacturing Overhead
4. FIXED Manufacturing Overhead (absorbed via OAR)

The fixed overhead per unit = Total Fixed Manufacturing Overhead ÷ Budgeted Output

KEY CONSEQUENCE: When production is MORE than sales, some fixed overhead is carried forward in closing stock (deferred to the next period) — this makes absorption costing profit HIGHER than marginal costing profit.
When production is LESS than sales, more fixed overhead is charged than incurred this period — absorption costing profit is LOWER than marginal costing profit.

EXAMPLE — Sunshine Garments Ltd, Lagos:
Production: 10,000 shirts | Sales: 8,000 shirts | Closing stock: 2,000 shirts
Variable cost per shirt: ₦500 | Fixed manufacturing overhead: ₦200,000 total
Fixed overhead per unit (OAR): ₦200,000 ÷ 10,000 = ₦20 per shirt
Absorption cost per shirt: ₦500 + ₦20 = ₦520`,
      table: {
        headers: ["ABSORPTION COSTING INCOME STATEMENT — Sunshine Garments Ltd", "₦", "₦"],
        rows: [
          ["Sales (8,000 shirts × ₦800)", "", "6,400,000"],
          ["Less: Cost of Sales:", "", ""],
          ["  Opening Stock", "0", ""],
          ["  Production Cost (10,000 × ₦520)", "5,200,000", ""],
          ["  Less: Closing Stock (2,000 × ₦520)", "(1,040,000)", ""],
          ["COST OF SALES", "", "(4,160,000)"],
          ["GROSS PROFIT", "", "2,240,000"],
          ["Less: Selling & Admin Overheads (fixed)", "", "(300,000)"],
          ["NET PROFIT (Absorption Costing)", "", "1,940,000"],
        ],
      },
    },
    {
      title: "Marginal Costing — Meaning and Principles",
      key: "Marginal costing charges only VARIABLE production costs to units of output. Fixed production overhead is treated as a PERIOD COST — written off entirely to the Income Statement in the period incurred, regardless of stock levels.",
      body: `Under marginal costing, the cost per unit includes only:
1. Direct Materials
2. Direct Labour
3. Variable Manufacturing Overhead
(Fixed overhead is NOT included in unit cost — it goes straight to the Income Statement)

KEY CONCEPT — CONTRIBUTION:
Contribution = Selling Price − Variable Cost per unit
Contribution is the amount each unit contributes first to covering Fixed Costs, then to Profit.

Using the same Sunshine Garments example:
Marginal cost per shirt = ₦500 (variable costs only — no fixed overhead)`,
      table: {
        headers: ["MARGINAL COSTING INCOME STATEMENT — Sunshine Garments Ltd", "₦", "₦"],
        rows: [
          ["Sales (8,000 shirts × ₦800)", "", "6,400,000"],
          ["Less: Variable Cost of Sales:", "", ""],
          ["  Production (10,000 × ₦500)", "5,000,000", ""],
          ["  Less: Closing Stock (2,000 × ₦500)", "(1,000,000)", ""],
          ["VARIABLE COST OF SALES", "", "(4,000,000)"],
          ["CONTRIBUTION (Sales − Variable Cost of Sales)", "", "2,400,000"],
          ["Less: FIXED COSTS (written off in full this period):", "", ""],
          ["  Fixed Manufacturing Overhead", "(200,000)", ""],
          ["  Selling & Admin Overheads (fixed)", "(300,000)", ""],
          ["TOTAL FIXED COSTS", "", "(500,000)"],
          ["NET PROFIT (Marginal Costing)", "", "1,900,000"],
        ],
      },
    },
    {
      title: "Reconciling Absorption and Marginal Costing Profits",
      key: "The difference between absorption and marginal costing profit is always equal to the fixed overhead included in or released from stock movements. When closing stock > opening stock, absorption profit is higher.",
      body: `RECONCILIATION FORMULA:
Difference in Profit = Fixed Overhead per unit × Change in Stock Units

USING THE SUNSHINE GARMENTS EXAMPLE:
Change in Stock = Closing Stock − Opening Stock = 2,000 − 0 = 2,000 units (stock increased)
Fixed Overhead per unit = ₦20
Difference = 2,000 × ₦20 = ₦40,000

Absorption Costing Profit: ₦1,940,000
Less: Fixed overhead deferred in closing stock: (₦40,000)
= Marginal Costing Profit: ₦1,900,000 ✓`,
      table: {
        headers: ["PROFIT RECONCILIATION STATEMENT", "₦"],
        rows: [
          ["Net Profit under Absorption Costing", "1,940,000"],
          ["Less: Fixed overhead carried forward in closing stock (2,000 units × ₦20)", "(40,000)"],
          ["Net Profit under Marginal Costing", "1,900,000 ✓"],
          ["RULE: Closing stock > Opening stock → Absorption profit HIGHER than Marginal profit", ""],
          ["RULE: Closing stock < Opening stock → Absorption profit LOWER than Marginal profit", ""],
          ["RULE: Closing stock = Opening stock → Both methods give the SAME profit", ""],
        ],
      },
    },
    {
      title: "Comparison of Absorption and Marginal Costing",
      key: "Absorption and marginal costing differ in how they treat fixed production overhead. Each method has its advantages — absorption is required for external financial reporting (IFRS/IAS 2); marginal is preferred internally for decision-making.",
      body: ``,
      table: {
        headers: ["BASIS", "ABSORPTION COSTING", "MARGINAL COSTING"],
        rows: [
          ["Fixed overhead treatment", "Absorbed into unit cost; carried in stock", "Period cost — written off entirely in the period"],
          ["Stock valuation", "Includes fixed overhead (higher stock value)", "Excludes fixed overhead (lower stock value, per IAS 2 marginal is not permitted for external reporting)"],
          ["Profit when stock increases", "HIGHER (some fixed cost deferred in stock)", "LOWER"],
          ["Profit when stock decreases", "LOWER (extra fixed cost released from stock)", "HIGHER"],
          ["Use of Contribution concept", "Not highlighted — gross profit is shown", "Central concept — Contribution clearly identified"],
          ["Best used for …", "External financial reporting (IAS 2 requires full cost), pricing long-run products", "Internal decisions: make-or-buy, shutdown, special pricing, CVP analysis"],
          ["Nigerian regulatory requirement", "IFRS/IAS 2 requires absorption costing for published accounts", "Management use only — not for published financial statements"],
        ],
      },
    },
  ],
  cvp: [
    {
      title: "Cost-Volume-Profit (CVP) Analysis — Key Concepts",
      key: "CVP analysis examines the relationship between costs, sales volume, and profit. It helps management understand how changes in output, selling price, or cost structure affect profit — and at what level of sales the business breaks even.",
      body: `FUNDAMENTAL RELATIONSHIPS:

CONTRIBUTION = Selling Price per unit − Variable Cost per unit
(Contribution is the amount per unit available to cover fixed costs; any excess becomes profit)

CONTRIBUTION MARGIN RATIO (C/S RATIO or P/V RATIO):
= (Contribution per unit / Selling Price per unit) × 100
OR = (Total Contribution / Total Sales Revenue) × 100

BREAKEVEN POINT (BEP) — where Total Revenue = Total Costs; Profit = ₦0:
BEP (in units) = Total Fixed Costs / Contribution per unit
BEP (in ₦ revenue) = Total Fixed Costs / C/S Ratio

MARGIN OF SAFETY:
= Actual (or Budgeted) Sales − Breakeven Sales
(Can be expressed in units, ₦, or as a % of actual sales)
= Shows how much sales can fall before the business makes a loss`,
    },
    {
      title: "CVP Analysis — Full Worked Example",
      key: "CVP analysis allows a business to calculate breakeven point, margin of safety, target profit sales level, and the effect of changes in costs or prices — all essential tools for Nigerian business management.",
      body: `EXAMPLE — Bisi Cosmetics Ltd, Lagos produces one product: Glow Cream.

Selling price per jar: ₦1,200
Variable cost per jar: ₦720 (materials ₦500 + labour ₦150 + variable overhead ₦70)
Total Fixed Costs per year: ₦2,400,000
Budgeted (actual) sales: 8,000 jars`,
      table: {
        headers: ["CVP CALCULATIONS — BISI COSMETICS LTD", "WORKINGS", "ANSWER"],
        rows: [
          ["Contribution per jar", "₦1,200 − ₦720", "₦480"],
          ["Contribution/Sales (C/S) Ratio", "(₦480 / ₦1,200) × 100", "40%"],
          ["Breakeven Point (units)", "₦2,400,000 / ₦480", "5,000 jars"],
          ["Breakeven Point (₦ revenue)", "₦2,400,000 / 0.40", "₦6,000,000"],
          ["CHECK: At 5,000 jars — Total Revenue = 5,000 × ₦1,200 = ₦6,000,000; Total VC = 5,000 × ₦720 = ₦3,600,000; Contribution = ₦2,400,000 = Fixed Costs ✓", "", "Profit = ₦0 ✓"],
          ["Margin of Safety (units)", "8,000 − 5,000", "3,000 jars"],
          ["Margin of Safety (₦)", "₦9,600,000 − ₦6,000,000", "₦3,600,000"],
          ["Margin of Safety (%)", "(3,000 / 8,000) × 100", "37.5%"],
          ["Profit at budgeted sales of 8,000 jars", "(8,000 × ₦480) − ₦2,400,000", "₦1,440,000"],
        ],
      },
    },
    {
      title: "Target Profit and Sensitivity Analysis",
      key: "CVP analysis can be used to find the sales volume needed to achieve a target profit, or to analyse how sensitive profit is to changes in selling price, variable cost, or fixed cost.",
      body: `FORMULA — Sales Volume Required for Target Profit:
Units needed = (Fixed Costs + Target Profit) / Contribution per unit
Revenue needed = (Fixed Costs + Target Profit) / C/S Ratio

USING BISI COSMETICS LTD EXAMPLE:

Q1: How many jars must Bisi sell to make a target profit of ₦960,000?`,
      table: {
        headers: ["TARGET PROFIT AND SENSITIVITY — BISI COSMETICS LTD", "WORKINGS", "ANSWER"],
        rows: [
          ["Units for target profit of ₦960,000", "(₦2,400,000 + ₦960,000) / ₦480", "7,000 jars"],
          ["Revenue for target profit of ₦960,000", "7,000 × ₦1,200  OR  ₦3,360,000 / 0.40", "₦8,400,000"],
          ["Effect of ₦100 price INCREASE (new SP ₦1,300): New contribution = ₦1,300 − ₦720 = ₦580; New BEP", "₦2,400,000 / ₦580", "4,138 jars (BEP falls — good)"],
          ["Effect of ₦50 variable cost INCREASE (new VC ₦770): New contribution = ₦1,200 − ₦770 = ₦430; New BEP", "₦2,400,000 / ₦430", "5,582 jars (BEP rises — bad)"],
          ["Effect of ₦300,000 INCREASE in fixed costs (new FC ₦2,700,000): New BEP", "₦2,700,000 / ₦480", "5,625 jars (BEP rises — bad)"],
        ],
      },
    },
    {
      title: "Limitations of CVP Analysis",
      key: "CVP analysis relies on simplifying assumptions that may not hold in practice, especially for large Nigerian manufacturing companies with diverse product lines and fluctuating costs.",
      body: ``,
      table: {
        headers: ["ASSUMPTION IN CVP", "LIMITATION IN PRACTICE", "NIGERIAN CONTEXT"],
        rows: [
          ["Selling price is constant at all output levels", "In reality, bulk discounts are given to large customers", "Dangote Cement may give distributors a lower price per bag on very large orders — price is not fixed"],
          ["Variable cost per unit is constant", "In practice, bulk purchasing may reduce material cost per unit; overtime increases labour cost per unit", "Buying more palm oil at once may reduce unit cost; EKEDC tariff increases raise electricity cost unpredictably"],
          ["Fixed costs remain constant over all output levels", "Fixed costs are only fixed within the relevant range; they step up at higher output", "Renting an additional factory floor if production exceeds current capacity"],
          ["Only one product (or constant sales mix)", "Most Nigerian businesses sell multiple products with different contribution margins", "Nestlé Nigeria sells Milo, Nido, Maggi, and Golden Morn — each has a different contribution"],
          ["Production equals sales (no stock changes)", "In practice, closing and opening stocks exist", "A seasonal business like a Nigerian beverage company builds up stock before festive periods"],
        ],
      },
    },
  ],
  budgeting: [
    {
      title: "Introduction to Budgeting — Purpose and Types of Budgets",
      key: "A budget is a quantitative plan expressed in financial terms, prepared and approved before the budget period, covering a defined future period. Budgeting is the process of preparing budgets; Budgetary Control is using budgets to monitor and control actual performance.",
      body: `PURPOSES OF BUDGETING (the 'CCCMP' mnemonic):
1. PLANNING — forces management to plan ahead (e.g., Dangote Cement planning production and sales for the next financial year)
2. CO-ORDINATION — ensures all departments work towards the same goals
3. CONTROL — actual results are compared to budgeted figures; variances are investigated
4. MOTIVATION — targets give managers and staff something to strive for
5. COMMUNICATION — budgets communicate management's expectations to all departments
6. PERFORMANCE EVALUATION — managers' efficiency is judged against their budgets

TYPES OF BUDGETS:`,
      table: {
        headers: ["BUDGET TYPE", "WHAT IT COVERS", "PREPARED BY"],
        rows: [
          ["Sales Budget", "Expected sales volume and revenue in units and ₦ for each product/region", "Sales Manager — usually the first budget prepared (the principal budget factor or limiting factor determines this)"],
          ["Production Budget", "Units to be produced = Sales Units + Closing Stock − Opening Stock", "Production Manager"],
          ["Materials (Usage and Purchase) Budget", "Quantity and cost of raw materials required; purchase budget adjusts for opening/closing material stocks", "Purchasing Manager"],
          ["Labour Budget", "Hours and cost of direct labour needed to meet production budget", "HR / Factory Manager"],
          ["Overhead Budget", "Factory, selling, and administrative overheads — split fixed and variable", "Department Heads"],
          ["Cash Budget", "Monthly cash inflows and outflows; closing cash/bank balance each month", "Finance Manager / Accountant"],
          ["Capital Expenditure Budget", "Planned spending on non-current assets (buildings, plant, vehicles)", "Board of Directors / Finance Director"],
          ["Master Budget", "Combines all functional budgets into a Budgeted Income Statement and Budgeted Balance Sheet", "Chief Accountant / CFO"],
        ],
      },
    },
    {
      title: "Preparing a Cash Budget",
      key: "A cash budget (cash flow forecast) shows the expected cash receipts and cash payments for each period (usually monthly), resulting in a net cash flow and a closing cash balance. It identifies when the business will have surplus cash or need a bank overdraft.",
      body: `IMPORTANT RULES FOR CASH BUDGETS:
- Only CASH items are included (not depreciation, accruals, or non-cash provisions).
- Credit sales are received in a later month (e.g., debtors pay 1 month after sale).
- Credit purchases are paid in a later month (e.g., creditors are paid 2 months after purchase).
- Capital expenditure appears in full in the month of PAYMENT (not depreciated).

EXAMPLE — Tunde Electronics Ltd, Abuja (Cash Budget: January to March):

ASSUMPTIONS:
- Sales: Jan ₦500,000; Feb ₦600,000; Mar ₦700,000 (60% cash, 40% collected next month)
- Purchases: Dec ₦200,000; Jan ₦250,000; Feb ₦300,000; Mar ₦350,000 (all on credit — paid 1 month later)
- Wages (cash each month): ₦80,000
- Rent (paid quarterly in January): ₦120,000
- New computer equipment purchased and paid in February: ₦150,000
- Opening cash balance (1 January): ₦50,000`,
      table: {
        headers: ["CASH BUDGET — TUNDE ELECTRONICS LTD (Jan–Mar)", "JANUARY (₦)", "FEBRUARY (₦)", "MARCH (₦)"],
        rows: [
          ["CASH RECEIPTS:", "", "", ""],
          ["Cash Sales (60% of current month sales)", "300,000", "360,000", "420,000"],
          ["Receipts from Debtors (40% of prior month sales)", "—", "200,000", "240,000"],
          ["TOTAL CASH RECEIPTS (A)", "300,000", "560,000", "660,000"],
          ["CASH PAYMENTS:", "", "", ""],
          ["Payment to Suppliers (purchases from prior month)", "200,000", "250,000", "300,000"],
          ["Wages (cash)", "80,000", "80,000", "80,000"],
          ["Rent (quarterly — paid in Jan only)", "120,000", "—", "—"],
          ["Computer Equipment (capital)", "—", "150,000", "—"],
          ["TOTAL CASH PAYMENTS (B)", "400,000", "480,000", "380,000"],
          ["NET CASH FLOW (A − B)", "(100,000)", "80,000", "280,000"],
          ["Opening Cash Balance", "50,000", "(50,000)", "30,000"],
          ["CLOSING CASH BALANCE", "(50,000)", "30,000", "310,000"],
          ["NOTE: January closing balance is NEGATIVE (₦50,000 overdraft) — Tunde must arrange a bank overdraft facility with GTBank for January/February", "", "", ""],
        ],
      },
    },
    {
      title: "Flexible Budgeting and Variance Analysis",
      key: "A fixed budget is prepared for one level of activity and is not adjusted when actual activity differs. A flexible budget is adjusted to the actual level of activity, making comparison with actual results more meaningful.",
      body: `FIXED BUDGET: Prepared at the start of the period for a planned output level. Not revised even if actual output differs.

FLEXIBLE BUDGET: Recalculated at the end of the period to match the ACTUAL output level. Variable costs are scaled proportionally; fixed costs remain the same.

VARIANCE: The difference between budgeted and actual figures.
Favourable (F) — actual is better than budget (higher income or lower cost).
Adverse (A) — actual is worse than budget (lower income or higher cost).

EXAMPLE — Aba Soap Company (Production Department):
Fixed budget: 5,000 bars; Actual output: 6,000 bars`,
      table: {
        headers: ["FLEXIBLE BUDGET STATEMENT — ABA SOAP COMPANY", "Fixed Budget (5,000 bars) (₦)", "Flexible Budget (6,000 bars) (₦)", "Actual (6,000 bars) (₦)", "VARIANCE (₦)"],
        rows: [
          ["Variable Costs:", "", "", "", ""],
          ["Direct Materials (₦30/bar)", "150,000", "180,000", "192,000", "12,000 Adverse"],
          ["Direct Labour (₦20/bar)", "100,000", "120,000", "115,000", "5,000 Favourable"],
          ["Variable Overhead (₦10/bar)", "50,000", "60,000", "58,000", "2,000 Favourable"],
          ["Fixed Overhead", "80,000", "80,000", "85,000", "5,000 Adverse"],
          ["TOTAL COST", "380,000", "440,000", "450,000", "10,000 Adverse"],
          ["NOTE: Compare Actual vs Flexible Budget — NOT vs Fixed Budget, since output levels differ", "", "", "", ""],
        ],
      },
    },
  ],
  investment: [
    {
      title: "Introduction to Investment Appraisal (Capital Budgeting)",
      key: "Investment appraisal (capital budgeting) is the process of evaluating major long-term capital expenditure decisions — deciding whether to invest in a project based on its expected financial returns. The four main methods are Payback Period, ARR, NPV, and IRR.",
      body: `WHAT COUNTS AS A CAPITAL INVESTMENT DECISION?
- Purchasing new machinery or factory equipment (e.g., Aba Soap buying a new automated soap moulding machine)
- Building a new factory or warehouse
- Launching a new product line
- Replacing an old delivery truck fleet (e.g., Emeka Transport Ltd)
- Acquiring another company

WHY CAPITAL BUDGETING MATTERS:
1. Large sums of money are involved — wrong decisions are very costly.
2. Decisions are difficult to reverse (irreversibility).
3. Affects the long-term direction and competitiveness of the business.
4. Opportunity cost is high — money invested here cannot be invested elsewhere.

FOUR MAIN APPRAISAL METHODS:`,
      table: {
        headers: ["METHOD", "BASED ON …", "CONSIDERS TIME VALUE OF MONEY?", "MOST USEFUL WHEN …"],
        rows: [
          ["Payback Period", "Cash flows — how quickly is the initial investment recovered?", "NO", "Business is risk-averse or has cash flow concerns; quick payback is important"],
          ["Accounting Rate of Return (ARR)", "Accounting profit — average annual profit as % of average investment", "NO", "Business wants a return expressed as a percentage (comparable to interest rates or target returns)"],
          ["Net Present Value (NPV)", "Discounted cash flows — present value of all future cash inflows minus initial investment", "YES", "Theoretically superior method; identifies maximum wealth creation for shareholders"],
          ["Internal Rate of Return (IRR)", "The discount rate at which NPV = ₦0", "YES", "Useful when comparing projects of different sizes; expressed as a percentage return"],
        ],
      },
    },
    {
      title: "Payback Period Method",
      key: "The Payback Period is the time it takes for a project's cumulative net cash inflows to recover the initial capital investment. Shorter payback is preferred. It is simple but ignores cash flows after payback and the time value of money.",
      body: `EXAMPLE — Emeka Transport Ltd is evaluating two projects (initial investment ₦2,400,000 each):`,
      table: {
        headers: ["PAYBACK PERIOD — EMEKA TRANSPORT LTD", "Project A — Annual Cash Inflow (₦)", "Cumulative — A (₦)", "Project B — Annual Cash Inflow (₦)", "Cumulative — B (₦)"],
        rows: [
          ["Year 1", "800,000", "800,000", "1,200,000", "1,200,000"],
          ["Year 2", "800,000", "1,600,000", "900,000", "2,100,000"],
          ["Year 3", "800,000", "2,400,000 ✓", "600,000", "2,700,000"],
          ["Year 4", "800,000", "3,200,000", "300,000", "3,000,000"],
          ["Year 5", "800,000", "4,000,000", "300,000", "3,300,000"],
          ["PAYBACK PERIOD", "Exactly 3 years", "", "2 years + (₦300,000/₦600,000) × 12 = 2 years 6 months", ""],
          ["DECISION", "Project B pays back faster → PREFERRED on payback criterion", "", "", ""],
        ],
      },
    },
    {
      title: "Accounting Rate of Return (ARR)",
      key: "The ARR (also called Return on Capital Employed — ROCE) expresses the average annual accounting profit as a percentage of the average investment. It is compared to a target/hurdle rate. Higher ARR is preferred.",
      body: `FORMULA:
ARR = (Average Annual Profit / Average Investment) × 100

Average Annual Profit = Total Net Profit over project life / Number of years
Average Investment = (Initial Investment + Residual Value) / 2

USING PROJECT A — Emeka Transport Ltd:
Total Cash Inflows (5 years): 5 × ₦800,000 = ₦4,000,000
Initial Investment: ₦2,400,000 | Residual Value: ₦0 | Depreciation: ₦2,400,000 ÷ 5 = ₦480,000/year
Average Annual Profit = Average Cash Inflow − Annual Depreciation = ₦800,000 − ₦480,000 = ₦320,000
Average Investment = (₦2,400,000 + ₦0) / 2 = ₦1,200,000`,
      table: {
        headers: ["ARR CALCULATION — PROJECT A (Emeka Transport Ltd)", ""],
        rows: [
          ["Average Annual Profit", "₦320,000"],
          ["Average Investment", "₦1,200,000"],
          ["ARR = (₦320,000 / ₦1,200,000) × 100", "26.7% per annum"],
          ["If Emeka's target/hurdle rate = 20%", "ARR of 26.7% > 20% → ACCEPT Project A"],
          ["LIMITATION: ARR uses accounting profit (not cash flow) and ignores the time value of money — an early high profit is treated the same as a late high profit", ""],
        ],
      },
    },
    {
      title: "Net Present Value (NPV) Method",
      key: "NPV discounts all future cash flows back to their present value using a required rate of return (cost of capital / discount rate). A positive NPV means the project generates more than the required return — ACCEPT. Negative NPV — REJECT.",
      body: `FORMULA:
NPV = Sum of (Cash Flow in Year n × Discount Factor for Year n) − Initial Investment

PRESENT VALUE (PV) FACTOR for Year n = 1 / (1 + r)^n  where r = discount rate

EXAMPLE — Project A, Emeka Transport Ltd (Discount rate = 10%):`,
      table: {
        headers: ["NPV CALCULATION — PROJECT A at 10% Discount Rate", "Year", "Cash Flow (₦)", "Discount Factor @ 10%", "Present Value (₦)"],
        rows: [
          ["Initial Investment (Year 0)", "0", "(2,400,000)", "1.000", "(2,400,000)"],
          ["Cash Inflow Year 1", "1", "800,000", "0.909", "727,200"],
          ["Cash Inflow Year 2", "2", "800,000", "0.826", "660,800"],
          ["Cash Inflow Year 3", "3", "800,000", "0.751", "600,800"],
          ["Cash Inflow Year 4", "4", "800,000", "0.683", "546,400"],
          ["Cash Inflow Year 5", "5", "800,000", "0.621", "496,800"],
          ["TOTAL PRESENT VALUE OF INFLOWS", "", "", "", "3,032,000"],
          ["LESS: Initial Investment", "", "", "", "(2,400,000)"],
          ["NET PRESENT VALUE (NPV)", "", "", "", "+632,000"],
          ["DECISION: NPV is POSITIVE (+₦632,000) → ACCEPT Project A — it earns more than the 10% required return and creates ₦632,000 of value for Emeka Transport", "", "", "", ""],
        ],
      },
    },
  ],

  /* ═══════════════════════════════════════════════════════════
     ACC003 — BASIC AUDITING
  ═══════════════════════════════════════════════════════════ */

  audit_history: [
    {
      title: "History and Development of Auditing",
      key: "Auditing developed alongside the growth of trade, commerce, and corporate ownership. As businesses grew larger and ownership separated from management, independent verification of accounts became necessary.",
      body: `HISTORICAL DEVELOPMENT OF AUDITING:`,
      table: {
        headers: ["ERA / PERIOD", "DEVELOPMENT", "SIGNIFICANCE"],
        rows: [
          ["Ancient Times (Egypt, Rome, Greece)", "Government officials checked public accounts by listening to oral reports — the word 'audit' comes from the Latin 'audire' meaning 'to hear'", "Early recognition that financial records need independent verification"],
          ["Medieval England (13th–15th century)", "Auditors checked the accounts of feudal estates and guilds — landowners appointed independent persons to verify stewards' records", "Stewardship concept — managers (stewards) must account for resources entrusted to them by owners"],
          ["Industrial Revolution (18th–19th century)", "Growth of joint stock companies separated ownership from management. Shareholders needed independent checks on directors' management of their funds", "Foundation of modern audit — Companies Act 1844 (UK) required audits of registered companies"],
          ["Late 19th – Early 20th century", "Professional accounting bodies formed: ICAEW (UK) 1880; auditing became a recognised profession. Focus shifted from detecting fraud to certifying 'true and correct' accounts", "Professionalisation of audit; shift from fraud detection to financial reporting verification"],
          ["20th century to present", "Major corporate scandals worldwide (Enron 2001, WorldCom 2002) led to stricter auditing standards; Sarbanes-Oxley Act (USA) 2002; International Standards on Auditing (ISAs) harmonised globally; in Nigeria — CAMA 2020, FRC Act 2011", "Risk-based auditing; independent regulation; emphasis on audit quality and public interest"],
          ["Nigeria — ICAN era (1965–present)", "Institute of Chartered Accountants of Nigeria (ICAN) established 1965; Association of National Accountants of Nigeria (ANAN) 1979; Financial Reporting Council of Nigeria (FRC) 2011; CAMA 2020 updated audit requirements", "Nigeria aligned with global standards; CAMA 2020 requires statutory audits for public companies and large private companies"],
        ],
      },
    },
  ],
  audit_nature: [
    {
      title: "Meaning and Definition of Auditing",
      key: "Auditing is an independent examination of the financial statements of an entity, conducted by a qualified and independent person (the auditor), with a view to expressing an opinion on whether the statements give a true and fair view.",
      body: `KEY ELEMENTS IN THE DEFINITION:
1. INDEPENDENT EXAMINATION — the auditor must have no financial or personal interest in the entity being audited.
2. FINANCIAL STATEMENTS — the Income Statement, Balance Sheet, Cash Flow Statement, and Notes to Accounts.
3. QUALIFIED PERSON — must be a professional accountant (in Nigeria: ICAN or ANAN member, registered with FRC).
4. TRUE AND FAIR VIEW — the accounts are free from material misstatement and comply with applicable standards (IFRS/CAMA).

TYPES OF AUDIT:`,
      table: {
        headers: ["TYPE OF AUDIT", "DESCRIPTION", "NIGERIAN EXAMPLE"],
        rows: [
          ["Statutory (External) Audit", "Audit required by law (CAMA 2020) — conducted by an independent external auditor appointed by shareholders at the AGM", "KPMG Nigeria auditing Access Bank Plc's annual accounts; Deloitte auditing Nestle Nigeria Plc"],
          ["Internal Audit", "Audit conducted by employees of the organisation — reports to management/audit committee; NOT independent in the same way as external audit", "Dangote Cement's internal audit department reviewing internal controls and operational efficiency"],
          ["Government / Public Sector Audit", "Audit of government ministries, departments, and agencies — conducted by the Auditor-General (AG) appointed under the Constitution", "The Auditor-General of the Federation auditing Federal Government MDAs; the Lagos State Auditor-General auditing state government accounts"],
          ["Forensic Audit", "Investigative audit aimed at uncovering fraud, corruption, or financial crimes — findings are used as evidence in legal proceedings", "EFCC-ordered forensic audit of a bank MD's accounts; court-ordered forensic review of a company's records in a shareholder dispute"],
          ["Compliance Audit", "Checks whether an organisation has complied with specific laws, regulations, or internal policies", "SEC Nigeria reviewing whether a listed company complied with corporate governance rules; CBN examining a bank's compliance with prudential guidelines"],
          ["Management Audit (Operational Audit)", "Evaluates the efficiency and effectiveness of management processes and controls", "Reviewing whether Flour Mills Nigeria's procurement process follows best practice — not just whether accounts are correct"],
        ],
      },
    },
    {
      title: "Qualities (Attributes) of an Auditor",
      key: "An auditor must possess both professional and personal qualities to carry out an effective and credible audit. These qualities are tested in JUPEB examinations and are central to professional standards.",
      body: ``,
      table: {
        headers: ["QUALITY", "EXPLANATION", "NIGERIAN PROFESSIONAL CONTEXT"],
        rows: [
          ["Independence", "Free from any financial, personal, or business relationship that could impair objectivity — the most important quality", "An ICAN member auditing a company in which he owns shares would NOT be independent; he must decline the engagement"],
          ["Integrity", "Honest, straightforward, and truthful in all professional and business relationships", "The auditor must not 'manage' audit findings to please the client; integrity is the bedrock of the profession"],
          ["Objectivity", "Unbiased — not allowing personal feelings, prejudice, or relationships to override professional judgement", "An auditor must not overlook errors because the Finance Director is a personal friend"],
          ["Professional Competence and Due Care", "Must have the required knowledge and skills; maintain them through CPD (Continuing Professional Development)", "ICAN requires members to complete CPD hours annually; an auditor must know current IFRS, ISAs, and CAMA 2020"],
          ["Confidentiality", "Must not disclose client information to third parties without proper authority, unless required by law", "An auditor cannot discuss MTN Nigeria's financial details with a competitor or share information outside the engagement"],
          ["Professional Behaviour", "Must comply with relevant laws and regulations; avoid actions that discredit the profession", "Must not offer bribes to obtain audit clients; must not sign accounts they know to be false"],
          ["Scepticism (Professional Scepticism)", "A questioning mind — does not accept management's representations at face value; seeks evidence to corroborate claims", "If management claims a debtor of ₦5,000,000 is fully recoverable, the auditor seeks independent confirmation from the debtor"],
        ],
      },
    },
    {
      title: "Rights and Duties of an Auditor Under CAMA 2020 (Nigeria)",
      key: "The Companies and Allied Matters Act (CAMA) 2020 sets out the statutory rights and duties of auditors of companies registered in Nigeria.",
      body: `RIGHTS OF AN AUDITOR UNDER CAMA 2020:`,
      table: {
        headers: ["RIGHT", "EXPLANATION"],
        rows: [
          ["Right of Access to Books and Records", "The auditor has the right at all times to access the company's books, accounts, and vouchers — no document can be withheld from the auditor"],
          ["Right to Require Information and Explanations", "The auditor can demand any information or explanation from officers and employees of the company that is necessary for the audit"],
          ["Right to Attend General Meetings", "The auditor is entitled to receive notice of, attend, and speak at any general meeting (AGM, EGM) on matters concerning the audit"],
          ["Right to Report to Members", "The auditor has the right to make a report to the shareholders (members) on the accounts — this report is read at the AGM"],
          ["Right to Remuneration", "The auditor is entitled to payment for their services; remuneration is fixed by the shareholders or the Board as authorised"],
        ],
      },
    },
  ],
  audit_framework: [
    {
      title: "Legal and Statutory Framework for Auditing in Nigeria",
      key: "The legal framework for auditing in Nigeria is provided by CAMA 2020, the FRC Act 2011, and International Standards on Auditing (ISAs). Together they define who must be audited, who can audit, and how audits must be conducted.",
      body: ``,
      table: {
        headers: ["LEGAL / REGULATORY INSTRUMENT", "KEY PROVISIONS RELEVANT TO AUDITING"],
        rows: [
          ["Companies and Allied Matters Act (CAMA) 2020", "Requires every public company and large private company to appoint a qualified external auditor annually; defines auditor qualifications, rights, duties, appointment and removal procedures; requires auditor's report in annual accounts"],
          ["Financial Reporting Council of Nigeria (FRC) Act 2011", "Established the FRC as the apex regulatory body for accounting, auditing, and financial reporting standards in Nigeria; FRC issues and enforces Nigerian Auditing Standards aligned with ISAs; registers audit firms for public interest entity (PIE) audits"],
          ["International Standards on Auditing (ISAs)", "Issued by the International Auditing and Assurance Standards Board (IAASB); adopted by ICAN/FRC in Nigeria; cover all aspects of the audit process from planning (ISA 300) to audit reports (ISA 700)"],
          ["Institute of Chartered Accountants of Nigeria (ICAN) Act", "Establishes ICAN as the professional body; sets ethical standards for members; ICAN members are eligible to act as auditors of companies under CAMA"],
          ["Investment and Securities Act (ISA) 2007", "SEC Nigeria regulates auditors of public companies and quoted companies; auditors of listed companies on NGX must meet additional independence and quality requirements"],
          ["Central Bank of Nigeria (CBN) Act and BOFIA 2020", "CBN regulates the audit of banks; CBN-approved external auditors must audit banks and other financial institutions; additional requirements on top of CAMA"],
          ["Pension Reform Act 2014", "Pension Fund Custodians and Administrators must have their accounts audited; National Pension Commission (PenCom) oversees compliance"],
        ],
      },
    },
    {
      title: "Stages of the Audit Process",
      key: "A statutory audit follows a structured process from appointment through planning, fieldwork (evidence gathering), evaluation, and finally the issue of the audit report.",
      body: ``,
      table: {
        headers: ["AUDIT STAGE", "KEY ACTIVITIES", "RELEVANT ISA"],
        rows: [
          ["1. Appointment and Engagement", "Auditor accepts appointment; issues engagement letter defining scope, responsibilities, and fee basis; checks independence", "ISA 210 — Agreeing the Terms of Audit Engagements"],
          ["2. Planning", "Understand the client's business, industry, and control environment; assess materiality; identify key risk areas; develop an audit plan and strategy", "ISA 300 — Planning an Audit; ISA 315 — Identifying and Assessing Risks"],
          ["3. Internal Controls Review", "Evaluate the design and effectiveness of the client's internal controls (e.g., controls over cash, debtors, purchases); decide how much to rely on them", "ISA 315; ISA 330 — Auditor's Responses to Assessed Risks"],
          ["4. Substantive Testing (Evidence Gathering)", "Test transactions and balances directly: vouching, tracing, analytical procedures, third-party confirmations (e.g., debtor circularisation, bank confirmation letter to GTBank)", "ISA 500 — Audit Evidence; ISA 505 — External Confirmations"],
          ["5. Completion and Review", "Review findings; assess adequacy of evidence; consider subsequent events; obtain management representation letter", "ISA 560 — Subsequent Events; ISA 580 — Written Representations"],
          ["6. Audit Report", "Form and communicate opinion: Unmodified (clean), Qualified, Adverse, or Disclaimer of opinion", "ISA 700 — Forming an Opinion; ISA 705 — Modifications to the Opinion"],
        ],
      },
    },
  ],
  audit_comm: [
    {
      title: "The Engagement Letter — Documenting the Audit-Client Agreement",
      key: "The engagement letter is the formal written agreement between the auditor and the client confirming the terms of the audit engagement before work begins. It protects both parties by setting out expectations clearly.",
      body: `CONTENTS OF AN ENGAGEMENT LETTER:`,
      table: {
        headers: ["ITEM INCLUDED", "PURPOSE / DETAIL"],
        rows: [
          ["Objective and scope of the audit", "States that the audit is conducted in accordance with ISAs and that the objective is to express an opinion on the financial statements"],
          ["Responsibilities of management", "Management is responsible for preparing the financial statements, maintaining adequate accounting records, and designing internal controls"],
          ["Responsibilities of the auditor", "The auditor is responsible for planning and performing the audit to obtain reasonable (not absolute) assurance and to express an independent opinion"],
          ["Applicable financial reporting framework", "Confirms that the accounts will be prepared under IFRS as adopted in Nigeria (or other applicable framework)"],
          ["Basis of fee computation", "How the audit fee will be calculated — hourly rates, fixed fee, or estimated range; e.g., ₦3,500,000 fixed fee for Sunshine Foods Plc"],
          ["Reporting obligations", "What reports the auditor will provide — auditor's report in the annual accounts; management letter on internal control weaknesses"],
          ["Access and co-operation", "Client agrees to provide full access to all records, personnel, and information required"],
          ["Limitation of liability (if applicable)", "Some firms include a cap on their liability in certain circumstances — subject to professional rules"],
        ],
      },
    },
    {
      title: "Audit Evidence — Types, Sources, and Procedures",
      key: "Audit evidence is all the information gathered by the auditor to reach a conclusion and support the audit opinion. Evidence must be sufficient (enough of it) and appropriate (relevant and reliable).",
      body: `FACTORS AFFECTING RELIABILITY OF EVIDENCE:
- External evidence (e.g., bank confirmation from GTBank) is more reliable than internal evidence.
- Evidence obtained directly by the auditor (e.g., auditor counts physical stock) is more reliable than evidence obtained from the client.
- Documentary evidence is more reliable than oral evidence.
- Original documents are more reliable than photocopies.

TYPES OF AUDIT PROCEDURES FOR GATHERING EVIDENCE:`,
      table: {
        headers: ["PROCEDURE", "DESCRIPTION", "NIGERIAN EXAMPLE"],
        rows: [
          ["Inspection (Vouching)", "Examining physical documents, records, or assets to verify existence and accuracy", "Checking purchase invoices from a Kano supplier against the entries in the purchases day book"],
          ["Observation", "Watching a process being performed — verifies that a control is operating", "The auditor observes the year-end physical stock count at Aba Soap Company's warehouse"],
          ["Enquiry", "Obtaining information from knowledgeable persons (management, staff, lawyers, external parties)", "Asking the credit controller at Bisi Superstore about the recoverability of a ₦2,000,000 debt"],
          ["Confirmation (Circularisation)", "Obtaining a direct response from a third party verifying information in the accounts", "Sending confirmation letters to Emeka Ltd (debtor ₦800,000) asking them to confirm the balance owed"],
          ["Recalculation", "Re-performing arithmetic in the financial statements or supporting schedules", "Checking that depreciation on the fixed asset register is correctly calculated for all 150 assets"],
          ["Re-performance", "Independently re-performing a control procedure to verify it works", "Re-running the aged debtors report to check that it agrees with the control account"],
          ["Analytical Procedures", "Comparing financial data with prior years, budgets, or industry ratios to identify unusual fluctuations", "Gross profit ratio has fallen from 35% to 22% — auditor investigates whether this reflects a real change or a recording error"],
        ],
      },
    },
  ],
  audit_report: [
    {
      title: "The Audit Report — Structure and Contents",
      key: "The audit report is the formal written communication in which the auditor expresses an opinion on whether the financial statements give a true and fair view. It is addressed to the shareholders (members) of the company.",
      body: `STANDARD STRUCTURE OF AN AUDIT REPORT (ISA 700):`,
      table: {
        headers: ["SECTION OF AUDIT REPORT", "CONTENT"],
        rows: [
          ["Title", "Clearly identifies the document as the 'Independent Auditor's Report'"],
          ["Addressee", "Addressed to the shareholders (members) of the company — e.g., 'To the Members of Sunshine Foods Plc'"],
          ["Opinion Paragraph", "The auditor's conclusion — e.g., 'In our opinion, the financial statements give a true and fair view...' States the financial reporting framework used (IFRS as adopted in Nigeria)"],
          ["Basis for Opinion", "States that the audit was conducted in accordance with International Standards on Auditing (ISAs); confirms auditor independence; states that sufficient appropriate audit evidence has been obtained"],
          ["Key Audit Matters (for listed entities)", "Describes the most significant matters in the audit — areas of highest risk or judgement (e.g., impairment of goodwill, recoverability of a large debtor balance)"],
          ["Responsibilities of Management", "Management is responsible for the preparation and fair presentation of the financial statements and for designing internal controls"],
          ["Responsibilities of the Auditor", "The auditor is responsible for expressing an independent opinion; describes what 'reasonable assurance' means"],
          ["Other Reporting Responsibilities", "Compliance with CAMA 2020 — e.g., confirming proper books of account have been kept; confirming the directors' report is consistent with the financial statements"],
          ["Signature, Name, Registration Number", "The auditor signs; states their name, ICAN/FRC registration number, and firm name (e.g., KPMG Professional Services, Lagos)"],
          ["Date of Audit Report", "Date on which the auditor obtained sufficient evidence to support the opinion — must not be earlier than the date management approved the accounts"],
          ["Auditor's Address", "The city where the audit firm's office responsible for the audit is located — e.g., Lagos, Abuja"],
        ],
      },
    },
    {
      title: "Types of Audit Opinion",
      key: "An auditor can issue four types of opinion depending on the completeness and truthfulness of the financial statements and the auditor's ability to gather sufficient appropriate evidence.",
      body: ``,
      table: {
        headers: ["TYPE OF OPINION", "WHEN ISSUED", "IMPACT ON THE REPORT", "NIGERIAN EXAMPLE SCENARIO"],
        rows: [
          ["Unmodified Opinion (Clean Report)", "The financial statements give a true and fair view in all material respects; no significant issues found", "'In our opinion, the financial statements give a true and fair view...' — no qualifications", "KPMG issues a clean opinion on Zenith Bank Plc's annual accounts — everything is in order"],
          ["Qualified Opinion ('Except For')", "There is a material misstatement in a specific area OR the auditor could not obtain sufficient evidence on one specific matter — but the rest of the accounts are fine", "'In our opinion, except for the effects of the matter described in the Basis for Qualified Opinion paragraph, the financial statements give a true and fair view...'", "Deloitte could not verify the closing stock of ₦800,000 at a remote Kano warehouse — qualified on that specific amount; rest of accounts are fine"],
          ["Adverse Opinion", "The financial statements are materially and pervasively misstated — they do NOT give a true and fair view", "'In our opinion, the financial statements do NOT give a true and fair view...' — the entire accounts are misleading", "A company has capitalised ₦500,000,000 of clearly revenue expenses; profit is massively overstated — PricewaterhouseCoopers issues an adverse opinion"],
          ["Disclaimer of Opinion", "The auditor CANNOT form an opinion because they were unable to obtain sufficient appropriate evidence on a pervasive matter", "'We do not express an opinion on the financial statements' — fundamental uncertainty", "A company's records were destroyed in a fire at its Aba office; the auditor cannot obtain evidence on 70% of the transactions — BDO issues a disclaimer"],
        ],
      },
    },
  ],
  audit_issues: [
    {
      title: "The Expectation Gap in Auditing",
      key: "The expectation gap is the difference between what the public (and some investors) believe auditors do and what auditors actually do. It is one of the most significant contemporary issues in the auditing profession.",
      body: `WHAT THE PUBLIC OFTEN BELIEVES (but is incorrect):
- That auditors guarantee 100% accuracy of the financial statements.
- That auditors detect ALL fraud and errors.
- That an unqualified (clean) audit report means the company is financially healthy and will not fail.
- That auditors are responsible for preparing the accounts.

WHAT AUDITORS ACTUALLY DO:
- Provide REASONABLE ASSURANCE (not absolute certainty) that the financial statements are free from MATERIAL misstatement.
- Management prepares the accounts; auditors verify them.
- An auditor may not detect all fraud — especially collusive fraud by senior management.
- A clean audit report does not mean the company is profitable or will continue as a going concern forever.

MEASURES TO REDUCE THE EXPECTATION GAP IN NIGERIA:`,
      table: {
        headers: ["MEASURE", "HOW IT HELPS", "NIGERIAN CONTEXT"],
        rows: [
          ["Better communication in audit reports", "ISA 700 revised reports explain auditor's and management's responsibilities more clearly", "KPMG Nigeria now includes an expanded explanation of what reasonable assurance means in all audit reports"],
          ["Investor education", "FRC Nigeria and ICAN run public education programmes to explain what an audit can and cannot achieve", "ICAN's annual accountability lecture and published guidance documents"],
          ["Stronger fraud reporting requirements", "ISA 240 requires auditors to more actively assess fraud risk; fraud findings must be reported to those charged with governance", "Auditors must report suspected fraud at a Nigerian company to the Audit Committee"],
          ["Corporate governance reforms", "Strong audit committees (required for public companies under the SEC Nigeria Corporate Governance Code) act as an interface between auditors and the board", "Zenith Bank Plc's Audit Committee oversees the external audit process"],
          ["Regulatory scrutiny of audit quality", "FRC Nigeria conducts audit quality reviews of registered audit firms", "FRC has publicly sanctioned audit firms that issued sub-standard reports on Nigerian public companies"],
        ],
      },
    },
    {
      title: "Forensic Accounting — Meaning, Features, and Application in Nigeria",
      key: "Forensic accounting is the application of accounting skills to legal disputes and investigations. It combines auditing, accounting, and investigative skills to detect fraud, quantify financial losses, and prepare evidence for court proceedings.",
      body: `FEATURES THAT DISTINGUISH FORENSIC ACCOUNTING FROM ORDINARY AUDITING:`,
      table: {
        headers: ["BASIS", "ORDINARY AUDIT", "FORENSIC ACCOUNTING"],
        rows: [
          ["Primary Objective", "Express an opinion on whether financial statements give a true and fair view", "Investigate and detect fraud, corruption, embezzlement, or financial disputes"],
          ["Who commissions it?", "Shareholders appoint via AGM (statutory audit)", "Courts, lawyers, EFCC, ICPC, regulatory bodies, or company boards commission it"],
          ["Output", "Audit report with opinion addressed to shareholders", "Forensic report used as evidence in legal or disciplinary proceedings"],
          ["Standard of proof", "Reasonable assurance — professional judgement", "Evidence must meet court standards — may be used in criminal or civil proceedings"],
          ["Skills required", "Accounting, auditing, ISAs, IFRSs", "Accounting + investigative skills + legal knowledge + IT forensics (data analysis, e-discovery)"],
          ["Scope", "Determined by ISAs and agreed engagement letter", "Determined by the specific allegation or dispute — focused and targeted"],
          ["Nigerian institutions that use forensic accountants", "N/A", "EFCC (Economic and Financial Crimes Commission), ICPC, CBN, Securities and Exchange Commission (SEC), courts, corporate boards"],
        ],
      },
    },
    {
      title: "Internal Controls — Meaning and Key Control Activities",
      key: "Internal controls are the policies, procedures, and processes put in place by management to safeguard assets, ensure accuracy of records, promote operational efficiency, and ensure compliance with laws and regulations.",
      body: `OBJECTIVES OF INTERNAL CONTROLS (COSO Framework — widely adopted):
1. RELIABILITY OF FINANCIAL REPORTING — ensuring accounts are accurate and complete.
2. EFFECTIVENESS AND EFFICIENCY OF OPERATIONS — resources used productively.
3. COMPLIANCE — with applicable laws and regulations (e.g., CAMA, FIRS tax laws, CBN prudential guidelines).
4. SAFEGUARDING OF ASSETS — preventing theft, fraud, or misuse.

KEY INTERNAL CONTROL ACTIVITIES:`,
      table: {
        headers: ["CONTROL ACTIVITY", "DESCRIPTION", "NIGERIAN EXAMPLE"],
        rows: [
          ["Segregation of Duties", "No single employee handles a transaction from start to finish; different people authorise, execute, and record transactions", "At Aba Soap Company: one person orders materials, a different person receives and inspects them, a third person approves payment — collusion is needed to commit fraud"],
          ["Authorisation and Approval", "Transactions require approval by authorised personnel before execution", "Purchases above ₦500,000 must be approved by the Finance Director at Sunshine Foods Plc"],
          ["Physical Controls", "Safeguarding assets with physical security measures", "CCTV in the warehouse; cash in a vault; stock in a locked store; access cards for the server room"],
          ["Reconciliation", "Regularly comparing records from different sources to identify discrepancies", "Monthly bank reconciliation comparing cash book to GTBank statement; reconciling debtor ledger to control account"],
          ["Sequence Controls / Pre-numbered Documents", "All documents are pre-numbered; gaps in sequence are investigated", "All sales invoices pre-numbered 001–999; a missing number (e.g., invoice 457 not in the sequence) is immediately investigated"],
          ["Independent Checks and Internal Audit", "Supervisors check subordinates' work; internal audit function reviews all departments regularly", "Dangote's internal audit team conducts surprise cash counts at regional offices across Nigeria"],
        ],
      },
    },
  ],

  /* ═══════════════════════════════════════════════════════════
     ACC004 — BASIC PRINCIPLES OF NIGERIAN TAXATION
  ═══════════════════════════════════════════════════════════ */

  tax_history: [
    {
      title: "History of Tax and Taxation in Nigeria",
      key: "Taxation in Nigeria predates colonial rule. Various forms of tribute and levies existed in pre-colonial kingdoms. Modern income tax legislation was introduced during British colonial rule and has evolved through several Acts to the present system.",
      body: `PRE-COLONIAL NIGERIA:
Various Nigerian kingdoms levied taxes on their subjects in different forms:
- Northern Nigeria (Sokoto Caliphate, Hausa states): 'Zakat' (Islamic tithe on wealth and income), 'Jangali' (cattle tax), 'Kudin Kasa' (land tax) — these were formalised tribute systems.
- Yoruba Kingdoms (Oyo Empire): Tribute paid to the Alaafin from subordinate chiefs; market tolls and trade levies.
- Igbo communities: communal levies for shared projects (roads, markets); age-grade contributions.

COLONIAL ERA AND LEGISLATIVE MILESTONES:`,
      table: {
        headers: ["YEAR / LEGISLATION", "KEY DEVELOPMENT"],
        rows: [
          ["1904 — Native Revenue Proclamation", "First formal income tax legislation in Nigeria — applied to Northern Nigeria; introduced direct taxation of individuals under British colonial rule"],
          ["1917 — Nigerian (Direct Taxation) Ordinance", "Extended direct taxation to Southern Nigeria; met with significant resistance from communities unfamiliar with direct taxation"],
          ["1927 — Women's Tax (Aba Women's Riot cause)", "Attempt to tax women in Eastern Nigeria triggered the famous Aba Women's Riot of 1929 — demonstrating the political sensitivity of taxation"],
          ["1940 — Income Tax Ordinance", "First unified income tax legislation for the whole of Nigeria — introduced personal income tax on a country-wide basis"],
          ["1961 — Companies Income Tax Act (CITA)", "Post-independence; established corporation tax on companies operating in Nigeria — the foundation of modern Nigerian company taxation"],
          ["1979 — Personal Income Tax Decree", "Major reform following military government — unified personal income tax framework; introduced PAYE (Pay As You Earn) system"],
          ["1993 — Companies Income Tax Act (CITA) Cap C21", "Consolidated and updated company income taxation rules still largely in force today (as amended)"],
          ["1993 — Personal Income Tax Act (PITA)", "Comprehensive personal income tax legislation; updated by PITA (Amendment) Acts of 2011 and 2020"],
          ["1993 — Petroleum Profits Tax Act (PPTA)", "Special tax regime for petroleum operations — separate from general CITA; relevant for NNPC, Shell, TotalEnergies, Chevron operations in Nigeria"],
          ["2007 — Federal Inland Revenue Service (Establishment) Act", "Established FIRS as an autonomous body responsible for assessing, collecting, and accounting for federal taxes"],
          ["2020 — Finance Acts (2019, 2020, 2021, 2022, 2023)", "Series of annual Finance Acts significantly amended CITA, PITA, VAT Act, and others — introduced 7.5% VAT rate, modified capital gains tax, addressed digital economy taxation"],
        ],
      },
    },
  ],
  tax_auth: [
    {
      title: "Tax Authorities in Nigeria — Federal, State, and Local Government",
      key: "Nigeria operates a three-tier tax authority structure: the Federal Government (through FIRS), State Governments (through State Internal Revenue Services), and Local Government Councils. Each tier administers different taxes.",
      body: `CONSTITUTIONAL BASIS:
The 1999 Constitution of Nigeria (as amended) and the Taxes and Levies (Approved List for Collection) Act assign different taxes to the three tiers of government.`,
      table: {
        headers: ["TIER", "TAX AUTHORITY", "TAXES ADMINISTERED"],
        rows: [
          ["FEDERAL GOVERNMENT", "Federal Inland Revenue Service (FIRS)", "Companies Income Tax (CIT) — tax on profits of Nigerian-registered companies; Petroleum Profits Tax (PPT) — oil companies; Value Added Tax (VAT) — 7.5% on supply of goods and services; Capital Gains Tax (CGT) on companies and non-residents; Stamp Duties on corporate bodies; Education Tax (2% of assessable profits of companies); National Information Technology Development Levy (NITDA); Withholding Tax (WHT) from companies"],
          ["STATE GOVERNMENT", "State Internal Revenue Service (SIRS) — e.g., Lagos State Internal Revenue Service (LIRS), Rivers State Internal Revenue Service", "Personal Income Tax (PIT/PAYE) — tax on income of individuals, including employed persons and sole traders; Capital Gains Tax (CGT) on individuals; Pools Betting and Lotteries Tax; Road Taxes; Business Premises Levy; Development Levy (₦100 minimum per taxable individual)"],
          ["LOCAL GOVERNMENT", "Local Government Revenue Committee / Council", "Shops and Kiosks Rates; Tenement Rates; On and Off Liquor Licence Fees; Slaughter Slab Fees; Marriage, Birth, and Death Registration Fees; Motor Park Levies; Market/Trading Licence Fees; Signboard and Advertisement Permit Fees"],
        ],
      },
    },
    {
      title: "Key Tax Authorities — FIRS and LIRS (Detailed)",
      key: "The Federal Inland Revenue Service (FIRS) is the most significant tax authority in Nigeria. The Lagos State Internal Revenue Service (LIRS) is the largest state tax authority, given Lagos is Nigeria's commercial capital.",
      body: ``,
      table: {
        headers: ["FEATURE", "FIRS (Federal)", "LIRS (Lagos State — largest SIRS)"],
        rows: [
          ["Established by", "FIRS (Establishment) Act 2007", "Lagos State Revenue Administration Law 2006 (as amended)"],
          ["Headed by", "Executive Chairman (appointed by President, confirmed by Senate)", "Executive Chairman (appointed by Governor)"],
          ["Primary mandate", "Assess, collect, and account for all federal taxes and levies; enforce compliance", "Assess, collect all state taxes; enforce personal income tax (PAYE) compliance for Lagos residents and employers in Lagos"],
          ["Key taxpayers managed", "All registered companies (including Dangote Cement Plc, MTN Nigeria, Nestlé Nigeria); VAT registrants; petroleum companies", "All individuals working or resident in Lagos; businesses with Lagos employees; sole traders in Lagos"],
          ["Enforcement powers", "Issue tax assessments; conduct tax investigations and audits; apply penalties and interest; prosecute tax evaders; distrain on assets", "Same powers at state level; can distrain on assets; close businesses for non-compliance"],
          ["Digital initiatives", "TaxPro-Max (online filing and payment platform); VAT automation; electronic invoicing", "LIRS e-Tax portal; PAYE online filing; TaxClearance Certificates issued online"],
        ],
      },
    },
  ],
  tax_admin: [
    {
      title: "Tax Administration in Nigeria — Jurisdiction and Taxes Administered",
      key: "Tax administration refers to the processes by which tax authorities assess, collect, enforce, and account for taxes. Each tier administers specific taxes within its jurisdiction as defined by the Nigerian Constitution and enabling legislation.",
      body: `FEDERAL TAXES — Administered by FIRS:`,
      table: {
        headers: ["FEDERAL TAX", "RATE / KEY FEATURES", "WHO PAYS IT"],
        rows: [
          ["Companies Income Tax (CIT) — CITA Cap C21 as amended", "Standard rate: 30% of taxable profits. Small companies (turnover ≤ ₦25m): 0%. Medium companies (₦25m–₦100m): 20%. Large companies (>₦100m): 30%", "All companies incorporated in Nigeria (e.g., Dangote Cement Plc, Access Bank Plc, small Ltd companies)"],
          ["Value Added Tax (VAT) — VAT Act Cap V1", "Rate: 7.5% (raised from 5% by Finance Act 2019). Charged on supply of taxable goods and services; collected by the seller and remitted to FIRS monthly via Form 002", "Consumers bear the cost; registered businesses (turnover >₦25m) collect and remit to FIRS"],
          ["Withholding Tax (WHT)", "Rates vary: dividends 10%, interest 10%, rent 10%, professional fees 10%, construction/survey 5%, director's fees 10%. Deducted at source by the payer and remitted to FIRS", "Payer of income deducts and remits; payee receives net amount; WHT is a tax credit against final tax liability"],
          ["Petroleum Profits Tax (PPT) — PPTA", "85% for Joint Venture (JV) operations; 65.75% for production sharing contracts (PSCs) in early years", "International oil companies (Shell, TotalEnergies, ExxonMobil, Chevron) and NNPC"],
          ["Education Tax (EDT)", "2% of assessable profits of all Nigerian companies", "All companies alongside their CIT return"],
          ["Capital Gains Tax (CGT) on companies", "10% on capital gains from disposal of chargeable assets (land, buildings, shares in non-resident companies)", "Companies disposing of assets at a gain"],
        ],
      },
    },
    {
      title: "State and Local Government Taxes — Key Details",
      key: "State governments primarily administer Personal Income Tax (PIT/PAYE) on individuals. Local governments collect rates and levies on businesses and properties within their jurisdiction.",
      body: `STATE TAXES — Personal Income Tax (PITA Cap P8 as amended):`,
      table: {
        headers: ["STATE / LOCAL TAX", "RATE / KEY FEATURES", "WHO PAYS IT"],
        rows: [
          ["Personal Income Tax (PAYE)", "Graduated rates under PITA: first ₦300,000 at 7%; next ₦300,000 at 11%; next ₦500,000 at 15%; next ₦500,000 at 19%; next ₦1,600,000 at 21%; above ₦3,200,000 at 24%. Minimum tax: 1% of gross income (if regular calculation gives a lower figure)", "All individuals earning income in Nigeria — employed under PAYE (deducted by employer monthly); self-employed file annual return with SIRS"],
          ["Capital Gains Tax (CGT) on individuals", "10% on gains from disposal of chargeable assets by individuals", "Individuals selling land, property, or other chargeable assets"],
          ["Development Levy", "Flat rate of ₦100 minimum (varies by state — some states charge more)", "Every taxable individual resident in the state — collected alongside PAYE"],
          ["Business Premises Levy", "Registration: ₦10,000 (urban); ₦2,000 (rural). Annual renewal: ₦5,000 (urban); ₦1,000 (rural) — rates vary by state", "Businesses occupying premises within the state — paid to SIRS"],
          ["Tenement Rate (Local Govt)", "Based on annual rateable value of property — varies by LGA", "Property owners and occupiers within the LGA"],
          ["Market / Trading Licence Fees", "Varies by LGA — daily or annual fees charged to traders in markets and shops", "Traders and market operators within the LGA jurisdiction"],
        ],
      },
    },
  ],
  basis_periods: [
    {
      title: "Basis Periods — Meaning and the Preceding Year Basis",
      key: "A basis period is the accounting period whose profits form the basis of assessment for a particular year of assessment (YOA). Nigeria uses the Preceding Year Basis (PYB) for assessing company income tax — the tax in a given year is based on profits earned in the preceding accounting year.",
      body: `KEY TERMS:
YEAR OF ASSESSMENT (YOA): The tax year in which the tax liability arises. In Nigeria, the YOA runs from 1 January to 31 December.

BASIS PERIOD: The accounting period whose results are taxed in a given YOA. Under the Preceding Year Basis, the basis period for YOA 2024 is the accounting year that ended in 2023.

EXAMPLE:
If Chukwuemeka Trading Ltd has an accounting year ending 31 December each year:
- YOA 2024 → Basis Period: Year ended 31 December 2023 (preceding year)
- YOA 2025 → Basis Period: Year ended 31 December 2024

If a company has a non-December year-end (e.g., 30 September):
- YOA 2024 → Basis Period: Year ended 30 September 2023 (the year ending in the preceding calendar year)`,
    },
    {
      title: "Basis Periods for a NEW Business — The Commencement Rules",
      key: "Special rules apply when a business commences for the first time. The first few years of assessment use different basis periods because there is no 'preceding year' yet. The rules prevent any period of profit from escaping tax.",
      body: `COMMENCEMENT RULES UNDER PITA / CITA (Nigeria):

YEAR 1 OF ASSESSMENT:
Basis period = from the date the business COMMENCED to 31 December of that year.

YEAR 2 OF ASSESSMENT:
Basis period = the first 12 months of trading (from the date of commencement).

YEAR 3 OF ASSESSMENT:
Basis period = the accounting year ending in Year 2 of assessment (i.e., returns to normal preceding year basis).

NOTE: The taxpayer has a right to elect for the actual year's profits in Years 2 and 3 if that would be more favourable. FIRS may also revise the assessment if the normal basis gives a lower liability.

EXAMPLE — Bisi Fashion House commences business on 1 April 2021. Accounting year end: 31 March.
Profits: Year ended 31 March 2022 = ₦480,000; Year ended 31 March 2023 = ₦600,000`,
      table: {
        headers: ["YEAR OF ASSESSMENT", "BASIS PERIOD", "PERIOD (months)", "PROFIT ASSESSED (₦)", "CALCULATION"],
        rows: [
          ["2021 (Year 1)", "1 April 2021 — 31 December 2021", "9 months", "360,000", "9/12 × ₦480,000 = ₦360,000"],
          ["2022 (Year 2)", "First 12 months: 1 April 2021 — 31 March 2022", "12 months", "480,000", "Full Year ended 31 March 2022"],
          ["2023 (Year 3)", "Year ended 31 March 2022 (preceding year basis resumes)", "12 months", "480,000", "Year ended 31 March 2022 again"],
          ["2024 (Year 4 — normal)", "Year ended 31 March 2023", "12 months", "600,000", "Normal preceding year basis"],
          ["NOTE: Profits for year ended 31 March 2022 (₦480,000) are assessed TWICE (in YOA 2022 and YOA 2023). This is the intended overlap under the commencement rules — it is not an error.", "", "", "", ""],
        ],
      },
    },
  ],
  tax_computation: [
    {
      title: "Computation of Company Income Tax (CIT) Liability",
      key: "The tax liability of a company under CITA is computed by starting with accounting profit, making tax adjustments (add back disallowable expenses, deduct capital allowances and other reliefs), arriving at Assessable Profit, then applying the applicable CIT rate.",
      body: `STEP-BY-STEP PROCESS:
1. Start with Accounting Profit (per Income Statement).
2. ADD BACK disallowable expenses (expenses charged in the accounts that are NOT allowed as a deduction for tax purposes).
3. DEDUCT allowable expenses NOT yet in the accounts (if any).
4. DEDUCT Capital Allowances (tax depreciation — replaces accounting depreciation which is added back).
5. Result = ASSESSABLE PROFIT (or Adjusted Profit).
6. Apply CIT Rate → TAX LIABILITY.
7. Deduct Withholding Tax Credits (WHT deducted at source by the company's clients).
8. Result = TAX PAYABLE to FIRS.

COMMON DISALLOWABLE EXPENSES (Added back to profit):`,
      table: {
        headers: ["DISALLOWABLE EXPENSE", "REASON NOT ALLOWED FOR TAX", "REPLACED BY …"],
        rows: [
          ["Accounting Depreciation", "Tax law does not allow accounting depreciation; it has its own system of capital allowances", "Capital Allowances (Initial Allowance + Annual Allowance)"],
          ["Fines and Penalties", "Payments to government for breaking the law cannot be a tax deduction", "Nothing — purely disallowed"],
          ["Donations to non-approved organisations", "Only donations to FIRS-approved bodies are deductible (up to 10% of assessable profit)", "Approved donations (deducted separately)"],
          ["Entertaining customers (private/non-business)", "Only genuine business entertainment is allowable; lavish non-business entertaining is disallowed", "Nothing"],
          ["Personal expenses of owner/director", "Must be wholly, exclusively, and necessarily incurred for the business", "Nothing"],
          ["Dividends paid", "This is an appropriation of profit, not a business expense", "Nothing"],
          ["Income tax / CIT provision", "Tax itself is not a deductible expense for computing tax", "Nothing"],
          ["Excessive directors' remuneration", "Only arm's-length remuneration is allowable", "Reasonable salary portion may be allowed"],
        ],
      },
    },
    {
      title: "Capital Allowances in Nigeria",
      key: "Capital Allowances are the tax equivalent of depreciation — a deduction allowed on qualifying capital expenditure. They replace accounting depreciation (which is disallowed) in the tax computation.",
      body: `TYPES OF CAPITAL ALLOWANCES (under the Companies Income Tax Act and the Third Schedule):`,
      table: {
        headers: ["TYPE", "DESCRIPTION", "RATE (typical — verify with current Finance Act)", "EXAMPLE"],
        rows: [
          ["Initial Allowance (IA)", "One-off allowance in the year the asset is first brought into use — to encourage investment", "Plant & Machinery: 50%; Industrial Buildings: 15%; Motor Vehicles: 50%; Agricultural Plant: 95%", "Emeka Transport buys a truck for ₦4,000,000 in Year 1: Initial Allowance = 50% × ₦4,000,000 = ₦2,000,000"],
          ["Annual Allowance (AA)", "Allowance in each year of use — on the tax written-down value (or cost less IA already claimed)", "Plant & Machinery: 25% reducing balance; Motor Vehicles: 25%; Industrial Buildings: 10% straight line", "Year 2 Annual Allowance: 25% × ₦2,000,000 (WDV after IA) = ₦500,000"],
          ["Investment Allowance (IA — additional)", "Extra allowance to encourage certain investments — does NOT reduce the tax WDV", "10% on plant and machinery for manufacturing companies", "Manufacturing company buying equipment gets an extra 10% deduction — does not affect future annual allowances"],
          ["Balancing Allowance / Charge", "When an asset is sold: if sale proceeds < WDV → Balancing Allowance (extra deduction). If sale proceeds > WDV → Balancing Charge (adds back to profit)", "Full remaining WDV or excess over WDV", "Truck sold for ₦300,000; WDV at disposal = ₦500,000; Balancing Allowance = ₦200,000 (deducted from profit)"],
        ],
      },
    },
    {
      title: "Full Company Income Tax Computation — Worked Example",
      key: "A full CIT computation starts from accounting profit, makes all adjustments, deducts capital allowances, and applies the applicable rate to arrive at the tax liability due to FIRS.",
      body: `EXAMPLE — Sunshine Foods Plc (Large Company — turnover > ₦100m):
Accounting Profit per Income Statement: ₦5,200,000
The following information is available:
- Depreciation charged in accounts: ₦800,000 (disallowable)
- Fine paid to NAFDAC for labelling violation: ₦50,000 (disallowable)
- Donation to Red Cross Nigeria (not FIRS-approved): ₦100,000 (disallowable)
- Capital Allowances agreed with FIRS: ₦1,200,000
- WHT deducted at source by customers: ₦156,000`,
      table: {
        headers: ["CIT COMPUTATION — SUNSHINE FOODS PLC (Year of Assessment 2024)", "₦", "₦"],
        rows: [
          ["Accounting Profit per Income Statement", "", "5,200,000"],
          ["ADD BACK DISALLOWABLE EXPENSES:", "", ""],
          ["  Depreciation (accounting — disallowed)", "800,000", ""],
          ["  NAFDAC fine (penalty — disallowed)", "50,000", ""],
          ["  Unapproved donation — Red Cross", "100,000", ""],
          ["TOTAL ADD-BACKS", "", "950,000"],
          ["ADJUSTED PROFIT", "", "6,150,000"],
          ["LESS: Capital Allowances (agreed with FIRS)", "", "(1,200,000)"],
          ["ASSESSABLE PROFIT", "", "4,950,000"],
          ["CIT @ 30% (large company — turnover > ₦100m)", "", "1,485,000"],
          ["LESS: Withholding Tax Credits (deducted at source)", "", "(156,000)"],
          ["CIT PAYABLE TO FIRS", "", "1,329,000"],
          ["Education Tax @ 2% of Assessable Profit (₦4,950,000 × 2%)", "", "99,000"],
          ["TOTAL TAX DUE (CIT + Education Tax)", "", "1,428,000"],
          ["NOTE: Tax is due and payable within 6 months of the end of the accounting year, or on assessment — whichever is earlier. Filed via FIRS TaxPro-Max portal.", "", ""],
        ],
      },
    },
    {
      title: "Personal Income Tax (PITA) Computation — Individuals and PAYE",
      key: "Personal Income Tax is charged on the income of individuals resident in Nigeria. Employees pay via the PAYE (Pay As You Earn) system — deducted monthly by employers and remitted to the relevant State Internal Revenue Service.",
      body: `CHARGEABLE INCOME = Gross Income − Statutory Deductions (Consolidated Relief Allowance + Pension + NHF + NHIS + Life Insurance)

CONSOLIDATED RELIEF ALLOWANCE (CRA):
= ₦200,000 + 20% of Gross Income (whichever is higher of ₦200,000 and 1% of gross income)

EXAMPLE — Emeka works at Sunshine Foods Plc (Lagos). Annual gross salary: ₦3,600,000.
Other deductions: Pension (8% of gross = ₦288,000); NHF (2.5% of basic salary = ₦54,000).
Assume basic salary = ₦2,160,000 (60% of gross).`,
      table: {
        headers: ["PIT / PAYE COMPUTATION — EMEKA (Lagos, YOA 2024)", "₦", "₦"],
        rows: [
          ["Gross Annual Income (Salary)", "", "3,600,000"],
          ["LESS: STATUTORY DEDUCTIONS:", "", ""],
          ["  Consolidated Relief Allowance (CRA): ₦200,000 + 20% × ₦3,600,000", "920,000", ""],
          ["  Pension Contribution (8% of gross — remitted to PFA)", "288,000", ""],
          ["  National Housing Fund — NHF (2.5% of basic salary)", "54,000", ""],
          ["TOTAL DEDUCTIONS", "", "(1,262,000)"],
          ["CHARGEABLE INCOME", "", "2,338,000"],
          ["TAX COMPUTATION (graduated rates):", "", ""],
          ["  First ₦300,000 @ 7%", "21,000", ""],
          ["  Next ₦300,000 @ 11%", "33,000", ""],
          ["  Next ₦500,000 @ 15%", "75,000", ""],
          ["  Next ₦500,000 @ 19%", "95,000", ""],
          ["  Remaining ₦738,000 @ 21%", "154,980", ""],
          ["TOTAL ANNUAL PAYE TAX", "", "378,980"],
          ["MONTHLY PAYE DEDUCTION (÷ 12)", "", "₦31,582 per month"],
          ["Employer remits ₦31,582 to Lagos SIRS (LIRS) by 10th of the following month", "", ""],
        ],
      },
    },
  ],

};

export const grading = [
  { marks: "70-100", grade: "A", points: 5, remark: "Excellent" },
  { marks: "60-69",  grade: "B", points: 4, remark: "Very Good" },
  { marks: "50-59",  grade: "C", points: 3, remark: "Good" },
  { marks: "45-49",  grade: "D", points: 2, remark: "Merit" },
  { marks: "40-44",  grade: "E", points: 1, remark: "Pass" },
  { marks: "0-39",   grade: "F", points: 0, remark: "Fail" },
];

/* ═══════════════════════════════════════════════════════════════════
   QUESTIONS
   Format for each question object:
   {
     year: 2023,
     q: "Question text here",
     options: { a: "...", b: "...", c: "...", d: "..." },
     answer: "a",
     exp: "Detailed explanation here (Nigerian context, full working shown where numerical)",
     table?: { headers: [...], rows: [[...], [...]] },   // optional
     questionDiagram?: { headers: [...], rows: [[...]] } // optional — e.g. a given account or statement in the question
   }
═══════════════════════════════════════════════════════════════════ */

export const questions = {

  /* ─── ACC001: BASIC FINANCIAL ACCOUNTING ─── */

  intro_acc:    [],
  iasb:         [],
  bookkeeping:  [],
  debit_credit: [],
  errors:       [],
  bank_rec:     [],
  end_period:   [],
  sole_prop:    [],
  manufacturing:[],
  partnership:  [],
  incomplete:   [],
  clubs:        [],
  limited_co:   [],

  /* ─── ACC002: BASIC COST AND MANAGEMENT ACCOUNTING ─── */

  cost_intro:    [],
  cost_elements: [],
  material_cost: [],
  stock_control: [],
  labour_cost:   [],
  overhead:      [],
  job_costing:   [],
  costing_tech:  [],
  cvp:           [],
  budgeting:     [],
  investment:    [],

  /* ─── ACC003: BASIC AUDITING ─── */

  audit_history:   [],
  audit_nature:    [],
  audit_framework: [],
  audit_comm:      [],
  audit_report:    [],
  audit_issues:    [],

  /* ─── ACC004: BASIC PRINCIPLES OF NIGERIAN TAXATION ─── */

  tax_history:     [],
  tax_auth:        [],
  tax_admin:       [],
  basis_periods:   [],
  tax_computation: [],

};
