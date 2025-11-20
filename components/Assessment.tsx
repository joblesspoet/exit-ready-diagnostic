import React, { useState, useEffect } from 'react';
import { Question, AssessmentState, AssessmentResult, MaturityTier } from '../types';
import { QUESTIONS } from '../constants';
import { Button } from './ui/Button';
import { Card, CardContent } from './ui/Card';
import { ProgressBar } from './ui/ProgressBar';
import { ChevronRight, ChevronLeft, CheckCircle } from 'lucide-react';

interface AssessmentProps {
  onComplete: (result: AssessmentResult) => void;
}

export const Assessment: React.FC<AssessmentProps> = ({ onComplete }) => {
  const [state, setState] = useState<AssessmentState>({
    answers: {},
    currentQuestionIndex: 0,
    isComplete: false,
    completedAt: null
  });

  const currentQuestion = QUESTIONS[state.currentQuestionIndex];
  const progress = ((state.currentQuestionIndex) / QUESTIONS.length) * 100;

  const handleAnswer = (value: number) => {
    const newAnswers = { ...state.answers, [currentQuestion.id]: value };
    
    if (state.currentQuestionIndex < QUESTIONS.length - 1) {
      setState(prev => ({
        ...prev,
        answers: newAnswers,
        currentQuestionIndex: prev.currentQuestionIndex + 1
      }));
    } else {
      // Calculate results immediately
      const result = calculateResults(newAnswers);
      setState(prev => ({
        ...prev,
        answers: newAnswers,
        isComplete: true,
        completedAt: new Date().toISOString()
      }));
      onComplete(result);
    }
  };

  const calculateResults = (answers: Record<string, number>): AssessmentResult => {
    let totalWeightedScore = 0;
    let totalPossibleWeight = 0;
    const categoryScoresRaw: Record<string, { scored: number; possible: number }> = {};

    QUESTIONS.forEach(q => {
      const answerValue = answers[q.id] || 0;
      const weightedValue = answerValue * q.weight;
      const maxWeightedValue = 10 * q.weight;

      totalWeightedScore += weightedValue;
      totalPossibleWeight += maxWeightedValue;

      if (!categoryScoresRaw[q.category]) {
        categoryScoresRaw[q.category] = { scored: 0, possible: 0 };
      }
      categoryScoresRaw[q.category].scored += weightedValue;
      categoryScoresRaw[q.category].possible += maxWeightedValue;
    });

    const finalScore = totalPossibleWeight > 0 ? (totalWeightedScore / totalPossibleWeight) * 100 : 0;
    
    const categoryScores: Record<string, number> = {};
    Object.keys(categoryScoresRaw).forEach(cat => {
      const data = categoryScoresRaw[cat];
      categoryScores[cat] = data.possible > 0 ? (data.scored / data.possible) * 100 : 0;
    });

    let tier = MaturityTier.BEGINNER;
    if (finalScore >= 80) tier = MaturityTier.ADVANCED;
    else if (finalScore >= 60) tier = MaturityTier.PROFICIENT;
    else if (finalScore >= 40) tier = MaturityTier.DEVELOPING;

    return {
      totalScore: finalScore,
      categoryScores,
      tier,
      timestamp: new Date().toISOString()
    };
  };

  const handleBack = () => {
    if (state.currentQuestionIndex > 0) {
      setState(prev => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex - 1
      }));
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium text-neutral-500">
          Question {state.currentQuestionIndex + 1} of {QUESTIONS.length}
        </span>
        <span className="text-sm font-medium text-primary-600">
          {Math.round(progress)}% Complete
        </span>
      </div>
      
      <ProgressBar value={state.currentQuestionIndex} max={QUESTIONS.length} className="mb-8" />

      <Card className="min-h-[400px] flex flex-col justify-between">
        <CardContent className="p-8">
          <div className="mb-6">
            <span className="inline-block px-3 py-1 rounded-full bg-primary-100 text-primary-700 text-xs font-bold uppercase tracking-wide mb-3">
              {currentQuestion.category}
            </span>
            <h2 className="text-2xl font-semibold text-neutral-900 leading-relaxed">
              {currentQuestion.text}
            </h2>
          </div>

          <div className="space-y-3">
            {currentQuestion.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(option.value)}
                className={`
                  w-full text-left p-4 rounded-lg border transition-all duration-200
                  ${state.answers[currentQuestion.id] === option.value 
                    ? 'border-primary-500 bg-primary-50 text-primary-900 ring-1 ring-primary-500' 
                    : 'border-neutral-200 hover:border-primary-300 hover:bg-neutral-50 text-neutral-700'
                  }
                `}
              >
                <div className="flex items-center">
                  <div className={`
                    w-5 h-5 rounded-full border flex items-center justify-center mr-3
                    ${state.answers[currentQuestion.id] === option.value ? 'border-primary-600 bg-primary-600' : 'border-neutral-300'}
                  `}>
                    {state.answers[currentQuestion.id] === option.value && <div className="w-2 h-2 bg-white rounded-full" />}
                  </div>
                  <span className="text-base">{option.label}</span>
                </div>
              </button>
            ))}
          </div>
        </CardContent>
        
        <div className="p-6 border-t border-neutral-100 flex justify-between items-center bg-neutral-50/50 rounded-b-xl">
           <Button 
            variant="ghost" 
            onClick={handleBack} 
            disabled={state.currentQuestionIndex === 0}
            className="text-neutral-500"
          >
            <ChevronLeft className="mr-1 h-4 w-4" /> Previous
          </Button>
           {/* Next is handled by selection, but could add skip logic if needed */}
        </div>
      </Card>
    </div>
  );
};
