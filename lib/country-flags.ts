export const countryFlags: Record<string, string> = {
  // Add manual mappings here if specific overrides are needed
  // e.g. 'GB': 'uk' if you prefer uk.svg over gb.svg
};

export function getCountryFlag(countryCode?: string): string | null {
  if (!countryCode) return null;
  
  // Try direct mapping first
  const mapped = countryFlags[countryCode.toUpperCase()];
  if (mapped) return mapped;
  
  // Fallback to lowercase code if no mapping exists (for cases where filename matches code)
  return countryCode.toLowerCase();
}
