<script lang="ts" setup>
import { getAllCurrencies, getAllMarketRegions, getAllRegions } from '@/apis/stock';
import type { Currency } from '@/types/currency';
import type { Region } from '@/types/region';
import type { StockTableForm } from '@/types/stockTableForm';
import { type TableColumnData, type SelectOptionData } from '@arco-design/web-vue';
import { onMounted, ref } from 'vue';
import { IconSearch, IconRefresh } from '@arco-design/web-vue/es/icon';
import type { Pagination } from '@/types/page';

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
  // TODO:
  console.log('search');
  console.log(stockTableFormData.value)
}

const reset = () => {
  // TODO:
  console.log('reset');
  console.log(stockTableFormData.value);
}

const tableColumns = ref<TableColumnData[]>([
  {
    title: "股票代码",
    dataIndex: 'code',
  },
  {
    title: '交易平台',
    dataIndex: 'platform',
  },
  {
    title: '国家/地区',
    dataIndex: 'region',
  },
  {
    title: '货币',
    dataIndex: 'currency',
  },
  {
    title: '公司名称',
    dataIndex: 'name',
  },
  {
    title: '交易国家/地区',
    dataIndex: 'market_region',
  }
]);

const pagination = ref<Pagination>({
  current: 1,
  pageSize: 8,
  total: 16
});

const tableDataArrays = [[{
  id: 1,
  code: 'AAPL',
  platform: 'NASDAQ',
  region: '美国',
  currency: 'USD',
  name: '苹果公司',
  market_region: '美国',
},
{
  id: 2,
  code: 'TSLA',
  platform: 'NASDAQ',
  region: '美国',
  currency: 'USD',
  name: '特斯拉公司',
  market_region: '美国',
},
{
  id: 3,
  code: 'MSFT',
  platform: 'NASDAQ',
  region: '美国',
  currency: 'USD',
  name: '微软公司',
  market_region: '美国',
},
{
  id: 4,
  code: 'BABA',
  platform: 'NYSE',
  region: '中国',
  currency: 'USD',
  name: '阿里巴巴集团',
  market_region: '美国',
},
{
  id: 5,
  code: '700',
  platform: '香港交易所',
  region: '中国',
  currency: 'HKD',
  name: '腾讯控股',
  market_region: '中国',
},], [{
  id: 6,
  code: '9988',
  platform: '香港交易所',
  region: '中国',
  currency: 'HKD',
  name: '美团',
  market_region: '中国',
},
{
  id: 7,
  code: 'GOOGL',
  platform: 'NASDAQ',
  region: '美国',
  currency: 'USD',
  name: '谷歌',
  market_region: '美国',
},
{
  id: 8,
  code: 'AMZN',
  platform: 'NASDAQ',
  region: '美国',
  currency: 'USD',
  name: '亚马逊',
  market_region: '美国',
},
{
  id: 9,
  code: 'FB',
  platform: 'NASDAQ',
  region: '美国',
  currency: 'USD',
  name: 'Meta Platforms',
  market_region: '美国',
},
{
  id: 10,
  code: '00700',
  platform: '香港交易所',
  region: '中国',
  currency: 'HKD',
  name: '中国移动',
  market_region: '中国',
},]];

const tableData = ref(tableDataArrays[0]);

const onPageChange = (current: number) => {
  // TODO:
  console.log(current);
  pagination.value.current = current;
  tableData.value = tableDataArrays[current - 1];
};
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
                <a-form-item :label="'货币'">
                  <a-select v-model="stockTableFormData.currency" :options="currencyOptions" :placeholder="''" />
                </a-form-item>
              </a-col>
              <a-col :span="10">
                <a-form-item :label="'公司名称'">
                  <a-input v-model="stockTableFormData.name" :placeholder="''" />
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
      <a-table :data="tableData" :columns="tableColumns" :pagination="pagination" @page-change="onPageChange">

      </a-table>
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
