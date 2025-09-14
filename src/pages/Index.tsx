import { useState } from 'react';
import { ChatInterface } from '@/components/ChatInterface';
import { TrainingPanel } from '@/components/TrainingPanel';
import { Button } from '@/components/ui/button';
import { MessageSquare, Brain } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const Index = () => {
  const [activeTab, setActiveTab] = useState<'chat' | 'training'>('training');
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      <div className="container mx-auto p-2 sm:p-4 lg:p-8 h-screen flex flex-col">
        <div className="h-full max-w-6xl mx-auto w-full flex flex-col">
          {/* Tab Navigation */}
          <div className="flex space-x-2 mb-4 sm:mb-6 shrink-0">
            <Button
              variant={activeTab === 'training' ? 'default' : 'outline'}
              onClick={() => setActiveTab('training')}
              className="flex items-center space-x-1 sm:space-x-2 flex-1 sm:flex-none"
              size={isMobile ? "sm" : "default"}
            >
              <Brain className="w-4 h-4" />
              <span className="text-xs sm:text-sm">Train Model</span>
            </Button>
            <Button
              variant={activeTab === 'chat' ? 'default' : 'outline'}
              onClick={() => setActiveTab('chat')}
              className="flex items-center space-x-1 sm:space-x-2 flex-1 sm:flex-none"
              size={isMobile ? "sm" : "default"}
            >
              <MessageSquare className="w-4 h-4" />
              <span className="text-xs sm:text-sm">Chat Interface</span>
            </Button>
          </div>

          {/* Content */}
          <div className="flex-1 min-h-0">
            {activeTab === 'training' ? (
              <div className="h-full">
                <div className="max-w-4xl mx-auto h-full">
                  <TrainingPanel />
                </div>
              </div>
            ) : (
              <div className="h-full">
                <ChatInterface />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
