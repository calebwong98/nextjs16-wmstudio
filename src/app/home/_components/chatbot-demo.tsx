"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Sparkles, SquareArrowUp, Send, Loader2, KeyRound } from "lucide-react";
import Link from "next/link";
import type { ChatMessage } from "./chatbot-demo.types";

interface ChatbotDemoProps {
  maxUsage?: number;
}

export function ChatbotDemo({ maxUsage = 5 }: ChatbotDemoProps) {
  const [apiKey, setApiKey] = useState("");
  const [isKeyValidated, setIsKeyValidated] = useState(false);
  const [usageRemaining, setUsageRemaining] = useState<number | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Placeholder: Will validate key against backend
  const handleValidateKey = async () => {
    setError(null);
    setIsLoading(true);

    try {
      // TODO: Replace with actual API call
      // const response = await fetch("/api/chatbot/validate-key", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ key: apiKey }),
      // });
      // const data: ValidateKeyResponse = await response.json();

      // Mock validation for now
      await new Promise((resolve) => setTimeout(resolve, 500));

      if (apiKey.length >= 8) {
        setIsKeyValidated(true);
        setUsageRemaining(maxUsage); // Will come from API response
      } else {
        setError("Invalid key. Please check and try again.");
      }
    } catch {
      setError("Failed to validate key. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Placeholder: Will send message to AI backend
  const handleSendMessage = async () => {
    if (!input.trim() || isLoading || usageRemaining === 0) return;

    const userMessage: ChatMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    setError(null);

    try {
      // TODO: Replace with actual API call
      // const response = await fetch("/api/chatbot/chat", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({
      //     key: apiKey,
      //     messages: [...messages, userMessage],
      //   } satisfies ChatRequest),
      // });
      // const data: ChatResponse = await response.json();

      // Mock response for now
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const assistantMessage: ChatMessage = {
        role: "assistant",
        content:
          "This is a demo response. The actual AI integration will provide meaningful responses based on your questions about my projects and experience.",
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setUsageRemaining((prev) => (prev !== null ? prev - 1 : null));
    } catch {
      setError("Failed to send message. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="border rounded-lg bg-secondary w-full mx-auto max-w-2xl">
      {/* Header with usage info */}
      <div className="flex justify-between py-2 px-4">
        {isKeyValidated ? (
          <>
            <p className="text-sm text-secondary-foreground">
              {usageRemaining} / {maxUsage} messages remaining
            </p>
            <div className="flex gap-2 items-center">
              <p className="text-sm text-success">Demo Mode</p>
              <Sparkles size={16} className="text-success" />
            </div>
          </>
        ) : (
          <>
            <p className="text-sm text-secondary-foreground">
              Enter your demo key to start
            </p>
            <div className="flex gap-2 items-center">
              <Link
                href="/contact"
                className="text-sm text-success hover:underline"
              >
                Request Key
              </Link>
              <SquareArrowUp size={16} className="text-success" />
            </div>
          </>
        )}
      </div>

      {/* Main chat area */}
      <div className="bg-background border rounded-md">
        {!isKeyValidated ? (
          /* Key input state */
          <div className="p-4 space-y-4">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <KeyRound
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                />
                <Input
                  type="password"
                  placeholder="Enter your demo key..."
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="pl-10"
                  onKeyDown={(e) => e.key === "Enter" && handleValidateKey()}
                />
              </div>
              <Button
                onClick={handleValidateKey}
                disabled={isLoading || !apiKey}
              >
                {isLoading ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  "Validate"
                )}
              </Button>
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <p className="text-xs text-muted-foreground">
              This chatbot demonstrates my AI integration skills. Each key
              allows {maxUsage} messages.
            </p>
          </div>
        ) : (
          /* Chat interface */
          <div className="flex flex-col">
            {/* Messages area */}
            <div className="min-h-50 max-h-100 overflow-y-auto p-4 space-y-4">
              {messages.length === 0 ? (
                <div className="text-center text-muted-foreground text-sm py-8">
                  <Sparkles size={24} className="mx-auto mb-2 text-success" />
                  <p>Ask me anything about my projects or experience!</p>
                </div>
              ) : (
                messages.map((message, index) => (
                  <ChatMessageBubble key={index} message={message} />
                ))
              )}
              {isLoading && (
                <div className="flex gap-2 items-center text-muted-foreground">
                  <Loader2 size={16} className="animate-spin" />
                  <span className="text-sm">Thinking...</span>
                </div>
              )}
            </div>

            {/* Input area */}
            <div className="border-t p-4">
              {usageRemaining === 0 ? (
                <div className="text-center py-2">
                  <p className="text-sm text-muted-foreground mb-2">
                    You&apos;ve used all your demo messages.
                  </p>
                  <Link
                    href="/contact"
                    className={cn(
                      "inline-flex items-center justify-center rounded-md text-sm font-medium",
                      "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
                      "h-9 px-4 py-2",
                    )}
                  >
                    Request New Key
                  </Link>
                </div>
              ) : (
                <div className="flex gap-2">
                  <Textarea
                    placeholder="Type your message..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="min-h-11 max-h-30 resize-none"
                    rows={1}
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={isLoading || !input.trim()}
                    size="icon"
                  >
                    {isLoading ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : (
                      <Send size={16} />
                    )}
                  </Button>
                </div>
              )}
              {error && (
                <p className="text-sm text-destructive mt-2">{error}</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ChatMessageBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === "user";

  return (
    <div className={cn("flex", isUser ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[80%] rounded-lg px-4 py-2 text-sm",
          isUser
            ? "bg-primary text-primary-foreground"
            : "bg-secondary text-secondary-foreground",
        )}
      >
        {message.content}
      </div>
    </div>
  );
}
