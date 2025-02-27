<script lang="ts" setup>
import { getAnalysisFinancialData } from '@/apis/financialDataAnalysis';
import SelectAnalysisFinancialData from '@/components/SelectAnalysisFinancialData.vue';
import { message } from 'ant-design-vue';
import { ref } from 'vue';
import { IconExperiment } from '@arco-design/web-vue/es/icon';
import 'echarts';
import VChart from "vue-echarts";
import type { TwoFinancialPearsonMatrixAnalysisResponse } from '@/types/twoFinancialPearsonMatrixAnalysisResponse';
import { IconSchedule } from '@arco-design/web-vue/es/icon';

const kindX = ref('');
const branchX = ref('');
const kindY = ref('');
const branchY = ref('');

const DEFAULT_ANIMATION_DURATION = 1000;
const ANIMATION_DURATION_MIN = 0;
const ANIMATION_DURATION_MAX = 10000;

const animationDuration = ref('');

const attributesX = ref<Array<string>>([]);
const attributesY = ref<Array<string>>([]);
const pearsonMatrix = ref<Array<Array<string | number>>>([]);

const analysis = () => {
  if (kindX.value === ''
    || branchX.value === ''
    || kindY.value === ''
    || branchY.value === '') {
    message.error('数据不能为空!');
    return;
  }

  let duration = DEFAULT_ANIMATION_DURATION;
  if (animationDuration.value !== '') {
    duration = parseInt(animationDuration.value);
    if (isNaN(duration)
      || duration < ANIMATION_DURATION_MIN
      || duration > ANIMATION_DURATION_MAX) {
      message.error('动画速度必须在0~10000ms之间!');
      return;
    }
  }

  option.value.animationDuration = duration;
  option.value.animationDurationUpdate = duration;

  getAnalysisFinancialData({
    kindX: kindX.value,
    codeX: branchX.value,
    kindY: kindY.value,
    codeY: branchY.value,
  }).then(res => {
    let twoFinancialPearsonMatrixAnalysisResponse = res.data as TwoFinancialPearsonMatrixAnalysisResponse;
    attributesX.value = twoFinancialPearsonMatrixAnalysisResponse.attributesX;
    attributesY.value = twoFinancialPearsonMatrixAnalysisResponse.attributesY;
    pearsonMatrix.value = [];
    let n = twoFinancialPearsonMatrixAnalysisResponse.pearsonMatrix.length;
    let m = twoFinancialPearsonMatrixAnalysisResponse.pearsonMatrix[0].length || 0;
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < m; j++) {
        pearsonMatrix.value.push([
          i,
          j,
          parseFloat(twoFinancialPearsonMatrixAnalysisResponse.pearsonMatrix[i][j].toFixed(5))
          || '-'
        ]
        );
      }
    }
  });
};

const option = ref({
  animation: true,
  animationDuration: DEFAULT_ANIMATION_DURATION,
  animationDurationUpdate: DEFAULT_ANIMATION_DURATION,
  tooltip: {
    position: 'top'
  },
  grid: {
    left: '15%',
    height: '60%',
    top: '10%'
  },
  xAxis: {
    name: '金融数据X',
    type: 'category',
    data: attributesX,
    splitArea: {
      show: true
    },
    axisLabel: {
      show: true,
      interval: 0,
    },
    nameTextStyle: {
      fontFamily: 'monospace',
    }
  },
  yAxis: {
    name: '金融数据Y',
    type: 'category',
    data: attributesY,
    splitArea: {
      show: true
    },
    axisLabel: {
      show: true,
      interval: 0,
    },
    nameTextStyle: {
      fontFamily: 'monospace',
    }
  },
  visualMap: {
    min: -1,
    max: 1,
    calculable: true,
    orient: 'horizontal',
    left: 'center',
    bottom: '15%'
  },
  series: [
    {
      name: 'Pearson product-moment correlation coefficient',
      type: 'heatmap',
      data: pearsonMatrix,
      label: {
        show: true
      },
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
});
</script>

<template>
  <div class="container">
    <a-card :title="'金融数据分析'">
      <select-analysis-financial-data title="金融数据X" v-model:kind-model="kindX" v-model:branch-model="branchX" />
      <select-analysis-financial-data title="金融数据Y" v-model:kind-model="kindY" v-model:branch-model="branchY" />
      <div class="container">
        <a-row>
          <a-col :span="15">
            <div><a-input :placeholder="`(0~10000ms),默认${DEFAULT_ANIMATION_DURATION}ms`" v-model="animationDuration"
                allow-clear :size="'large'">
                <template #prepend>
                  <icon-schedule />
                  &nbsp;热力图动画速度
                </template>
                <template #append>
                  ms
                </template>
              </a-input></div>
          </a-col>
          <a-col :span="9">
            <div><a-button type="primary" @click="analysis" long>
                <template #icon>
                  <icon-experiment />
                </template>
                {{ '开始分析' }}
              </a-button></div>
          </a-col>
        </a-row>
      </div>
    </a-card>
    <v-chart class="chart" :option="option" />
  </div>
</template>

<style scoped>
.chart {
  height: 100vh;
  width: 156vh;
}
</style>

<style scoped lang="less">
.container {
  padding: 0 20px 20px 0px;
}

:deep(.arco-table-th) {
  &:last-child {
    .arco-table-th-item-title {
      margin-left: 0px;
    }
  }
}

.action-icon {
  margin-left: 12px;
  cursor: pointer;
}

.active {
  color: #0960bd;
  background-color: #e3f4fc;
}

.setting {
  display: flex;
  align-items: center;
  width: 200px;

  .title {
    margin-left: 12px;
    cursor: pointer;
  }
}
</style>
