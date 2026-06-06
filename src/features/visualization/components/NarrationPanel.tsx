'use client';

import { motion } from 'framer-motion';
import { MessageSquare, Volume2 } from 'lucide-react';
import { cn } from '@/components/ui/button';

interface Narration {
  topicName: string;
  narration: string;
}

interface NarrationPanelProps {
  narrations: Narration[];
  currentIndex?: number;
}

export function NarrationPanel({ narrations, currentIndex }: NarrationPanelProps) {
  if (!narrations || narrations.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-muted-foreground">
        <div className="text-center">
          <MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p className="text-sm">Start exploring to see narrations</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 p-4">
      <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground pb-2 border-b border-border">
        <MessageSquare className="w-4 h-4" />
        <span>AI Narrator</span>
      </div>

      <div className="space-y-3 overflow-y-auto max-h-[60vh]">
        {narrations.map((item, index) => (
          <motion.div
            key={`${item.topicName}-${index}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={cn(
              'p-4 rounded-lg border transition-all',
              currentIndex === index
                ? 'border-primary bg-primary/10 shadow-lg shadow-primary/20'
                : 'border-border bg-card'
            )}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-sm text-primary">
                {item.topicName}
              </span>
              {currentIndex === index && (
                <span className="text-xs text-primary/70 animate-pulse">Current</span>
              )}
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {item.narration}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}