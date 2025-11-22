import React from 'react';
import { Card } from '../../atoms/Card';
import './QuestionOption.css';

export interface QuestionOptionProps {
  label: string;
  description?: string;
  selected: boolean;
  onClick: () => void;
}

export const QuestionOption: React.FC<QuestionOptionProps> = ({
  label,
  description,
  selected,
  onClick,
}) => {
  return (
    <Card
      clickable
      onClick={onClick}
      className={`question-option ${selected ? 'question-option--selected' : ''}`}
    >
      <div className="question-option__content">
        <h3 className="question-option__label">{label}</h3>
        {description && <p className="question-option__description">{description}</p>}
      </div>
      <div className="question-option__indicator">
        {selected && <span className="question-option__check">✓</span>}
      </div>
    </Card>
  );
};
