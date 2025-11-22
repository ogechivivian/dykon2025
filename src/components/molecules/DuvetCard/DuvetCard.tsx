import React from 'react';
import type { Duvet, DuvetVariant } from '../../../types/duvet.types';
import { Card } from '../../atoms/Card';
import { Badge } from '../../atoms/Badge';
import { Button } from '../../atoms/Button';
import './DuvetCard.css';

export interface DuvetCardProps {
  duvet: Duvet;
  variant: DuvetVariant;
  onSelect?: () => void;
  onCompare?: () => void;
  showCompareButton?: boolean;
  isSelected?: boolean;
}

export const DuvetCard: React.FC<DuvetCardProps> = ({
  duvet,
  variant,
  onSelect,
  onCompare,
  showCompareButton = false,
  isSelected = false,
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

  const getTypeLabel = (type: string): string => {
    return type; // Keep Danish names: Sommerdyne, Dyne, Vinterdyne
  };

  const imageUrl = duvet.images && duvet.images.length > 0
    ? duvet.images[0]
    : '/images/placeholder.svg';

  return (
    <Card elevated className={`duvet-card ${isSelected ? 'duvet-card--selected' : ''}`}>
      <div className="duvet-card__image-container">
        <img
          src={imageUrl}
          alt={`${duvet.brand} ${duvet.name}`}
          className="duvet-card__image"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/images/placeholder.svg';
          }}
        />
      </div>

      <div className="duvet-card__header">
        <h3 className="duvet-card__name">{duvet.brand} {duvet.name}</h3>
        {duvet.allergyFriendly && (
          <Badge variant="success">Allergivenlig</Badge>
        )}
      </div>

      <p className="duvet-card__price">{variant.price} DKK</p>

      <div className="duvet-card__details">
        <div className="duvet-card__detail-item">
          <span className="duvet-card__detail-label">Type:</span>
          <span className="duvet-card__detail-value">{getTypeLabel(variant.type)}</span>
        </div>
        <div className="duvet-card__detail-item">
          <span className="duvet-card__detail-label">Varme:</span>
          <span className="duvet-card__detail-value">{getInsulationLabel(variant.insulation)}</span>
        </div>
        <div className="duvet-card__detail-item">
          <span className="duvet-card__detail-label">Størrelse:</span>
          <span className="duvet-card__detail-value">{variant.width}x{variant.length} cm</span>
        </div>
        <div className="duvet-card__detail-item">
          <span className="duvet-card__detail-label">Kvalitet:</span>
          <span className="duvet-card__detail-value">{duvet.quality}</span>
        </div>
      </div>

      <div className="duvet-card__filling">
        <span className="duvet-card__detail-label">Fyld:</span>
        <p className="duvet-card__filling-text">{duvet.fillings}</p>
      </div>

      {duvet.properties.length > 0 && (
        <div className="duvet-card__properties">
          {duvet.properties.map((prop, index) => (
            <Badge key={index} variant="info">{prop}</Badge>
          ))}
        </div>
      )}

      {duvet.certifications.length > 0 && (
        <div className="duvet-card__certifications">
          {duvet.certifications.map((cert, index) => (
            <Badge key={index} variant="neutral">{cert}</Badge>
          ))}
        </div>
      )}

      <div className="duvet-card__rating">
        <span className="duvet-card__stars">{'⭐'.repeat(Math.round(duvet.rating))}</span>
        <span className="duvet-card__rating-value">{duvet.rating}/5</span>
      </div>

      <div className="duvet-card__warranty">
        {duvet.years_warranty} års garanti
      </div>

      <div className="duvet-card__actions">
        {onSelect && (
          <Button onClick={onSelect} fullWidth>
            Se detaljer
          </Button>
        )}
        {showCompareButton && onCompare && (
          <Button onClick={onCompare} variant="outline" fullWidth>
            {isSelected ? 'Fjern fra sammenligning' : 'Tilføj til sammenligning'}
          </Button>
        )}
      </div>
    </Card>
  );
};
