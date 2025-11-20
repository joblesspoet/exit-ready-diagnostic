import React, { useEffect, useState, useCallback } from 'react';
import { AssessmentResult, MaturityTier } from '../types';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { Button } from './ui/Button';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { RefreshCw, Download, Award, Sparkles, AlertTriangle } from 'lucide-react';
import { generateInsights } from '../services/geminiService';

interface DashboardProps {
  result: AssessmentResult;
  onRetake: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ result, onRetake }) => {
  const [insights, setInsights] = useState<string | null>(null);
  const [loadingInsights, setLoadingInsights] = useState(false);

  const fetchInsights = useCallback(async () => {
    setLoadingInsights(true);
    const text = await generateInsights(result);
    setInsights(text);
    setLoadingInsights(false);
  }, [result]);

  useEffect(() => {
    fetchInsights();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const chartData = (Object.entries(result.categoryScores) as [string, number][]).map(([category, score]) => ({
    subject: category,
    A: score,
    fullMark: 100,
  }));

  const getTierColor = (tier: MaturityTier) => {
    switch (tier) {
      case MaturityTier.ADVANCED: return 'text-green-600 bg-green-50 border-green-200';
      case MaturityTier.PROFICIENT: return 'text-blue-600 bg-blue-50 border-blue-200';
      case MaturityTier.DEVELOPING: return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case MaturityTier.BEGINNER: return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-neutral-600';
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Header Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2 bg-gradient-to-br from-primary-900 to-neutral-900 text-white border-none shadow-xl">
          <CardContent className="p-8 flex flex-col justify-between h-full">
            <div>
              <h2 className="text-neutral-300 text-sm font-medium uppercase tracking-wider mb-1">Overall Exit Readiness</h2>
              <div className="flex items-baseline">
                <span className="text-5xl font-bold tracking-tight">{Math.round(result.totalScore)}</span>
                <span className="text-2xl text-neutral-400 font-light ml-2">/ 100</span>
              </div>
            </div>
            
            <div className="mt-8">
               <div className={`inline-flex items-center px-4 py-2 rounded-lg border ${getTierColor(result.tier)} bg-opacity-10 bg-white backdrop-blur-sm border-white/20 text-white`}>
                  <Award className="mr-2 h-5 w-5" />
                  <span className="font-semibold">{result.tier} Maturity</span>
               </div>
               <p className="mt-4 text-neutral-300 text-sm max-w-lg leading-relaxed">
                 Your score indicates a {result.tier.toLowerCase()} level of exit preparedness. 
                 {result.tier === MaturityTier.ADVANCED ? " You are well-positioned for a premium exit." : " Focus on the highlighted improvement areas to maximize value."}
               </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
             <CardTitle className="text-sm uppercase text-neutral-500">Readiness Profile</CardTitle>
          </CardHeader>
          <CardContent className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
                <PolarGrid stroke="#e5e5e5" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#6b7280', fontSize: 12 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar
                  name="Readiness"
                  dataKey="A"
                  stroke="#0ea5e9"
                  strokeWidth={2}
                  fill="#0ea5e9"
                  fillOpacity={0.3}
                />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* AI Insights Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
           <Card className="border-primary-100 shadow-md">
             <CardHeader className="bg-gradient-to-r from-primary-50 to-white border-b border-primary-100">
               <div className="flex items-center justify-between">
                 <div className="flex items-center space-x-2">
                    <Sparkles className="h-5 w-5 text-primary-600" />
                    <CardTitle>AI Strategic Insights</CardTitle>
                 </div>
                 {loadingInsights && <span className="text-xs text-primary-500 animate-pulse">Analyzing data...</span>}
               </div>
             </CardHeader>
             <CardContent className="prose prose-blue max-w-none p-6 text-neutral-700">
               {loadingInsights ? (
                 <div className="space-y-4">
                   <div className="h-4 bg-neutral-100 rounded w-3/4 animate-pulse"></div>
                   <div className="h-4 bg-neutral-100 rounded w-full animate-pulse"></div>
                   <div className="h-4 bg-neutral-100 rounded w-5/6 animate-pulse"></div>
                 </div>
               ) : (
                 <div dangerouslySetInnerHTML={{ __html: insights || '' }} />
               )}
               {!loadingInsights && !insights && (
                 <div className="flex flex-col items-center justify-center py-8 text-neutral-500">
                    <AlertTriangle className="h-8 w-8 mb-2 opacity-50" />
                    <p>Could not generate insights. Check API configuration.</p>
                    <Button variant="outline" size="sm" onClick={fetchInsights} className="mt-4">Retry</Button>
                 </div>
               )}
             </CardContent>
           </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm uppercase text-neutral-500">Category Breakdown</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {(Object.entries(result.categoryScores) as [string, number][]).map(([cat, score]) => (
                <div key={cat}>
                  <div className="flex justify-between mb-2 text-sm">
                    <span className="font-medium text-neutral-700">{cat}</span>
                    <span className="font-bold text-neutral-900">{Math.round(score)}%</span>
                  </div>
                  <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${score > 75 ? 'bg-green-500' : score > 50 ? 'bg-yellow-500' : 'bg-red-500'}`} 
                      style={{ width: `${score}%` }}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardContent className="space-y-3">
               <Button onClick={onRetake} variant="outline" className="w-full">
                 <RefreshCw className="mr-2 h-4 w-4" /> Retake Assessment
               </Button>
               <Button variant="secondary" className="w-full">
                 <Download className="mr-2 h-4 w-4" /> Export Report (PDF)
               </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};