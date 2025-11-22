import React, { useState } from 'react';
import type { Question, UserPreferences } from '../../../types/duvet.types';
import { QuestionStep } from '../../organisms/QuestionStep';
import questionsData from '../../../data/questions.json';
import './QuestionnaireFlow.css';

export interface QuestionnaireFlowProps {
  onComplete: (preferences: UserPreferences) => void;
}

export const QuestionnaireFlow: React.FC<QuestionnaireFlowProps> = ({ onComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [preferences, setPreferences] = useState<UserPreferences>({});

  const questions = questionsData as Question[];
  const currentQuestion = questions[currentQuestionIndex];

  const handleSelect = (value: string) => {
    const key = currentQuestion.preferenceKey;
    let processedValue: any = value;

    // Convert string values to appropriate types
    if (value === 'yes' || value === 'no') {
      processedValue = value === 'yes';
    }

    setPreferences((prev) => ({
      ...prev,
      [key]: processedValue,
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      onComplete(preferences);
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const getCurrentValue = (): string | undefined => {
    const value = preferences[currentQuestion.preferenceKey];
    if (typeof value === 'boolean') {
      return value ? 'yes' : 'no';
    }
    return value as string | undefined;
  };

  return (
    <div className="questionnaire-flow">
      <QuestionStep
        question={currentQuestion}
        selectedValue={getCurrentValue()}
        onSelect={handleSelect}
        onNext={handleNext}
        onBack={currentQuestionIndex > 0 ? handleBack : undefined}
        currentStep={currentQuestionIndex + 1}
        totalSteps={questions.length}
        isLastStep={currentQuestionIndex === questions.length - 1}
      />
    </div>
  );
};
