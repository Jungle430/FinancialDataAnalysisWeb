import type { StockIndexTableForm } from "@/types/stockIndexTableForm";
import service from "@/utils/request";


export function getAllRegions() {
  return service.request({
    url: "/stockIndex/region/list",
    method: 'get'
  });
}


export function getAllCurrency() {
  return service.request({
    url: "/stockIndex/currency/list",
    method: 'get'
  });
}

export function getStockIndexTable(stockIndexTableRequest: StockIndexTableForm, current: number, pageSize: number) {
  return service.request({
    url: `/stockIndex/table/${current}/${pageSize}`,
    method: 'post',
    data: stockIndexTableRequest
  });
}
