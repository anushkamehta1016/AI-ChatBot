
import React, { useState, useRef } from 'react';
import { Mic, MicOff, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface ChatInputControlsProps {
  onVoiceInput: (text: string) => void;
  onImageUpload: (file: File) => void;
  isListening: boolean;
}

// Define TypeScript interfaces for the Speech Recognition API
declare global {
  interface Window {
    webkitSpeechRecognition: new () => SpeechRecognition;
    SpeechRecognition: new () => SpeechRecognition;
  }
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onresult: (event: SpeechRecognitionEvent) => void;
  onerror: (event: SpeechRecognitionErrorEvent) => void;
  start: () => void;
}

interface SpeechRecognitionEvent {
  results: {
    [index: number]: {
      [index: number]: {
        transcript: string;
      };
    };
  };
}

interface SpeechRecognitionErrorEvent {
  error: string;
}

export const ChatInputControls = ({ onVoiceInput, onImageUpload, isListening }: ChatInputControlsProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleVoiceRecognition = () => {
    // Check if the Speech Recognition API is available in the browser
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      // Get the appropriate constructor based on browser support
      const SpeechRecognitionAPI = window.webkitSpeechRecognition || window.SpeechRecognition;
      const recognition = new SpeechRecognitionAPI();
      
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';
      
      recognition.onresult = (event: SpeechRecognitionEvent) => {
        const transcript = event.results[0][0].transcript;
        onVoiceInput(transcript);
      };
      
      recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
        toast.error("Error recording voice. Please try again.");
        console.error('Speech recognition error:', event.error);
      };
      
      recognition.start();
    } else {
      toast.error("Voice recognition is not supported in your browser");
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast.error("Image size should be less than 5MB");
        return;
      }
      if (!file.type.startsWith('image/')) {
        toast.error("Please upload only image files");
        return;
      }
      onImageUpload(file);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="ghost"
        size="icon"
        className={`hover:bg-gray-800 ${isListening ? 'text-green-500' : 'text-gray-400'}`}
        onClick={handleVoiceRecognition}
        title={isListening ? "Stop recording" : "Start voice command"}
      >
        {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="text-gray-400 hover:bg-gray-800"
        onClick={handleImageClick}
        title="Upload image"
      >
        <Camera className="h-5 w-5" />
      </Button>
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={handleImageChange}
      />
    </div>
  );
};
