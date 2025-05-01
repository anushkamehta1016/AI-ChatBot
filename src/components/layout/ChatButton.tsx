
import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const ChatButton = () => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  
  const handleClick = () => {
    navigate('/chat');
  };
  
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button
        onClick={handleClick}
        className={`rounded-full p-4 w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg transition-all duration-300 ${
          isHovered ? 'scale-110' : ''
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <MessageCircle className={`w-6 h-6 transition-all duration-300 ${isHovered ? 'animate-pulse' : ''}`} />
        <span className="sr-only">Chat with AI</span>
      </Button>
      {isHovered && (
        <div className="absolute bottom-16 right-0 bg-gray-800 text-white px-3 py-1 rounded-md shadow-md whitespace-nowrap animate-fade-in">
          Chat with Travel AI
        </div>
      )}
    </div>
  );
};

export default ChatButton;
