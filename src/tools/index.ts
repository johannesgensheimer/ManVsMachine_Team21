// Export all tools for easy importing
export {
  getSupplierOverviewTool,
  searchSuppliersTool,
  updateSupplierStatusTool,
  createSupplierTool
} from './supplier-tools';

export {
  manageContactTool,
  searchContactsTool
} from './contact-tools';

export {
  logInteractionTool,
  getInteractionHistoryTool,
  analyzeSentimentTrendsTool
} from './interaction-tools';

export {
  addNoteTool,
  getNotesTool,
  searchNotesTool,
  manageNoteTool
} from './note-tools';

// Collect all tools in an array for easy agent setup
import {
  getSupplierOverviewTool,
  searchSuppliersTool,
  updateSupplierStatusTool,
  createSupplierTool
} from './supplier-tools';

import {
  manageContactTool,
  searchContactsTool
} from './contact-tools';

import {
  logInteractionTool,
  getInteractionHistoryTool,
  analyzeSentimentTrendsTool
} from './interaction-tools';

import {
  addNoteTool,
  getNotesTool,
  searchNotesTool,
  manageNoteTool
} from './note-tools';

export const allTools = [
  // Supplier tools
  getSupplierOverviewTool,
  searchSuppliersTool,
  updateSupplierStatusTool,
  createSupplierTool,
  
  // Contact tools
  manageContactTool,
  searchContactsTool,
  
  // Interaction tools
  logInteractionTool,
  getInteractionHistoryTool,
  analyzeSentimentTrendsTool,
  
  // Note tools
  addNoteTool,
  getNotesTool,
  searchNotesTool,
  manageNoteTool
];

// Tool categories for organized access
export const toolCategories = {
  supplier: [
    getSupplierOverviewTool,
    searchSuppliersTool,
    updateSupplierStatusTool,
    createSupplierTool
  ],
  contact: [
    manageContactTool,
    searchContactsTool
  ],
  interaction: [
    logInteractionTool,
    getInteractionHistoryTool,
    analyzeSentimentTrendsTool
  ],
  note: [
    addNoteTool,
    getNotesTool,
    searchNotesTool,
    manageNoteTool
  ]
};
