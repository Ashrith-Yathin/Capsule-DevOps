import React, { useEffect, useState } from 'react';
import { CheckCircle, XCircle, Clock } from 'lucide-react';
import { clsx } from 'clsx';
import { fetchDeployments } from '../../api/mockBackend';

export const DeploymentTable = ({ projectId, projectName }) => {
    const [deployments, setDeployments] = useState([]);

    useEffect(() => {
        if (projectId) {
            const data = fetchDeployments(projectId);
            setDeployments(data);
        }
    }, [projectId]);

    return (
        <div className="bg-black/90 border border-blue-500/30 rounded-lg overflow-hidden shadow-[0_0_15px_rgba(59,130,246,0.1)] backdrop-blur-sm">
            <div className="px-4 py-3 border-b border-blue-500/20 bg-blue-500/5 flex items-center justify-between">
                <h3 className="text-blue-400 font-mono text-sm tracking-wider flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-sm"></span>
                    DEPLOYMENT_LOG: {projectName || 'Loading...'}
                </h3>
                <div className="text-[10px] text-blue-500/60 font-mono">
                    SYNCED: {new Date().toLocaleTimeString()}
                </div>
            </div>

            <div className="w-full">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-blue-500/10 text-xs font-mono text-blue-500/60 uppercase tracking-widest">
                            <th className="px-4 py-2 font-normal">ID</th>
                            <th className="px-4 py-2 font-normal">Service</th>
                            <th className="px-4 py-2 font-normal">Status</th>
                            <th className="px-4 py-2 font-normal text-right">Time</th>
                        </tr>
                    </thead>
                    <tbody className="font-mono text-sm">
                        {deployments.length > 0 ? deployments.map((deploy) => (
                            <tr key={deploy.id} className="border-b border-blue-500/5 hover:bg-blue-500/5 transition-colors">
                                <td className="px-4 py-3 text-blue-300 opacity-70">#{deploy.id.substring(4)}</td>
                                <td className="px-4 py-3 text-blue-100">{deploy.service}</td>
                                <td className="px-4 py-3">
                                    <span className={clsx(
                                        "inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-xs border",
                                        deploy.status === 'success' && "bg-green-500/10 text-green-400 border-green-500/20",
                                        deploy.status === 'failed' && "bg-red-500/10 text-red-400 border-red-500/20",
                                        deploy.status === 'pending' && "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
                                    )}>
                                        {deploy.status === 'success' && <CheckCircle size={12} />}
                                        {deploy.status === 'failed' && <XCircle size={12} />}
                                        {deploy.status === 'pending' && <Clock size={12} />}
                                        {deploy.status.toUpperCase()}
                                    </span>
                                </td>
                                <td className="px-4 py-3 text-right text-blue-400/60 text-xs">
                                    {deploy.time}
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="4" className="px-4 py-8 text-center text-blue-500/40 text-sm">
                                    No deployments found for {projectName}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
