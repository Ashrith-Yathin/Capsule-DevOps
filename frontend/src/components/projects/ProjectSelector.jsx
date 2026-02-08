import React, { useState } from 'react';
import { useProject } from '../../contexts/ProjectContext';
import { ChevronDown, Github } from 'lucide-react';

const ProjectSelector = () => {
    const { currentProject, connectedRepos, selectProject } = useProject();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-800/60 backdrop-blur-sm rounded-lg border border-gray-700 hover:border-gray-600 transition-colors"
            >
                <Github className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-200 font-medium">{currentProject.name}</span>
                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <>
                    <div
                        className="fixed inset-0 z-10"
                        onClick={() => setIsOpen(false)}
                    />
                    <div className="absolute top-full left-0 mt-2 w-64 bg-gray-900/95 backdrop-blur-md border border-gray-700 rounded-lg shadow-xl z-20 overflow-hidden">
                        <div className="p-2 border-b border-gray-800">
                            <p className="text-xs text-gray-500 px-2 py-1">Select Project</p>
                        </div>
                        <div className="max-h-64 overflow-y-auto">
                            {connectedRepos.map((repo) => (
                                <button
                                    key={repo.id}
                                    onClick={() => {
                                        selectProject(repo);
                                        setIsOpen(false);
                                    }}
                                    className={`w-full text-left px-4 py-2.5 hover:bg-gray-800/50 transition-colors ${currentProject.id === repo.id ? 'bg-gray-800/50' : ''
                                        }`}
                                >
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm text-gray-200 font-medium">{repo.name}</p>
                                            <p className="text-xs text-gray-500">{repo.fullName}</p>
                                        </div>
                                        <span className="text-xs text-gray-600">{repo.language}</span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default ProjectSelector;
