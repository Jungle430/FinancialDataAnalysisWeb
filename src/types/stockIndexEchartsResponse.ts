export interface StockIndexEchartsResponse {
  stockIndexes: Array<{
    ts: string;
    closingPrice: number;
    openingPrice: number;
    highestPrice: number;
    lowestPrice: number;
    tradeVolume: number;
    riseAndFall: number;
  }>;

  tags: {
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
  };

  MA5: Array<number | null>;
  MA10: Array<number | null>;
  MA20: Array<number | null>;
  MA30: Array<number | null>;
}
