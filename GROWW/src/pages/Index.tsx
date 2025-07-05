import { useState } from 'react';
import { BusinessForm } from '@/components/BusinessForm';
import { BusinessResults } from '@/components/BusinessResults';
import { mockAPI } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';
import { TrendingUp, Sparkles } from 'lucide-react';

interface BusinessData {
  name: string;
  location: string;
  rating: number;
  reviews: number;
  headline: string;
}

const Index = () => {
  const [businessData, setBusinessData] = useState<BusinessData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (formData: { name: string; location: string }) => {
    setIsLoading(true);
    try {
      const result = await mockAPI.submitBusinessData(formData);
      setBusinessData(result);
      toast({
        title: "Analysis Complete!",
        description: `Generated insights for ${result.name}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to analyze business data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegenerateHeadline = async () => {
    if (!businessData) return;
    
    setIsRegenerating(true);
    try {
      const newHeadline = await mockAPI.regenerateHeadline(
        businessData.name,
        businessData.location,
        businessData.rating,
        businessData.reviews
      );
      setBusinessData({ ...businessData, headline: newHeadline });
      toast({
        title: "Headline Updated!",
        description: "New SEO headline generated successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to regenerate headline. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsRegenerating(false);
    }
  };

  const resetForm = () => {
    setBusinessData(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/90">
      {/* Header */}
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="p-2 rounded-lg bg-primary/20 border border-primary/30">
              <TrendingUp className="w-6 h-6 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-success to-primary bg-clip-text text-transparent">
              GrowthPro
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Transform your local business insights with AI-powered analytics and SEO optimization
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          {!businessData ? (
            <BusinessForm onSubmit={handleSubmit} isLoading={isLoading} />
          ) : (
            <div className="space-y-6">
              <BusinessResults
                data={businessData}
                onRegenerateHeadline={handleRegenerateHeadline}
                isRegenerating={isRegenerating}
              />
              
              {/* New Analysis Button */}
              <div className="text-center">
                <button
                  onClick={resetForm}
                  className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors border border-border rounded-lg hover:bg-accent/50"
                >
                  <Sparkles className="w-4 h-4" />
                  Analyze Another Business
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-16 pt-8 border-t border-border/50">
          <p className="text-sm text-muted-foreground">
            Built with React + Express • Mock data simulation active
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
