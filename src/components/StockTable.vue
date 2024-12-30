<script lang="ts" setup>
import { getAllCurrency, getAllMarketRegion, getAllRegion, getStockTableData } from '@/apis/stock';
import type { Currency } from '@/types/currency';
import type { Region } from '@/types/region';
import type { StockTableForm } from '@/types/stockTableForm';
import { type TableColumnData, type SelectOptionData } from '@arco-design/web-vue';
import { onMounted, ref } from 'vue';
import { IconSearch, IconRefresh } from '@arco-design/web-vue/es/icon';
import type { Pagination } from '@/types/page';
import type { StockTableDataResponse } from '@/types/stockTableDataResponse';
import { goto } from '@/utils/routerUtils';

const tableColumns = ref<TableColumnData[]>([
  {
    title: "股票代码",
    dataIndex: 'code',
  },
  {
    title: '公司名称',
    dataIndex: 'name',
  },
  {
    title: '交易平台',
    dataIndex: 'platform',
  },
  {
    title: '交易货币',
    dataIndex: 'currency',
  },
  {
    title: '国家/地区',
    dataIndex: 'region',
  },
  {
    title: '交易国家/地区',
    dataIndex: 'marketRegion',
  },
  {
    title: '详情',
    slotName: 'detail'
  }
]);

const loading = ref(false);
const stockTableFormData = ref<StockTableForm>({
  code: '',
  platform: '',
  region: '',
  currency: '',
  name: '',
  marketRegion: ''
});

const currencyOptions = ref<SelectOptionData[]>([]);
onMounted(() => {
  currencyOptions.value.push({
    label: '所有货币',
    value: ''
  });
  getAllCurrency()
    .then(res => {
      res.data.currencies.forEach((currency: Currency, _: number) => {
        currencyOptions.value.push({
          label: `${currency.simplifiedChineseName}(${currency.englishName})`,
          value: currency.currencyCode
        })
      })
    });
});

const regionOptions = ref<SelectOptionData[]>([]);
onMounted(() => {
  regionOptions.value.push({
    label: '所有国家/地区',
    value: '',
  });
  getAllRegion()
    .then(res => {
      res.data.regions.forEach((region: Region, _: number) => {
        regionOptions.value.push({
          label: `${region.simplifiedChineseName}(${region.englishName})`,
          value: region.isoCode
        })
      })
    });
});

const marketRegionsOptions = ref<SelectOptionData[]>([]);
onMounted(() => {
  marketRegionsOptions.value.push({
    label: '所有国家/地区',
    value: '',
  });
  getAllMarketRegion()
    .then(res => {
      res.data.regions.forEach((marketRegion: Region, _: number) => {
        marketRegionsOptions.value.push({
          label: `${marketRegion.simplifiedChineseName}(${marketRegion.englishName})`,
          value: marketRegion.isoCode
        })
      });
    })
});

const tableData = ref<StockTableForm[]>([]);
const pagination = ref<Pagination>({
  current: 1,
  pageSize: 10,
  total: 0
});
onMounted(() => {
  fetchPageData(stockTableFormData.value, 1);
});

const onPageChange = (current: number) => {
  fetchPageData(stockTableFormData.value, current);
};

const fetchPageData = (searchData: StockTableForm, current: number) => {
  loading.value = true;
  getStockTableData(searchData,
    current,
    pagination.value.pageSize
  ).then(res => {
    tableData.value = [];
    let stockTableDataResponse = res.data as StockTableDataResponse;
    stockTableDataResponse.stockTags.forEach((stockTag) => {
      tableData.value.push({
        code: stockTag.code,
        platform: stockTag.platform,
        region: `${stockTag.region.simplifiedChineseName}(${stockTag.region.englishName})`,
        currency: `${stockTag.currency.simplifiedChineseName}(${stockTag.currency.englishName})`,
        name: stockTag.name,
        marketRegion: `${stockTag.marketRegion.simplifiedChineseName}(${stockTag.marketRegion.englishName})`
      });
    });
    pagination.value.current = current;
    pagination.value.total = stockTableDataResponse.total;
  })
    .finally(() => {
      loading.value = false;
    })
}

const search = () => {
  fetchPageData(stockTableFormData.value, 1);
}

const reset = () => {
  stockTableFormData.value = {
    code: '',
    platform: '',
    region: '',
    currency: '',
    name: '',
    marketRegion: ''
  }
  search();
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
      <a-table :loading="loading" :data="tableData" :columns="tableColumns" :pagination="pagination"
        @page-change="onPageChange">
        <template #detail="{ record }">
          <a-button @click="() => { goto({ name: 'stockEcharts', params: { code: record.code } }); }">详情</a-button>
        </template>
      </a-table>
    </a-card>
  </div>
</template>

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
