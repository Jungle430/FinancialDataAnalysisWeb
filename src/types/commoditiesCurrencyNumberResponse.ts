import type { Currency } from "@/types/currency";

export interface CommoditiesCurrencyNumberResponse {
    commoditiesCurrencyNumber: Array<{
        currency: Currency;
        number: number;
    }>;
}