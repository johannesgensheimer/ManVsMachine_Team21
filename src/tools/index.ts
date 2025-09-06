// Export all tool functions for easy importing
export {
  getSupplierOverview,
  searchSuppliers,
  updateSupplierStatus,
  createSupplier,
  supplierFunctions
} from './supplier-tools';

export {
  manageContact,
  searchContacts,
  contactFunctions
} from './contact-tools';

export {
  logInteraction,
  getInteractionHistory,
  analyzeSentimentTrends,
  interactionFunctions
} from './interaction-tools';

export {
  addNote,
  getNotes,
  searchNotes,
  manageNote,
  noteFunctions
} from './note-tools';

export {
  performWebSearch,
  searchSupplierInfo,
  searchIndustryTrends,
  searchCompetitiveAnalysis,
  searchComplianceInfo,
  searchMarketResearch,
  webSearchFunctions
} from './websearch-tools';

// Collect all function definitions for OpenAI
import { supplierFunctions } from './supplier-tools';
import { contactFunctions } from './contact-tools';
import { interactionFunctions } from './interaction-tools';
import { noteFunctions } from './note-tools';
import { webSearchFunctions } from './websearch-tools';

export const allFunctions = [
  ...supplierFunctions,
  ...contactFunctions,
  ...interactionFunctions,
  ...noteFunctions,
  ...webSearchFunctions
];

// Tool function mapping for execution
export const toolFunctions = {
  // Supplier tools
  get_supplier_overview: async (args: any) => {
    const { getSupplierOverview } = await import('./supplier-tools');
    return getSupplierOverview(args);
  },
  search_suppliers: async (args: any) => {
    const { searchSuppliers } = await import('./supplier-tools');
    return searchSuppliers(args);
  },
  update_supplier_status: async (args: any) => {
    const { updateSupplierStatus } = await import('./supplier-tools');
    return updateSupplierStatus(args);
  },
  create_supplier: async (args: any) => {
    const { createSupplier } = await import('./supplier-tools');
    return createSupplier(args);
  },
  
  // Contact tools
  manage_contact: async (args: any) => {
    const { manageContact } = await import('./contact-tools');
    return manageContact(args);
  },
  search_contacts: async (args: any) => {
    const { searchContacts } = await import('./contact-tools');
    return searchContacts(args);
  },
  
  // Interaction tools
  log_interaction: async (args: any) => {
    const { logInteraction } = await import('./interaction-tools');
    return logInteraction(args);
  },
  get_interaction_history: async (args: any) => {
    const { getInteractionHistory } = await import('./interaction-tools');
    return getInteractionHistory(args);
  },
  analyze_sentiment_trends: async (args: any) => {
    const { analyzeSentimentTrends } = await import('./interaction-tools');
    return analyzeSentimentTrends(args);
  },
  
  // Note tools
  add_note: async (args: any) => {
    const { addNote } = await import('./note-tools');
    return addNote(args);
  },
  get_notes: async (args: any) => {
    const { getNotes } = await import('./note-tools');
    return getNotes(args);
  },
  search_notes: async (args: any) => {
    const { searchNotes } = await import('./note-tools');
    return searchNotes(args);
  },
  manage_note: async (args: any) => {
    const { manageNote } = await import('./note-tools');
    return manageNote(args);
  },

  // Web search tools
  perform_web_search: async (args: any) => {
    const { performWebSearch } = await import('./websearch-tools');
    return performWebSearch(args);
  },
  search_supplier_info: async (args: any) => {
    const { searchSupplierInfo } = await import('./websearch-tools');
    return searchSupplierInfo(args);
  },
  search_industry_trends: async (args: any) => {
    const { searchIndustryTrends } = await import('./websearch-tools');
    return searchIndustryTrends(args);
  },
  search_competitive_analysis: async (args: any) => {
    const { searchCompetitiveAnalysis } = await import('./websearch-tools');
    return searchCompetitiveAnalysis(args);
  },
  search_compliance_info: async (args: any) => {
    const { searchComplianceInfo } = await import('./websearch-tools');
    return searchComplianceInfo(args);
  },
  search_market_research: async (args: any) => {
    const { searchMarketResearch } = await import('./websearch-tools');
    return searchMarketResearch(args);
  }
};

// Tool categories for organized access
export const toolCategories = {
  supplier: supplierFunctions,
  contact: contactFunctions,
  interaction: interactionFunctions,
  note: noteFunctions,
  websearch: webSearchFunctions
};