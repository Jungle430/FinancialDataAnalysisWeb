export interface ForexEchartsResponse {
  forexes: Array<{
    ts: string;
    closingPrice: number;
    openingPrice: number;
    highestPrice: number;
    lowestPrice: number;
    riseAndFall: number;
  }>;

  tags: {
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
    };
  };

  MA5: Array<number | null>;
  MA10: Array<number | null>;
  MA20: Array<number | null>;
  MA30: Array<number | null>;
}
