import { create } from 'zustand';
import type { RabbitHole, RabbitHoleNode, Edge, Mood } from '@rabbit-hole/shared';

interface GeneratedData {
  title: string;
  nodes: { topicName: string; description?: string; keywords: string[]; narration: string }[];
  edges: { from: string; to: string; relationship: string }[];
}

interface RabbitHoleState {
  // Current exploration
  currentRabbitHole: RabbitHole | null;
  generatedData: GeneratedData | null;
  graphNodes: any[];
  graphEdges: any[];
  isGenerating: boolean;
  error: string | null;

  // Selected mood
  selectedMood: Mood | undefined;

  // Actions
  setGenerating: (isGenerating: boolean) => void;
  setRabbitHole: (rabbitHole: RabbitHole | null) => void;
  setGeneratedData: (data: GeneratedData | null) => void;
  setGraphData: (nodes: any[], edges: any[]) => void;
  setMood: (mood: Mood | undefined) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

export const useRabbitHoleStore = create<RabbitHoleState>((set) => ({
  currentRabbitHole: null,
  generatedData: null,
  graphNodes: [],
  graphEdges: [],
  isGenerating: false,
  error: null,
  selectedMood: undefined,

  setGenerating: (isGenerating) => set({ isGenerating }),
  setRabbitHole: (rabbitHole) => set({ currentRabbitHole: rabbitHole }),
  setGeneratedData: (generatedData) => set({ generatedData }),
  setGraphData: (nodes, edges) => set({ graphNodes: nodes, graphEdges: edges }),
  setMood: (mood) => set({ selectedMood: mood }),
  setError: (error) => set({ error }),
  reset: () =>
    set({
      currentRabbitHole: null,
      generatedData: null,
      graphNodes: [],
      graphEdges: [],
      isGenerating: false,
      error: null,
    }),
}));