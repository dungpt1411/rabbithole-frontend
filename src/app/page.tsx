'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Compass, Sparkles, Brain, Search, ArrowRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { GeneratorInput } from '@/features/generator/components/GeneratorInput';
import { MoodSelector } from '@/features/generator/components/MoodSelector';
import { useRabbitHoleStore } from '@/stores/rabbit-hole';
import { rabbitHoleApi } from '@/services/api';

export default function LandingPage() {
  const router = useRouter();
  const {
    setGenerating,
    isGenerating,
    setMood,
    selectedMood,
    setError,
    error,
    setGeneratedData,
  } = useRabbitHoleStore();

  const handleStartExploration = async (input: string, inputType: 'topic' | 'url' | 'keyword' | 'question' | 'random') => {
    setGenerating(true);
    setError(null);
    try {
      const result = await rabbitHoleApi.generate({
        input,
        inputType,
        mood: selectedMood,
      });

      // Store the generated data in the global store
      setGeneratedData(result);

      router.push('/explore');
    } catch (e: any) {
      setError(e.message || 'Failed to start exploration');
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] space-y-12 py-12">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-6 max-w-3xl mx-auto px-4"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-4">
          <Sparkles className="w-3 h-3" />
          <span>Powered by AI Curiosity Engine</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
          Lose yourself <span className="text-primary">intelligently.</span>
        </h1>
        <p className="text-xl text-muted-foreground leading-relaxed">
          Escape the addictive recommendation feeds. Explore the internet through
          meaningful discovery paths and serendipitous connections.
        </p>
      </motion.div>

      {/* Generator Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="w-full max-w-3xl bg-card border border-border p-6 md:p-10 rounded-3xl shadow-2xl space-y-8"
      >
        <div className="space-y-6">
          <GeneratorInput
            onSubmit={handleStartExploration}
            isGenerating={isGenerating}
          />
          <MoodSelector
            selectedMood={selectedMood}
            onSelect={setMood}
          />
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm text-center"
          >
            {error}
          </motion.div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-border">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50">
            <Brain className="w-5 h-5 text-primary" />
            <span className="text-xs font-medium">Semantic Traversal</span>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50">
            <Search className="w-5 h-5 text-primary" />
            <span className="text-xs font-medium">Internet Archaeology</span>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50">
            <Compass className="w-5 h-5 text-primary" />
            <span className="text-xs font-medium">Non-Linear Discovery</span>
          </div>
        </div>
      </motion.div>

      {/* Footer CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-center text-sm text-muted-foreground"
      >
        Curiosity, not clickbait. <span className="mx-2">•</span> The internet is bigger than your feed.
      </motion.div>
    </div>
  );
}
