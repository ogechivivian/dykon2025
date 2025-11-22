import React from 'react';
import type { Duvet, DuvetVariant } from '../../../types/duvet.types';
import { Badge } from '../../atoms/Badge';
import { Button } from '../../atoms/Button';
import './DuvetComparison.css';

export interface DuvetComparisonProps {
  duvet1: Duvet;
  variant1: DuvetVariant;
  duvet2: Duvet;
  variant2: DuvetVariant;
  onClose: () => void;
}

export const DuvetComparison: React.FC<DuvetComparisonProps> = ({
  duvet1,
  variant1,
  duvet2,
  variant2,
  onClose
}) => {
  const getInsulationLabel = (insulation: string): string => {
    const labels: Record<string, string> = {
      'Sval': 'Kølig',
      'Normal': 'Normal',
      'Varm': 'Varm',
      'Ekstra varm': 'Ekstra varm'
    };
    return labels[insulation] || insulation;
  };

  const compareField = (
    label: string,
    value1: string | number,
    value2: string | number,
    isDifferent: boolean
  ) => (
    <div className="comparison__row">
      <div className={`comparison__cell ${isDifferent ? 'comparison__cell--different' : ''}`}>
        {value1}
      </div>
      <div className="comparison__label">{label}</div>
      <div className={`comparison__cell ${isDifferent ? 'comparison__cell--different' : ''}`}>
        {value2}
      </div>
    </div>
  );

  const priceDiff = variant1.price !== variant2.price;
  const typeDiff = variant1.type !== variant2.type;
  const insulationDiff = variant1.insulation !== variant2.insulation;
  const sizeDiff = variant1.width !== variant2.width || variant1.length !== variant2.length;
  const allergyDiff = duvet1.allergyFriendly !== duvet2.allergyFriendly;
  const qualityDiff = duvet1.quality !== duvet2.quality;
  const ratingDiff = duvet1.rating !== duvet2.rating;

  const differences = [];
  if (priceDiff) differences.push(`Prisforskel på ${Math.abs(variant1.price - variant2.price)} DKK`);
  if (typeDiff) differences.push('Forskellige typer');
  if (insulationDiff) differences.push('Forskellige varmeniveauer');
  if (allergyDiff) differences.push('Forskellig allergivenlighed');

  return (
    <div className="duvet-comparison">
      <div className="comparison__header">
        <h2 className="comparison__title">Sammenlign dyner</h2>
        <Button onClick={onClose} variant="outline" ariaLabel="Luk sammenligning">
          Luk
        </Button>
      </div>

      <div className="comparison__summary">
        <p>
          <strong>Hovedforskelle:</strong>{' '}
          {differences.length > 0 ? differences.join(', ') : 'Disse dyner er meget ens'}
        </p>
      </div>

      <div className="comparison__grid">
        <div className="comparison__column">
          <h3 className="comparison__product-name">{duvet1.brand} {duvet1.name}</h3>
        </div>
        <div className="comparison__column comparison__column--center">
          <h3 className="comparison__section-title">Egenskaber</h3>
        </div>
        <div className="comparison__column">
          <h3 className="comparison__product-name">{duvet2.brand} {duvet2.name}</h3>
        </div>
      </div>

      <div className="comparison__details">
        {compareField('Pris', `${variant1.price} DKK`, `${variant2.price} DKK`, priceDiff)}
        {compareField('Type', variant1.type, variant2.type, typeDiff)}
        {compareField(
          'Varme',
          getInsulationLabel(variant1.insulation),
          getInsulationLabel(variant2.insulation),
          insulationDiff
        )}
        {compareField(
          'Størrelse',
          `${variant1.width}x${variant1.length} cm`,
          `${variant2.width}x${variant2.length} cm`,
          sizeDiff
        )}
        {compareField(
          'Allergivenlig',
          duvet1.allergyFriendly ? 'Ja' : 'Nej',
          duvet2.allergyFriendly ? 'Ja' : 'Nej',
          allergyDiff
        )}
        {compareField('Kvalitet', duvet1.quality, duvet2.quality, qualityDiff)}
        {compareField(
          'Bedømmelse',
          `${duvet1.rating}/5`,
          `${duvet2.rating}/5`,
          ratingDiff
        )}
        {compareField('Garanti', `${duvet1.years_warranty} år`, `${duvet2.years_warranty} år`, duvet1.years_warranty !== duvet2.years_warranty)}
      </div>

      <div className="comparison__sustainability">
        <div className="comparison__sustainability-column">
          <h4>Egenskaber & Certificeringer</h4>
          {duvet1.properties.map((prop, index) => (
            <Badge key={index} variant="info">
              {prop}
            </Badge>
          ))}
          {duvet1.certifications.map((cert, index) => (
            <Badge key={`cert-${index}`} variant="neutral">
              {cert}
            </Badge>
          ))}
        </div>
        <div className="comparison__sustainability-column">
          <h4>Egenskaber & Certificeringer</h4>
          {duvet2.properties.map((prop, index) => (
            <Badge key={index} variant="info">
              {prop}
            </Badge>
          ))}
          {duvet2.certifications.map((cert, index) => (
            <Badge key={`cert-${index}`} variant="neutral">
              {cert}
            </Badge>
          ))}
        </div>
      </div>

      <div className="comparison__fillings">
        <div className="comparison__filling-column">
          <h4>Fyld</h4>
          <p>{duvet1.fillings}</p>
        </div>
        <div className="comparison__filling-column">
          <h4>Fyld</h4>
          <p>{duvet2.fillings}</p>
        </div>
      </div>
    </div>
  );
};
