import type { Duvet, UserPreferences, RecommendationReason, DuvetVariant } from '../types/duvet.types';

/**
 * Converts Danish duvet type to season
 */
const getSeasonFromType = (type: string): 'summer' | 'winter' | 'all-season' => {
  if (type === 'Sommerdyne') return 'summer';
  if (type === 'Vinterdyne') return 'winter';
  if (type === '4-årstider dyne') return 'all-season';
  return 'all-season'; // Default for 'Dyne'
};

/**
 * Converts Danish insulation level to warmth score (1-5)
 */
const getWarmthScore = (insulation: string): number => {
  switch (insulation) {
    case 'Sval':
      return 1; // Very cool
    case 'Normal':
      return 3; // Medium
    case 'Varm':
      return 4; // Warm
    case 'Ekstra varm':
      return 5; // Very warm
    default:
      return 3;
  }
};

/**
 * Selects the best variant from a duvet based on user preferences
 */
const selectBestVariant = (
  duvet: Duvet,
  preferences: UserPreferences
): DuvetVariant => {
  let bestVariant = duvet.variants[0];
  let bestScore = 0;

  duvet.variants.forEach((variant) => {
    let score = 0;

    // Prefer season match
    const season = getSeasonFromType(variant.type);
    if (preferences.season === season) {
      score += 30;
    }

    // Prefer insulation match based on sleep temperature
    const warmth = getWarmthScore(variant.insulation);
    if (preferences.sleepTemperature === 'cold' && warmth >= 4) {
      score += 25;
    } else if (preferences.sleepTemperature === 'warm' && warmth <= 2) {
      score += 25;
    } else if (preferences.sleepTemperature === 'normal' && warmth === 3) {
      score += 25;
    }

    // Prefer size match
    if (preferences.size === 'single' && variant.width === 135) {
      score += 10;
    } else if (preferences.size === 'double' && variant.width >= 200) {
      score += 10;
    }

    // Prefer budget match
    if (preferences.budget === 'low' && variant.price <= 2000) {
      score += 15;
    } else if (preferences.budget === 'medium' && variant.price > 2000 && variant.price <= 3500) {
      score += 15;
    } else if (preferences.budget === 'high' && variant.price > 3500) {
      score += 15;
    }

    if (score > bestScore) {
      bestScore = score;
      bestVariant = variant;
    }
  });

  return bestVariant;
};

export const matchDuvets = (
  duvets: Duvet[],
  preferences: UserPreferences
): RecommendationReason[] => {
  const scored = duvets.map((duvet) => {
    const bestVariant = selectBestVariant(duvet, preferences);
    let score = 0;
    const reasons: string[] = [];

    // Season matching
    const season = getSeasonFromType(bestVariant.type);
    if (preferences.season) {
      if (season === preferences.season) {
        score += 30;
        const seasonNames = {
          summer: 'sommer',
          winter: 'vinter',
          'all-season': 'alle årstider'
        };
        reasons.push(`Perfekt til ${seasonNames[preferences.season]}`);
      }
    }

    // Sleep temperature matching
    const warmth = getWarmthScore(bestVariant.insulation);
    if (preferences.sleepTemperature) {
      if (preferences.sleepTemperature === 'cold' && warmth >= 4) {
        score += 25;
        reasons.push('Ekstra varm til dem der fryser let');
      } else if (preferences.sleepTemperature === 'warm' && warmth <= 2) {
        score += 25;
        reasons.push('Let og kølig til varme sovere');
      } else if (preferences.sleepTemperature === 'normal' && warmth === 3) {
        score += 25;
        reasons.push('Medium varme, perfekt til de fleste');
      }
    }

    // Allergy matching
    if (preferences.allergies) {
      if (duvet.allergyFriendly) {
        score += 30;
        reasons.push('Allergivenlig og egnet til allergiramte');
      } else {
        score -= 20; // Penalize non-allergy-friendly options
      }
    }

    // Budget matching
    if (preferences.budget) {
      if (preferences.budget === 'low' && bestVariant.price <= 2000) {
        score += 15;
        reasons.push('Inden for dit budget');
      } else if (
        preferences.budget === 'medium' &&
        bestVariant.price > 2000 &&
        bestVariant.price <= 3500
      ) {
        score += 15;
        reasons.push('God balance mellem kvalitet og pris');
      } else if (preferences.budget === 'high' && bestVariant.price > 3500) {
        score += 15;
        reasons.push('Premium kvalitet med de fineste materialer');
      }
    }

    // Quality bonus
    if (duvet.quality === 'GOLD') {
      score += 10;
      reasons.push('Høj kvalitet (GOLD)');
    } else if (duvet.quality === 'PLATINUM') {
      score += 15;
      reasons.push('Højeste kvalitet (PLATINUM)');
    }

    // Rating bonus
    if (duvet.rating >= 4.5) {
      score += 5;
      reasons.push(`Høj kundebedømmelse (${duvet.rating}/5)`);
    }

    return {
      duvet,
      variant: bestVariant,
      matchScore: score,
      reasons,
    };
  });

  // Sort by score and return top matches
  return scored.sort((a, b) => b.matchScore - a.matchScore);
};

export const getRecommendationSummary = (
  _recommendation: RecommendationReason,
  preferences: UserPreferences
): string => {
  const parts = [];

  if (preferences.sleepTemperature) {
    parts.push(
      preferences.sleepTemperature === 'cold'
        ? 'varme soveværelser'
        : preferences.sleepTemperature === 'warm'
        ? 'kølige soveværelser'
        : 'standard soveværelser'
    );
  }

  if (preferences.season) {
    const seasonNames = {
      summer: 'sommer',
      winter: 'vinter',
      'all-season': 'hele året'
    };
    parts.push(`${seasonNames[preferences.season]} brug`);
  }

  if (preferences.allergies) {
    parts.push('allergiramte');
  }

  return parts.length > 0
    ? `Denne dyne er ideel til ${parts.join(' og ')}.`
    : 'Denne dyne matcher dine præferencer godt.';
};
