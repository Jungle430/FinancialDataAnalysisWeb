import type { ForexTableForm } from "@/types/forexTableForm";
import service from "@/utils/request";

export function getAllBaseRegion() {
  return service.request({
    url: '/offshoreRMB/baseRegion/list',
    method: 'get'
  });
}

export function getAllBaseCurrency() {
  return service.request({
    url: "/offshoreRMB/baseCurrency/list",
    method: 'get'
  });
}

export function getAllQuoteRegion() {
  return service.request({
    url: '/offshoreRMB/quoteRegion/list',
    method: 'get'
  });
}

export function getAllQuoteCurrency() {
  return service.request({
    url: "/offshoreRMB/quoteCurrency/list",
    method: 'get'
  });
}

export function getOffshoreRMBTableData(offshoreRMBTableRequest: ForexTableForm, current: number, pageSize: number) {
  return service.request({
    url: `/offshoreRMB/table/${current}/${pageSize}`,
    method: 'post',
    data: offshoreRMBTableRequest,
  });
}
