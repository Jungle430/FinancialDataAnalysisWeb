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
                return `${stockIndexRiseAndFallResponse.stockIndexX.code}-${stockIndexRiseAndFallResponse.stockIndexX.name}`
                    + "|"
                    + `${stockIndexRiseAndFallResponse.stockIndexY.code}-${stockIndexRiseAndFallResponse.stockIndexY.name}`;
            });
        stockIndexRiseAndFallPearsonCorrelationCoefficient.value = stockIndexRiseAndFallResponses
            .map(stockIndexRiseAndFallResponse => {
                return stockIndexRiseAndFallResponse.riseAndFallPearsonCorrelationCoefficient;
            });
    })
});

const option = ref({
    title: {
        text: '市场与区域相关性排行榜',
        left: 'center',
        top: '3%'
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    grid: {
        left: '15%',
        height: '80%',
        top: '15%'
    },
    yAxis: {
        type: 'category',
        data: stockIndexMsg,
        axisLabel: {
            show: false
        }
    },
    xAxis: {
        type: 'value'
    },
    series: [
        {
            data: stockIndexRiseAndFallPearsonCorrelationCoefficient,
            type: 'bar',
            itemStyle: {
                normal: {
                    label: {
                        show: true,
                        position: 'right',
                        textStyle: {
                            color: 'black',
                            fontSize: 7,
                        },
                        formatter: (params: any) => {
                            return params.value.toFixed(5);
                        }
                    }
                }
            },
        }
    ],
    dataZoom: [{
        type: 'slider',
        start: 0,
        end: 100,
        zoomOnMouseWheel: false,
        moveOnMouseMove: true,
        moveOnMouseWheel: true,
        showDetail: false,
    }]
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