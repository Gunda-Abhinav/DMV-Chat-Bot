import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, AlertCircle, Brain, Zap, Shield, Database } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/components/ui/use-toast';
import { AIService } from '@/services/AIService';
import { useIsMobile } from '@/hooks/use-mobile';

export const TrainingPanel = () => {
  const [isTraining, setIsTraining] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const { toast } = useToast();
  const isMobile = useIsMobile();

  const handleStartTraining = async () => {
    setIsTraining(true);
    setProgress(0);
    setIsComplete(false);

    try {
      setCurrentStep('Initializing AI models...');
      setProgress(20);

      await AIService.initialize();
      
      setCurrentStep('Loading comprehensive DMV data...');
      setProgress(40);

      setCurrentStep('Processing documents and legal procedures...');
      setProgress(60);

      setCurrentStep('Generating embeddings for better search...');
      setProgress(80);

      await AIService.trainModel();
      
      setCurrentStep('Training complete!');
      setProgress(100);
      setIsComplete(true);

      toast({
        title: "Training Complete!",
        description: "The DMV chatbot is now ready with comprehensive California DMV knowledge.",
      });

    } catch (error) {
      console.error('Training failed:', error);
      toast({
        title: "Training Failed",
        description: "There was an error during training. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsTraining(false);
    }
  };

  return (
    <ScrollArea className="h-full">
      <div className="p-4 lg:p-8 max-w-6xl mx-auto space-y-6 lg:space-y-8">
        {/* Safe Training Notice */}
        <Card className="border-amber-200 bg-amber-50 dark:bg-amber-950/20 dark:border-amber-800 shadow-lg">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-amber-100 dark:bg-amber-900/50">
                <Shield className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              </div>
              <div>
                <h3 className="font-semibold text-amber-800 dark:text-amber-200 text-lg">Safe Training Mode</h3>
                <p className="text-amber-700 dark:text-amber-300 mt-1">
                  Training uses sample data only. No personal information is processed or stored.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Training Card */}
        <Card className="bg-gradient-to-br from-card to-accent/5 border-2 border-primary/10 shadow-xl">
          <CardHeader className="text-center p-8">
            <div className="mx-auto w-20 h-20 bg-gradient-to-br from-primary to-primary-glow rounded-full flex items-center justify-center mb-6 shadow-lg">
              <Brain className="w-10 h-10 text-white" />
            </div>
            <CardTitle className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              DMV Knowledge Base Training
            </CardTitle>
            <p className="text-muted-foreground text-lg mt-4 max-w-2xl mx-auto">
              Train the AI model with comprehensive California DMV data for intelligent assistance
            </p>
          </CardHeader>

          <CardContent className="space-y-8 p-8">
            {!isTraining && !isComplete && (
              <div className="text-center space-y-6">
                <Button 
                  onClick={handleStartTraining}
                  size="lg"
                  className="px-12 py-4 text-lg bg-gradient-to-r from-primary to-primary-glow hover:shadow-xl transition-all duration-300 shadow-lg"
                >
                  <Zap className="w-6 h-6 mr-3" />
                  Start Training
                </Button>
                <p className="text-muted-foreground max-w-lg mx-auto">
                  This will initialize the AI model and train it with comprehensive DMV procedures, requirements, and legal information
                </p>
              </div>
            )}

            {isTraining && (
              <div className="space-y-6 max-w-2xl mx-auto">
                <div className="text-center">
                  <div className="inline-flex items-center space-x-3 text-primary font-medium text-lg">
                    <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
                    <span>Training in Progress...</span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between text-lg">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-mono font-bold">{progress}%</span>
                  </div>
                  <Progress value={progress} className="h-4" />
                </div>
                
                {currentStep && (
                  <div className="text-center bg-muted/30 rounded-lg p-4">
                    <p className="text-muted-foreground text-lg">{currentStep}</p>
                  </div>
                )}
              </div>
            )}

            {isComplete && (
              <div className="text-center space-y-6">
                <div className="mx-auto w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-12 h-12 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-green-700 dark:text-green-300 mb-4">
                    Training Complete!
                  </h3>
                  <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                    The AI model has been successfully trained with DMV data and is ready to assist users with comprehensive information.
                  </p>
                </div>
                <Button 
                  onClick={() => {
                    setIsComplete(false);
                    setProgress(0);
                    setCurrentStep('');
                  }}
                  variant="outline"
                  className="mt-6"
                  size="lg"
                >
                  Train Again
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Information Section */}
        <div className="grid lg:grid-cols-2 gap-8">
          <Card className="bg-card/50 backdrop-blur-sm border-2 border-border/50 shadow-lg">
            <CardHeader className="p-6">
              <CardTitle className="flex items-center space-x-3 text-xl">
                <Database className="w-6 h-6 text-primary" />
                <span>Training Data Sources</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 p-6">
              <div className="space-y-3">
                <h4 className="font-semibold text-foreground text-lg">Sample Data Used:</h4>
                <ul className="text-muted-foreground space-y-2 text-base">
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>Driver license procedures</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>Vehicle registration processes</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>DMV appointment scheduling</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>Legal procedures and requirements</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>Fee structures and payment methods</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur-sm border-2 border-border/50 shadow-lg">
            <CardHeader className="p-6">
              <CardTitle className="flex items-center space-x-3 text-xl">
                <Shield className="w-6 h-6 text-primary" />
                <span>Safety & Security</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 p-6">
              <div className="space-y-3">
                <h4 className="font-semibold text-foreground text-lg">Safety Approach:</h4>
                <ul className="text-muted-foreground space-y-2 text-base">
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>No personal data collection</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Simulated training environment</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Official DMV data sources only</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Secure processing protocols</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Privacy-first implementation</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-dashed border-2 border-amber-300 bg-amber-50/50 dark:bg-amber-950/20 max-w-4xl mx-auto">
          <CardContent className="p-8">
            <div className="flex items-start space-x-4">
              <AlertCircle className="w-8 h-8 text-amber-500 shrink-0 mt-1" />
              <div>
                <p className="text-lg font-medium text-foreground mb-2">Important Disclaimer</p>
                <p className="text-muted-foreground text-base leading-relaxed">
                  This chatbot uses sample data for demonstration purposes. For official DMV transactions, 
                  please visit the official California DMV website or contact your local DMV office.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </ScrollArea>
  );
};