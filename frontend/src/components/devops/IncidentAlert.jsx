import React from 'react';
import { AlertTriangle, AlertOctagon, Info } from 'lucide-react';
import { clsx } from 'clsx';

export const IncidentAlert = ({ title, severity, description, timestamp }) => {
    const isCritical = severity === 'critical';
    const isWarning = severity === 'warning';

    return (
        <div className={clsx(
            "border-l-4 p-4 rounded-r-lg mb-4 backdrop-blur-sm relative overflow-hidden",
            isCritical ? "bg-red-950/40 border-red-500 text-red-200" :
                isWarning ? "bg-amber-950/40 border-amber-500 text-amber-200" :
                    "bg-blue-950/40 border-blue-500 text-blue-200"
        )}>
            {/* Scanline effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent opacity-10 pointer-events-none animate-scanline" />

            <div className="flex items-start gap-4 reltive z-10">
                <div className={clsx(
                    "p-2 rounded-lg border",
                    isCritical ? "bg-red-500/20 border-red-500/50 text-red-500" :
                        isWarning ? "bg-amber-500/20 border-amber-500/50 text-amber-500" :
                            "bg-blue-500/20 border-blue-500/50 text-blue-500"
                )}>
                    {isCritical ? <AlertOctagon size={24} /> :
                        isWarning ? <AlertTriangle size={24} /> :
                            <Info size={24} />}
                </div>

                <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                        <h4 className={clsx(
                            "font-bold uppercase tracking-wide text-sm",
                            isCritical ? "text-red-400" : isWarning ? "text-amber-400" : "text-blue-400"
                        )}>
                            {isCritical ? 'CRITICAL_ALERT' : isWarning ? 'SYSTEM_WARNING' : 'INFO_NOTICE'} :: {title}
                        </h4>
                        {timestamp && (
                            <span className="text-xs opacity-60 font-mono">{timestamp}</span>
                        )}
                    </div>

                    <p className="text-sm opacity-90 leading-relaxed font-mono">
                        {description}
                    </p>
                </div>
            </div>
        </div>
    );
};
