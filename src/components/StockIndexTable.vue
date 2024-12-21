<script lang="ts" setup>
import { getAllCurrency, getAllRegion, getStockIndexTableData } from '@/apis/stockIndex';
import type { Currency } from '@/types/currency';
import type { Region } from '@/types/region';
import { type StockIndexTableForm } from '@/types/stockIndexTableForm';
import { type SelectOptionData, type TableColumnData } from '@arco-design/web-vue';
import { onMounted, ref } from 'vue';
import { IconSearch, IconRefresh } from '@arco-design/web-vue/es/icon';
import type { Pagination } from '@/types/page';
import type { StockIndexTableDataResponse } from '@/types/stockIndexTableDataResponse';

const tableColumns = ref<TableColumnData[]>([
  {
    title: '股票指数代码',
    dataIndex: 'code',
  },
  {
    title: '股票指数名称',
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
    title: '交易国家/地区',
    dataIndex: 'region',
  },
]);

const loading = ref(false);
const stockIndexTableFormData = ref<StockIndexTableForm>({
  code: '',
  platform: '',
  region: '',
  currency: '',
  name: '',
})

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

const currencyOptions = ref<SelectOptionData[]>([]);
onMounted(() => {
  currencyOptions.value.push({
    label: '所有货币',
    value: '',
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

const tableData = ref<StockIndexTableForm[]>([]);
const pagination = ref<Pagination>({
  current: 1,
  pageSize: 10,
  total: 0
});
onMounted(() => {
  fetchPageData(stockIndexTableFormData.value, 1);
});

const onPageChange = (current: number) => {
  fetchPageData(stockIndexTableFormData.value, current);
};

const fetchPageData = (searchData: StockIndexTableForm, current: number) => {
  loading.value = true;
  getStockIndexTableData(
    searchData,
    current,
    pagination.value.pageSize
  ).then(res => {
    tableData.value = [];
    let stockIndexTableDataResponse = res.data as StockIndexTableDataResponse;
    stockIndexTableDataResponse.stockIndexTags.forEach((stockIndexTag) => {
      tableData.value.push({
        code: stockIndexTag.code,
        platform: stockIndexTag.platform,
        region: `${stockIndexTag.region.simplifiedChineseName}(${stockIndexTag.region.englishName})`,
        currency: `${stockIndexTag.currency.simplifiedChineseName}(${stockIndexTag.currency.englishName})`,
        name: stockIndexTag.name,
      });
    });
    pagination.value.current = current;
    pagination.value.total = stockIndexTableDataResponse.total;
  }).finally(() => { loading.value = false; });
};

const search = () => { fetchPageData(stockIndexTableFormData.value, 1); };
const reset = () => {
  stockIndexTableFormData.value = {
    code: '',
    platform: '',
    region: '',
    currency: '',
    name: '',
  };
  search();
};
</script>

<template>
  <div class="container">
    <a-card :title="'股票指数数据'">
      <a-row>
        <a-col :flex="1">
          <a-form :model="stockIndexTableFormData" :label-col-props="{ span: 6 }" :wrapper-col-props="{ span: 18 }"
            label-align="left">
            <a-row :gutter="14">
              <a-col :span="7">
                <a-form-item :label="'股票代码'">
                  <a-input v-model="stockIndexTableFormData.code" :placeholder="''" />
                </a-form-item>
              </a-col>
              <a-col :span="10">
                <a-form-item :label="'交易平台'">
                  <a-input v-model="stockIndexTableFormData.platform" :placeholder="''" />
                </a-form-item>
              </a-col>
              <a-col :span="7">
                <a-form-item :label="'货币'">
                  <a-select v-model="stockIndexTableFormData.currency" :options="currencyOptions" :placeholder="''" />
                </a-form-item>
              </a-col>
            </a-row>

            <a-row :gutter="14">
              <a-col :span="12">
                <a-form-item :label="'交易国家/地区'">
                  <a-select v-model="stockIndexTableFormData.region" :options="regionOptions" :placeholder="''" />
                </a-form-item>
              </a-col>

              <a-col :span="12">
                <a-form-item :label="'股票指数名称'">
                  <a-input v-model="stockIndexTableFormData.name" />
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
