import type { PlaybookClause } from "./types";

/**
 * Sample NDA playbook: the firm's positions for each clause.
 *
 * This is a balanced default for a firm whose clients both share and receive information. Each
 * firm replaces it with its own positions (later editable from a settings screen / database).
 * Not legal advice: a starting template for attorneys to adapt.
 */
export const NDA_PLAYBOOK: PlaybookClause[] = [
  {
    id: "mutuality",
    title: "Mutual vs one-way",
    whyItMatters: "Decides whether the obligations protect both sides or only one.",
    preferred: "Mutual: both parties are bound when they receive information.",
    fallback: "One-way, if our client only discloses or only receives in this deal.",
    unacceptable: "One-way obligations binding only our client while it also discloses.",
    suggestedLanguage:
      "Each party may disclose Confidential Information to the other, and each party's obligations under this Agreement apply equally to it when it is the Receiving Party.",
    severity: "minor",
  },
  {
    id: "definition",
    title: "Definition of confidential information",
    whyItMatters: "Too broad a definition makes almost anything a breach.",
    preferred:
      "Information marked as confidential, or that a reasonable person would understand to be confidential.",
    fallback: "Oral information counts if confirmed in writing as confidential within 30 days.",
    unacceptable: "All information of any kind, whether or not marked or identified.",
    suggestedLanguage:
      '"Confidential Information" means non-public information disclosed by one party to the other that is marked as confidential or that a reasonable person would understand to be confidential given its nature and the circumstances of disclosure.',
    severity: "major",
  },
  {
    id: "exclusions",
    title: "Standard exclusions",
    whyItMatters: "Without them, public or independently created information is still restricted.",
    preferred:
      "All four exclusions: public information, already known, independently developed, received from a third party.",
    fallback: "Three of the four, if the missing one is low-risk for the deal.",
    unacceptable: "Fewer than three exclusions, or no exclusions at all.",
    suggestedLanguage:
      "Confidential Information does not include information that (a) is or becomes publicly available through no fault of the Receiving Party; (b) was known to the Receiving Party before disclosure; (c) is independently developed by the Receiving Party without use of the Confidential Information; or (d) is lawfully received from a third party without a duty of confidentiality.",
    severity: "major",
  },
  {
    id: "term",
    title: "How long obligations last",
    whyItMatters: "Long or open-ended terms create risk long after the deal ends.",
    preferred: "Up to 3 years from disclosure (trade secrets for as long as they remain secret).",
    fallback: "Up to 5 years from disclosure.",
    unacceptable: "More than 5 years, perpetual or indefinite for all information.",
    suggestedLanguage:
      "The Receiving Party's obligations continue for three (3) years from the date of each disclosure, except that obligations for trade secrets continue for as long as the information remains a trade secret under applicable law.",
    severity: "major",
  },
  {
    id: "permitted-use",
    title: "Permitted use",
    whyItMatters: "Information should only be used for the deal it was shared for.",
    preferred: "Use solely for the defined purpose of the discussions.",
    fallback: "A broader purpose that is still clearly defined.",
    unacceptable: "No limit on how the information may be used.",
    suggestedLanguage:
      'The Receiving Party will use Confidential Information solely for the purpose of evaluating and pursuing the proposed business relationship between the parties (the "Purpose").',
    severity: "minor",
  },
  {
    id: "return",
    title: "Return or destruction",
    whyItMatters: "Defines what happens to the information when the deal ends.",
    preferred:
      "Return or destroy on request, with an exception for legal or regulatory retention and automatic backups.",
    fallback: "Return or destroy on request, without a retention exception.",
    unacceptable: "No return or destruction obligation.",
    suggestedLanguage:
      "On written request, the Receiving Party will return or destroy the Disclosing Party's Confidential Information, except that it may retain copies as required by law or regulation or in automatic electronic backups, which remain subject to this Agreement.",
    severity: "minor",
  },
  {
    id: "residuals",
    title: "Residuals",
    whyItMatters:
      "A residuals clause lets the other side freely use anything its people remember, which can empty the NDA of meaning.",
    preferred: "No residuals clause.",
    fallback:
      "Residuals limited to general skills and know-how, excluding trade secrets and specific data.",
    unacceptable: "Broad right to use any information retained in unaided memory.",
    suggestedLanguage: "Delete the residuals clause in its entirety.",
    severity: "critical",
  },
  {
    id: "non-solicit",
    title: "Non-solicitation",
    whyItMatters: "Restricts hiring, which usually does not belong in an NDA.",
    preferred: "No non-solicitation clause.",
    fallback:
      "Up to 12 months, limited to employees met through the deal, with an exception for general job advertisements.",
    unacceptable: "Longer than 12 months or a broad ban on hiring any employee.",
    suggestedLanguage:
      "For twelve (12) months, neither party will directly solicit for employment any employee of the other party with whom it had contact in connection with the Purpose, except that general solicitations not targeted at those employees are permitted.",
    severity: "major",
  },
  {
    id: "governing-law",
    title: "Governing law",
    whyItMatters: "Decides which state's law and courts apply in a dispute.",
    preferred: "New York or Delaware law.",
    fallback: "Another US state, if the client accepts it.",
    unacceptable: "Foreign law or a forum with no connection to either party.",
    suggestedLanguage:
      "This Agreement is governed by the laws of the State of New York, without regard to its conflict of laws principles.",
    severity: "minor",
  },
  {
    id: "remedies",
    title: "Remedies",
    whyItMatters: "Courts should be able to stop a breach quickly; fixed penalties are a red flag.",
    preferred: "Right to seek injunctive relief, no liquidated damages.",
    fallback: "Silent on remedies.",
    unacceptable: "Liquidated damages or fixed penalties for breach.",
    suggestedLanguage:
      "Each party acknowledges that a breach of this Agreement may cause irreparable harm, and the Disclosing Party may seek injunctive or other equitable relief in addition to any other remedies available at law.",
    severity: "minor",
  },
  {
    id: "assignment",
    title: "Assignment",
    whyItMatters: "Controls whether the other side can pass the NDA to someone else.",
    preferred: "No assignment without prior written consent.",
    fallback: "Assignment allowed to affiliates or in a merger or acquisition.",
    unacceptable: "Free assignment by either party without consent.",
    suggestedLanguage:
      "Neither party may assign this Agreement without the prior written consent of the other party, except to a successor in a merger or acquisition of substantially all of its assets.",
    severity: "minor",
  },
  {
    id: "liability",
    title: "Liability and indemnity",
    whyItMatters:
      "Unlimited liability or a broad indemnity can expose the client to damages far beyond the value of the deal.",
    preferred: "Indirect and consequential damages excluded; no indemnity.",
    fallback: "Silent on liability.",
    unacceptable: "Unlimited liability or an indemnity for any and all losses.",
    suggestedLanguage:
      "Neither party will be liable for any indirect, incidental, special or consequential damages arising out of this Agreement. Nothing in this Agreement creates an obligation to indemnify.",
    severity: "critical",
  },
];

export const getPlaybookClause = (id: string) => NDA_PLAYBOOK.find((c) => c.id === id);
