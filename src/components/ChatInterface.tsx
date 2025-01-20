"use client";
import { getChatResponse } from "@/app/actions";
import { useState, useEffect, useRef } from "react";
import { Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { ErrorMessage } from "./ErrorMessage";
import SkeletonLoader from "./SkeletonLoader";
import { Messages } from "./Messages";
import { seedData } from "@/lib/seedDate";

export type Message = {
  id: string;
  text: string;
  isUser: boolean;
};

const WelcomeMessage: Message = {
  id: "welcome",
  text: "Hello! I'm AIVOA. How can I help you today?",
  isUser: false,
};

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([WelcomeMessage]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const defaultSuggestions = seedData.slice(0, 2).map((data) => data.query);
    setSuggestions(defaultSuggestions);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const findSuggestions = (input: string) => {
    if (!input.trim()) {
      const defaultSuggestions = seedData.slice(0, 2).map((data) => data.query);
      setSuggestions(defaultSuggestions);
      return;
    }
    const matchedQueries = seedData
      .filter((data) => data.query.toLowerCase().includes(input.toLowerCase()))
      .map((data) => data.query);

    setSuggestions(
      matchedQueries.length >= 2 ? matchedQueries.slice(0, 2) : []
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading) return;
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      isUser: true,
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);
    setError(null);
    try {
      const response = await getChatResponse(inputMessage);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        isUser: false,
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error fetching response:", error);
      setError(
        "An error occurred while fetching the response. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto bg-gradient-to-br from-purple-50 to-indigo-50 shadow-xl border-0">
      <CardHeader className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-t-xl">
        <CardTitle className="text-2xl font-bold">AIVOA Chat</CardTitle>
      </CardHeader>
      <CardContent className="p-6 h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-indigo-200 scrollbar-track-transparent">
        <div className="space-y-4">
          {messages.map((message) => (
            <Messages key={message.id} message={message} />
          ))}
          {isLoading && <SkeletonLoader />}
          {error && <ErrorMessage error={error} />}
          <div ref={messagesEndRef} />
        </div>
      </CardContent>
      <CardFooter className="bg-white border-t border-purple-100 flex flex-col">
        {suggestions.length > 0 && (
          <div className="flex gap-2 mb-2">
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full cursor-pointer hover:bg-purple-200"
                onClick={() => {
                  setInputMessage(suggestion);
                  setSuggestions([]);
                }}
              >
                {suggestion}
              </div>
            ))}
          </div>
        )}
        <form onSubmit={handleSubmit} className="flex w-full space-x-2">
          <Input
            type="text"
            value={inputMessage}
            onChange={(e) => {
              setInputMessage(e.target.value);
              findSuggestions(e.target.value);
            }}
            placeholder="Type your message..."
            className="flex-1 bg-purple-50 border-purple-200 focus:border-purple-400 focus:ring-purple-400"
            disabled={isLoading}
          />
          <Button
            type="submit"
            disabled={isLoading}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}
