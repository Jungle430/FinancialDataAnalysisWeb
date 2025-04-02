export interface FinancialKindRiseAndFallResponse {
    financialKindX: {
        cn: string,
        en: string,
    }
    financialKindY: {
        cn: string,
        en: string,
    },
    riseAndFallPearsonCorrelationCoefficient: number,
}
