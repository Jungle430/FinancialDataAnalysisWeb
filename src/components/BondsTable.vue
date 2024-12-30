<script lang="ts" setup>
import { getAllCurrency, getAllRegion, getBondsTableData } from '@/apis/bonds';
import type { BondsTableDataResponse } from '@/types/bondsTableDataResponse';
import { type BondsTableForm } from '@/types/bondsTableForm';
import type { Currency } from '@/types/currency';
import type { Pagination } from '@/types/page';
import type { Region } from '@/types/region';
import { type SelectOptionData, type TableColumnData } from '@arco-design/web-vue';
import { onMounted, ref } from 'vue';
import { IconSearch, IconRefresh } from '@arco-design/web-vue/es/icon';
import { goto } from '@/utils/routerUtils';


const tableColumns = ref<TableColumnData[]>([
  {
    title: '美国国债代码',
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
    title: '美国国债名称',
    dataIndex: 'name',
  },
  {
    title: '详情',
    slotName: 'detail'
  }
]);

const loading = ref(false);
const bondsTableFormData = ref<BondsTableForm>({
  code: '',
  platform: '',
  region: '',
  currency: '',
  name: '',
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

const tableData = ref<BondsTableForm[]>([]);
const pagination = ref<Pagination>({
  current: 1,
  pageSize: 10,
  total: 0
});

onMounted(() => {
  fetchPageData(bondsTableFormData.value, 1);
});

const onPageChange = (current: number) => {
  fetchPageData(bondsTableFormData.value, current);
};

const fetchPageData = (searchData: BondsTableForm, current: number) => {
  loading.value = true;
  getBondsTableData(
    searchData,
    current,
    pagination.value.pageSize,
  ).then(res => {
    tableData.value = [];
    let bondsTableDataResponse = res.data as BondsTableDataResponse;
    bondsTableDataResponse.bondsTags.forEach((bondsTag) => {
      tableData.value.push({
        code: bondsTag.code,
        platform: bondsTag.platform,
        region: `${bondsTag.region.simplifiedChineseName}(${bondsTag.region.englishName})`,
        currency: `${bondsTag.currency.simplifiedChineseName}(${bondsTag.currency.englishName})`,
        name: bondsTag.name,
      });
    });
    pagination.value.current = current;
    pagination.value.total = bondsTableDataResponse.total;
  })
    .finally(() => {
      loading.value = false;
    })
}

const search = () => {
  fetchPageData(bondsTableFormData.value, 1);
}

const reset = () => {
  bondsTableFormData.value = {
    code: '',
    platform: '',
    region: '',
    currency: '',
    name: '',
  }
  search();
}
</script>

<template>
  <div class="container">
    <a-card :title="'比特币数据'">
      <a-row>
        <a-col :flex="1">
          <a-form :model="bondsTableFormData" :label-col-props="{ span: 6 }" :wrapper-col-props="{ span: 18 }"
            label-align="left">
            <a-row :gutter="14">
              <a-col :span="9">
                <a-form-item :label="'美国国债代码'">
                  <a-input v-model="bondsTableFormData.code" :placeholder="''" />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item :label="'交易平台'">
                  <a-input v-model="bondsTableFormData.platform" :placeholder="''" />
                </a-form-item>
              </a-col>
              <a-col :span="7">
                <a-form-item :label="'交易货币'">
                  <a-select v-model="bondsTableFormData.currency" :options="currencyOptions" :placeholder="''" />
                </a-form-item>
              </a-col>
            </a-row>

            <a-row :gutter="14">
              <a-col :span="12">
                <a-form-item :label="'交易国家/地区'">
                  <a-select v-model="bondsTableFormData.region" :options="regionOptions" :placeholder="''" />
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item :label="'美国国债名称'">
                  <a-input v-model="bondsTableFormData.name" :placeholder="''" />
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
          <a-button @click="() => { goto({ name: 'bondsEcharts', params: { code: record.code } }); }">详情</a-button>
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
