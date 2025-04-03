export interface StockIndexRiseAndFallResponse {
    stockIndexX: {
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
    stockIndexY: {
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
    riseAndFallPearsonCorrelationCoefficient: number;
}