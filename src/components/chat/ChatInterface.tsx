import { useState, useEffect, useRef } from 'react';
import { ChatInput } from '@/components/ChatInput';
import { ChatMessage } from '@/components/ChatMessage';
import { useChatContext } from '@/context/ChatContext';
import { Button } from '@/components/ui/button';
import { Trash2, Lightbulb } from 'lucide-react';
import { toast } from 'sonner';
import { ScrollArea } from '@/components/ui/scroll-area';

const ChatInterface = () => {
  const { messages, isLoading, sendMessage, clearChat } = useChatContext();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  const exampleQuestions = [
    "What's the cost of visiting Paris for a week?",
    "How much should I budget for Tokyo?",
    "Can you help me plan a trip to Rome?",
    "What are good budget options in New York City?",
  ];
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (message: string, image?: File) => {
    if (image) {
      toast.success("Image received! In a real app, this would be processed by the AI.");
    }
    await sendMessage(message);
    setShowSuggestions(false);
  };

  const handleClearChat = () => {
    clearChat();
    toast.success("Chat cleared. Start a new conversation!");
  };

  return (
    <div className="flex flex-col h-full max-h-[calc(100vh-100px)] bg-gray-900/60 backdrop-blur-md rounded-xl border border-gray-800 shadow-xl overflow-hidden">
      <div className="p-4 border-b border-gray-800 bg-gray-900/80 flex justify-between items-center">
        <h2 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Travel Budget Assistant
        </h2>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-400 hover:text-white hover:bg-gray-800"
            onClick={() => setShowSuggestions(!showSuggestions)}
            title="Show example questions"
          >
            <Lightbulb size={16} />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-400 hover:text-white hover:bg-gray-800"
            onClick={handleClearChat}
            title="Clear chat history"
          >
            <Trash2 size={16} />
          </Button>
        </div>
      </div>
      
      {showSuggestions && (
        <div className="p-3 bg-gray-800/50 border-b border-gray-700">
          <p className="text-sm text-gray-300 mb-2">Try asking:</p>
          <div className="flex flex-wrap gap-2">
            {exampleQuestions.map((question, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="text-xs bg-gray-700/50 border-gray-600 text-gray-200 hover:bg-gray-600"
                onClick={() => handleSendMessage(question)}
              >
                {question}
              </Button>
            ))}
          </div>
        </div>
      )}
      
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              message={message.content}
              isAi={message.isAi}
            />
          ))}
          {isLoading && <ChatMessage message="" isAi={true} loading={true} />}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>
      
      <div className="p-4 border-t border-gray-800 bg-gray-900/80">
        <ChatInput
          onSendMessage={handleSendMessage}
          disabled={isLoading}
          placeholder="Ask about travel costs for any destination..."
        />
      </div>
    </div>
  );
};

export default ChatInterface;
