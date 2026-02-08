# Capsule: The UI Strikes Back

> "In a galaxy of static interfaces, Capsule brings balance to the DevOps force."

![Capsule Banner](https://img.shields.io/badge/Hackathon-The_UI_Strikes_Back-FFD700?style=for-the-badge&logo=star-wars)
![Tambo AI](https://img.shields.io/badge/Powered_By-Tambo_Generative_UI-000000?style=for-the-badge)
![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge)
![Clerk](https://img.shields.io/badge/Auth-Clerk-6C47FF?style=for-the-badge)

## The Mission

Static dashboards are a trap. DevOps engineers waste countless cycles navigating complex menus, filtering endless tables, and hunting for the right chart during an incident.

Capsule harnesses the power of Tambo's Generative UI SDK to build a control room that adapts to you. There are no fixed tabs. No predefined workflows. You simply speak your intent, and the AI constructs the perfect interface for the moment.

---

## Key Features

### 1. Generative UI Core (Powered by Tambo)
The heart of Capsule is the Tambo SDK. We don't write conditional rendering logic. We register semantic components, and Tambo's AI engine decides:
- What to render (Charts? Tables? Alerts?)
- When to render it (Based on natural language intent)
- How to configure it (Extracting context from your query)

### 2. Context-Aware Scope
Capsule isn't just a chatbot, it knows where you are.
- Project Context: Select a GitHub project, and the AI automatically scopes all queries to that repository.
- GitHub Integration: Connects to GitHub to fetch your repositories (persisted via LocalStorage).

### 3. Adaptive Components
We've built a library of "Force-sensitive" components that the AI can summon:
- LatencyChart: Visualizes performance metrics when you ask about speed or lag.
- DeploymentTable: Shows build history when you ask about releases.
- IncidentAlert: Flashes critical warnings when you ask about system health.

### 4. Secure and Protected
- Clerk Authentication: Full Google OAuth integration.
- Protected Routes: The Control Room is accessible only to authenticated personnel.

---

## How It Works

### The Registry (tambo.js)
We define our components and their "intent schemas" for Tambo:

```javascript
export const components = [
    {
        name: 'LatencyChart',
        description: 'Use when user asks for performance trends or latency.',
        component: LatencyChart,
        propsSchema: z.object({
            projectId: z.string().optional(),
            // ...
        })
    }
    // ... other components
];
```

### The Conversation
1. User asks: "Show me latency for the auth-service."
2. Tambo SDK: Analyzes intent -> Matches LatencyChart -> Extracts auth-service.
3. React: Renders `<LatencyChart projectId="..." />` instantly.

---

## Demo Flow

1. Login: Sign in with Google (Clerk).
2. Connect: Click "Connect GitHub" (loads demo repositories).
3. Ask:
   - "Show recent deployments" -> Table appears.
   - "How is the latency looking?" -> Chart appears.
   - "Any system alerts?" -> Incident report appears.
4. Context Switch: Change project in the dropdown -> Ask the same question -> New Data appears.

---

## Tech Stack

- Tambo AI SDK: The Generative UI brain.
- Clerk: Authentication and User Management.
- React + Vite: Frontend framework.
- Tailwind CSS: Styling (Dark Mode aesthetic).
- Lucide React: Iconography.

---

## Why Capsule Wins

We didn't just build a chatbot. We built a Generative Application.

- Traditional App: User clicks "Deployments" tab -> Logic fetches data -> Renders Table.
- Capsule: User asks "Status?" -> AI decides Table is best -> AI configures Table -> Renders Table.

This allows Capsule to handle unforeseen workflows. If a user asks for "deployments AND latency", Tambo can decide to render BOTH components side-by-side. That is the power of the UI striking back.

---

May the Source be with you.