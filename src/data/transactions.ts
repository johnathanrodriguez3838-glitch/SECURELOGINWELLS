/**
 * Transaction History Dataset
 * Spans: January 2020 – September 2026
 * Total transactions: Approximately 60 records
 * Internally consistent: Starting from an opening balance, the transactions lead
 * to exactly €6.552.000,00 on the final transaction date in September 2026.
 */

export interface Transaction {
  id: string;
  date: string;
  description: string;
  type: 'CREDIT' | 'DEBIT';
  amount: number;
  currency: 'EUR';
  category: string;
  reference: string;
  runningBalance: number;
}

export const OPENING_BALANCE = 1850000.00; // January 2020 Opening Balance
export const TARGET_FINAL_BALANCE = 6552000.00; // Target exact balance €6.552.000,00

// Raw definitions chronologically (from earliest to latest)
interface RawTxn {
  id: string;
  date: string;
  description: string;
  type: 'CREDIT' | 'DEBIT';
  amount: number;
  category: string;
  reference: string;
}

const rawTransactionsChronological: RawTxn[] = [
  // 2020
  { id: "TX-2020-001", date: "2020-01-15", description: "Account Deposit - Initial Portfolio Allocation", type: "CREDIT", amount: 250000.00, category: "Deposit", reference: "SEPA-2020-0115" },
  { id: "TX-2020-002", date: "2020-02-08", description: "Online Purchase - Security Surveillance Gear", type: "DEBIT", amount: 2450.00, category: "Shopping", reference: "POS-2020-0208" },
  { id: "TX-2020-003", date: "2020-03-22", description: "Executive Security Retainer Q1", type: "CREDIT", amount: 75000.00, category: "Income", reference: "INV-2020-0322" },
  { id: "TX-2020-004", date: "2020-04-10", description: "Utility Payment - Stadtwerke Berlin", type: "DEBIT", amount: 480.50, category: "Utilities", reference: "DE-STW-2020-04" },
  { id: "TX-2020-005", date: "2020-05-18", description: "Insurance Payment - Allianz Global Corporate", type: "DEBIT", amount: 1850.00, category: "Insurance", reference: "POL-ALL-2020-05" },
  { id: "TX-2020-006", date: "2020-06-25", description: "Salary Payment - Private Security Operations", type: "CREDIT", amount: 68000.00, category: "Salary", reference: "SAL-2020-0625" },
  { id: "TX-2020-007", date: "2020-08-04", description: "Personal Transfer - Family Reserve Fund", type: "DEBIT", amount: 6500.00, category: "Transfer", reference: "TRF-2020-0804" },
  { id: "TX-2020-008", date: "2020-09-19", description: "Service Payment - Secure Communications Audit", type: "DEBIT", amount: 4200.00, category: "Services", reference: "SRV-2020-0919" },
  { id: "TX-2020-009", date: "2020-11-12", description: "Account Deposit - Diplomatic Mission Escort", type: "CREDIT", amount: 140000.00, category: "Deposit", reference: "DIP-2020-1112" },
  { id: "TX-2020-010", date: "2020-12-18", description: "Year-End Performance Bonus", type: "CREDIT", amount: 95000.00, category: "Income", reference: "BON-2020-1218" },

  // 2021
  { id: "TX-2021-011", date: "2021-01-14", description: "Subscription Payment - Encrypted Satellite Link", type: "DEBIT", amount: 1890.00, category: "Subscription", reference: "SUB-2021-0114" },
  { id: "TX-2021-012", date: "2021-02-20", description: "Executive Security Retainer Q1 2021", type: "CREDIT", amount: 82000.00, category: "Income", reference: "INV-2021-0220" },
  { id: "TX-2021-013", date: "2021-03-15", description: "Online Purchase - Precision Tactical Gear", type: "DEBIT", amount: 3750.00, category: "Shopping", reference: "POS-2021-0315" },
  { id: "TX-2021-014", date: "2021-04-28", description: "Refund - Overbilled Customs Duties", type: "CREDIT", amount: 1420.00, category: "Refund", reference: "RFD-2021-0428" },
  { id: "TX-2021-015", date: "2021-05-30", description: "Salary Payment - High-Risk Escort Protocol", type: "CREDIT", amount: 72000.00, category: "Salary", reference: "SAL-2021-0530" },
  { id: "TX-2021-016", date: "2021-07-08", description: "Utility Payment - Vattenfall Europe", type: "DEBIT", amount: 560.20, category: "Utilities", reference: "DE-VAT-2021-07" },
  { id: "TX-2021-017", date: "2021-08-16", description: "Service Payment - Armored Vehicle Maintenance", type: "DEBIT", amount: 8900.00, category: "Services", reference: "SRV-2021-0816" },
  { id: "TX-2021-018", date: "2021-09-24", description: "General Credit - Capital Market Dividend", type: "CREDIT", amount: 165000.00, category: "Investment", reference: "DIV-2021-0924" },
  { id: "TX-2021-019", date: "2021-11-05", description: "Personal Transfer - Moritzplatz Property Escrow", type: "DEBIT", amount: 18500.00, category: "Transfer", reference: "TRF-2021-1105" },

  // 2022
  { id: "TX-2022-020", date: "2022-01-18", description: "Account Deposit - Embassy Security Advisory", type: "CREDIT", amount: 195000.00, category: "Deposit", reference: "DEP-2022-0118" },
  { id: "TX-2022-021", date: "2022-02-24", description: "General Debit - Kreuzberg Commercial Lease", type: "DEBIT", amount: 7200.00, category: "Bills", reference: "LSE-2022-0224" },
  { id: "TX-2022-022", date: "2022-03-30", description: "Salary Payment - Special Protection Taskforce", type: "CREDIT", amount: 78000.00, category: "Salary", reference: "SAL-2022-0330" },
  { id: "TX-2022-023", date: "2022-05-12", description: "Insurance Payment - Lloyd's Executive Indemnity", type: "DEBIT", amount: 3450.00, category: "Insurance", reference: "POL-LLY-2022-05" },
  { id: "TX-2022-024", date: "2022-06-20", description: "Online Purchase - IT Perimeter Firewall Systems", type: "DEBIT", amount: 5800.00, category: "Shopping", reference: "POS-2022-0620" },
  { id: "TX-2022-025", date: "2022-07-28", description: "General Credit - Real Estate Trust Distribution", type: "CREDIT", amount: 380000.00, category: "Investment", reference: "RET-2022-0728" },
  { id: "TX-2022-026", date: "2022-09-09", description: "Utility Payment - Telekom Deutschland Fiber", type: "DEBIT", amount: 290.40, category: "Utilities", reference: "TEL-2022-0909" },
  { id: "TX-2022-027", date: "2022-10-22", description: "Executive Security Retainer Q4 2022", type: "CREDIT", amount: 98000.00, category: "Income", reference: "INV-2022-1022" },
  { id: "TX-2022-028", date: "2022-12-05", description: "Service Payment - Certified Ballistic Testing", type: "DEBIT", amount: 9600.00, category: "Services", reference: "SRV-2022-1205" },

  // 2023
  { id: "TX-2023-029", date: "2023-01-10", description: "Account Deposit - Annual Corporate Security Fee", type: "CREDIT", amount: 260000.00, category: "Deposit", reference: "DEP-2023-0110" },
  { id: "TX-2023-030", date: "2023-02-17", description: "Subscription Payment - Global Threat Intelligence", type: "DEBIT", amount: 2400.00, category: "Subscription", reference: "SUB-2023-0217" },
  { id: "TX-2023-031", date: "2023-03-29", description: "Salary Payment - Executive Protection Director", type: "CREDIT", amount: 88000.00, category: "Salary", reference: "SAL-2023-0329" },
  { id: "TX-2023-032", date: "2023-04-18", description: "Personal Transfer - Private Asset Vault Berlin", type: "DEBIT", amount: 22000.00, category: "Transfer", reference: "TRF-2023-0418" },
  { id: "TX-2023-033", date: "2023-06-04", description: "Online Purchase - Secure Communications Hardware", type: "DEBIT", amount: 4850.00, category: "Shopping", reference: "POS-2023-0604" },
  { id: "TX-2023-034", date: "2023-07-15", description: "Refund - Tax Overpayment Berlin Finance Office", type: "CREDIT", amount: 8650.00, category: "Refund", reference: "FIN-BER-2023" },
  { id: "TX-2023-035", date: "2023-08-26", description: "General Credit - Sovereign Bond Coupon Yield", type: "CREDIT", amount: 215000.00, category: "Investment", reference: "BND-2023-0826" },
  { id: "TX-2023-036", date: "2023-09-30", description: "Service Payment - Emergency Response Fleet Service", type: "DEBIT", amount: 11400.00, category: "Services", reference: "SRV-2023-0930" },
  { id: "TX-2023-037", date: "2023-11-14", description: "Insurance Payment - Comprehensive Facility Cover", type: "DEBIT", amount: 4900.00, category: "Insurance", reference: "POL-2023-1114" },
  { id: "TX-2023-038", date: "2023-12-22", description: "Account Deposit - International Summit Security", type: "CREDIT", amount: 310000.00, category: "Deposit", reference: "SUM-2023-1222" },

  // 2024
  { id: "TX-2024-039", date: "2024-01-19", description: "Executive Security Retainer Q1 2024", type: "CREDIT", amount: 115000.00, category: "Income", reference: "INV-2024-0119" },
  { id: "TX-2024-040", date: "2024-02-28", description: "Utility Payment - Berlin Wasserbetriebe", type: "DEBIT", amount: 375.40, category: "Utilities", reference: "DE-WAS-2024" },
  { id: "TX-2024-041", date: "2024-03-25", description: "Salary Payment - Strategic Operations Chief", type: "CREDIT", amount: 94000.00, category: "Salary", reference: "SAL-2024-0325" },
  { id: "TX-2024-042", date: "2024-04-30", description: "General Debit - Moritzstraße Facility Maintenance", type: "DEBIT", amount: 16800.00, category: "Bills", reference: "FAC-2024-0430" },
  { id: "TX-2024-043", date: "2024-06-12", description: "Personal Transfer - Berlin Municipal Tax Escrow", type: "DEBIT", amount: 31500.00, category: "Transfer", reference: "TRF-2024-0612" },
  { id: "TX-2024-044", date: "2024-07-20", description: "Online Purchase - Drone Detection Radar Unit", type: "DEBIT", amount: 12900.00, category: "Shopping", reference: "POS-2024-0720" },
  { id: "TX-2024-045", date: "2024-08-18", description: "Account Deposit - Diplomatic Convoy Protection", type: "CREDIT", amount: 280000.00, category: "Deposit", reference: "DEP-2024-0818" },
  { id: "TX-2024-046", date: "2024-09-29", description: "Service Payment - Certified High-Risk Flight Charter", type: "DEBIT", amount: 24500.00, category: "Services", reference: "FLT-2024-0929" },
  { id: "TX-2024-047", date: "2024-11-10", description: "General Credit - Private Equity Portfolio Dividend", type: "CREDIT", amount: 480000.00, category: "Investment", reference: "PEQ-2024-1110" },
  { id: "TX-2024-048", date: "2024-12-15", description: "Year-End Security Advisory Bonus", type: "CREDIT", amount: 135000.00, category: "Income", reference: "BON-2024-1215" },

  // 2025
  { id: "TX-2025-049", date: "2025-01-22", description: "Executive Security Retainer Q1 2025", type: "CREDIT", amount: 140000.00, category: "Income", reference: "INV-2025-0122" },
  { id: "TX-2025-050", date: "2025-02-14", description: "Subscription Payment - Defense Intelligence Terminal", type: "DEBIT", amount: 3200.00, category: "Subscription", reference: "SUB-2025-0214" },
  { id: "TX-2025-051", date: "2025-03-31", description: "Salary Payment - Head of Dignitary Security", type: "CREDIT", amount: 105000.00, category: "Salary", reference: "SAL-2025-0331" },
  { id: "TX-2025-052", date: "2025-05-16", description: "Insurance Payment - Global Executive Risk Cover", type: "DEBIT", amount: 6200.00, category: "Insurance", reference: "POL-2025-0516" },
  { id: "TX-2025-053", date: "2025-06-25", description: "General Debit - Tactical Training Facility Lease", type: "DEBIT", amount: 19500.00, category: "Bills", reference: "TRN-2025-0625" },
  { id: "TX-2025-054", date: "2025-08-11", description: "Account Deposit - Government Infrastructure Security", type: "CREDIT", amount: 360000.00, category: "Deposit", reference: "GOV-2025-0811" },
  { id: "TX-2025-055", date: "2025-10-09", description: "Online Purchase - Advanced Biometric Scanners", type: "DEBIT", amount: 8750.00, category: "Shopping", reference: "POS-2025-1009" },
  { id: "TX-2025-056", date: "2025-12-19", description: "General Credit - Capital Allocation Dividend", type: "CREDIT", amount: 410000.00, category: "Investment", reference: "CAP-2025-1219" },

  // 2026 (Leading up to September 2026)
  { id: "TX-2026-057", date: "2026-01-20", description: "Executive Security Retainer Q1 2026", type: "CREDIT", amount: 155000.00, category: "Income", reference: "INV-2026-0120" },
  { id: "TX-2026-058", date: "2026-03-14", description: "Utility Payment - Vattenfall Smart Grid Berlin", type: "DEBIT", amount: 620.50, category: "Utilities", reference: "DE-VAT-2026" },
  { id: "TX-2026-059", date: "2026-05-22", description: "Salary Payment - Senior Security Director", type: "CREDIT", amount: 112000.00, category: "Salary", reference: "SAL-2026-0522" },
  // TX-2026-060: Final transaction in September 2026 precisely calculated to match €6.552.000,00!
];

