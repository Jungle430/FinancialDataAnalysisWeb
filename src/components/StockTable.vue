<script lang="ts" setup>
import { getAllCurrencies, getAllMarketRegions, getAllRegions } from '@/apis/stock';
import type { Currency } from '@/types/currency';
import type { Region } from '@/types/region';
import type { StockTableForm } from '@/types/stockTableForm';
import type { SelectOptionData } from '@arco-design/web-vue';
import { onMounted, ref } from 'vue';
import { IconSearch, IconRefresh, IconDownload } from '@arco-design/web-vue/es/icon';

const stockTableFormData = ref<StockTableForm>({
  code: '',
  platform: '',
  region: '',
  currency: '',
  name: '',
  marketRegion: ''
});

const currencyKinds = ref<Currency[]>([]);
const regions = ref<Region[]>([]);
const marketRegions = ref<Region[]>([]);

const currencyOptions = ref<SelectOptionData[]>(
  [
    {
      label: '所有货币',
      value: '',
    }
  ]
);

const regionOptions = ref<SelectOptionData[]>(
  [
    {
      label: '所有国家/地区',
      value: '',
    }
  ]
);

const marketRegionsOptions = ref<SelectOptionData[]>(
  [
    {
      label: '所有国家/地区',
      value: '',
    }
  ]
);

onMounted(() => {
  getAllCurrencies()
    .then(res => {
      currencyKinds.value.push(...res.data.currencies);
      for (let i = 0; i < currencyKinds.value.length; i++) {
        currencyOptions.value.push({
          label: `${currencyKinds.value[i].simplifiedChineseName}(${currencyKinds.value[i].englishName})`,
          value: currencyKinds.value[i].currencyCode
        });
      }
    });

  getAllRegions()
    .then(res => {
      regions.value.push(...res.data.regions);
      for (let i = 0; i < regions.value.length; i++) {
        regionOptions.value.push({
          label: `${regions.value[i].simplifiedChineseName}(${regions.value[i].englishName})`,
          value: regions.value[i].isoCode,
        });
      }
    });

  getAllMarketRegions()
    .then(res => {
      marketRegions.value.push(...res.data.regions);
      for (let i = 0; i < marketRegions.value.length; i++) {
        marketRegionsOptions.value.push({
          label: `${marketRegions.value[i].simplifiedChineseName}(${marketRegions.value[i].englishName})`,
          value: marketRegions.value[i].isoCode,
        });
      }
    });
});

const search = () => {
  console.log('search');
  console.log(stockTableFormData.value)
}

const reset = () => {
  console.log('reset');
  console.log(stockTableFormData.value);
}
</script>

<template>
  <div class="container">
    <a-card :title="'股票数据'">
      <a-row>
        <a-col :flex="1">
          <a-form :model="stockTableFormData" :label-col-props="{ span: 6 }" :wrapper-col-props="{ span: 18 }"
            label-align="left">

            <a-row :gutter="14">
              <a-col :span="7">
                <a-form-item :label="'股票代码'">
                  <a-input v-model="stockTableFormData.code" :placeholder="''" />
                </a-form-item>
              </a-col>
              <a-col :span="7">
                <a-form-item :label="'交易平台'">
                  <a-input v-model="stockTableFormData.platform" :placeholder="''" />
                </a-form-item>
              </a-col>
              <a-col :span="10">
                <a-form-item :label="'交易国家/地区'">
                  <a-select v-model="stockTableFormData.marketRegion" :options="marketRegionsOptions"
                    :placeholder="''" />
                </a-form-item>
              </a-col>
            </a-row>

            <a-row :gutter="16">
              <a-col :span="7">
                <a-form-item :label="'国家/地区'">
                  <a-select v-model="stockTableFormData.region" :options="regionOptions" :placeholder="''" />
                </a-form-item>
              </a-col>
              <a-col :span="7">
                <a-form-item :label="'公司名称'">
                  <a-input v-model="stockTableFormData.name" :placeholder="''" />
                </a-form-item>
              </a-col>
              <a-col :span="10">
                <a-form-item :label="'货币'">
                  <a-select v-model="stockTableFormData.currency" :options="currencyOptions" :placeholder="''" />
                </a-form-item>
              </a-col>
            </a-row>
          </a-form>
        </a-col>
        <a-divider style="height: 90px" direction="vertical" />
        <a-col :flex="'86px'" style="text-align: right">
          <a-space direction="vertical" :size="20">
            <a-button type="primary" @click="search">
              <template #icon>
                <icon-search />
              </template>
              {{ '搜索' }}
            </a-button>
            <a-button type="secondary" @click="reset">
              <template #icon>
                <icon-refresh />
              </template>
              {{ '重置' }}
            </a-button>
          </a-space>
        </a-col>
      </a-row>
      <a-table />
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
