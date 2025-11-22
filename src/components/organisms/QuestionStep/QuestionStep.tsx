import React from 'react';
import type { Question } from '../../../types/duvet.types';
import { QuestionOption } from '../../molecules/QuestionOption';
import { Button } from '../../atoms/Button';
import './QuestionStep.css';

export interface QuestionStepProps {
  question: Question;
  selectedValue: string | undefined;
  onSelect: (value: string) => void;
  onNext: () => void;
  onBack?: () => void;
  currentStep: number;
  totalSteps: number;
  isLastStep: boolean;
}

export const QuestionStep: React.FC<QuestionStepProps> = ({
  question,
  selectedValue,
  onSelect,
  onNext,
  onBack,
  currentStep,
  totalSteps,
  isLastStep,
}) => {
  return (
    <div className="question-step">
      <div className="question-step__progress">
        <div className="question-step__progress-bar">
          <div
            className="question-step__progress-fill"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            role="progressbar"
            aria-valuenow={currentStep}
            aria-valuemin={1}
            aria-valuemax={totalSteps}
            aria-label={`Question ${currentStep} of ${totalSteps}`}
          />
        </div>
        <p className="question-step__progress-text">
          Question {currentStep} of {totalSteps}
        </p>
      </div>

      <h2 className="question-step__title">{question.text}</h2>

      <div className="question-step__options" role="radiogroup" aria-label={question.text}>
        {question.options.map((option) => (
          <QuestionOption
            key={option.value}
            label={option.label}
            description={option.description}
            selected={selectedValue === option.value}
            onClick={() => onSelect(option.value)}
          />
        ))}
      </div>

      <div className="question-step__actions">
        {onBack && (
          <Button onClick={onBack} variant="secondary">
            Back
          </Button>
        )}
        <Button onClick={onNext} disabled={!selectedValue}>
          {isLastStep ? 'See Results' : 'Next'}
        </Button>
      </div>
    </div>
  );
};
