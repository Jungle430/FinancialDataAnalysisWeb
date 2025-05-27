<script lang="ts" setup>
import { analysisTwoFinancialDataBranchHighestAndLowest } from '@/apis/financialDataAnalysis';
import type { AnalysisTwoFinancialDataBranchHighestAndLowestRes } from '@/types/financialBranchRiseAndFallHighestAndLowest';
import { onMounted, ref } from 'vue';
import 'echarts';
import VChart from "vue-echarts";

const financialKindHighRiseAndFallPearsonCorrelationCoefficient = ref<Array<number>>([]);
const financialKindLowRiseAndFallPearsonCorrelationCoefficient = ref<Array<number>>();

const financialKindHighName = ref<Array<string>>([]);
const financialKindLowName = ref<Array<string>>([]);
onMounted(() => {
    analysisTwoFinancialDataBranchHighestAndLowest().then(res => {
        let data = res.data as AnalysisTwoFinancialDataBranchHighestAndLowestRes;
        financialKindHighRiseAndFallPearsonCorrelationCoefficient.value = data.financialBranchRiseAndFallHighest.map(item => item.riseAndFallPearsonCorrelationCoefficient) || [];
        financialKindLowRiseAndFallPearsonCorrelationCoefficient.value = data.financialBranchRiseAndFallLowest.map(item => item.riseAndFallPearsonCorrelationCoefficient) || [];
        financialKindHighName.value = data.financialBranchRiseAndFallHighest.map(item => `${item.financialKindBOX}-${item.financialKindBOY}`) || [];
        financialKindLowName.value = data.financialBranchRiseAndFallLowest.map(item => `${item.financialKindBOX}-${item.financialKindBOY}`) || [];
    });
})

const optionHigh = ref({
    title: {
        text: '高度正相关金融数据种类',
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
        left: '30%',
        height: '60%',
        top: '10%'
    },
    yAxis: {
        type: 'category',
        data: financialKindHighName,
    },
    xAxis: {
        type: 'value'
    },
    series: [
        {
            data: financialKindHighRiseAndFallPearsonCorrelationCoefficient,
            type: 'bar'
        }
    ]
});

const optionLow = ref({
    title: {
        text: '高度负相关金融数据种类',
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
        left: '30%',
        height: '60%',
        top: '10%'
    },
    yAxis: {
        type: 'category',
        data: financialKindLowName,
    },
    xAxis: {
        type: 'value'
    },
    series: [
        {
            data: financialKindLowRiseAndFallPearsonCorrelationCoefficient,
            type: 'bar'
        }
    ]
});
</script>

<template>
    <div class="container">
        <v-chart class="chart" :option="optionHigh" />
    </div>

    <div class="container">
        <v-chart class="chart" :option="optionLow" />
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