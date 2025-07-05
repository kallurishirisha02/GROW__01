import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Building2 } from 'lucide-react';

interface BusinessFormProps {
  onSubmit: (data: { name: string; location: string }) => void;
  isLoading: boolean;
}

export function BusinessForm({ onSubmit, isLoading }: BusinessFormProps) {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [errors, setErrors] = useState<{ name?: string; location?: string }>({});

  const validateForm = () => {
    const newErrors: { name?: string; location?: string } = {};
    
    if (!name.trim()) {
      newErrors.name = 'Business name is required';
    }
    
    if (!location.trim()) {
      newErrors.location = 'Location is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit({ name: name.trim(), location: location.trim() });
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto border-border/50 bg-gradient-to-br from-card to-card/80 backdrop-blur-sm">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-success bg-clip-text text-transparent">
          Business Analysis
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          Enter your business details to get instant insights
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium flex items-center gap-2">
              <Building2 className="w-4 h-4" />
              Business Name
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Joe's Pizza"
              className={`transition-colors ${errors.name ? 'border-destructive' : ''}`}
              disabled={isLoading}
            />
            {errors.name && (
              <p className="text-xs text-destructive">{errors.name}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="location" className="text-sm font-medium flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Location
            </Label>
            <Input
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g., New York, NY"
              className={`transition-colors ${errors.location ? 'border-destructive' : ''}`}
              disabled={isLoading}
            />
            {errors.location && (
              <p className="text-xs text-destructive">{errors.location}</p>
            )}
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-primary to-success hover:from-primary/90 hover:to-success/90 transition-all duration-300"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Analyzing...
              </div>
            ) : (
              'Analyze Business'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}