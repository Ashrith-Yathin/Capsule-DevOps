// Mock backend API for hackathon demo
// In production, replace with real API calls to GitHub Actions, CloudWatch, etc.

export const fetchDeployments = (projectId) => {
    const deploymentData = {
        '1': [ // auth-service
            { id: 'dep-001', service: 'auth-service', status: 'success', time: '2 hours ago', commit: 'f7a3b2c' },
            { id: 'dep-002', service: 'auth-service', status: 'success', time: '5 hours ago', commit: '9d4e1a5' },
            { id: 'dep-003', service: 'auth-service', status: 'failed', time: '1 day ago', commit: '2c8f6b1' },
        ],
        '2': [ // payment-gateway
            { id: 'dep-004', service: 'payment-gateway', status: 'success', time: '1 hour ago', commit: 'a1b2c3d' },
            { id: 'dep-005', service: 'payment-gateway', status: 'success', time: '3 hours ago', commit: 'e4f5g6h' },
        ],
        '3': [ // frontend-app
            { id: 'dep-006', service: 'frontend-app', status: 'pending', time: '30 mins ago', commit: 'i7j8k9l' },
            { id: 'dep-007', service: 'frontend-app', status: 'success', time: '4 hours ago', commit: 'm1n2o3p' },
        ],
        '4': [ // api-gateway
            { id: 'dep-008', service: 'api-gateway', status: 'success', time: '6 hours ago', commit: 'q4r5s6t' },
        ],
        '5': [ // database-service
            { id: 'dep-009', service: 'database-service', status: 'success', time: '12 hours ago', commit: 'u7v8w9x' },
            { id: 'dep-010', service: 'database-service', status: 'success', time: '1 day ago', commit: 'y1z2a3b' },
        ],
    };

    return deploymentData[projectId] || [];
};

export const fetchLatency = (projectId) => {
    const latencyData = {
        '1': [
            { time: '00:00', value: 45 },
            { time: '04:00', value: 52 },
            { time: '08:00', value: 78 },
            { time: '12:00', value: 120 },
            { time: '16:00', value: 89 },
            { time: '20:00', value: 67 },
        ],
        '2': [
            { time: '00:00', value: 12 },
            { time: '04:00', value: 15 },
            { time: '08:00', value: 23 },
            { time: '12:00', value: 34 },
            { time: '16:00', value: 28 },
            { time: '20:00', value: 18 },
        ],
        '3': [
            { time: '00:00', value: 78 },
            { time: '04:00', value: 82 },
            { time: '08:00', value: 95 },
            { time: '12:00', value: 145 },
            { time: '16:00', value: 112 },
            { time: '20:00', value: 89 },
        ],
        '4': [
            { time: '00:00', value: 34 },
            { time: '04:00', value: 38 },
            { time: '08:00', value: 56 },
            { time: '12:00', value: 72 },
            { time: '16:00', value: 61 },
            { time: '20:00', value: 45 },
        ],
        '5': [
            { time: '00:00', value: 23 },
            { time: '04:00', value: 25 },
            { time: '08:00', value: 34 },
            { time: '12:00', value: 45 },
            { time: '16:00', value: 38 },
            { time: '20:00', value: 28 },
        ],
    };

    return latencyData[projectId] || [];
};

export const fetchIncidents = (projectId) => {
    const incidentData = {
        '1': [
            { id: 'inc-001', severity: 'high', message: 'High memory usage detected', time: '30 mins ago' },
        ],
        '2': [
            { id: 'inc-002', severity: 'critical', message: 'Payment processing timeout', time: '2 hours ago' },
        ],
        '3': [],
        '4': [
            { id: 'inc-003', severity: 'medium', message: 'Slow response times on /api/v1', time: '1 hour ago' },
        ],
        '5': [
            { id: 'inc-004', severity: 'critical', message: 'Database connection pool exhausted', time: '15 mins ago' },
        ],
    };

    return incidentData[projectId] || [];
};

// Note: In production, these functions would make real API calls:
// - fetchDeployments() -> GitHub Actions API or CI/CD platform
// - fetchLatency() -> CloudWatch, Datadog, or APM tool
// - fetchIncidents() -> PagerDuty, Opsgenie, or monitoring platform
