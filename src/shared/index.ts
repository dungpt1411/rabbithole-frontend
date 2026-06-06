// Core domain types for Internet Rabbit Hole

export type Mood =
  | 'nostalgic'
  | 'creepy'
  | 'intellectual'
  | 'hacker-culture'
  | 'weird-internet';

export interface Topic {
  id: string;
  name: string;
  description?: string;
  keywords: string[];
  mood?: Mood;
  createdAt: Date;
}

export interface Edge {
  id: string;
  sourceId: string;
  targetId: string;
  relationship: string;
  weight: number;
}

export interface GeneratedData {
  nodes: { topicName: string; description?: string; keywords: string[]; narration: string; }[];
  edges: { from: string; to: string; relationship: string; }[];
  // ... other fields
}

export interface RabbitHoleNode {
  id: string;
  topicId: string;
  rabbitHoleId: string;
  order: number;
  narration?: string;
  topic: Topic;
}

export interface RabbitHole {
  id: string;
  userId?: string;
  title: string;
  description?: string;
  mood?: Mood;
  startTopicId: string;
  nodes: RabbitHoleNode[];
  edges: Edge[];
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ExplorationHistory {
  id: string;
  userId?: string;
  rabbitHoleId: string;
  completedAt: Date;
  rating?: number;
}

// API Request/Response types
export interface GenerateRabbitHoleRequest {
  input: string;
  inputType: 'topic' | 'url' | 'keyword' | 'question' | 'random';
  mood?: Mood;
  maxDepth?: number;
}

export interface GenerateRabbitHoleResponse {
  id: string;
  title: string;
  nodes: RabbitHoleNode[];
  edges: Edge[];
  generationTime: number;
}

export interface SaveRabbitHoleRequest {
  id: string;
  title: string;
  description?: string;
  isPublic?: boolean;
}

export interface SaveRabbitHoleResponse {
  success: boolean;
  rabbitHole: RabbitHole;
}

export interface GetGraphResponse {
  id: string;
  nodes: RabbitHoleNode[];
  edges: Edge[];
}

export interface RandomDiscoveryResponse {
  rabbitHole: RabbitHole;
  suggestedTopics: Topic[];
}

// AI Engine types
export interface SemanticTraversalResult {
  nextTopic: Topic;
  narration: string;
  confidence: number;
  reasoning: string;
}

export interface InterestingnessScore {
  novelty: number;
  obscurity: number;
  semanticRichness: number;
  historicalSignificance: number;
  total: number;
}