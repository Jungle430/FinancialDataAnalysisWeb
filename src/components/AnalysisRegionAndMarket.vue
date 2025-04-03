<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { analysisRegionAndMarket } from '@/apis/financialDataAnalysis';
import 'echarts';
import VChart from "vue-echarts";
import type { StockIndexRiseAndFallResponse } from '@/types/stockIndexRiseAndFallResponse';

const stockIndexMsg = ref<Array<string>>([]);
const stockIndexRiseAndFallPearsonCorrelationCoefficient = ref<Array<number>>([]);

onMounted(() => {
    analysisRegionAndMarket().then(res => {
        let stockIndexRiseAndFallResponses = res.data as Array<StockIndexRiseAndFallResponse>;
        stockIndexMsg.value = stockIndexRiseAndFallResponses
            .map(stockIndexRiseAndFallResponse => {
                return stockIndexRiseAndFallResponse.stockIndexX.name + "-"
                    + stockIndexRiseAndFallResponse.stockIndexY.name;
            });
        stockIndexRiseAndFallPearsonCorrelationCoefficient.value = stockIndexRiseAndFallResponses
            .map(stockIndexRiseAndFallResponse => {
                return stockIndexRiseAndFallResponse.riseAndFallPearsonCorrelationCoefficient;
            });
    })
});

const option = ref({
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    grid: {
        left: '30%',
        height: '60%',
        top: '10%'
    },
    yAxis: {
        type: 'category',
        data: stockIndexMsg,
    },
    xAxis: {
        type: 'value'
    },
    series: [
        {
            data: stockIndexRiseAndFallPearsonCorrelationCoefficient,
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