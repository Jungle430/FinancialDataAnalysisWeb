export interface StockTableDataResponse {
  stockTags: Array<{
    code: string;
    platform: string;
    region: {
      isoCode: string;
      simplifiedChineseName: string;
      englishName: string;
    };
    currency: {
      currencyCode: string;
      simplifiedChineseName: string;
      englishName: string;
    };
    name: string;
    marketRegion: {
      isoCode: string;
      simplifiedChineseName: string;
      englishName: string;
    };
  }>,
  total: number;
}
