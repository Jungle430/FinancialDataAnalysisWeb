import service from "@/utils/request";
import { type AnalysisTwoFinancialDataRequest } from '@/types/analysisTwoFinancialDataRequest';

export function getAllFinancialKind() {
  return service.request({
    url: '/financialDataAnalysis/kind/list',
    method: 'get'
  });
}

export function getFinancialBranch(kind: string) {
  return service.request({
    url: `/financialDataAnalysis/branch/${kind}`,
    method: 'get',
  });
}

export function getAnalysisTwoFinancialBranchData(analysisTwoFinancialDataRequest: AnalysisTwoFinancialDataRequest) {
  return service.request({
    url: `/financialDataAnalysis/analysisTwoFinancialDataBranch`,
    method: 'post',
    data: analysisTwoFinancialDataRequest
  });
}

export function getAnalysisFinancialDataKinds() {
  return service.request({
    url: '/financialDataAnalysis/analysisFinancialDataKinds',
    method: 'get'
  });
}

export function analysisRegionAndMarket() {
  return service.request({
    url: '/financialDataAnalysis/analysisRegionAndMarket',
    method: 'get'
  });
}

export function analysisTwoFinancialDataBranchHighestAndLowest() {
  return service.request({
    url: '/financialDataAnalysis/analysisTwoFinancialDataBranchHighestAndLowest',
    method: 'get'
  });
}

export function getCommoditiesCurrencyNumber() {
  return service.request({
    url: '/financialDataAnalysis/commoditiesCurrencyNumber',
    method: 'get'
  });
}