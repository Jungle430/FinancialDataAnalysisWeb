import type { StockTableForm } from "@/types/stockTableForm";
import service from "@/utils/request";

export function getAllRegion() {
  return service.request({
    url: "/stock/region/list",
    method: 'get'
  })
}

export function getAllMarketRegion() {
  return service.request({
    url: "/stock/marketRegion/list",
    method: 'get'
  })
}

export function getAllCurrency() {
  return service.request({
    url: "/stock/currency/list",
    method: 'get'
  })
}

export function getStockTableData(stockTableRequest: StockTableForm, current: number, pageSize: number) {
  return service.request({
    url: `/stock/table/${current}/${pageSize}`,
    method: 'post',
    data: stockTableRequest
  })
}
