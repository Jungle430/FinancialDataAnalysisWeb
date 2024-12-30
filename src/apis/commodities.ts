import type { CommoditiesTableForm } from "@/types/commoditiesTableForm";
import service from "@/utils/request";

export function getAllRegion() {
  return service.request({
    url: "/commodities/region/list",
    method: 'get'
  });
}

export function getAllCurrency() {
  return service.request({
    url: "/commodities/currency/list",
    method: 'get'
  });
}

export function getCommoditiesTableData(commoditiesTableRequest: CommoditiesTableForm, current: number, pageSize: number) {
  return service.request({
    url: `/commodities/table/${current}/${pageSize}`,
    method: 'post',
    data: commoditiesTableRequest,
  });
}

export function getCommoditiesEchartsData(code: string) {
  return service.request({
    url: `/commodities/echarts/${code}`,
    method: 'get',
  });
}
