'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/components/ui/button';
import { ArrowRight, Sparkles, Wand2 } from 'lucide-react';

type InputType = 'topic' | 'url' | 'keyword' | 'question' | 'random';

interface GeneratorInputProps {
  onSubmit: (input: string, inputType: InputType) => void;
  isGenerating: boolean;
}

const inputTypes: { value: InputType; label: string; placeholder: string }[] = [
  { value: 'topic', label: 'Topic', placeholder: 'e.g., Cold War, Typography' },
  { value: 'url', label: 'URL', placeholder: 'e.g., https://en.wikipedia.org/wiki/...' },
  { value: 'keyword', label: 'Keyword', placeholder: 'e.g., hacker, space, vintage' },
  { value: 'question', label: 'Question', placeholder: 'e.g., How did the internet start?' },
  { value: 'random', label: 'Random', placeholder: 'Surprise me!' },
];

export function GeneratorInput({ onSubmit, isGenerating }: GeneratorInputProps) {
  const [input, setInput] = useState('');
  const [inputType, setInputType] = useState<InputType>('topic');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalInput = inputType === 'random' ? 'random' : input;
    if (finalInput.trim()) {
      onSubmit(finalInput, inputType);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-2xl mx-auto"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Input Type Selector */}
        <div className="flex flex-wrap gap-2 mb-4">
          {inputTypes.map((type) => (
            <button
              key={type.value}
              type="button"
              onClick={() => setInputType(type.value)}
              className={cn(
                'px-3 py-1.5 rounded-full text-xs font-medium transition-all',
                inputType === type.value
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-accent'
              )}
            >
              {type.label}
            </button>
          ))}
        </div>

        {/* Input Field */}
        <div className="relative">
          <Input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={inputTypes.find(t => t.value === inputType)?.placeholder}
            disabled={inputType === 'random' || isGenerating}
            className="h-14 text-lg pr-24 bg-card border-border"
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
            {inputType !== 'random' && input && (
              <button
                type="button"
                onClick={() => setInput('')}
                className="p-2 text-muted-foreground hover:text-foreground"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isGenerating || (!input && inputType !== 'random')}
          className="w-full h-12 text-lg gap-2"
        >
          {isGenerating ? (
            <>
              <Sparkles className="w-5 h-5 animate-pulse" />
              Exploring...
            </>
          ) : (
            <>
              <Wand2 className="w-5 h-5" />
              Start Exploring
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </Button>
      </form>
    </motion.div>
  );
}