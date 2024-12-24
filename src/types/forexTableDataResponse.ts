export interface ForexTableDataResponse {
  forexTags: Array<{
    baseRegion: {
      isoCode: string;
      simplifiedChineseName: string;
      englishName: string;
    };
    baseCurrency: {
      currencyCode: string;
      simplifiedChineseName: string;
      englishName: string;
    };
    quoteRegion: {
      isoCode: string;
      simplifiedChineseName: string;
      englishName: string;
    };
    quoteCurrency: {
      currencyCode: string;
      simplifiedChineseName: string;
      englishName: string;
    }
  }>;
  total: number;
}
