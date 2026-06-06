import type {
  GenerateRabbitHoleRequest,
  GenerateRabbitHoleResponse,
  RabbitHole,
  Topic,
  Mood,
} from '@rabbit-hole/shared';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

async function fetchApi<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_URL}${endpoint}`;
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  const response = await fetch(url, { ...options, headers });

  if (!response.ok) {
    const error = await response.text();
    throw new ApiError(response.status, error || `Request failed: ${response.statusText}`);
  }

  return response.json();
}

export const rabbitHoleApi = {
  generate: (request: GenerateRabbitHoleRequest) =>
    fetchApi<GenerateRabbitHoleResponse>('/api/rabbit-holes/generate', {
      method: 'POST',
      body: JSON.stringify(request),
    }),

  save: (id: string, title: string, description?: string, isPublic = false) =>
    fetchApi<{ success: boolean; id: string }>('/api/rabbit-holes/save', {
      method: 'POST',
      body: JSON.stringify({ id, title, description, isPublic }),
    }),

  get: (id: string) =>
    fetchApi<RabbitHole>(`/api/rabbit-holes/${id}`),
};

export const graphApi = {
  get: (id: string) =>
    fetchApi<{ nodes: any[]; edges: any[] }>(`/api/graph/${id}`),
};

export const discoveryApi = {
  getRandom: (mood?: Mood) =>
    fetchApi<{ rabbitHole: RabbitHole | null; suggestedTopics: Topic[] }>(
      `/api/discovery/random${mood ? `?mood=${mood}` : ''}`
    ),

  getDaily: () =>
    fetchApi<RabbitHole>('/api/discovery/daily'),
};

export const topicsApi = {
  search: (query?: string, mood?: Mood) =>
    fetchApi<Topic[]>(
      `/api/topics${query ? `?q=${query}` : ''}${mood ? `&mood=${mood}` : ''}`
    ),
};