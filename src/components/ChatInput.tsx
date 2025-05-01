
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SendIcon, LoaderIcon, MapPinIcon } from 'lucide-react';
import { ChatInputControls } from './ChatInputControls';
import { toast } from 'sonner';

interface ChatInputProps {
  onSendMessage: (message: string, image?: File) => void;
  disabled?: boolean;
  placeholder?: string;
}

export const ChatInput = ({ onSendMessage, disabled = false, placeholder }: ChatInputProps) => {
  const [message, setMessage] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [currentImage, setCurrentImage] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() || currentImage) {
      onSendMessage(message, currentImage || undefined);
      setMessage('');
      setCurrentImage(null);
    }
  };

  const handleVoiceInput = (text: string) => {
    setMessage(text);
    setIsListening(false);
    toast.success("Voice command received!");
  };

  const handleImageUpload = (file: File) => {
    setCurrentImage(file);
    toast.success("Image selected successfully!");
  };

  // Provide more helpful placeholder text if none provided
  const placeholderExamples = [
    "I want to travel to Paris in June for 5 days under $1000",
    "Planning a trip to Tokyo in April with a budget of $2500 for 7 days",
    "Need vacation ideas for Barcelona in August with $1800 for 6 days"
  ];
  
  // Randomly select a placeholder example if no specific one is provided
  const defaultPlaceholder = placeholderExamples[Math.floor(Math.random() * placeholderExamples.length)];

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="flex flex-col gap-2">
        {currentImage && (
          <div className="relative inline-block">
            <img
              src={URL.createObjectURL(currentImage)}
              alt="Upload preview"
              className="h-20 w-20 object-cover rounded-md"
            />
            <Button
              type="button"
              variant="destructive"
              size="sm"
              className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
              onClick={() => setCurrentImage(null)}
            >
              ×
            </Button>
          </div>
        )}
        <div className="flex items-center rounded-lg overflow-hidden border bg-background shadow-sm transition-all focus-within:shadow-md">
          <ChatInputControls
            onVoiceInput={handleVoiceInput}
            onImageUpload={handleImageUpload}
            isListening={isListening}
          />
          <div className="pl-3 text-muted-foreground">
            <MapPinIcon size={20} />
          </div>
          <Input
            type="text"
            placeholder={placeholder || defaultPlaceholder}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
            disabled={disabled}
          />
          <div className="p-1 pr-2">
            <Button 
              type="submit" 
              size="sm" 
              className="bg-gradient-to-r from-travel-blue to-travel-dark-orange text-white rounded-md px-4"
              disabled={disabled || (!message.trim() && !currentImage)}
            >
              {disabled ? 
                <LoaderIcon size={18} className="animate-spin" /> : 
                <SendIcon size={18} />
              }
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};
