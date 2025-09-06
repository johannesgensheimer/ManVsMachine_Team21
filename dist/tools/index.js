"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toolCategories = exports.allTools = exports.manageNoteTool = exports.searchNotesTool = exports.getNotesTool = exports.addNoteTool = exports.analyzeSentimentTrendsTool = exports.getInteractionHistoryTool = exports.logInteractionTool = exports.searchContactsTool = exports.manageContactTool = exports.createSupplierTool = exports.updateSupplierStatusTool = exports.searchSuppliersTool = exports.getSupplierOverviewTool = void 0;
// Export all tools for easy importing
var supplier_tools_1 = require("./supplier-tools");
Object.defineProperty(exports, "getSupplierOverviewTool", { enumerable: true, get: function () { return supplier_tools_1.getSupplierOverviewTool; } });
Object.defineProperty(exports, "searchSuppliersTool", { enumerable: true, get: function () { return supplier_tools_1.searchSuppliersTool; } });
Object.defineProperty(exports, "updateSupplierStatusTool", { enumerable: true, get: function () { return supplier_tools_1.updateSupplierStatusTool; } });
Object.defineProperty(exports, "createSupplierTool", { enumerable: true, get: function () { return supplier_tools_1.createSupplierTool; } });
var contact_tools_1 = require("./contact-tools");
Object.defineProperty(exports, "manageContactTool", { enumerable: true, get: function () { return contact_tools_1.manageContactTool; } });
Object.defineProperty(exports, "searchContactsTool", { enumerable: true, get: function () { return contact_tools_1.searchContactsTool; } });
var interaction_tools_1 = require("./interaction-tools");
Object.defineProperty(exports, "logInteractionTool", { enumerable: true, get: function () { return interaction_tools_1.logInteractionTool; } });
Object.defineProperty(exports, "getInteractionHistoryTool", { enumerable: true, get: function () { return interaction_tools_1.getInteractionHistoryTool; } });
Object.defineProperty(exports, "analyzeSentimentTrendsTool", { enumerable: true, get: function () { return interaction_tools_1.analyzeSentimentTrendsTool; } });
var note_tools_1 = require("./note-tools");
Object.defineProperty(exports, "addNoteTool", { enumerable: true, get: function () { return note_tools_1.addNoteTool; } });
Object.defineProperty(exports, "getNotesTool", { enumerable: true, get: function () { return note_tools_1.getNotesTool; } });
Object.defineProperty(exports, "searchNotesTool", { enumerable: true, get: function () { return note_tools_1.searchNotesTool; } });
Object.defineProperty(exports, "manageNoteTool", { enumerable: true, get: function () { return note_tools_1.manageNoteTool; } });
// Collect all tools in an array for easy agent setup
const supplier_tools_2 = require("./supplier-tools");
const contact_tools_2 = require("./contact-tools");
const interaction_tools_2 = require("./interaction-tools");
const note_tools_2 = require("./note-tools");
exports.allTools = [
    // Supplier tools
    supplier_tools_2.getSupplierOverviewTool,
    supplier_tools_2.searchSuppliersTool,
    supplier_tools_2.updateSupplierStatusTool,
    supplier_tools_2.createSupplierTool,
    // Contact tools
    contact_tools_2.manageContactTool,
    contact_tools_2.searchContactsTool,
    // Interaction tools
    interaction_tools_2.logInteractionTool,
    interaction_tools_2.getInteractionHistoryTool,
    interaction_tools_2.analyzeSentimentTrendsTool,
    // Note tools
    note_tools_2.addNoteTool,
    note_tools_2.getNotesTool,
    note_tools_2.searchNotesTool,
    note_tools_2.manageNoteTool
];
// Tool categories for organized access
exports.toolCategories = {
    supplier: [
        supplier_tools_2.getSupplierOverviewTool,
        supplier_tools_2.searchSuppliersTool,
        supplier_tools_2.updateSupplierStatusTool,
        supplier_tools_2.createSupplierTool
    ],
    contact: [
        contact_tools_2.manageContactTool,
        contact_tools_2.searchContactsTool
    ],
    interaction: [
        interaction_tools_2.logInteractionTool,
        interaction_tools_2.getInteractionHistoryTool,
        interaction_tools_2.analyzeSentimentTrendsTool
    ],
    note: [
        note_tools_2.addNoteTool,
        note_tools_2.getNotesTool,
        note_tools_2.searchNotesTool,
        note_tools_2.manageNoteTool
    ]
};
//# sourceMappingURL=index.js.map