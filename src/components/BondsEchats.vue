<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import 'echarts';
import VChart from "vue-echarts";
import { getBondsEchartsData } from '@/apis/bonds';
import type { BondsEchartsResponse } from '@/types/bondsEchartsResponse';

const upColor = '#ec0000';
const upBorderColor = '#8A0000';
const downColor = '#00da3c';
const downBorderColor = '#008F28';

const props = defineProps({
  code: {
    type: String,
    required: true
  }
});

const option = ref({
  title: {
    text: '',
    left: 'center',
    top: '3%'
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
    }
  },
  legend: {
    data: ['日K', 'MA5', 'MA10', 'MA20', 'MA30'],
    top: '10%',
  },
  grid: {
    left: '7%',
    right: '5%',
    top: '20%',
    bottom: '15%'
  },
  xAxis: {
    type: 'category',
    data: [] as string[],
    boundaryGap: false,
    axisLine: { onZero: false },
    splitLine: { show: false },
    min: 'dataMin',
    max: 'dataMax'
  },
  yAxis: {
    scale: true,
    splitArea: {
      show: true
    }
  },
  dataZoom: [
    {
      type: 'inside',
      start: 90,
      end: 100
    },
    {
      show: true,
      type: 'slider',
      top: '90%',
    }
  ],
  series: [
    {
      name: '日K',
      type: 'candlestick',
      data: [] as number[][],
      itemStyle: {
        color: upColor,
        color0: downColor,
        borderColor: upBorderColor,
        borderColor0: downBorderColor
      },
      markPoint: {
        data: [
          {
            name: 'highest value',
            type: 'max',
            valueDim: 'highest'
          },
          {
            name: 'lowest value',
            type: 'min',
            valueDim: 'lowest'
          },
          {
            name: 'average value on close',
            type: 'average',
            valueDim: 'close'
          }
        ],
      },
      markLine: {
        symbol: ['none', 'none'],
        data: [
          [
            {
              name: 'from lowest to highest',
              type: 'min',
              valueDim: 'lowest',
              symbol: 'circle',
              symbolSize: 10,
              label: {
                show: false
              },
              emphasis: {
                label: {
                  show: false
                }
              }
            },
            {
              type: 'max',
              valueDim: 'highest',
              symbol: 'circle',
              symbolSize: 10,
              label: {
                show: false
              },
              emphasis: {
                label: {
                  show: false
                }
              }
            }
          ],
          {
            name: 'min line on close',
            type: 'min',
            valueDim: 'close'
          },
          {
            name: 'max line on close',
            type: 'max',
            valueDim: 'close'
          }
        ]
      }
    },
    {
      name: 'MA5',
      type: 'line',
      data: [] as (number | null)[],
      smooth: true,
      lineStyle: {
        opacity: 0.5
      }
    },
    {
      name: 'MA10',
      type: 'line',
      data: [] as (number | null)[],
      smooth: true,
      lineStyle: {
        opacity: 0.5
      }
    },
    {
      name: 'MA20',
      type: 'line',
      data: [] as (number | null)[],
      smooth: true,
      lineStyle: {
        opacity: 0.5
      }
    },
    {
      name: 'MA30',
      type: 'line',
      data: [] as (number | null)[],
      smooth: true,
      lineStyle: {
        opacity: 0.5
      }
    }
  ]
});
onMounted(() => {
  getBondsEchartsData(props.code)
    .then(res => {
      let bondsEchartsResponse = res.data as BondsEchartsResponse;
      option.value.title.text =
        `${bondsEchartsResponse.tags.code}` +
        `-${bondsEchartsResponse.tags.platform}` +
        `-${bondsEchartsResponse.tags.name}` +
        `-${bondsEchartsResponse.tags.region.simplifiedChineseName}(${bondsEchartsResponse.tags.region.englishName})` +
        `-${bondsEchartsResponse.tags.currency.simplifiedChineseName}(${bondsEchartsResponse.tags.currency.englishName})`;
      option.value.xAxis.data = bondsEchartsResponse.bonds.map(bond => bond.ts);
      option.value.series[0].data = bondsEchartsResponse.bonds.map(bond => [bond.openingPrice, bond.closingPrice, bond.lowestPrice, bond.highestPrice]);
      option.value.series[1].data = bondsEchartsResponse.MA5;
      option.value.series[2].data = bondsEchartsResponse.MA10;
      option.value.series[3].data = bondsEchartsResponse.MA20;
      option.value.series[4].data = bondsEchartsResponse.MA30;
    });
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
