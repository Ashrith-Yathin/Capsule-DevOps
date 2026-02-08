import React from 'react';
import { Outlet } from 'react-router-dom';
import { TamboProvider } from '@tambo-ai/react';
import { components } from '../lib/tambo';
import { ProjectProvider } from '../contexts/ProjectContext';

// Get Tambo API key from environment variables
const TAMBO_API_KEY = import.meta.env.VITE_TAMBO_API_KEY;

// Debug: Log the configuration
console.log('Tambo Config:', {
    hasApiKey: !!TAMBO_API_KEY,
    componentsCount: components.length
});

const ControlRoomLayout = () => {
    return (
        <ProjectProvider>
            <TamboProvider
                components={components}
                apiKey={TAMBO_API_KEY}
            >
                <div className="min-h-screen" style={{ backgroundColor: '#181717', color: '#b1a696', fontFamily: 'Nohemi, sans-serif' }}>
                    <Outlet />
                </div>
            </TamboProvider>
        </ProjectProvider>
    );
};

export default ControlRoomLayout;
