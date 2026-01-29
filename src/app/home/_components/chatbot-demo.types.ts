export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  timestamp?: Date;
}

export interface DemoKey {
  key: string;
  usageRemaining: number;
  maxUsage: number;
  createdAt: Date;
  expiresAt: Date;
}

export interface ValidateKeyResponse {
  success: boolean;
  key?: DemoKey;
  error?: string;
}

export interface ChatResponse {
  success: boolean;
  message?: ChatMessage;
  usageRemaining?: number;
  error?: string;
}

export interface ChatRequest {
  key: string;
  messages: ChatMessage[];
}
