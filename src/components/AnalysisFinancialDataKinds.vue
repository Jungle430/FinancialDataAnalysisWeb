<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import type { FinancialKindRiseAndFallResponse } from '@/types/financialKindRiseAndFallResponse';
import { getAnalysisFinancialDataKinds } from '@/apis/financialDataAnalysis';
import 'echarts';
import VChart from "vue-echarts";

const financialKindMsg = ref<Array<string>>([]);
const financialKindRiseAndFallPearsonCorrelationCoefficient = ref<Array<number>>([]);

onMounted(() => {
    getAnalysisFinancialDataKinds().then(res => {
        let financialKindRiseAndFallResponses = res.data as Array<FinancialKindRiseAndFallResponse>;
        financialKindMsg.value = financialKindRiseAndFallResponses
            .map(financialKindRiseAndFallResponse => {
                return `${financialKindRiseAndFallResponse.financialKindX.cn}(${financialKindRiseAndFallResponse.financialKindX.en})-${financialKindRiseAndFallResponse.financialKindY.cn}(${financialKindRiseAndFallResponse.financialKindY.en})`;
            });
        financialKindRiseAndFallPearsonCorrelationCoefficient.value = financialKindRiseAndFallResponses
            .map(financialKindRiseAndFallResponse => {
                return financialKindRiseAndFallResponse.riseAndFallPearsonCorrelationCoefficient;
            });
    })
});

const option = ref({
    grid: {
        left: '30%',
        height: '60%',
        top: '10%'
    },
    yAxis: {
        type: 'category',
        data: financialKindMsg,
    },
    xAxis: {
        type: 'value'
    },
    series: [
        {
            data: financialKindRiseAndFallPearsonCorrelationCoefficient,
            type: 'bar'
        }
    ]
});
</script>

<template>
    <div class="container">
        <v-chart class="chart" :option="option" />
    </div>
</template>

<style scoped>
.chart {
    height: 85vh;
}
</style>

<style scoped lang="less">
.container {
    padding: 0 20px 20px 0px;
}
</style>