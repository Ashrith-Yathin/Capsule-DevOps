import { z } from 'zod';
import { LatencyChart } from '../components/devops/LatencyChart';
import { DeploymentTable } from '../components/devops/DeploymentTable';
import { IncidentAlert } from '../components/devops/IncidentAlert';

export const components = [
    {
        name: 'LatencyChart',
        description: 'Displays a line chart of latency metrics for a specific service over time. Use this when the user asks for performance trends, latency spikes, or response times.',
        component: LatencyChart,
        propsSchema: z.object({
            serviceName: z.string().describe('The name of the service to show latency for (e.g., "auth-service", "database", "frontend")'),
            data: z.array(z.object({
                time: z.string(),
                value: z.number()
            })).describe('Array of data points with time and latency value in ms')
        })
    },
    {
        name: 'DeploymentTable',
        description: 'Shows a list of recent deployments and their status. Use this when the user asks about deployment history, recent changes, or build status.',
        component: DeploymentTable,
        propsSchema: z.object({
            deployments: z.array(z.object({
                id: z.string(),
                service: z.string(),
                status: z.enum(['success', 'failed', 'pending']),
                time: z.string()
            })).describe('List of deployment records')
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
