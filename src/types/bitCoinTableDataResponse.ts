export interface BitCoinTableDataResponse {
  bitCoinTags: Array<{
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
  }>,
  total: number;
}
