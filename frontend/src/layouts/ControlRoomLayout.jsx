import React from 'react';
import { Outlet } from 'react-router-dom';
import { TamboProvider } from '@tambo-ai/react';
import { components } from '../lib/tambo';

const ControlRoomLayout = () => {
    return (
        <TamboProvider
            components={components}
            // Assuming env variable is VITE_TAMBO_API_KEY for Vite
            apiKey={import.meta.env.VITE_TAMBO_API_KEY}
        >
            {console.log("Tambo Config:", {
                hasApiKey: !!import.meta.env.VITE_TAMBO_API_KEY,
                componentsCount: Object.keys(components || {}).length
            })}
            <div className="min-h-screen" style={{ backgroundColor: '#181717', color: '#b1a696', fontFamily: 'Nohemi, sans-serif' }}>
                <Outlet />
            </div>
        </TamboProvider>
    );
};

export default ControlRoomLayout;
