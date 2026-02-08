import { z } from 'zod';
import { LatencyChart } from '../components/devops/LatencyChart';
import { DeploymentTable } from '../components/devops/DeploymentTable';
import { IncidentAlert } from '../components/devops/IncidentAlert';

export const components = [
    {
        name: 'LatencyChart',
        description: 'Displays a line chart of latency metrics for the current project over time. Use this when the user asks for performance trends, latency spikes, or response times. Data is automatically fetched based on the selected project.',
        component: LatencyChart,
        propsSchema: z.object({
            projectId: z.string().optional().describe('The ID of the project to fetch latency data for. Defaults to current project if not specified.'),
            projectName: z.string().optional().describe('The name of the project. Defaults to current project if not specified.')
        })
    },
    {
        name: 'DeploymentTable',
        description: 'Shows a list of recent deployments for the current project. Use this when the user asks about deployment history, recent changes, or build status. Data is automatically fetched based on the selected project.',
        component: DeploymentTable,
        propsSchema: z.object({
            projectId: z.string().optional().describe('The ID of the project to fetch deployments for. Defaults to current project if not specified.'),
            projectName: z.string().optional().describe('The name of the project. Defaults to current project if not specified.')
        })
    },
    {
        name: 'IncidentAlert',
        description: 'Displays a critical alert or warning about a system incident. Use this when the user asks about system health, outages, or errors.',
        component: IncidentAlert,
        propsSchema: z.object({
            title: z.string().describe('Short title of the incident'),
            severity: z.enum(['critical', 'warning', 'info']).describe('The severity level of the incident'),
            description: z.string().describe('Detailed description of what went wrong'),
            timestamp: z.string().optional().describe('When the incident occurred')
        })
    }
];
