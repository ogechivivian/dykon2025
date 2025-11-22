import React, { useState } from 'react';
import type { RecommendationReason } from '../../../types/duvet.types';
import { DuvetCard } from '../../molecules/DuvetCard';
import { Button } from '../../atoms/Button';
import { DuvetComparison } from '../../organisms/DuvetComparison';
import './ResultsTemplate.css';

export interface ResultsTemplateProps {
  recommendations: RecommendationReason[];
  onRestart: () => void;
}

export const ResultsTemplate: React.FC<ResultsTemplateProps> = ({
  recommendations,
  onRestart,
}) => {
  const [selectedForComparison, setSelectedForComparison] = useState<string[]>([]);
  const [showComparison, setShowComparison] = useState(false);

  const toggleComparison = (duvetId: string) => {
    setSelectedForComparison((prev) => {
      if (prev.includes(duvetId)) {
        return prev.filter((id) => id !== duvetId);
      } else {
        if (prev.length >= 2) {
          return [prev[1], duvetId];
        }
        return [...prev, duvetId];
      }
    });
  };

  const handleCompare = () => {
    if (selectedForComparison.length === 2) {
      setShowComparison(true);
    }
  };

  const getComparisonData = () => {
    if (selectedForComparison.length !== 2) return null;

    const rec1 = recommendations.find((r) => r.duvet.id === selectedForComparison[0]);
    const rec2 = recommendations.find((r) => r.duvet.id === selectedForComparison[1]);

    if (rec1 && rec2) {
      return {
        duvet1: rec1.duvet,
        variant1: rec1.variant,
        duvet2: rec2.duvet,
        variant2: rec2.variant,
      };
    }
    return null;
  };

  const comparisonData = getComparisonData();

  if (showComparison && comparisonData) {
    return (
      <DuvetComparison
        duvet1={comparisonData.duvet1}
        variant1={comparisonData.variant1}
        duvet2={comparisonData.duvet2}
        variant2={comparisonData.variant2}
        onClose={() => setShowComparison(false)}
      />
    );
  }

  return (
    <div className="results-template">
      <div className="results-template__header">
        <h1 className="results-template__title">Dine dyneudvalg</h1>
        <p className="results-template__subtitle">
          Vi fandt {recommendations.length} dyne{recommendations.length !== 1 ? 'r' : ''} der matcher
          dine præferencer. Vælg op til 2 dyner for at sammenligne dem side om side.
        </p>
        <Button onClick={onRestart} variant="outline">
          Start forfra
        </Button>
      </div>

      {selectedForComparison.length > 0 && (
        <div className="results-template__comparison-bar">
          <p>
            {selectedForComparison.length} dyne{selectedForComparison.length !== 1 ? 'r' : ''}{' '}
            valgt til sammenligning
          </p>
          {selectedForComparison.length === 2 && (
            <Button onClick={handleCompare}>Sammenlign nu</Button>
          )}
        </div>
      )}

      <div className="results-template__grid">
        {recommendations.map((recommendation, index) => (
          <div key={recommendation.duvet.id} className="results-template__card">
            {index === 0 && (
              <div className="results-template__best-match">
                <span>Bedste match</span>
              </div>
            )}
            <DuvetCard
              duvet={recommendation.duvet}
              variant={recommendation.variant}
              showCompareButton
              isSelected={selectedForComparison.includes(recommendation.duvet.id)}
              onCompare={() => toggleComparison(recommendation.duvet.id)}
            />
            {recommendation.reasons.length > 0 && (
              <div className="results-template__reasons">
                <h4>Derfor anbefaler vi denne:</h4>
                <ul>
                  {recommendation.reasons.map((reason, idx) => (
                    <li key={idx}>{reason}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
