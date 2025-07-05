import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, MessageSquare, Sparkles, RefreshCw } from 'lucide-react';

interface BusinessData {
  name: string;
  location: string;
  rating: number;
  reviews: number;
  headline: string;
}

interface BusinessResultsProps {
  data: BusinessData;
  onRegenerateHeadline: () => void;
  isRegenerating: boolean;
}

export function BusinessResults({ data, onRegenerateHeadline, isRegenerating }: BusinessResultsProps) {
  const getStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const stars = [];
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="w-4 h-4 fill-warning text-warning" />);
    }
    
    if (hasHalfStar) {
      stars.push(<Star key="half" className="w-4 h-4 fill-warning/50 text-warning" />);
    }
    
    const remainingStars = 5 - stars.length;
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-4 h-4 text-muted-foreground" />);
    }
    
    return stars;
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      {/* Results Header */}
      <Card className="border-border/50 bg-gradient-to-br from-card to-card/80 backdrop-blur-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-xl font-bold text-foreground">
            {data.name}
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            {data.location}
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Rating and Reviews */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="border-border/50 bg-gradient-to-br from-card to-card/80 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Google Rating</p>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-foreground">{data.rating}</span>
                  <div className="flex items-center gap-1">
                    {getStars(data.rating)}
                  </div>
                </div>
              </div>
              <Badge variant="secondary" className="bg-success/20 text-success border-success/30">
                Excellent
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-gradient-to-br from-card to-card/80 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Reviews</p>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-foreground">{data.reviews}</span>
                  <MessageSquare className="w-5 h-5 text-info" />
                </div>
              </div>
              <Badge variant="outline" className="border-info/30 text-info">
                Verified
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* SEO Headline */}
      <Card className="border-border/50 bg-gradient-to-br from-card to-card/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Sparkles className="w-5 h-5 text-primary" />
            AI-Generated SEO Headline
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
            <p className="text-lg font-medium text-foreground leading-relaxed">
              {data.headline}
            </p>
          </div>
          
          <Button 
            onClick={onRegenerateHeadline}
            variant="outline"
            className="w-full border-primary/30 hover:bg-primary/10 transition-all duration-300"
            disabled={isRegenerating}
          >
            {isRegenerating ? (
              <div className="flex items-center gap-2">
                <RefreshCw className="w-4 h-4 animate-spin" />
                Generating...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <RefreshCw className="w-4 h-4" />
                Regenerate Headline
              </div>
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}