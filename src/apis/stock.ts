import service from "@/utils/request";

export function getAllRegions() {
  return service.request({
    url: "/stock/region/list",
    method: 'get'
  })
}

export function getAllMarketRegions() {
  return service.request({
    url: "/stock/marketRegion/list",
    method: 'get'
  })
}

export function getAllCurrencies() {
  return service.request({
    url: "/stock/currency/list",
    method: 'get'
  })
}
