import React, { useState, useEffect, useRef } from 'react';
import { useTambo } from '@tambo-ai/react';
import { Send } from 'lucide-react';
import { components } from '../../lib/tambo';
import { useProject } from '../../contexts/ProjectContext';
import ProjectSelector from '../projects/ProjectSelector';

const DevOpsDashboard = () => {
    const tamboHook = useTambo();
    const {
        thread,
        sendThreadMessage,
        streaming,
        isIdle
    } = tamboHook;

    const { currentProject } = useProject();

    const messages = thread?.messages || [];
    // Only show thinking if streaming AND we have messages
    const isThinking = streaming === true && messages.length > 0;

    const [input, setInput] = useState('');
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isThinking]);

    // Debug: Log Tambo state
    useEffect(() => {
        console.log('Tambo State:', {
            streaming,
            isIdle,
            isThinking,
            messageCount: messages.length,
            lastMessage: messages[messages.length - 1]
        });
    }, [streaming, isIdle, messages.length]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        // Don't block if we're just thinking
        if (streaming) {
            console.warn('Still streaming, please wait');
            return;
        }

        try {
            // Include project context in the message
            const userMessage = input;
            const contextualMessage = `[Project: ${currentProject.name} (ID: ${currentProject.id})] ${userMessage}`;

            sendThreadMessage(contextualMessage);
            setInput('');
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    return (
        <div className="flex flex-col h-screen max-h-screen relative overflow-hidden bg-[#0f0f0f]">
            {/* Status Navbar */}
            <header className="p-5 border-b border-gray-800 bg-gradient-to-r from-[#1a1a1a] to-[#151515]">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div>
                        <h2 className="text-lg font-semibold text-gray-100 mb-1">Control Room</h2>
                        <div className="flex items-center gap-3">
                            <div className="text-sm text-gray-400">
                                {messages.length > 0 ? (
                                    <div className="flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-green-500"></span>
                                        <span className="text-green-400">Active Session</span>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-gray-600"></span>
                                        <span className="text-gray-500">Ready</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <ProjectSelector />
                </div>
            </header>

            {/* Main Content Area */}
            <main className="flex-1 overflow-y-auto p-8 md:p-12 scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                {(!messages || messages.length === 0) && (
                    <div className="h-full flex flex-col items-center justify-center text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-gray-200">
                            Ready to work?
                        </h1>
                    </div>
                )}

                <div className="max-w-4xl mx-auto space-y-4">
                    {messages && messages.map((msg, idx) => {
                        // Parse content - Tambo returns content as array of {type, text} objects
                        let contentText = '';

                        if (typeof msg.content === 'string') {
                            contentText = msg.content;
                        } else if (Array.isArray(msg.content)) {
                            contentText = msg.content
                                .filter(item => item && item.type === 'text')
                                .map(item => item.text)
                                .join('');
                        }

                        // Handle component rendering - component is an object with {componentName, props}
                        let RenderedComponent = null;
                        if (msg.component && msg.component.componentName) {
                            const compDef = components.find(c => c.name === msg.component.componentName);
                            if (compDef) {
                                const ComponentToRender = compDef.component;
                                RenderedComponent = <ComponentToRender {...msg.component.props} />;
                            }
                        }

                        return (
                            <div
                                key={idx}
                                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`max-w-[80%] rounded-2xl px-5 py-3 ${msg.role === 'user'
                                        ? 'bg-gray-800/80 backdrop-blur-sm text-gray-100 shadow-sm'
                                        : 'bg-gray-900/60 backdrop-blur-sm text-gray-100 shadow-sm'
                                        }`}
                                >
                                    {contentText && (
                                        <div className="whitespace-pre-wrap leading-relaxed">
                                            {contentText}
                                        </div>
                                    )}

                                    {RenderedComponent && (
                                        <div className="mt-3">
                                            <div className="rounded-xl overflow-hidden bg-black/40 p-2">
                                                {RenderedComponent}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}

                    {isThinking && (
                        <div className="flex items-start">
                            <div className="bg-gray-900/60 backdrop-blur-sm rounded-2xl px-5 py-3 shadow-sm">
                                <div className="flex items-center gap-2 text-gray-400">
                                    <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                                    <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" style={{ animationDelay: '0.2s' }}></span>
                                    <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" style={{ animationDelay: '0.4s' }}></span>
                                </div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>
            </main >

            {/* Input Area */}
            < div className="p-6 pb-8" >
                <form
                    onSubmit={handleSubmit}
                    className="max-w-4xl mx-auto relative flex items-center gap-3 bg-gray-900/80 backdrop-blur-sm rounded-full px-6 py-4 shadow-lg border border-gray-800"
                >
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask anything..."
                        className="flex-1 bg-transparent border-none outline-none text-gray-100 placeholder-gray-500"
                        autoComplete="off"
                        autoFocus
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                handleSubmit(e);
                            }
                        }}
                    />
                    <button
                        type="submit"
                        disabled={!input.trim()}
                        className="bg-gray-100 text-gray-900 rounded-full p-2 disabled:opacity-30 disabled:cursor-not-allowed transition-all hover:bg-white"
                    >
                        <Send size={18} />
                    </button>
                </form>
            </div >
        </div >
    );
};

export default DevOpsDashboard;
