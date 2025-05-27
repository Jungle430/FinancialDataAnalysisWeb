export interface AnalysisTwoFinancialDataBranchHighestAndLowestRes {
    financialBranchRiseAndFallHighest: {
        financialKindBOX: string;
        financialKindBOY: string;
        riseAndFallPearsonCorrelationCoefficient: number;
    }[];
    financialBranchRiseAndFallLowest: {
        financialKindBOX: string;
        financialKindBOY: string;
        riseAndFallPearsonCorrelationCoefficient: number;
    }[];
}