/**
 * TypeScript interfaces for duvet data model
 * Based on Flora Danica product data structure
 */

export type Season = 'summer' | 'winter' | 'all-season';
export type InsulationType = 'Sval' | 'Normal' | 'Varm' | 'Ekstra varm';
export type DuvetType = 'Sommerdyne' | 'Dyne' | 'Vinterdyne' | '4-årstider dyne';
export type Quality = 'SILVER' | 'GOLD' | 'PLATINUM';

export interface DuvetVariant {
  id: string;
  sku: string;
  length: number;
  width: number;
  price: number;
  currency: string;
  type: DuvetType;
  insulation: InsulationType;
}

export interface Duvet {
  id: string;
  sku: string;
  slug: string;
  brand: string;
  name: string;
  images: string[];
  allergyFriendly: boolean;
  certifications: string[];
  fillings: string;
  properties: string[];
  quality: Quality;
  rating: number;
  variants: DuvetVariant[];
  years_warranty: number;
}

export interface UserPreferences {
  sleepTemperature?: 'cold' | 'normal' | 'warm';
  season?: Season;
  allergies?: boolean;
  budget?: 'low' | 'medium' | 'high';
  size?: 'single' | 'double';
}

export interface Question {
  id: string;
  text: string;
  options: {
    value: string;
    label: string;
    description?: string;
  }[];
  preferenceKey: keyof UserPreferences;
}

export interface RecommendationReason {
  duvet: Duvet;
  variant: DuvetVariant;
  matchScore: number;
  reasons: string[];
}

export interface ComparisonData {
  duvet1: Duvet;
  variant1: DuvetVariant;
  duvet2: Duvet;
  variant2: DuvetVariant;
  differences: {
    field: string;
    label: string;
    value1: string | number;
    value2: string | number;
    isDifferent: boolean;
  }[];
  summary: string;
}
