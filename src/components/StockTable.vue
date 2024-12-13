<script lang="ts" setup>
import { getAllCurrencies, getAllMarketRegions, getAllRegions } from '@/apis/stock';
import type { StockTableForm } from '@/types/StockTableForm';
import { onMounted, ref } from 'vue';

const stockTableFormData = ref<StockTableForm>({
  code: '',
  platform: '',
  region: '',
  currency: '',
  name: '',
  marketCountry: ''
});

const currencyKinds = ref();

onMounted(() => {
  getAllRegions(),
    getAllMarketRegions(),
    getAllCurrencies()
})

</script>

<template>
  <div class="container">
    <a-card :title="'股票数据'">
      <a-row>

      </a-row>
    </a-card>
  </div>
</template>

<style scoped lang="less">
.container {
  padding: 0 20px 20px 20px;
}

:deep(.arco-table-th) {
  &:last-child {
    .arco-table-th-item-title {
      margin-left: 16px;
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
