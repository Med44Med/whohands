export type Locale = (typeof locales)[number];

export const locales = ['en', 'ar', 'fr'] as const;
export const defaultLocale: Locale = 'en';