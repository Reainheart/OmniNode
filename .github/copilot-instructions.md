# AI Coding Agent Instructions for OmniNode

Welcome to the OmniNode project! This document provides essential guidance for AI coding agents to be productive in this codebase. OmniNode is a database educational resource built as part of a project at the Oregon Institute of Technology.

## Project Overview
OmniNode consists of two main components:

1. **API** (Backend):
   - Located in the `api/` directory.
   - Handles data processing and communication with the database.
   - Key files:
     - `index.js`: Entry point for the API.
     - `SupabaseClient.js`: Manages interactions with the Supabase database.
     - `SB/`: Contains specialized modules for fetching and processing data (e.g., `GetArray.js`, `GetStructures.js`).

2. **Client** (Frontend):
   - Located in the `client/` directory.
   - Built with React and Vite for fast development and hot module replacement (HMR).
   - Key files:
     - `src/main.jsx`: Entry point for the React application.
     - `src/Pages/`: Contains React components organized by pages (e.g., `home`, `Instruct-Page`).
     - `vite.config.js`: Configuration for the Vite build tool.

## Developer Workflows

### Running the Project
- **API**:
  1. Navigate to the `api/` directory.
  2. Run `npm install` to install dependencies.
  3. Start the server with `node index.js`.

- **Client**:
  1. Navigate to the `client/` directory.
  2. Run `npm install` to install dependencies.
  3. Start the development server with `npm run dev`.

### Testing
- Currently, no explicit testing framework is mentioned. Check for `test` scripts in `package.json` files for updates.

### Debugging
- Use `console.log` for debugging both frontend and backend.
- For the client, Vite's HMR allows quick feedback during development.

## Project-Specific Conventions
- **Frontend Component Structure**:
  - Components are organized by pages and subdirectories (e.g., `Canvas`, `Toolbar`).
  - CSS files are colocated with their respective components.

- **Backend Modules**:
  - Each file in `api/SB/` serves a specific data-fetching or processing purpose.
  - Follow the naming convention `Get[Entity].js` for new modules.

## Integration Points
- **Supabase**:
  - The backend uses Supabase for database interactions. Refer to `SupabaseClient.js` for connection details.

- **React and Vite**:
  - The frontend leverages React for UI and Vite for fast builds. Familiarity with these tools is essential.

## Examples
- Adding a new data-fetching module:
  1. Create a new file in `api/SB/` (e.g., `GetNewEntity.js`).
  2. Follow the structure of existing modules like `GetArray.js`.

- Adding a new page to the frontend:
  1. Create a new directory under `src/Pages/`.
  2. Add a main component file (e.g., `NewPage.jsx`) and a CSS file.
  3. Update `src/Pages/index.js` to export the new page.

## Notes
- This document will evolve as the project grows. Update it with new conventions, workflows, or dependencies as needed.