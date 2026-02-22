export type ThemeName = 'navy-gold' | 'forest-copper' | 'charcoal-blush' | 'teal-coral';

export interface Theme {
  name: ThemeName;
  label: string;
  colors: {
    primary: string;
    secondary: string;
    accent1: string;
    accent2: string;
    accent3: string;
    heading: string;
    body: string;
    muted: string;
    lightBg: string;
    cardBg: string;
    darkBg: string;
    textOnDark: string;
    cta: string;
    ctaHover: string;
    ctaText: string;
    link: string;
    linkHover: string;
    success: string;
    error: string;
    border: string;
  };
}

export const themes: Record<ThemeName, Theme> = {
  'navy-gold': {
    name: 'navy-gold',
    label: 'Navy & Gold',
    colors: {
      primary: '#1A2E4C',
      secondary: '#C9A227',
      accent1: '#C75B39',
      accent2: '#7A9E7E',
      accent3: '#6B8CAE',
      heading: '#2B2B2B',
      body: '#4A4A4A',
      muted: '#717171',
      lightBg: '#FAF8F5',
      cardBg: '#F5F2EC',
      darkBg: '#1A2E4C',
      textOnDark: '#FFFFFF',
      cta: '#C9A227',
      ctaHover: '#A8871F',
      ctaText: '#1A2E4C',
      link: '#1A2E4C',
      linkHover: '#C9A227',
      success: '#2E7D52',
      error: '#C94A4A',
      border: '#E5E2DC',
    },
  },
  'forest-copper': {
    name: 'forest-copper',
    label: 'Forest & Copper',
    colors: {
      primary: '#2D4A3E',
      secondary: '#B87333',
      accent1: '#D4A574',
      accent2: '#8B9E84',
      accent3: '#5C7A6F',
      heading: '#2D3A35',
      body: '#4A4A4A',
      muted: '#717171',
      lightBg: '#F7F5F2',
      cardBg: '#EDE8E1',
      darkBg: '#2D4A3E',
      textOnDark: '#FFFFFF',
      cta: '#B87333',
      ctaHover: '#9A5F28',
      ctaText: '#FFFFFF',
      link: '#2D4A3E',
      linkHover: '#B87333',
      success: '#4A7C59',
      error: '#B54A4A',
      border: '#DDD8D0',
    },
  },
  'charcoal-blush': {
    name: 'charcoal-blush',
    label: 'Charcoal & Blush',
    colors: {
      primary: '#2E2E2E',
      secondary: '#C4A484',
      accent1: '#D4B896',
      accent2: '#9E8B7D',
      accent3: '#7D6E63',
      heading: '#2E2E2E',
      body: '#555555',
      muted: '#777777',
      lightBg: '#FDFBF9',
      cardBg: '#F5F1ED',
      darkBg: '#2E2E2E',
      textOnDark: '#FFFFFF',
      cta: '#C4A484',
      ctaHover: '#A88B6D',
      ctaText: '#2E2E2E',
      link: '#2E2E2E',
      linkHover: '#C4A484',
      success: '#5A8A6B',
      error: '#C45C5C',
      border: '#E5E0DA',
    },
  },
  'teal-coral': {
    name: 'teal-coral',
    label: 'Teal & Coral',
    colors: {
      primary: '#0D5C63',
      secondary: '#E07A5F',
      accent1: '#F2CC8F',
      accent2: '#81B29A',
      accent3: '#3D7A80',
      heading: '#264653',
      body: '#4A4A4A',
      muted: '#717171',
      lightBg: '#FFFDF9',
      cardBg: '#F4F1E8',
      darkBg: '#0D5C63',
      textOnDark: '#FFFFFF',
      cta: '#E07A5F',
      ctaHover: '#C4664D',
      ctaText: '#FFFFFF',
      link: '#0D5C63',
      linkHover: '#E07A5F',
      success: '#4A9E6B',
      error: '#D64545',
      border: '#E0DDD5',
    },
  },
};

export const themeList = Object.values(themes);

export const applyTheme = (theme: Theme) => {
  const root = document.documentElement;
  const { colors } = theme;

  root.style.setProperty('--color-primary', colors.primary);
  root.style.setProperty('--color-secondary', colors.secondary);
  root.style.setProperty('--color-accent1', colors.accent1);
  root.style.setProperty('--color-accent2', colors.accent2);
  root.style.setProperty('--color-accent3', colors.accent3);
  root.style.setProperty('--color-heading', colors.heading);
  root.style.setProperty('--color-body', colors.body);
  root.style.setProperty('--color-muted', colors.muted);
  root.style.setProperty('--color-light-bg', colors.lightBg);
  root.style.setProperty('--color-card-bg', colors.cardBg);
  root.style.setProperty('--color-dark-bg', colors.darkBg);
  root.style.setProperty('--color-text-on-dark', colors.textOnDark);
  root.style.setProperty('--color-cta', colors.cta);
  root.style.setProperty('--color-cta-hover', colors.ctaHover);
  root.style.setProperty('--color-cta-text', colors.ctaText);
  root.style.setProperty('--color-link', colors.link);
  root.style.setProperty('--color-link-hover', colors.linkHover);
  root.style.setProperty('--color-success', colors.success);
  root.style.setProperty('--color-error', colors.error);
  root.style.setProperty('--color-border', colors.border);
};
