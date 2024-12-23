import type { BondsTableForm } from "@/types/bondsTableForm";
import service from "@/utils/request";

export function getAllRegion() {
  return service.request({
    url: '/bonds/region/list',
    method: 'get'
  });
}

export function getAllCurrency() {
  return service.request({
    url: "/bonds/currency/list",
    method: 'get'
  });
}

export function getBondsTableData(bondsTableRequest: BondsTableForm, current: number, pageSize: number) {
  return service.request({
    url: `/bonds/table/${current}/${pageSize}`,
    method: 'post',
    data: bondsTableRequest,
  });
}
