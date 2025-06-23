export interface Company {
  name: string; // The primary name/handle (e.g., @techkiddies)
  displayName: string; // A cleaner, display-friendly name (e.g., Tech Kiddies)
  url: string; // The primary website URL
  allUrls: string[]; // All associated URLs found
  description: string;
  category: string;
  sources: string[]; // List of twitter usernames that mentioned this company
  variants: string[]; // All known names/URLs for this company used for deduplication
} 