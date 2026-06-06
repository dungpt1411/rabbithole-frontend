'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Share2, Download, Save } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { GraphView } from '@/features/visualization/components/GraphView';
import { NarrationPanel } from '@/features/visualization/components/NarrationPanel';
import { useRabbitHoleStore } from '@/stores/rabbit-hole';
import { rabbitHoleApi } from '@/services/api';

export default function ExplorePage() {
  const router = useRouter();
  const { generatedData, setGeneratedData } = useRabbitHoleStore();
  const [activeNodeIndex, setActiveNodeIndex] = useState(0);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!generatedData) {
      router.push('/');
    }
  }, [generatedData, router]);

  const handleNodeClick = (nodeId: string) => {
    const index = generatedData?.nodes.findIndex(n => n.topicName === nodeId);
    if (index !== undefined && index !== -1) {
      setActiveNodeIndex(index);
    }
  };

  const handleSave = async () => {
    if (!generatedData) return;
    setIsSaving(true);
    try {
      // In a real app, we'd send the whole structure.
      // For MVP, we save it with a default title.
      await rabbitHoleApi.save(
        `rh-${Date.now()}`,
        generatedData.title,
        'Saved exploration path'
      );
      alert('Rabbit hole saved to your collection!');
    } catch (e: any) {
      alert('Failed to save: ' + e.message);
    } finally {
      setIsSaving(false);
    }
  };

  if (!generatedData) return null;

  // Transform generated data for GraphView
  const graphNodes = generatedData.nodes.map((node, index) => ({
    id: node.topicName,
    label: node.topicName,
    data: {
      description: node.description,
      keywords: node.keywords,
      narration: node.narration,
    },
  }));

  const graphEdges = generatedData.edges.map((edge, index) => ({
    id: `e-${index}`,
    source: edge.from,
    target: edge.to,
    label: edge.relationship,
  }));

  const narrations = generatedData.nodes.map(n => ({
    topicName: n.topicName,
    narration: n.narration,
  }));

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] space-y-4">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push('/')}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Button>
          <h2 className="text-xl font-bold truncate max-w-md">
            {generatedData.title}
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2" onClick={handleSave} disabled={isSaving}>
            <Save className="w-4 h-4" />
            {isSaving ? 'Saving...' : 'Save Path'}
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <Share2 className="w-4 h-4" />
            Share
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="w-4 h-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-6 min-h-0">
        {/* Graph Visualization (Left/Center) */}
        <div className="lg:col-span-3 relative h-full bg-card rounded-3xl border border-border overflow-hidden">
          <GraphView
            nodes={graphNodes}
            edges={graphEdges}
            onNodeClick={handleNodeClick}
          />

          {/* Overlay for intro */}
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ delay: 2, duration: 1 }}
            className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center pointer-events-none z-10"
          >
            <div className="text-center space-y-2">
              <p className="text-lg font-medium">Click nodes to explore the narration</p>
              <p className="text-sm text-muted-foreground">Follow the flow of curiosity</p>
            </div>
          </motion.div>
        </div>

        {/* AI Narration Panel (Right) */}
        <div className="lg:col-span-1 h-full bg-card rounded-3xl border border-border overflow-hidden flex flex-col">
          <NarrationPanel
            narrations={narrations}
            currentIndex={activeNodeIndex}
          />
        </div>
      </div>
    </div>
  );
}
