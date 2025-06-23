import axios from 'axios';
import { categorizeCompany, expandUrl, cleanAndDeduplicate, RawCompany } from './processTwitterData';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('processTwitterData', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('categorizeCompany', () => {
    it('should correctly categorize a company based on its description', () => {
      expect(categorizeCompany('A new fintech startup for payments')).toBe('FinTech');
      expect(categorizeCompany('We are building a healthcare platform')).toBe('Healthcare/MedTech');
      expect(categorizeCompany('An edtech solution for schools')).toBe('EdTech');
      expect(categorizeCompany('A marketplace for creative design')).toBe('Creative/Design');
      expect(categorizeCompany('Building new homes and property')).toBe('Real Estate/PropTech');
    });

    it('should return "Other" if no keywords match', () => {
      expect(categorizeCompany('A new venture for something special')).toBe('Other');
    });
  });

  describe('expandUrl', () => {
    it('should expand a t.co URL', async () => {
      const originalUrl = 'https://t.co/shortlink';
      const expandedUrl = 'https://example.com/full-link';
      mockedAxios.get.mockResolvedValue({ request: { res: { responseUrl: expandedUrl } } });
      
      const result = await expandUrl(originalUrl);
      expect(result).toBe(expandedUrl);
      expect(mockedAxios.get).toHaveBeenCalledWith(originalUrl, { timeout: 5000 });
    });

    it('should return the original URL if it is not a t.co link', async () => {
      const originalUrl = 'https://example.com';
      const result = await expandUrl(originalUrl);
      expect(result).toBe(originalUrl);
      expect(mockedAxios.get).not.toHaveBeenCalled();
    });

    it('should return original URL on network error', async () => {
        const originalUrl = 'https://t.co/anotherlink';
        mockedAxios.get.mockRejectedValue(new Error('Network error'));

        const result = await expandUrl(originalUrl);
        expect(result).toBe(originalUrl);
    });
  });

  describe('cleanAndDeduplicate', () => {
    it('should merge companies with the same name', () => {
        const rawCompanies: RawCompany[] = [
            { type: 'mention', name: '@TestCo', description: 'A test company', source: 'user1', url: 'http://test.co' },
            { type: 'mention', name: '@TestCo', description: 'A test company', source: 'user2', url: 'http://test.co/about' },
        ];

        const result = cleanAndDeduplicate(rawCompanies);
        const testCo = result.find(c => c.name === '@TestCo');

        expect(result).toHaveLength(4); // 3 from duplicateGroups + 1 merged
        expect(testCo).toBeDefined();
        expect(testCo?.name).toBe('@TestCo');
        expect(testCo?.sources).toEqual(['user1', 'user2']);
        expect(testCo?.allUrls).toEqual(['http://test.co', 'http://test.co/about']);
    });

    it('should not add pre-defined duplicates from duplicateGroups', () => {
        const rawCompanies: RawCompany[] = [
            { type: 'mention', name: '@techkiddies', description: 'Some description', source: 'user3' },
        ];
        const result = cleanAndDeduplicate(rawCompanies);
        const techkiddies = result.find(c => c.name === '@techkiddies');
        expect(techkiddies).toBeDefined();
        // The count of techkiddies should be exactly 1, from the duplicateGroups
        expect(result.filter(c => c.name === '@techkiddies')).toHaveLength(1);
    });

    it('should create a new company if it does not exist', () => {
        const rawCompanies: RawCompany[] = [
            { type: 'mention', name: '@NewCo', displayName: 'New Company', description: 'A new software company', source: 'user4', url: 'http://new.co' },
        ];
        const result = cleanAndDeduplicate(rawCompanies);
        const newCo = result.find(c => c.name === '@NewCo');
        expect(newCo).toBeDefined();
        expect(newCo?.displayName).toBe('New Company');
        expect(newCo?.category).toBe('Technology/Software');
        expect(newCo?.sources).toEqual(['user4']);
        expect(newCo?.url).toBe('http://new.co');
    });
  });
}); 