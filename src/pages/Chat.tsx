
import React from 'react';
import ChatInterface from '@/components/chat/ChatInterface';
import TravelMap from '@/components/map/TravelMap';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useChatContext } from '@/context/ChatContext';

const Chat = () => {
  const navigate = useNavigate();
  const { messages } = useChatContext();
  
  // Extract destination from the last user message
  const lastDestination = React.useMemo(() => {
    const userMessages = messages.filter(m => !m.isAi);
    if (userMessages.length === 0) return undefined;
    
    const lastMessage = userMessages[userMessages.length - 1].content;
    const destinationMatch = lastMessage.match(/(?:to|in|for|about)\s+([^?.,]+)(?:\?|$)/i);
    return destinationMatch ? destinationMatch[1].trim() : undefined;
  }, [messages]);

  return (
    <div className="min-h-screen bg-gray-950 text-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center">
            <Button
              variant="ghost"
              className="mr-4 text-blue-400 hover:text-blue-300 hover:bg-gray-800/50"
              onClick={() => navigate('/')}
            >
              <ChevronLeft className="mr-2 h-4 w-4" /> Back to Home
            </Button>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              AI Travel Assistant
            </h1>
          </div>
          
          <div>
            <Button
              variant="outline"
              className="text-sm flex items-center gap-2 text-gray-300 border-gray-700"
            >
              <Info className="h-4 w-4" />
              <span>Try asking about travel costs for destinations</span>
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 h-[calc(100vh-150px)]">
            <ChatInterface />
          </div>
          <div className="h-[calc(100vh-150px)] overflow-y-auto">
            <TravelMap destination={lastDestination} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
