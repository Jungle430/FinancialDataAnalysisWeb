<script lang="ts" setup>
import { getCommoditiesCurrencyNumber } from '@/apis/financialDataAnalysis';
import type { CommoditiesCurrencyNumberResponse } from '@/types/commoditiesCurrencyNumberResponse';
import { onMounted, ref } from 'vue';
import 'echarts';
import VChart from "vue-echarts";

const commoditiesCurrencys = ref<Array<string>>([]);
const commoditiesCurrencyNumbers = ref<Array<number>>([]);

onMounted(() => {
    getCommoditiesCurrencyNumber().then(res => {
        let data = res.data as CommoditiesCurrencyNumberResponse;
        commoditiesCurrencys.value = data.commoditiesCurrencyNumber.map(item => `${item.currency.simplifiedChineseName}-(${item.currency.englishName})`);
        commoditiesCurrencyNumbers.value = data.commoditiesCurrencyNumber.map(item => item.number);
    });
});

const option = ref({
    title: {
        text: '商品与货币的关系',
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
        data: commoditiesCurrencys,
    },
    xAxis: {
        type: 'value'
    },
    series: [
        {
            data: commoditiesCurrencyNumbers,
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