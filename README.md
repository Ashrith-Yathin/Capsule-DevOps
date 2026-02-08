# ForceOps - Generative UI DevOps Control Room

A modern DevOps dashboard powered by Tambo AI SDK, featuring an intelligent chat interface that dynamically renders interactive components based on user intent.

![ForceOps Dashboard](https://img.shields.io/badge/Status-Active-success)
![React](https://img.shields.io/badge/React-18.3.1-blue)
![Vite](https://img.shields.io/badge/Vite-6.0.3-purple)
![Tambo](https://img.shields.io/badge/Powered%20By-Tambo%20AI-black)

## Overview

ForceOps is an AI-powered DevOps control room that combines conversational AI with dynamic component rendering. Ask questions in natural language and receive contextual visualizations including deployment tables, latency charts, and incident alerts.

> "If a component is not relevant to the user's intent, it simply does not exist in the UI."

## Why Tambo (Generative UI)

Traditional DevOps dashboards rely on fixed layouts, tabs, and manual workflows. ForceOps takes a fundamentally different approach:

- The UI is **not predefined**
- There is **no routing logic for dashboards**
- No conditional rendering written by the developer

Instead, all UI composition decisions are delegated to **Tambo's Generative UI engine**.

Each DevOps visualization (charts, tables, alerts) is registered as a semantic component. Based on the user's natural language intent, Tambo decides:
- Which components to render
- In what combination
- With what data

This allows the interface to adapt in real time to what the user is trying to do, instead of forcing users to adapt to the interface.

## Problem to Solution Mapping

| DevOps Problem | ForceOps Solution |
|---------------|------------------|
| Complex dashboards | Zero-navigation, conversation-first UI |
| High cognitive load during incidents | Only relevant components appear |
| Static layouts | AI-driven component composition |
| Manual filtering and querying | Natural language intent |

## Not Just a Chatbot

ForceOps does not return plain text responses. Instead, the AI assembles **interactive UI components**.

The same conversation can result in:
- Charts
- Tables
- Alerts
- Action cards

The interface itself changes shape as the conversation evolves. This is Generative UI, not conversational UI.

## Features

### AI-Powered Chat Interface
- **Natural Language Queries**: Ask questions like "check recent deployments" or "show latency for auth-service"
- **Contextual Responses**: Tambo AI understands DevOps context and responds with relevant information
- **Real-time Streaming**: See responses as they're generated

### AI-Driven Generative UI
The system can render specialized DevOps components inline within chat responses:

1. **DeploymentTable** - View recent deployments with status indicators
2. **LatencyChart** - Visualize service performance metrics over time
3. **IncidentAlert** - Display critical system alerts and warnings

### Modern UI
- **Dark Theme**: Sleek dark aesthetic (#0f0f0f background)
- **Status Navbar**: Shows current session state and Control Room title
- **Smooth Animations**: Processing indicators and message transitions
- **Hidden Scrollbars**: Clean, minimal interface

## Suggested Demo Flow (2 Minutes)

1. "Any incidents today?"
2. "CPU spike after last deployment"
3. "Show logs at 10:42"
4. "Rollback last release"
5. "Why did you show this UI?"

This sequence demonstrates dynamic UI adaptation, multi-component rendering, and AI reasoning.

## Architecture

### Frontend Stack
- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **GSAP** - Animations on landing page
- **React Router** - Navigation

### AI Integration
- **Tambo AI SDK** (`@tambo-ai/react` v0.75.0)
- **Zod** - Schema validation for component props
- **Custom Component Registry** - Maps component names to React components

### Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── devops/
│   │   │   ├── DevOpsDashboard.jsx    # Main chat interface
│   │   │   ├── DeploymentTable.jsx    # Deployment history component
│   │   │   ├── LatencyChart.jsx       # Performance metrics chart
│   │   │   └── IncidentAlert.jsx      # Alert notification component
│   │   ├── Navbar/
│   │   ├── Footer/
│   │   └── Welcome/
│   ├── layouts/
│   │   └── ControlRoomLayout.jsx      # TamboProvider wrapper
│   ├── lib/
│   │   └── tambo.js                   # Component registry
│   ├── pages/
│   │   └── Home/
│   └── Router/
└── .env                               # API keys
```

## Installation

### Prerequisites
- Node.js 18+ and npm
- Tambo API key ([Get one here](https://tambo.ai))

### Setup

1. **Clone the repository**
```bash
cd frontend
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**
```bash
# .env
VITE_TAMBO_API_KEY=your_tambo_api_key_here
```

4. **Start the development server**
```bash
npm run dev
```

5. **Open your browser**
Navigate to `http://localhost:5173/capsule/dashboard`

> Note: For hackathon purposes, metrics, logs, and deployments can be mocked or simulated. The focus of ForceOps is **Generative UI orchestration**, not backend infrastructure.

## How It Works

### 1. Component Registration
Components are registered in `src/lib/tambo.js` with:
- **Name**: Identifier for the AI to reference
- **Description**: Tells the AI when to use this component
- **Props Schema**: Zod schema for type validation
- **Component**: The actual React component

```javascript
{
  name: 'DeploymentTable',
  description: 'Shows recent deployments. Use when user asks about deployment history.',
  component: DeploymentTable,
  propsSchema: z.object({
    deployments: z.array(z.object({
      id: z.string(),
      service: z.string(),
      status: z.enum(['success', 'failed', 'pending']),
      time: z.string()
    }))
  })
}
```

### 2. TamboProvider Setup
The `ControlRoomLayout.jsx` wraps routes with `TamboProvider`:
```javascript
<TamboProvider
  components={components}
  apiKey={import.meta.env.VITE_TAMBO_API_KEY}
>
  <Outlet />
</TamboProvider>
```

### 3. Chat Interface
`DevOpsDashboard.jsx` uses the `useTambo()` hook:
```javascript
const { thread, sendThreadMessage, streaming } = useTambo();
```

### 4. Message Rendering
- **Text Content**: Extracted from `content` array (`{type: 'text', text: '...'})
- **Components**: Looked up in registry by `componentName`, then rendered with `props`

### 5. Crypto Polyfill
A `crypto.randomUUID` polyfill in `main.jsx` ensures compatibility with the Tambo SDK.

## Usage Examples

### Query Recent Deployments
```
User: "Check recent deployments"
AI: Shows DeploymentTable component with latest deployment records
```

### View Service Performance
```
User: "Show latency for auth-service"
AI: Renders LatencyChart with performance metrics
```

### Check System Health
```
User: "Any incidents?"
AI: Displays IncidentAlert if there are critical issues
```

## Configuration

### Adding New Components

1. **Create the component** in `src/components/devops/`
2. **Register it** in `src/lib/tambo.js`:
```javascript
import { YourComponent } from '../components/devops/YourComponent';

export const components = [
  // ...existing components
  {
    name: 'YourComponent',
    description: 'When to use this component',
    component: YourComponent,
    propsSchema: z.object({
      // Define your props
    })
  }
];
```

3. **AI automatically knows** when and how to use it based on the description!

## Troubleshooting

### Chat not responding?
- Verify `VITE_TAMBO_API_KEY` is set correctly in `.env`
- Check browser console for errors
- Ensure you have an active internet connection

### Components not rendering?
- Confirm component is registered in `src/lib/tambo.js`
- Verify props schema matches what Tambo is sending
- Check component export is correct

### Build errors?
```bash
rm -rf node_modules package-lock.json
npm install
npm run dev
```

## License

MIT License - Created by Team Baked

## Acknowledgments

- **Tambo AI** for the intelligent component rendering SDK
- **React & Vite** for the development experience
- **Tailwind CSS** for styling utilities

---

**Built for modern DevOps teams**