import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, Bot, User, FileText, Globe } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  sources?: string[];
}

export const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm your California DMV assistant. I can help you with license renewals, vehicle registration, appointments, and more. All my information comes directly from the official DMV website and documents. How can I assist you today?",
      isUser: false,
      timestamp: new Date(),
      sources: ['DMV Official Website']
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const isMobile = useIsMobile();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    try {
      const { AIService } = await import('../services/AIService');
      const response = await AIService.generateResponse(inputValue);
      
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: response.message,
        isUser: false,
        timestamp: new Date(),
        sources: response.sources.length > 0 ? response.sources : ['California DMV Official Website']
      };

      setMessages(prev => [...prev, botResponse]);
      
      if (response.confidence < 0.5) {
        toast({
          title: "Low Confidence",
          description: "I'm not very confident about this answer. Please verify with official DMV sources.",
          duration: 3000,
        });
      }
    } catch (error) {
      console.error('Error getting AI response:', error);
      const errorResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm sorry, I'm having trouble accessing the DMV information right now. Please try again or visit the official DMV website at dmv.ca.gov.",
        isUser: false,
        timestamp: new Date(),
        sources: ['Error Message']
      };
      setMessages(prev => [...prev, errorResponse]);
      
      toast({
        title: "Error",
        description: "Failed to get response. Please try again.",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full bg-gradient-soft relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-20 h-20 bg-gradient-warm rounded-full opacity-20 animate-float"></div>
        <div className="absolute top-32 right-20 w-16 h-16 bg-primary-glow rounded-full opacity-15 animate-float-delayed"></div>
        <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-gradient-glow rounded-full opacity-10 animate-pulse-glow"></div>
        <div className="absolute bottom-40 right-10 w-12 h-12 bg-accent rounded-full opacity-25 animate-float"></div>
      </div>

      {/* Header */}
      <div className="bg-card/80 backdrop-blur-sm border-b border-border/50 p-3 sm:p-4 shadow-soft shrink-0">
        <div className="flex items-center space-x-2 sm:space-x-3">
          <div className="relative">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-warm rounded-full flex items-center justify-center shadow-warm animate-bounce-subtle">
              <Bot className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div className="absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-green-400 rounded-full animate-pulse"></div>
          </div>
          <div>
            <h1 className="text-lg sm:text-xl font-semibold text-foreground">California DMV Assistant</h1>
            <p className="text-xs sm:text-sm text-muted-foreground">Powered by official DMV data</p>
          </div>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 min-h-0">
        <ScrollArea className="h-full">
          <div className="p-4 lg:p-6 space-y-6 max-w-5xl mx-auto">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-5 duration-300`}
              >
                <div className={`flex items-start space-x-4 max-w-[85%] lg:max-w-[75%] ${message.isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  {/* Avatar */}
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 shadow-lg ${
                    message.isUser 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-gradient-warm text-white shadow-warm'
                  }`}>
                    {message.isUser ? <User className="w-6 h-6" /> : <Bot className="w-6 h-6" />}
                  </div>

                  {/* Message Bubble */}
                  <Card className={`p-6 shadow-xl transition-all duration-300 hover:shadow-2xl ${
                    message.isUser 
                      ? 'bg-chat-bubble-user text-white border-primary/20' 
                      : 'bg-chat-bubble-bot border-border/50'
                  }`}>
                    <div className={`text-base leading-relaxed ${message.isUser ? 'text-white' : 'text-foreground'}`}>
                      {message.text.split('\n').map((line, lineIndex) => {
                        // Handle different markdown-style formatting
                        if (line.startsWith('##')) {
                          return (
                            <h3 key={lineIndex} className="text-xl font-bold mb-3 mt-6 first:mt-0 text-primary">
                              {line.replace('##', '').trim()}
                            </h3>
                          );
                        } else if (line.startsWith('###')) {
                          return (
                            <h4 key={lineIndex} className="text-lg font-semibold mb-3 mt-4 first:mt-0">
                              {line.replace('###', '').trim()}
                            </h4>
                          );
                        } else if (line.startsWith('**') && line.endsWith('**')) {
                          return (
                            <div key={lineIndex} className="font-semibold mb-2 text-primary">
                              {line.replace(/\*\*/g, '')}
                            </div>
                          );
                        } else if (line.startsWith('•')) {
                          return (
                            <div key={lineIndex} className="ml-6 mb-2 flex items-start">
                              <span className="text-primary mr-3 text-lg">•</span>
                              <span>{line.substring(1).trim()}</span>
                            </div>
                          );
                        } else if (line.trim() === '') {
                          return <div key={lineIndex} className="h-3"></div>;
                        } else {
                          // Check if line contains URLs and make them clickable
                          const urlRegex = /(https?:\/\/[^\s]+)/g;
                          const parts = line.split(urlRegex);
                          
                          return (
                            <div key={lineIndex} className="mb-2">
                              {parts.map((part, partIndex) => {
                                if (urlRegex.test(part)) {
                                  return (
                                    <a 
                                      key={partIndex} 
                                      href={part} 
                                      target="_blank" 
                                      rel="noopener noreferrer"
                                      className="text-blue-400 hover:text-blue-300 underline transition-colors duration-200"
                                    >
                                      {part}
                                    </a>
                                  );
                                }
                                return <span key={partIndex}>{part}</span>;
                              })}
                            </div>
                          );
                        }
                      })}
                    </div>
                    
                    
                    <div className={`text-sm mt-4 ${message.isUser ? 'text-white/70' : 'text-muted-foreground'}`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </Card>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start animate-in slide-in-from-bottom-5 duration-300">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-warm rounded-full flex items-center justify-center animate-pulse-glow shadow-lg">
                    <Bot className="w-6 h-6 text-white" />
                  </div>
                  <Card className="p-6 bg-chat-bubble-bot border-border/50 shadow-xl">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 bg-primary rounded-full animate-bounce"></div>
                      <div className="w-3 h-3 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-3 h-3 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </Card>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
      </div>

      {/* Input Area */}
      <div className="p-6 bg-card/80 backdrop-blur-sm border-t border-border/50 shrink-0 shadow-lg">
        <div className="max-w-5xl mx-auto">
          <div className="flex space-x-4 items-end">
            <div className="flex-1">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={isMobile ? "Ask about DMV services..." : "Ask me about DMV services, license renewal, appointments..."}
                className="bg-chat-input border-border/50 focus:border-primary focus:ring-primary/20 transition-all duration-300 text-base h-12"
                disabled={isTyping}
              />
            </div>
            <Button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isTyping}
              className="bg-gradient-warm hover:shadow-warm transition-all duration-300 px-8 h-12"
              size="lg"
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
          
          <div className="flex items-center justify-center mt-4">
            <p className="text-sm text-muted-foreground flex items-center space-x-3 text-center">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>Powered by official DMV documents and website data</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};