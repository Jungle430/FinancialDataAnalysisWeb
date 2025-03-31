import type { StockTableForm } from "@/types/StockTableForm;
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

export function getStockEchartsData(code: string) {
  return service.request({
    url: `/stock/echarts/${code}`,
    method: 'get'
  })
}
