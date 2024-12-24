import type { ForexTableForm } from "@/types/forexTableForm";
import service from "@/utils/request";

export function getAllBaseRegion() {
  return service.request({
    url: '/forex/baseRegion/list',
    method: 'get'
  });
}

export function getAllBaseCurrency() {
  return service.request({
    url: "/forex/baseCurrency/list",
    method: 'get'
  });
}

export function getAllQuoteRegion() {
  return service.request({
    url: '/forex/quoteRegion/list',
    method: 'get'
  });
}

export function getAllQuoteCurrency() {
  return service.request({
    url: "/forex/quoteCurrency/list",
    method: 'get'
  });
}

export function getForexTableData(forexTableRequest: ForexTableForm, current: number, pageSize: number) {
  return service.request({
    url: `/forex/table/${current}/${pageSize}`,
    method: 'post',
    data: forexTableRequest,
  });
}
