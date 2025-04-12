import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, Minimize2, Maximize2 } from 'lucide-react';
import { openai, MODEL, SYSTEM_PROMPT } from '../config/openai';
import ReactMarkdown from 'react-markdown';
import { saveChatMessage, getChatHistory } from '../utils/chatStorage';

const DELAY_TIMES = [3000, 4000, 5000, 6000, 8000];

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
  id: string;
  pending?: boolean;
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [pendingResponses, setPendingResponses] = useState<Set<string>>(new Set());
  const [isFirstMessage, setIsFirstMessage] = useState(true);
  const [userName, setUserName] = useState('');
  const [userGender, setUserGender] = useState<'male' | 'female' | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && isFirstMessage) {
      const initialMessage: Message = {
        role: 'assistant' as const,
        content: "Hey! I'm Adam. What's your name?",
        id: 'initial-greeting'
      };
      setMessages([initialMessage]);
      
      // Store initial greeting
      saveChatMessage({
        text: initialMessage.content,
        sender: 'bot',
        timestamp: Date.now(),
        userName: 'system'
      });
    }
  }, [isOpen, isFirstMessage]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const getRandomDelay = (delays: number[]) => {
    return delays[Math.floor(Math.random() * delays.length)];
  };

  const detectGender = (name: string) => {
    const femaleEndings = ['a', 'ie', 'y', 'el', 'elle', 'ette', 'ine'];
    const lowercaseName = name.toLowerCase();
    return femaleEndings.some(ending => lowercaseName.endsWith(ending)) ? 'female' : 'male';
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const messageId = `msg-${Date.now()}`;
    const userMessage = {
      role: 'user' as const,
      content: inputMessage.trim(),
      id: messageId
    };

    // Store user message
    await saveChatMessage({
      text: userMessage.content,
      sender: 'user',
      timestamp: Date.now(),
      userName: userName || 'anonymous'
    });

    if (isFirstMessage) {
      setUserName(inputMessage.trim());
      setUserGender(detectGender(inputMessage.trim()));
      const greeting = `Nice to meet you, ${inputMessage.trim()}! ${
        detectGender(inputMessage.trim()) === 'female' 
          ? 'How can I help you today, my friend? 😊' 
          : 'How can I help you today, mate? 🤘'
      }`;
      
      setMessages(prev => [...prev, userMessage, {
        role: 'assistant',
        content: greeting,
        id: `greeting-${Date.now()}`
      }]);

      // Store bot greeting
      await saveChatMessage({
        text: greeting,
        sender: 'bot',
        timestamp: Date.now(),
        userName: inputMessage.trim()
      });

      setInputMessage('');
      setIsFirstMessage(false);
      return;
    }

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInputMessage('');
    setPendingResponses(prev => new Set(prev).add(messageId));

    try {
      processMessage(userMessage, messageId, updatedMessages);
    } catch (error) {
      console.error('Error processing message:', error);
      setPendingResponses(prev => {
        const newSet = new Set(prev);
        newSet.delete(messageId);
        return newSet;
      });

      const errorMessage = {
        role: 'assistant',
        content: "I'm having trouble connecting. Please try again later.",
        id: `error-${Date.now()}`
      };

      setMessages(prev => [...prev, errorMessage]);

      // Store error message
      await saveChatMessage({
        text: errorMessage.content,
        sender: 'bot',
        timestamp: Date.now(),
        userName: userName || 'anonymous'
      });
    }
  };

  const processMessage = async (userMessage: Message, messageId: string, currentMessages: Message[]) => {
    const delay = getRandomDelay(DELAY_TIMES);
    await new Promise(resolve => setTimeout(resolve, delay));

    try {
      const response = await openai.chat.completions.create({
        model: MODEL,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'system', content: `The user's name is ${userName} and their gender is ${userGender}. Adjust your responses accordingly.` },
          ...currentMessages
            .filter(m => !m.pending)
            .map(({ role, content }) => ({ role, content }))
        ],
        temperature: 0.7,
        max_tokens: 500,
      });

      const assistantMessage = response.choices[0]?.message?.content;
      if (assistantMessage) {
        const botMessage = {
          role: 'assistant',
          content: assistantMessage,
          id: `response-${Date.now()}`
        };

        setMessages(prev => [...prev, botMessage]);

        // Store bot response
        await saveChatMessage({
          text: assistantMessage,
          sender: 'bot',
          timestamp: Date.now(),
          userName: userName || 'anonymous'
        });
      }
    } catch (error) {
      console.error('Error getting bot response:', error);
      const errorMessage = {
        role: 'assistant',
        content: "I'm having trouble connecting. Please try again later.",
        id: `error-${Date.now()}`
      };

      setMessages(prev => [...prev, errorMessage]);

      // Store error message
      await saveChatMessage({
        text: errorMessage.content,
        sender: 'bot',
        timestamp: Date.now(),
        userName: userName || 'anonymous'
      });
    } finally {
      setPendingResponses(prev => {
        const newSet = new Set(prev);
        newSet.delete(messageId);
        return newSet;
      });
    }
  };

  // Load chat history when user is identified
  useEffect(() => {
    if (userName) {
      getChatHistory(userName).then(history => {
        const formattedMessages = history.map(msg => ({
          role: msg.sender === 'user' ? 'user' as const : 'assistant' as const,
          content: msg.text,
          id: msg.messageId
        }));
        setMessages(prev => [...prev, ...formattedMessages]);
      });
    }
  }, [userName]);

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 bg-accent hover:bg-accent-dark text-white p-4 rounded-full shadow-lg transition-all duration-300 z-50"
      >
        <MessageSquare className="w-6 h-6" />
      </button>
    );
  }

  return (
    <div className={`fixed bottom-4 right-4 w-96 bg-white rounded-lg shadow-xl z-50 transition-all duration-300 ${
      isMinimized ? 'h-14' : 'h-[600px]'
    }`}>
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center space-x-3">
          <img
            src="https://pbs.twimg.com/profile_images/1859376911773782016/LxqTzCYe_400x400.jpg"
            alt="Adam Khaled"
            className="w-8 h-8 rounded-full"
          />
          <div>
            <h3 className="font-semibold text-gray-800">Adam Khaled</h3>
            <p className="text-xs text-gray-500">Business Growth Expert</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="text-gray-500 hover:text-gray-700"
          >
            {isMinimized ? <Maximize2 className="w-5 h-5" /> : <Minimize2 className="w-5 h-5" />}
          </button>
          <button
            onClick={() => {
              setIsOpen(false);
              setMessages([]);
              setIsFirstMessage(true);
              setUserName('');
              setUserGender(null);
            }}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          <div className="h-[calc(100%-8rem)] overflow-y-auto p-4 space-y-6">
            {messages.filter(m => m.role !== 'system').map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.role === 'user'
                      ? 'bg-accent text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  <ReactMarkdown className="prose prose-sm max-w-none whitespace-pre-line">
                    {message.content}
                  </ReactMarkdown>
                </div>
              </div>
            ))}
            {pendingResponses.size > 0 && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-800 p-3 rounded-lg">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSendMessage} className="p-4 border-t">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-black placeholder-gray-500"
              />
              <button
                type="submit"
                disabled={!inputMessage.trim()}
                className="bg-accent hover:bg-accent-dark text-white p-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
}