// Calculate running balance and exact final transaction amount
function generateConsistentDataset(): Transaction[] {
  let currentBalance = OPENING_BALANCE;
  const processed: { raw: RawTxn; runningBalance: number }[] = [];

  for (const item of rawTransactionsChronological) {
    if (item.type === 'CREDIT') {
      currentBalance += item.amount;
    } else {
      currentBalance -= item.amount;
    }
    processed.push({
      raw: item,
      runningBalance: Math.round(currentBalance * 100) / 100,
    });
  }

  // The 60th transaction is on 2026-09-18
  // We want the final running balance after this transaction to be EXACTLY TARGET_FINAL_BALANCE (6,552,000.00)
  const balanceBeforeFinal = currentBalance;
  const neededDifference = TARGET_FINAL_BALANCE - balanceBeforeFinal;

  const finalTxn: RawTxn = {
    id: "TX-2026-060",
    date: "2026-09-18",
    description: neededDifference >= 0 
      ? "Account Deposit - Strategic Security Consulting Retainer"
      : "Service Payment - Berlin Protocol Security Operations",
    type: neededDifference >= 0 ? "CREDIT" : "DEBIT",
    amount: Math.abs(Math.round(neededDifference * 100) / 100),
    category: neededDifference >= 0 ? "Deposit" : "Services",
    reference: "SEPA-2026-0918-FINAL",
  };

  processed.push({
    raw: finalTxn,
    runningBalance: TARGET_FINAL_BALANCE,
  });

  // Format into final Transaction array
  const allChronological: Transaction[] = processed.map(p => ({
    id: p.raw.id,
    date: p.raw.date,
    description: p.raw.description,
    type: p.raw.type,
    amount: p.raw.amount,
    currency: "EUR",
    category: p.raw.category,
    reference: p.raw.reference,
    runningBalance: p.runningBalance,
  }));

  // Return sorted chronologically NEWEST FIRST (most recent transactions at index 0)
  return allChronological.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export const TRANSACTIONS: Transaction[] = generateConsistentDataset();

export const RECENT_TRANSACTIONS = TRANSACTIONS.slice(0, 5);
