import React, { createContext, useContext, useState } from 'react';

const ProjectContext = createContext();

export const useProject = () => {
    const context = useContext(ProjectContext);
    if (!context) {
        throw new Error('useProject must be used within a ProjectProvider');
    }
    return context;
};

// Mock GitHub repositories for hackathon demo
const MOCK_REPOS = [
    { id: '1', name: 'auth-service', fullName: 'company/auth-service', language: 'Node.js' },
    { id: '2', name: 'payment-gateway', fullName: 'company/payment-gateway', language: 'Python' },
    { id: '3', name: 'frontend-app', fullName: 'company/frontend-app', language: 'React' },
    { id: '4', name: 'api-gateway', fullName: 'company/api-gateway', language: 'Go' },
    { id: '5', name: 'database-service', fullName: 'company/database-service', language: 'PostgreSQL' },
];

export const ProjectProvider = ({ children }) => {
    // Initialize state from localStorage
    const [currentProject, setCurrentProject] = useState(() => {
        const saved = localStorage.getItem('currentProject');
        return saved ? JSON.parse(saved) : null;
    });
    const [connectedRepos, setConnectedRepos] = useState(() => {
        const saved = localStorage.getItem('connectedRepos');
        return saved ? JSON.parse(saved) : [];
    });
    const [isGitHubConnected, setIsGitHubConnected] = useState(() => {
        return localStorage.getItem('isGitHubConnected') === 'true';
    });

    const selectProject = (project) => {
        setCurrentProject(project);
        localStorage.setItem('currentProject', JSON.stringify(project));
    };

    const connectGitHub = () => {
        // For demo: Show mock repos when "connected"
        const repos = MOCK_REPOS;
        const initialProject = MOCK_REPOS[0];

        setIsGitHubConnected(true);
        setConnectedRepos(repos);
        setCurrentProject(initialProject);

        // Persist to localStorage
        localStorage.setItem('isGitHubConnected', 'true');
        localStorage.setItem('connectedRepos', JSON.stringify(repos));
        localStorage.setItem('currentProject', JSON.stringify(initialProject));
    };

    const disconnectGitHub = () => {
        setIsGitHubConnected(false);
        setConnectedRepos([]);
        setCurrentProject(null);

        // Clear localStorage
        localStorage.removeItem('isGitHubConnected');
        localStorage.removeItem('connectedRepos');
        localStorage.removeItem('currentProject');
    };

    const value = {
        currentProject,
        connectedRepos,
        isGitHubConnected,
        selectProject,
        connectGitHub,
        disconnectGitHub,
    };

    return (
        <ProjectContext.Provider value={value}>
            {children}
        </ProjectContext.Provider>
    );
};

export default ProjectContext;
