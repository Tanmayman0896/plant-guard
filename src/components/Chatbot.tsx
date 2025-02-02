import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, ChevronDown } from 'lucide-react';
import type { ChatMessage, ChatbotResponse } from '../types';

const INITIAL_MESSAGE: ChatMessage = {
  id: '1',
  text: 'Hello! How can I help you today?',
  isBot: true,
  timestamp: new Date(),
};

const FAQ_RESPONSES: Record<string, ChatbotResponse> = {
  'contact': {
    text: 'You can reach our support team at:\nPhone: (555) 123-4567\nEmail: support@plantguard.ai',
  },
  'crop season': {
    text: 'The best time to grow crops depends on your region and the specific crop. Here are some general guidelines:',
    links: [
      { text: 'Crop Calendar', url: '#crop-calendar' },
      { text: 'Seasonal Guide', url: '#seasonal-guide' },
    ],
  },
  'plant health': {
    text: 'To maintain good plant health:\n1. Ensure proper watering\n2. Monitor sunlight exposure\n3. Check for pests regularly\n4. Maintain soil quality',
    links: [
      { text: 'Plant Care Guide', url: '#plant-care' },
    ],
  },
};

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: input,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    // Simple keyword-based response system
    const lowerInput = input.toLowerCase();
    let response: ChatbotResponse | null = null;

    if (lowerInput.includes('contact') || lowerInput.includes('support') || lowerInput.includes('phone')) {
      response = FAQ_RESPONSES['contact'];
    } else if (lowerInput.includes('when') || lowerInput.includes('season') || lowerInput.includes('grow')) {
      response = FAQ_RESPONSES['crop season'];
    } else if (lowerInput.includes('health') || lowerInput.includes('care') || lowerInput.includes('maintain')) {
      response = FAQ_RESPONSES['plant health'];
    }

    const botMessage: ChatMessage = {
      id: (Date.now() + 1).toString(),
      text: response?.text || "I'm not sure about that. Please contact our support team for more specific information.",
      isBot: true,
      timestamp: new Date(),
    };

    setTimeout(() => {
      setMessages((prev) => [...prev, botMessage]);
    }, 500);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-green-600 text-white rounded-full p-4 shadow-lg hover:bg-green-700 transition-colors"
        >
          <MessageCircle className="h-6 w-6" />
        </button>
      )}

      {isOpen && (
        <div className={`bg-white rounded-lg shadow-xl w-80 ${isMinimized ? 'h-14' : 'h-96'}`}>
          <div className="flex items-center justify-between p-4 border-b">
            <h3 className="font-semibold">Plant Support</h3>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="text-gray-500 hover:text-gray-700"
              >
                <ChevronDown className="h-5 w-5" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              <div className="p-4 h-72 overflow-y-auto">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`mb-4 ${
                      message.isBot ? 'text-left' : 'text-right'
                    }`}
                  >
                    <div
                      className={`inline-block p-3 rounded-lg ${
                        message.isBot
                          ? 'bg-gray-100 text-gray-800'
                          : 'bg-green-600 text-white'
                      }`}
                    >
                      {message.text}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              <div className="p-4 border-t">
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Type your message..."
                    className="flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <button
                    onClick={handleSend}
                    className="bg-green-600 text-white p-2 rounded-md hover:bg-green-700"
                  >
                    <Send className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}