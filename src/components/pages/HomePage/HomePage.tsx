import React from 'react';
import { Button } from '../../atoms/Button';
import './HomePage.css';

export interface HomePageProps {
  onStart: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onStart }) => {
  return (
    <div className="home-page">
      <div className="home-page__content">
        <h1 className="home-page__title">Find Your Perfect Duvet</h1>
        <p className="home-page__subtitle">
          Answer a few simple questions and we'll help you discover the ideal duvet for your needs.
        </p>

        <div className="home-page__features">
          <div className="home-page__feature">
            <div className="home-page__feature-icon">🛏️</div>
            <h3>Personalized</h3>
            <p>Get recommendations based on your sleep preferences</p>
          </div>
          <div className="home-page__feature">
            <div className="home-page__feature-icon">🔍</div>
            <h3>Compare</h3>
            <p>View detailed side-by-side comparisons</p>
          </div>
          <div className="home-page__feature">
            <div className="home-page__feature-icon">✓</div>
            <h3>Informed Choice</h3>
            <p>Understand why each duvet suits your needs</p>
          </div>
        </div>

        <Button onClick={onStart} variant="primary" ariaLabel="Start duvet finder">
          Get Started
        </Button>

        <div className="home-page__info">
          <p>
            <strong>Flora Danica Duvet Finder</strong>
            <br />
            Explore our premium collection of duvets with varying warmth levels, materials, and
            sustainability features.
          </p>
        </div>
      </div>
    </div>
  );
};
