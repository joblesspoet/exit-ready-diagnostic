import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Shield, ArrowRight } from 'lucide-react';

interface CallsignAuthProps {
  onLogin: (callsign: string) => void;
}

export const CallsignAuth: React.FC<CallsignAuthProps> = ({ onLogin }) => {
  const [callsign, setCallsign] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (callsign.length < 3) {
      setError('Callsign must be at least 3 characters.');
      return;
    }
    if (!/^[a-zA-Z0-9-_]+$/.test(callsign)) {
      setError('Only letters, numbers, dashes, and underscores allowed.');
      return;
    }
    onLogin(callsign);
  };

  return (
    <div className="max-w-md mx-auto mt-10 md:mt-20">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary-100 text-primary-600 mb-4">
          <Shield className="h-8 w-8" />
        </div>
        <h2 className="text-3xl font-bold text-neutral-900">Anonymous Identity</h2>
        <p className="mt-2 text-neutral-600">
          We don't ask for your name or email. Create a unique CallSign to track your progress securely.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Enter Your CallSign</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              placeholder="e.g. Maverick-2024, Alpha-Venture"
              value={callsign}
              onChange={(e) => {
                setCallsign(e.target.value);
                setError('');
              }}
              error={error}
              autoFocus
            />
            <div className="text-xs text-neutral-500 bg-neutral-50 p-3 rounded-md">
              <strong>Tip:</strong> Remember this CallSign. It is the only key to access your historical data.
            </div>
            <Button type="submit" className="w-full" size="lg">
              Start Assessment <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
