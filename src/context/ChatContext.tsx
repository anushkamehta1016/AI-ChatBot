import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getGeminiResponse } from '@/services/gemini';
import { toast } from 'sonner';

// Define the structure of a chat message
export interface ChatMessage {
  id: string;
  content: string;
  isAi: boolean;
  timestamp: Date;
}

interface ChatContextType {
  messages: ChatMessage[];
  isLoading: boolean;
  sendMessage: (message: string) => Promise<void>;
  clearChat: () => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChatContext must be used within a ChatProvider');
  }
  return context;
};

interface ChatProviderProps {
  children: ReactNode;
}

export const ChatProvider = ({ children }: ChatProviderProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Add welcome message when the chat first loads
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: crypto.randomUUID(),
          content: "I'm here to help with your travel questions. You can ask me about destination costs, budget planning, or travel tips for specific places. Try asking something like 'What's the cost of visiting Paris?' or 'How much should I budget for Tokyo?'",
          isAi: true,
          timestamp: new Date(),
        },
      ]);
    }
  }, []);

  const sendMessage = async (message: string) => {
    if (!message.trim()) return;

    // Add user message to the chat
    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      content: message,
      isAi: false,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Get response from Gemini API
      const response = await getGeminiResponse(message);
      
      // Add AI response to chat
      const aiMessage: ChatMessage = {
        id: crypto.randomUUID(),
        content: response.text,
        isAi: true,
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error in sendMessage:', error);
      
      // Add error message
      const errorMessage: ChatMessage = {
        id: crypto.randomUUID(),
        content: "Sorry, I couldn't process your request. Please try again.",
        isAi: true,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorMessage]);
      toast.error("Failed to get response from AI. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: crypto.randomUUID(),
        content: "I'm here to help with your travel questions. You can ask me about destination costs, budget planning, or travel tips for specific places. Try asking something like 'What's the cost of visiting Paris?' or 'How much should I budget for Tokyo?'",
        isAi: true,
        timestamp: new Date(),
      },
    ]);
  };

  const value = {
    messages,
    isLoading,
    sendMessage,
    clearChat,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

export default ChatContext;
