<script lang="ts" setup>
import { goto } from '@/utils/routerUtils';
import { IconApps } from '@arco-design/web-vue/es/icon';
</script>

<template>
  <div class="tab-bar-container">
    <a-menu :style="{ width: '200px', height: '100vh' }" :default-open-keys="['0']" :default-selected-keys="['0_0']"
      show-collapse-button>
      <a-sub-menu key="0">
        <template #icon><icon-apps /></template>
        <template #title>股票</template>
        <a-menu-item key="0_0" @click="() => { goto({ name: 'stock' }); }">股票数据</a-menu-item>
        <a-menu-item key="0_1" @click="() => { goto({ name: 'stockIndex' }) }">股票指数</a-menu-item>
      </a-sub-menu>
      <a-menu-item key="1_0" @click="() => { goto({ name: 'bitCoin' }); }"><icon-apps />比特币</a-menu-item>
      <a-sub-menu key="2">
        <template #icon><icon-apps /></template>
        <template #title>国际经济</template>
        <a-menu-item key="2_0" @click="() => { goto({ name: 'forex' }); }">外汇</a-menu-item>
        <a-menu-item key="2_1" @click="() => { goto({ name: 'offshoreRMB' }); }">离岸人民币</a-menu-item>
        <a-menu-item key="2_2" @click="() => { goto({ name: 'bonds' }); }">美国国债</a-menu-item>
      </a-sub-menu>
      <a-menu-item key="3_0" @click="() => { goto({ name: 'commodities' }); }"><icon-apps />大宗商品</a-menu-item>
      <a-sub-menu key="4">
        <template #icon><icon-apps /></template>
        <template #title>金融数据分析</template>
        <a-menu-item key="4_0" @click="() => { goto({ name: 'analysisTwoFinancialData' }) }">金融数据相关性</a-menu-item>
        <a-menu-item key="4_1" @click="() => { goto({ name: 'analysisFinancialDataKinds' }) }">金融数据种类相关性</a-menu-item>
        <a-menu-item key="4_2" @click="() => { goto({ name: 'analysisRegionAndMarket' }) }">市场与区域相关性</a-menu-item>
        <a-menu-item key="4_3"
          @click="() => { goto({ name: 'analysisTwoFinancialDataBranchHighestAndLowest' }) }">高度正/负相关金融数据种类</a-menu-item>
        <a-menu-item key="4_4" @click="() => { goto({ name: 'commoditiesCurrencyNumber' }) }">商品与货币的关系</a-menu-item>
      </a-sub-menu>
    </a-menu>
  </div>
</template>

<style scoped lang="less">
.tab-bar-container {
  position: absolute;
  background-color: var(--color-bg-2);

  .tab-bar-box {
    display: flex;
    padding: 0 0 0 20px;
    background-color: var(--color-bg-2);
    border-bottom: 1px solid var(--color-border);

    .tab-bar-scroll {
      height: 32px;
      flex: 1;
      overflow: hidden;

      .tags-wrap {
        padding: 4px 0;
        height: 48px;
        white-space: nowrap;
        overflow-x: auto;

        :deep(.arco-tag) {
          display: inline-flex;
          align-items: center;
          margin-right: 6px;
          cursor: pointer;

          &:first-child {
            .arco-tag-close-btn {
              display: none;
            }
          }
        }
      }
    }
  }

  .tag-bar-operation {
    width: 9.5vw;
    height: 10vh;
  }
}
</style>
