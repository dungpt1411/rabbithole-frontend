'use client';

import { motion } from 'framer-motion';
import { Mood } from '@rabbit-hole/shared';
import { cn } from '@/components/ui/button';

interface MoodSelectorProps {
  selectedMood: Mood | undefined;
  onSelect: (mood: Mood | undefined) => void;
}

const moods: { value: Mood; label: string; icon: string; description: string }[] = [
  { value: 'nostalgic', label: 'Nostalgic', icon: '📻', description: 'Journey through memory lane' },
  { value: 'creepy', label: 'Creepy', icon: '👻', description: 'Explore the darker side' },
  { value: 'intellectual', label: 'Intellectual', icon: '🧠', description: 'Feed your curiosity' },
  { value: 'hacker-culture', label: 'Hacker Culture', icon: '💻', description: 'Digital underground' },
  { value: 'weird-internet', label: 'Weird Internet', icon: '🌌', description: 'The odd corners of the web' },
];

export function MoodSelector({ selectedMood, onSelect }: MoodSelectorProps) {
  return (
    <div className="space-y-3">
      <label className="text-sm font-medium text-muted-foreground">
        Choose your mood (optional)
      </label>
      <div className="flex flex-wrap gap-2">
        {moods.map((mood) => (
          <motion.button
            key={mood.value}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelect(selectedMood === mood.value ? undefined : mood.value)}
            className={cn(
              'flex items-center gap-2 px-3 py-2 rounded-lg border transition-all',
              'text-sm font-medium',
              selectedMood === mood.value
                ? 'border-primary bg-primary/20 text-primary-foreground'
                : 'border-border bg-card hover:bg-accent hover:border-accent'
            )}
          >
            <span>{mood.icon}</span>
            <span>{mood.label}</span>
          </motion.button>
        ))}
      </div>
      {selectedMood && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs text-muted-foreground"
        >
          {moods.find(m => m.value === selectedMood)?.description}
        </motion.p>
      )}
    </div>
  );
}