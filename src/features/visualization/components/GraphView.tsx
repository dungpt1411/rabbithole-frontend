'use client';

import { useCallback, useMemo } from 'react';
import {
  ReactFlow,
  Node,
  Edge,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  BackgroundVariant,
  NodeProps,
  Handle,
  Position,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { motion, AnimatePresence } from 'framer-motion';

interface GraphNodeData {
  label: string;
  description?: string;
  keywords?: string[];
  narration?: string;
  isActive?: boolean;
}

function CustomNode({ data }: NodeProps<Node<GraphNodeData>>) {
  return (
    <div className="px-4 py-3 rounded-lg border border-border bg-card shadow-lg min-w-[150px] text-center">
      <Handle type="target" position={Position.Top} className="!bg-primary" />
      <div className="font-medium text-sm text-foreground">{data.label}</div>
      {data.isActive && data.narration && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mt-2 text-xs text-muted-foreground"
        >
          {data.narration}
        </motion.div>
      )}
      <Handle type="source" position={Position.Bottom} className="!bg-primary" />
    </div>
  );
}

const nodeTypes = {
  custom: CustomNode,
};

interface GraphViewProps {
  nodes: any[];
  edges: any[];
  onNodeClick?: (nodeId: string) => void;
}

export function GraphView({ nodes, edges, onNodeClick }: GraphViewProps) {
  const initialNodes: Node[] = useMemo(() => {
    if (!nodes || nodes.length === 0) return [];

    return nodes.map((node, index) => ({
      id: node.id || node.label,
      type: 'custom',
      position: {
        x: 250,
        y: index * 120,
      },
      data: {
        label: node.label,
        description: node.data?.description,
        keywords: node.data?.keywords,
        narration: node.data?.narration,
        isActive: index === nodes.length - 1,
      },
    }));
  }, [nodes]);

  const initialEdges: Edge[] = useMemo(() => {
    if (!edges || edges.length === 0) return [];

    return edges.map((edge, index) => ({
      id: edge.id || `e-${index}`,
      source: edge.source,
      target: edge.target,
      type: 'smoothstep',
      animated: true,
      style: { stroke: 'hsl(var(--primary) / 0.6)' },
      label: edge.label,
    }));
  }, [edges]);

  const [flowNodes, setFlowNodes, onNodesChange] = useNodesState(initialNodes);
  const [flowEdges, setFlowEdges, onEdgesChange] = useEdgesState(initialEdges);

  // Update nodes when prop changes
  useMemo(() => {
    setFlowNodes(initialNodes);
    setFlowEdges(initialEdges);
  }, [initialNodes, initialEdges, setFlowNodes, setFlowEdges]);

  return (
    <div className="w-full h-full min-h-[400px] rounded-lg overflow-hidden border border-border">
      <ReactFlow
        nodes={flowNodes}
        edges={flowEdges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={(_, node) => onNodeClick?.(node.id)}
        nodeTypes={nodeTypes}
        fitView
        attributionPosition="bottom-left"
        defaultEdgeOptions={{
          type: 'smoothstep',
          animated: true,
        }}
      >
        <Background variant={BackgroundVariant.Dots} gap={20} size={1} />
        <Controls />
      </ReactFlow>
    </div>
  );
}