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

export function getAnalysisFinancialData(analysisTwoFinancialDataRequest: AnalysisTwoFinancialDataRequest) {
  return service.request({
    url: `/financialDataAnalysis/analysisTwoFinancialData`,
    method: 'post',
    data: analysisTwoFinancialDataRequest
  });
}

