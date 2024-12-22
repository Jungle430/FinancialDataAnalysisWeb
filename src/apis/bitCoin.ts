import type { BitCoinTableForm } from "@/types/bitCoinTableForm";
import service from "@/utils/request";

export function getAllRegion() {
  return service.request({
    url: '/bitCoin/region/list',
    method: 'get'
  });
}

export function getAllCurrency() {
  return service.request({
    url: "/bitCoin/currency/list",
    method: 'get'
  });
}

export function getBitCoinTableData(bitCoinTableRequest: BitCoinTableForm, current: number, pageSize: number) {
  return service.request({
    url: `/bitCoin/table/${current}/${pageSize}`,
    method: 'post',
    data: bitCoinTableRequest,
  });
}
