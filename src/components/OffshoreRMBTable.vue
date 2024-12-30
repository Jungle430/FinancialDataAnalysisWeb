<script lang="ts" setup>
import { getAllBaseCurrency, getAllBaseRegion, getAllQuoteCurrency, getAllQuoteRegion, getOffshoreRMBTableData } from '@/apis/offshoreRMB';
import type { Currency } from '@/types/currency';
import type { ForexTableDataResponse } from '@/types/forexTableDataResponse';
import type { ForexTableForm } from '@/types/forexTableForm';
import type { Pagination } from '@/types/page';
import type { Region } from '@/types/region';
import type { SelectOptionData, TableColumnData } from '@arco-design/web-vue';
import { IconSearch, IconRefresh } from '@arco-design/web-vue/es/icon';
import { onMounted, ref } from 'vue';
import { goto } from '@/utils/routerUtils';

const tableColumns = ref<TableColumnData[]>([
  {
    title: '基础货币所属国家/地区',
    dataIndex: 'baseRegion',
  },
  {
    title: '基础货币名称',
    dataIndex: 'baseCurrency',
  },
  {
    title: '报价货币所属国家/地区',
    dataIndex: 'quoteRegion',
  },
  {
    title: '报价货币名称',
    dataIndex: 'quoteCurrency',
  },
  {
    title: '详情',
    slotName: 'detail'
  }
]);

const loading = ref(false);
const offshoreTableForm = ref({
  baseRegion: '',
  baseCurrency: '',
  quoteRegion: '',
  quoteCurrency: '',
});

const baseRegionOptions = ref<SelectOptionData[]>([]);
onMounted(() => {
  baseRegionOptions.value.push({
    label: '所有基础货币所属国家/地区',
    value: '',
  });
  getAllBaseRegion()
    .then(res => {
      res.data.regions.forEach((region: Region, _: number) => {
        baseRegionOptions.value.push({
          label: `${region.simplifiedChineseName}(${region.englishName})`,
          value: region.isoCode,
        });
      });
    });
});

const baseCurrencyOptions = ref<SelectOptionData[]>([]);
onMounted(() => {
  baseCurrencyOptions.value.push({
    label: '所有基础货币',
    value: '',
  });
  getAllBaseCurrency()
    .then(res => {
      res.data.currencies.forEach((currency: Currency, _: number) => {
        baseCurrencyOptions.value.push({
          label: `${currency.simplifiedChineseName}(${currency.englishName})`,
          value: currency.currencyCode,
        });
      });
    });
});

const quoteRegionOptions = ref<SelectOptionData[]>([]);
onMounted(() => {
  quoteRegionOptions.value.push({
    label: '所有报价货币所属国家/地区',
    value: '',
  });
  getAllQuoteRegion()
    .then(res => {
      res.data.regions.forEach((region: Region, _: number) => {
        quoteRegionOptions.value.push({
          label: `${region.simplifiedChineseName}(${region.englishName})`,
          value: region.isoCode,
        });
      });
    });
});

const quoteCurrencyOptions = ref<SelectOptionData[]>([]);
onMounted(() => {
  quoteCurrencyOptions.value.push({
    label: '所有报价货币',
    value: '',
  });
  getAllQuoteCurrency()
    .then(res => {
      res.data.currencies.forEach((currency: Currency, _: number) => {
        quoteCurrencyOptions.value.push({
          label: `${currency.simplifiedChineseName}(${currency.englishName})`,
          value: currency.currencyCode,
        });
      });
    });
});

const tableData = ref<ForexTableForm[]>([]);
const pagination = ref<Pagination>({
  current: 1,
  pageSize: 10,
  total: 0
});

onMounted(() => {
  fetchPageData(offshoreTableForm.value, 1);
});

const onPageChange = (current: number) => {
  fetchPageData(offshoreTableForm.value, current);
}

const fetchPageData = (searchData: ForexTableForm, current: number) => {
  loading.value = true;
  getOffshoreRMBTableData(
    searchData,
    current,
    pagination.value.pageSize,
  ).then(res => {
    tableData.value = [];
    let forexTableDataResponse = res.data as ForexTableDataResponse;
    forexTableDataResponse.forexTags.forEach((forexTag) => {
      tableData.value.push({
        baseRegion: `${forexTag.baseRegion.simplifiedChineseName}(${forexTag.baseRegion.englishName})`,
        baseCurrency: `${forexTag.baseCurrency.simplifiedChineseName}(${forexTag.baseCurrency.englishName})`,
        quoteRegion: `${forexTag.quoteRegion.simplifiedChineseName}(${forexTag.quoteRegion.englishName})`,
        quoteCurrency: `${forexTag.quoteCurrency.simplifiedChineseName}(${forexTag.quoteCurrency.englishName})`,
        baseCurrencyCode: forexTag.baseCurrency.currencyCode,
        quoteCurrencyCode: forexTag.quoteCurrency.currencyCode,
      });
    });
    pagination.value.current = current;
    pagination.value.total = forexTableDataResponse.total;

  }).finally(() => {
    loading.value = false;
  });
};

const search = () => {
  fetchPageData(offshoreTableForm.value, 1);
};

const reset = () => {
  offshoreTableForm.value = {
    baseRegion: '',
    baseCurrency: '',
    quoteRegion: '',
    quoteCurrency: '',
  };
  search();
};
</script>

<template>
  <div class="container">
    <a-card :title="'比特币数据'">
      <a-row>
        <a-col :flex="1">
          <a-form :model="offshoreTableForm" :label-col-props="{ span: 6 }" :wrapper-col-props="{ span: 18 }"
            label-align="left">
            <a-row :gutter="14">
              <a-col :span="14">
                <a-form-item :label="'基础货币所属国家/地区'">
                  <a-select v-model="offshoreTableForm.baseRegion" :options="baseRegionOptions" :placeholder="''" />
                </a-form-item>
              </a-col>
              <a-col :span="10">
                <a-form-item :label="'基础货币名称'">
                  <a-select v-model="offshoreTableForm.baseCurrency" :options="baseCurrencyOptions" :placeholder="''" />
                </a-form-item>
              </a-col>
            </a-row>

            <a-row :gutter="14">
              <a-col :span="14">
                <a-form-item :label="'报价货币所属国家/地区'">
                  <a-select v-model="offshoreTableForm.quoteRegion" :options="quoteRegionOptions" :placeholder="''" />
                </a-form-item>
              </a-col>
              <a-col :span="10">
                <a-form-item :label="'报价货币名称'">
                  <a-select v-model="offshoreTableForm.quoteCurrency" :options="quoteCurrencyOptions"
                    :placeholder="''" />
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
          <a-button @click="() => {
            goto({
              name: 'offshoreRMBecharts',
              params: {
                baseCurrency: record.baseCurrencyCode,
                quoteCurrency: record.quoteCurrencyCode
              }
            });
          }">详情</a-button>
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
