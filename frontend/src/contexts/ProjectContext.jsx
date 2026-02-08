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
    const [currentProject, setCurrentProject] = useState(null);
    const [connectedRepos, setConnectedRepos] = useState([]);
    const [isGitHubConnected, setIsGitHubConnected] = useState(false); // Start disconnected

    const selectProject = (project) => {
        setCurrentProject(project);
    };

    const connectGitHub = () => {
        // For demo: Show mock repos when "connected"
        setIsGitHubConnected(true);
        setConnectedRepos(MOCK_REPOS);
        setCurrentProject(MOCK_REPOS[0]);
    };

    const disconnectGitHub = () => {
        setIsGitHubConnected(false);
        setConnectedRepos([]);
        setCurrentProject(null);
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
