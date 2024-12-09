<script lang="ts" setup>
import { IconApps } from '@arco-design/web-vue/es/icon';
</script>

<template>
  <div class="sidebar">
    <a-menu :style="{ width: '200px', height: '100vh' }" :default-open-keys="['0']" :default-selected-keys="['0_1']"
      show-collapse-button>
      <a-sub-menu key="0">
        <template #icon><icon-apps /></template>
        <template #title>股票</template>
        <a-menu-item key="0_0">股票数据</a-menu-item>
        <a-menu-item key="0_1">股票指数</a-menu-item>
      </a-sub-menu>
      <a-menu-item key="1_0"><icon-apps />比特币</a-menu-item>
      <a-sub-menu key="2">
        <template #icon><icon-apps /></template>
        <template #title>国际经济</template>
        <a-menu-item key="2_0">外汇</a-menu-item>
        <a-menu-item key="2_1">离岸人民币</a-menu-item>
        <a-menu-item key="2_2">美国国债</a-menu-item>
      </a-sub-menu>
      <a-menu-item key="3_0"><icon-apps />大宗商品</a-menu-item>
      <a-menu-item key="4_0"><icon-apps />未来预测</a-menu-item>
    </a-menu>
  </div>
</template>

<style scoped>
.sidebar {
  box-sizing: border-box;
  width: 100%;
  height: fit-content;
  position: relative;
  background-color: var(--color-neutral-2);
}
</style>
