
### **4. Technical Design Document (TDD)**

**4.1. System Architecture**
The system will follow a modular, event-driven architecture:
1.  **User Interface:** A user sends a message in a designated **Slack channel**.
2.  **Webhook Trigger:** Slack's API sends a JSON payload to a secure webhook endpoint on our backend.
3.  **Backend Server (Typescript/NestJS):** A NestJS application receives the webhook. It validates the request and passes the user's message to the LLM.
4.  **LLM Core (with Tool-Calling):** An LLM (e.g., Anthropic, Gemini) analyzes the message to determine user intent and extracts relevant parameters. It then decides which tool to call (e.g., `add_supplier`, `find_supplier`).
5.  **Tool Execution:** The backend executes the corresponding Typescript function, which contains the logic to interact with external APIs (e.g., SQLlite API).
6.  **Response Generation:** The result from the tool is sent back to the LLM to generate a user-friendly natural language response.
7.  **Return to User:** The backend sends the formatted response back to the user via the Slack API.

**4.2. Technology Stack**
*   **Interface:** Slack API
*   **Backend:** Typescript, NestJS
*   **Database (MVP):** SQLlite
*   **LLM Provider:** Anthropic, Google Gemini API (or other model with strong function-calling capabilities)
*   **Hosting:** To be determined (e.g., Google Cloud Run, Vercel).

**4.3. Data Model (SQLlite Schema)**
A single table named `Suppliers` will be used for the MVP:
*   `SupplierName` (Single line text, *Primary Field*)
*   `Status` (Single select: "Researching", "Contacted", "In Negotiation", "On Hold", "Active")
*   `PrimaryContact` (Single line text)
*   `ContactEmail` (Email)
*   `ProcurementNeed` (Long text)
*   `Tags` (Multiple select, for classification)
*   `NextFollowUpDate` (Date)
*   `Notes` (Long text)

---
