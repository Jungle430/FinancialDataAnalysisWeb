export interface StockIndexTableDataResponse {
  stockIndexTags: Array<{
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
  }>,
  total: number;
}
