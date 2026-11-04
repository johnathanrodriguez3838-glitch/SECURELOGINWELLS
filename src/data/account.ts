/**
 * Single Preconfigured Customer Account Data
 * As per specifications:
 * - Full name: Cengiz Aktürk
 * - Address: 10969 Berlin Moritzstr. 2
 * - Occupation: Security
 * - Currency: EUR
 * - Initial displayed balance: €6.552.000,00
 * - Demonstration PIN: 2402
 */

export interface CustomerAccount {
  id: string;
  fullName: string;
  firstName: string;
  lastName: string;
  address: string;
  postalCode: string;
  city: string;
  street: string;
  occupation: string;
  currency: 'EUR';
  balance: number;
  secondaryBalance: number;
  accountNumberMasked: string;
  iban: string;
  bic: string;
  accountType: string;
  secondaryAccountType: string;
  branch: string;
  creditScore: number;
  creditScoreDate: string;
  profilePhoto: string;
  demoUsername: string;
  demoPassword: string;
  demoPin: string;
}

export const CUSTOMER_ACCOUNT: CustomerAccount = {
  id: "CUST-BER-892402",
  fullName: "Cengiz Aktürk",
  firstName: "Cengiz",
  lastName: "Aktürk",
  street: "Moritzstr. 2",
  postalCode: "10969",
  city: "Berlin",
  address: "10969 Berlin Moritzstr. 2",
  occupation: "Security",
  currency: "EUR",
  balance: 6552000.00, // Exactly €6.552.000,00
  secondaryBalance: 184250.00,
  accountNumberMasked: "...0987",
  iban: "DE89 1007 0000 0987 2402 11",
  bic: "WELFDEDDXXX",
  accountType: "EVERYDAY CHECKING ...0987",
  secondaryAccountType: "WAY2SAVE ...3478",
  branch: "Berlin-Kreuzberg Moritzplatz Branch",
  creditScore: 785,
  creditScoreDate: "04/19/2026",
  profilePhoto: "/assets/aistudio/ciznig_profile_860de60a.jpg",
  demoUsername: "cengiz",
  demoPassword: "Password2026!",
  demoPin: "2402",
};
