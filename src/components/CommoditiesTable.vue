<script lang="ts" setup>
import { getAllCurrency, getAllRegion, getCommoditiesTableData } from '@/apis/commodities';
import type { CommoditiesTableForm } from '@/types/commoditiesTableForm';
import type { Currency } from '@/types/currency';
import type { Pagination } from '@/types/page';
import type { Region } from '@/types/region';
import type { SelectOptionData, TableColumnData } from '@arco-design/web-vue';
import { onMounted, ref } from 'vue';
import { type CommoditiesTableDataResponse } from '@/types/commoditiesTableDataResponse';
import { IconSearch, IconRefresh } from '@arco-design/web-vue/es/icon';
import { goto } from '@/utils/routerUtils';


const tableColumns = ref<TableColumnData[]>([
  {
    title: '大宗商品代码',
    dataIndex: 'code',
  },
  {
    title: '交易平台',
    dataIndex: 'platform',
  },
  {
    title: '交易国家/地区',
    dataIndex: 'region',
  },
  {
    title: '交易货币',
    dataIndex: 'currency',
  },
  {
    title: '大宗商品名称',
    dataIndex: 'name',
  },
  {
    title: '详情',
    slotName: 'detail'
  }
]);

const loading = ref(false);
const commoditiesTableFormData = ref<CommoditiesTableForm>({
  code: '',
  platform: '',
  region: '',
  currency: '',
  name: ''
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

const tableData = ref<CommoditiesTableForm[]>([]);
const pagination = ref<Pagination>({
  current: 1,
  pageSize: 10,
  total: 0
});

onMounted(() => {
  fetchPageData(commoditiesTableFormData.value, 1);
});

const onPageChange = (current: number) => {
  fetchPageData(commoditiesTableFormData.value, current);
};

const fetchPageData = (searchData: CommoditiesTableForm, current: number) => {
  loading.value = true;
  getCommoditiesTableData(searchData,
    current,
    pagination.value.pageSize
  ).then(res => {
    tableData.value = [];
    let commoditiesTableDataResponse = res.data as CommoditiesTableDataResponse;
    commoditiesTableDataResponse.commoditiesTags.forEach((commoditiesTag) => {
      tableData.value.push({
        code: commoditiesTag.code,
        platform: commoditiesTag.platform,
        region: `${commoditiesTag.region.simplifiedChineseName}(${commoditiesTag.region.englishName})`,
        currency: `${commoditiesTag.currency.simplifiedChineseName}(${commoditiesTag.currency.englishName})`,
        name: commoditiesTag.name,
      });
    });
    pagination.value.current = current;
    pagination.value.total = commoditiesTableDataResponse.total;
  })
    .finally(() => {
      loading.value = false;
    })
}

const search = () => {
  fetchPageData(commoditiesTableFormData.value, 1);
}

const reset = () => {
  commoditiesTableFormData.value = {
    code: '',
    platform: '',
    region: '',
    currency: '',
    name: ''
  };
  search();
};
</script>

<template>
  <div class="container">
    <a-card :title="'股票数据'">
      <a-row>
        <a-col :flex="1">
          <a-form :model="commoditiesTableFormData" :label-col-props="{ span: 6 }" :wrapper-col-props="{ span: 18 }"
            label-align="left">

            <a-row :gutter="14">
              <a-col :span="10">
                <a-form-item :label="'大宗商品代码'">
                  <a-input v-model="commoditiesTableFormData.code" :placeholder="''" />
                </a-form-item>
              </a-col>
              <a-col :span="7">
                <a-form-item :label="'交易平台'">
                  <a-input v-model="commoditiesTableFormData.platform" :placeholder="''" />
                </a-form-item>
              </a-col>
              <a-col :span="7">
                <a-form-item :label="'交易货币'">
                  <a-select v-model="commoditiesTableFormData.currency" :options="currencyOptions" :placeholder="''" />
                </a-form-item>
              </a-col>
            </a-row>

            <a-row :gutter="16">
              <a-col :span="12">
                <a-form-item :label="'交易国家/地区'">
                  <a-select v-model="commoditiesTableFormData.region" :options="regionOptions" :placeholder="''" />
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item :label="'大宗商品名称'">
                  <a-input v-model="commoditiesTableFormData.name" :placeholder="''" />
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
          <a-button @click="() => { goto({ name: 'commoditiesEcharts', params: { code: record.code } }); }">详情</a-button>
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
