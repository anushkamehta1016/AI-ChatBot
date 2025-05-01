import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User, HelpCircle, Speaker } from "lucide-react";
import React from "react";
import ReactMarkdown from 'react-markdown';

interface ChatMessageProps {
  message: string;
  isAi: boolean;
  loading?: boolean;
}

export const ChatMessage = ({ message, isAi, loading = false }: ChatMessageProps) => {
  // Define actor details for AI Guide and Traveler
  const actor = isAi
    ? {
        name: "AI Guide",
        avatar: (
          <Avatar className="bg-gradient-to-br from-blue-500 to-purple-500 text-white shadow-md">
            <AvatarFallback>
              <HelpCircle size={22} />
            </AvatarFallback>
          </Avatar>
        ),
        align: "flex-row",
        bubbleColor: "bg-gradient-to-br from-blue-500 to-purple-500 text-white",
        nameColor: "text-blue-300"
      }
    : {
        name: "Traveler",
        avatar: (
          <Avatar className="bg-gradient-to-br from-orange-400 to-yellow-500 text-white shadow-md">
            <AvatarFallback>
              <User size={22} />
            </AvatarFallback>
          </Avatar>
        ),
        align: "flex-row-reverse",
        bubbleColor: "bg-gradient-to-br from-orange-400 to-yellow-500 text-white font-semibold",
        nameColor: "text-amber-300"
      };

  // Handle speaking the AI message aloud
  const handleSpeak = React.useCallback(() => {
    if (!window.speechSynthesis || loading || !message) return;
    window.speechSynthesis.cancel(); // Stop any ongoing speech
    // Remove markdown syntax before speaking
    const plainText = message.replace(/\*\*(.*?)\*\*/g, '$1');
    const utterance = new window.SpeechSynthesisUtterance(plainText);
    utterance.lang = "en-US";
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.volume = 1;
    window.speechSynthesis.speak(utterance);
  }, [message, loading]);

  return (
    <div
      className={cn(
        "w-full my-3 flex gap-3 animate-fade-in",
        actor.align,
        isAi ? "justify-start" : "justify-end"
      )}
    >
      {actor.avatar}
      <div className="flex flex-col max-w-[80%]">
        <span className={cn("text-xs mb-1 font-bold", actor.nameColor)}>
          {actor.name}
        </span>
        <div
          className={cn(
            "rounded-xl px-4 py-2 shadow-md text-base relative group",
            actor.bubbleColor,
            loading && "opacity-80"
          )}
        >
          {/* Show Speaker button only on AI message (not loading) */}
          {isAi && !loading && (
            <button
              onClick={handleSpeak}
              aria-label="Listen"
              className="absolute top-2 right-2 bg-transparent text-white/80 hover:text-white transition opacity-60 group-hover:opacity-100"
              tabIndex={0}
              type="button"
            >
              <Speaker className="w-5 h-5" />
            </button>
          )}

          {loading ? (
            <div className="flex items-center space-x-1">
              <div className="h-2 w-2 bg-white/70 rounded-full animate-bounce" />
              <div className="h-2 w-2 bg-white/70 rounded-full animate-bounce [animation-delay:0.15s]" />
              <div className="h-2 w-2 bg-white/70 rounded-full animate-bounce [animation-delay:0.3s]" />
            </div>
          ) : (
            <div className="whitespace-pre-wrap markdown-content">
              <ReactMarkdown
                components={{
                  p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                  strong: ({ children }) => <span className="font-bold">{children}</span>,
                  em: ({ children }) => <span className="italic">{children}</span>,
                  ul: ({ children }) => <ul className="list-disc ml-4 mb-2">{children}</ul>,
                  ol: ({ children }) => <ol className="list-decimal ml-4 mb-2">{children}</ol>,
                  li: ({ children }) => <li className="mb-1">{children}</li>,
                }}
              >
                {message}
              </ReactMarkdown>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
